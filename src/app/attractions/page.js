"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import { Range } from "react-range";
import Carousal from "../../../components/carousel/Carousal";
import HolidaysTab from "../../../components/tour-package/holidays-tab";
import Accordion from "../../../components/accordion/accordion";
import TourPackageTab from "../../../components/tour-package/tour-package-tab";
import { LuMenu } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import FeaturedIntegratedTravel from "@components/tour-package/featured-integrated-travel";
import EventTab from "@components/tour-package/event-tab";

const AttractionsPage = () => {
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [tour_category, setTour_category] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [durationRange, setDurationRange] = useState([1, 8]);
  const [selectedItems, setSelectedItems] = useState({});

  // UI states
  const [isToggled, setIsToggled] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // Other content states
  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
  const firstBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 3 };
  const handleToggle = () => setIsToggled(!isToggled);
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);

  const clearPriceFilter = () => setPriceRange([10, 1000]);
  const clearDurationFilter = () => setDurationRange([1, 8]);

  // Accordion configuration
  const [accordionData, setAccordionData] = useState([
    {
      title: "ACTIVITIES",
      items: [],
      apiEndpoint: "att-activities",
      filterParam: "activities",
    },
    {
      title: "CULTURAL ACTIVITIES",
      items: [],
      apiEndpoint: "att-cultural-activities",
      filterParam: "cultural_activities",
    },
    {
      title: "RELAXATION AND REJUVENATION",
      items: [],
      apiEndpoint: "att-rejuvenations",
      filterParam: "rejuvenations",
    },
    {
      title: "FILTER BY STAY",
      items: [],
      apiEndpoint: "att-stay-types",
      filterParam: "stay_types",
    },
    {
      title: "TRAVEL STYLE",
      items: [],
      apiEndpoint: "att-travel-styles",
      filterParam: "travel_styles",
    },
    {
      title: "GEOGRAPHY",
      items: [],
      apiEndpoint: "att-geographies",
      filterParam: "geographies",
    },
  ]);

  // Build query parameters for API call
  const buildQueryParams = () => {
    const params = {};

    // Add price range
    if (priceRange[0] !== 10 || priceRange[1] !== 1000) {
      params.min_price = priceRange[0];
      params.max_price = priceRange[1];
    }

    // Add duration range
    if (durationRange[0] !== 1 || durationRange[1] !== 8) {
      params.min_duration = durationRange[0];
      params.max_duration = durationRange[1];
    }

    // Add accordion filters as arrays
    Object.entries(selectedItems).forEach(([sectionTitle, selectedIds]) => {
      if (selectedIds && selectedIds.length > 0) {
        const sectionConfig = accordionData.find(
          (s) => s.title === sectionTitle
        );
        if (sectionConfig) {
          // Send as array to maintain proper format for Laravel
          params[sectionConfig.filterParam] = selectedIds;
        }
      }
    });

    return params;
  };

  // Fetch attractions with filters
  const fetchFilteredAttractions = async () => {
    setLoading(true);
    setError(null);

    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");

    try {
      const filterParams = buildQueryParams();
      const url = `${process.env.NEXT_PUBLIC_API_URL}attractions`;

       //console.log("Fetching attractions with params:", filterParams); // Debug log

      const response = await axios.get(url, {
        params: filterParams, // Use params object instead of query string
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });

      const fetchedData = (response.data.data || response.data || []).map(
        (item, index) => ({
          ...item,
          id: item.id ?? `attraction-${index}`,
        })
      );

      setPackages(fetchedData);
      setNoResultsFound(
        fetchedData.length === 0 &&
          (Object.keys(selectedItems).length > 0 ||
            priceRange[0] !== 10 ||
            priceRange[1] !== 1000 ||
            durationRange[0] !== 1 ||
            durationRange[1] !== 8)
      );
    } catch (err) {
      console.error("Error fetching attractions:", err);
      setError("Failed to fetch attractions.");
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch of all attractions (for fallback)
  const fetchAllAttractions = async () => {
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}attractions`,
        { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
      );
      const fetchedData = (response.data.data || response.data || []).map(
        (item, index) => ({
          ...item,
          id: item.id ?? `attraction-${index}`,
        })
      );
      setAllPackages(fetchedData);
    } catch (err) {
      setError("Failed to fetch all attractions.");
    }
  };

  // Fetch accordion items
  useEffect(() => {
    const fetchAccordionItems = async (index) => {
      const section = accordionData[index];
      if (!section.apiEndpoint) return;

      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`,
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const items = response.data.data || response.data || [];

        setAccordionData((prevData) => {
          const newData = [...prevData];
          newData[index].items = Array.isArray(items)
            ? items.map((item, itemIndex) => ({
                title: item.name || item.title || "Unknown",
                id: item.id ?? `${section.filterParam}-${itemIndex}`,
              }))
            : [];
          return newData;
        });
      } catch (err) {
        setError(`Failed to fetch ${section.title}.`);
      }
    };

    accordionData.forEach((section, index) => {
      if (section.apiEndpoint) fetchAccordionItems(index);
    });
  }, []);

  // Fetch other content
  useEffect(() => {
    const fetchTopAttractions = async () => {
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/get-top-attractions`,
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const fetchedData = (response.data?.data || response.data || []).map(
          (item, index) => ({
            ...item,
            id: item.id ?? `top-attraction-${index}`,
          })
        );
        setBestpicked(fetchedData);
      } catch (err) {
        setError("Failed to fetch top attractions.");
      }
    };

    fetchTopAttractions();
  }, []);

  useEffect(() => {
    const fetchUniqueAttractions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/get-lesser-known-attractions`
        );
        const fetchedData = (response.data.data || response.data || []).map(
          (item, index) => ({
            ...item,
            id: item.id ?? `unique-attraction-${index}`,
          })
        );
        setLesserWonders(fetchedData);
      } catch (err) {
        setError("Failed to fetch unique attractions.");
      }
    };

    fetchUniqueAttractions();
  }, []);

  useEffect(() => {
    const fetchAttraction_Categories = async () => {
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}att-categories`,
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const allData = (response.data.data || response.data || []).map(
          (category, index) => ({
            ...category,
            id: category.id ?? `attractioncategory-${index}`,
          })
        );
        setTour_category(allData);
      } catch (err) {
        setError("Failed to fetch attraction categories.");
      }
    };

    fetchAttraction_Categories();
  }, []);

  // Initial load
  useEffect(() => {
    fetchAllAttractions();
    fetchFilteredAttractions();
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    // Debounce the API call to avoid too many requests
    const timeoutId = setTimeout(() => {
      fetchFilteredAttractions();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [priceRange, durationRange, selectedItems]);

  const handleAccordionItemClick = (sectionIndex, itemId) => {
    const newSelectedItems = { ...selectedItems };
    const section = accordionData[sectionIndex];
    const sectionTitleKey = section.title;

    const currentSelections = newSelectedItems[sectionTitleKey] || [];

    if (section.filterParam === "country_id") {
      // Single-select logic
      newSelectedItems[sectionTitleKey] =
        currentSelections[0] === itemId ? [] : [itemId];
    } else {
      // Multi-select logic
      if (currentSelections.includes(itemId)) {
        newSelectedItems[sectionTitleKey] = currentSelections.filter(
          (id) => id !== itemId
        );
      } else {
        newSelectedItems[sectionTitleKey] = [...currentSelections, itemId];
      }

      if (newSelectedItems[sectionTitleKey].length === 0) {
        delete newSelectedItems[sectionTitleKey];
      }
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSearch = () => {
    fetchFilteredAttractions();
    if (isToggled) setIsToggled(false);
  };

  const clearAllFilters = () => {
    setPriceRange([10, 1000]);
    setDurationRange([1, 8]);
    setSelectedItems({});
    setNoResultsFound(false);
    // This will trigger the useEffect to fetch all attractions
  };

  // Determine which attractions to display
  const displayItems = packages.length > 0 ? packages : allPackages;

  return (
    <>
      <Banner
        title="Explore Attractions"
        subTitle="Discover amazing places and experiences"
      />
      <section className={style["tour-package-page"]}>
        <div
          className={`container-fluid ${style["tour-package-page-container"]}`}
        >
          <div className={style["tour-packagebtn-container"]}>
            <button className={style["btn-toggle"]} onClick={handleToggle}>
              <LuMenu /> FILTER
            </button>
          </div>

          <div className={style["tour-package-container"]}>
            {/* Left Filter Panel */}
            <div
              className={`${style["left"]} ${
                isToggled ? style["highlight"] : ""
              }`}
            >
              <div className={style["package-filter"]}>
                <div className={style["filter-header"]}>
                  <h4 className="pt-2">Price Range</h4>
                </div>
                <div className={style["price-range"]}>
                  <Range
                    step={10}
                    min={10}
                    max={1000}
                    values={priceRange}
                    onChange={handlePriceRangeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          backgroundColor: "#ccc",
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "24px",
                          width: "24px",
                          borderRadius: "50%",
                          border: "solid 3px #41a6ab",
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="mb-0" style={{ fontSize: "0.9em" }}>
                      Price: ${priceRange[0]} — ${priceRange[1]}
                    </p>
                    <button
                      onClick={clearPriceFilter}
                      className="btn btn-link text-primary p-0"
                      style={{ fontSize: "0.9em" }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className={style["filter-header"]}>
                  <h4 className="mt-3">Duration (Hours)</h4>
                </div>
                <div className={style["duration-range"]}>
                  <Range
                    step={1}
                    min={1}
                    max={8}
                    values={durationRange}
                    onChange={handleDurationRangeChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "6px",
                          width: "100%",
                          backgroundColor: "#ccc",
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "24px",
                          width: "24px",
                          borderRadius: "50%",
                          border: "solid 3px #41a6ab",
                          backgroundColor: "#fff",
                        }}
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <p className="mb-0" style={{ fontSize: "0.9em" }}>
                      Hours: {durationRange[0]} — {durationRange[1]}
                    </p>
                    <button
                      onClick={clearDurationFilter}
                      className="btn btn-link text-primary p-0"
                      style={{ fontSize: "0.9em" }}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className={style["accordion-range"]}>
                  {accordionData.map((accordion, index) => (
                    <Accordion
                      key={accordion.title + index}
                      title={accordion.title}
                      items={accordion.items || []}
                      isOpenInitially={index < 2}
                      onItemClick={(itemId) =>
                        handleAccordionItemClick(index, itemId)
                      }
                      selectedItems={selectedItems[accordion.title] || []}
                    />
                  ))}
                </div>

                <div className={style["filter-buttons"]}>
                  <button
                    className={`${style["btn-one"]} mt-3`}
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                </div>

                <button
                  className={`${style["btn-toggle"]} ${style["btn-close"]}`}
                  onClick={handleToggle}
                >
                  <IoIosCloseCircleOutline />
                </button>
              </div>

              <button
                className={`${style["btn-one"]} ${style["btn-mobile"]}`}
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Attractions"}
              </button>
            </div>

            {/* Right Content Panel */}
            <div
              className={`${style["right"]} ${
                isToggled ? style["filter-full-width"] : ""
              }`}
            >
              <h3>Attractions</h3>

              {/* {error && <div className="alert alert-danger">{error}</div>} */}

              {/* {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )} */}

              {noResultsFound ? (
                <div className={style["no-results"]}>
                  <h4>No attractions found with the selected filters.</h4>
                  <p>Please try adjusting your filter selections.</p>
                  <button
                    className={style["btn-one"]}
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                // <TourPackageTab
                //   tour_category={tour_category}
                //   packages={displayItems}
                //   breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                //   type="attractions"
                // />
                <EventTab
                  tour_category={tour_category}
                  packages={displayItems}
                  breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                  type="attractions"
                />
              )}

              <div className="mt-5">
                <FeaturedIntegratedTravel type="attractions" />
              </div>

              <section className={`${style["pakage-bes-picked"]} mt-5`}>
                <div className="container-fluid">
                  {bestPicked.length > 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Best Picked For You</h3>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          bestPicked={bestPicked}
                          count={3}
                          type="attraction-bestPicked"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className={`${style["pakage-bes-picked"]} mt-5`}>
                <div className="container p-0">
                  {lesserWonders.length > 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Lesser-Known Wonders</h3>
                        <p className="text-center">
                          Explore hidden gems and one-of-a-kind activities.
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          wonders={lesserWonders}
                          count={3}
                          type="attraction-wonders"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className={`${style["pakage-bes-picked"]} mt-5`}>
                <div className="container p-0">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="pb-3">Holidays by theme</h3>
                      <HolidaysTab type="attractions" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center mt-4">
                      <button className={style["btn-one"]}>
                        View All Interests
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AttractionsPage;
