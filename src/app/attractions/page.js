"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css"; // Assuming reuse or a similar one
import Banner from "../../../components/banner/banner";
// import Countries from "../../../components/countries/countries"; // Not directly used in main display
import { Range } from "react-range";
// import { CiMobile3 } from "react-icons/ci"; // Not used
import Carousal from "../../../components/carousel/Carousal"; // Reused
import HolidaysTab from "../../../components/tour-package/holidays-tab"; // Reused
import Accordion from "../../../components/accordion/accordion"; // Reused
import TourPackageTab from "../../../components/tour-package/tour-package-tab"; // Reused
import { LuMenu } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import FeaturedIntegratedTravel from "@components/tour-package/featured-integrated-travel"; // Reused

const AttractionsPage = () => {
  // State variables will keep package-related names but hold attraction data
  const [packages, setPackages] = useState([]); // Will hold all attractions
  const [allPackages, setAllPackages] = useState([]); // Backup of all attractions
  const [tour_category, setTour_category] = useState([]); // Will hold attraction categories

  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([10, 1000]); // Example for attractions
  const [durationRange, setDurationRange] = useState([1, 8]); // Example for attractions (e.g., hours)
  const [isToggled, setIsToggled] = useState(false);
  const firstBreakPoints = { 350: 1, 750: 2, 1200: 2, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 2, 1500: 3 };
  const [filteredPackages, setFilteredPackages] = useState([]); // Will hold filtered attractions
  const [selectedItems, setSelectedItems] = useState({});
  // const [filteredByAccordion, setFilteredByAccordion] = useState([]); // This state can be removed if applyAllFilters handles it directly

  const [bestPicked, setBestpicked] = useState([]); // Will hold top attractions
  const [lesserWonders, setLesserWonders] = useState([]); // Will hold unique attractions/experiences
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleToggle = () => setIsToggled(!isToggled);
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);

  const clearPriceFilter = () => {
    setPriceRange([10, 1000]); /* applyAllFilters will be called by useEffect */
  };
  const clearDurationFilter = () => {
    setDurationRange([1, 8]); /* applyAllFilters will be called by useEffect */
  };

  // Accordion data: Tailor titles, endpoints, and filterParams for attractions
  const [accordionData, setAccordionData] = useState([
    {
      title: "ACTIVITIES",
      items: [],
      apiEndpoint: "activities",
      filterParam: "activities",
    },
    {
      title: "CULTURAL ACTIVITIES",
      items: [],
      apiEndpoint: "cultural-activities",
      filterParam: "cultural_activities",
    },
    {
      title: "RELAXATION AND REJUVENATION",
      items: [],
      apiEndpoint: "rejuvenations",
      filterParam: "rejuvenations",
    },
    {
      title: "FILTER BY STAY",
      items: [],
      apiEndpoint: "stay-types",
      filterParam: "stay_types",
    },
    {
      title: "TRAVEL STYLE",
      items: [],
      apiEndpoint: "travel-styles",
      filterParam: "travel_styles",
    },
    {
      title: "GEOGRAPHY",
      items: [],
      apiEndpoint: "geographies",
      filterParam: "geographies",
    },
  ]);

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
                id: item.id ?? `${section.filterParam}-${itemIndex}`, // Use filterParam for uniqueness
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
  }, []); // Fetch accordion items once

  useEffect(() => {
    const fetchTopAttractions = async () => {
      // Renamed function internally
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/get-top-attractions`, // ATTRACTION Endpoint
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const fetchedData = (response.data?.data || response.data || []).map(
          (item, index) => ({
            ...item,
            id: item.id ?? `top-attraction-${index}`,
          })
        );
        setBestpicked(fetchedData); // Populating bestPicked state
      } catch (err) {
        setError("Failed to fetch top attractions.");
      }
    };
    fetchTopAttractions();
  }, []);

  useEffect(() => {
    const fetchUniqueAttractions = async () => {
      // Renamed function internally
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/get-lesser-known-attractions` // ATTRACTION Endpoint with example query
        );
        const fetchedData = (response.data.data || response.data || []).map(
          (item, index) => ({
            ...item,
            id: item.id ?? `unique-attraction-${index}`,
          })
        );
        console.log("🚀 ~ fetchUniqueAttractions ~ fetchedData:", fetchedData);
        setLesserWonders(fetchedData); // Populating lesserWonders state
      } catch (err) {
        setError("Failed to fetch unique attractions.");
      }
    };
    fetchUniqueAttractions();
  }, []);

  useEffect(() => {
    const fetchAllAttractions = async () => {
      // Renamed function internally
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions`, // ATTRACTION Endpoint
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const fetchedData = (response.data.data || response.data || []).map(
          (item, index) => ({
            ...item,
            id: item.id ?? `attraction-${index}`,
          })
        );
        setPackages(fetchedData); // Populating 'packages' state with attractions
        setAllPackages(fetchedData); // Populating 'allPackages' with attractions
      } catch (err) {
        setError("Failed to fetch attractions.");
      }
    };
    fetchAllAttractions();
  }, []);

  useEffect(() => {
    const fetchAttraction_Categories = async () => {
      // Renamed function internally
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attraction-categories`, // ATTRACTION Category Endpoint
          { headers: authToken ? { Authorization: `Bearer ${authToken}` } : {} }
        );
        const allData = (response.data.data || response.data || []).map(
          (category, index) => ({
            ...category,
            id: category.id ?? `attractioncategory-${index}`,
          })
        );
        setTour_category(allData); // Populating 'tour_category' state with attraction categories
      } catch (err) {
        setError("Failed to fetch attraction categories.");
      }
    };
    fetchAttraction_Categories();
  }, []);

  const applyAllFilters = () => {
    let attractionsToFilter = allPackages; // Start with all fetched attractions

    // Apply accordion filters
    if (Object.keys(selectedItems).length > 0) {
      attractionsToFilter = attractionsToFilter.filter((item) => {
        return Object.entries(selectedItems).every(
          ([sectionTitle, selectedIds]) => {
            if (!selectedIds || selectedIds.length === 0) return true;
            const sectionConfig = accordionData.find(
              (s) => s.title === sectionTitle
            );
            if (!sectionConfig) return true;

            // How the item's property (that matches filterParam) is structured.
            // e.g., item.country_id, item.attraction_type_ids (array), item.city.id (nested object)
            let itemValue = item[sectionConfig.filterParam];

            // Handle nested properties like item.country.id
            if (sectionConfig.filterParam.includes(".")) {
              const parts = sectionConfig.filterParam.split(".");
              itemValue = item;
              for (const part of parts) {
                itemValue = itemValue?.[part];
                if (itemValue === undefined) break;
              }
            }

            if (Array.isArray(itemValue)) {
              // If item's property is an array (e.g., multiple types/tags)
              return selectedIds.some(
                (id) =>
                  itemValue.includes(id) ||
                  itemValue.some((v) => String(v.id || v) === String(id))
              );
            } else {
              // If item's property is a single value (e.g., country_id)
              return selectedIds.includes(String(itemValue));
            }
          }
        );
      });
    }

    // Apply price and duration filters
    const filtered = attractionsToFilter.filter((item) => {
      if (!item) return false;
      // IMPORTANT: Adjust these field names to match your attraction data object structure
      const price = parseFloat(
        item.price || item.entry_fee || item.adult_price || 0
      );
      const duration = parseFloat(
        item.duration_hours || item.suggested_duration || 0
      ); // e.g., in hours

      return (
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        duration >= durationRange[0] &&
        duration <= durationRange[1]
      );
    });

    setNoResultsFound(
      filtered.length === 0 &&
        (Object.keys(selectedItems).length > 0 ||
          priceRange[0] !== 10 ||
          priceRange[1] !== 1000 ||
          durationRange[0] !== 1 ||
          durationRange[1] !== 8)
    );
    setFilteredPackages(filtered); // This state will hold the final list for display
  };

  useEffect(() => {
    // Apply filters whenever price, duration, selectedItems, or allPackages change
    // Only run if allPackages has been populated to avoid filtering an empty initial array
    if (allPackages.length > 0 || Object.keys(selectedItems).length > 0) {
      applyAllFilters();
    }
  }, [priceRange, durationRange, selectedItems, allPackages]);

  const handleAccordionItemClick = (sectionIndex, itemId) => {
    const newSelectedItems = { ...selectedItems };
    const section = accordionData[sectionIndex];
    const sectionTitleKey = section.title; // Use title as the key in selectedItems

    const currentSelections = newSelectedItems[sectionTitleKey] || [];

    if (section.filterParam === "country_id") {
      // Example: If country is single-select
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
    // applyAllFilters will be called by the useEffect watching selectedItems
  };

  const handleSearch = () => {
    applyAllFilters();
    if (isToggled) setIsToggled(false);
  };
  const clearAllFilters = () => {
    setPriceRange([10, 1000]);
    setDurationRange([1, 8]);
    setSelectedItems({});
    // setFilteredPackages(allPackages); // Reset to all attractions, applyAllFilters will refine
    setNoResultsFound(false);
    // applyAllFilters will be called by useEffect
  };

  // Determine which set of attractions/packages to display
  const displayItems =
    Object.keys(selectedItems).length > 0 ||
    priceRange[0] !== 10 ||
    priceRange[1] !== 1000 ||
    durationRange[0] !== 1 ||
    durationRange[1] !== 8
      ? filteredPackages
      : allPackages;

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
              <LuMenu />   FILTER
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
              >
                Search Attractions
              </button>
            </div>

            {/* Right Content Panel */}
            <div
              className={`${style["right"]} ${
                isToggled ? style["filter-full-width"] : ""
              }`}
            >
              <h3>Attractions</h3>
              {error && <div className="alert alert-danger">{error}</div>}
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
                // Using TourPackageTab but passing attraction data
                <TourPackageTab
                  tour_category={tour_category} // This should now be attractionCategories
                  packages={displayItems} // This should now be displayAttractions
                  breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                  type="attractions"
                />
              )}

              <div className="mt-5">
                <FeaturedIntegratedTravel type="attractions" />
              </div>

              <section className={`${style["pakage-bes-picked"]} mt-5`}>
                <div className="container-fluid">
                  {bestPicked.length > 0 && ( // Using bestPicked state (which holds top attractions)
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Best Picked For You</h3>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          bestPicked={bestPicked} // Passing top attractions as bestPicked
                          count={4}
                          type="tour-bestPicked" // Keep type if Carousal logic depends on it
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className={`${style["pakage-bes-picked"]} mt-5`}>
                <div className="container p-0">
                  {lesserWonders.length > 0 && ( // Using lesserWonders state (which holds unique attractions)
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Lesser-Known Wonders</h3>
                        <p className="text-center">
                          Explore hidden gems and one-of-a-kind activities.
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          wonders={lesserWonders} // Passing unique attractions as wonders
                          count={3}
                          type="tour-wonders" // Keep type if Carousal logic depends on it
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
                      {/* HolidaysTab might need to be adapted or replaced if its internal logic is too holiday-specific */}
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
