"use client";
import React, { useState, useEffect, useCallback } from "react";
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

const TourPackage = () => {
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [tour_category, setTour_category] = useState([]);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([30, 8000]);
  const [durationRange, setDurationRange] = useState([1, 30]); // Expanded max duration
  const [isToggled, setIsToggled] = useState(false);
  const firstBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 3 };

  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [isApiFiltered, setIsApiFiltered] = useState(false); // Track if API filtering is active

  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      apiEndpoint: "relaxation-rejuvenations",
      filterParam: "rejuvenations",
    },
    {
      title: "FILTER BY STAY",
      items: [],
      apiEndpoint: "stay-type",
      filterParam: "stay_types",
    },
    {
      title: "TRAVEL STYLE",
      items: [],
      apiEndpoint: "travel-style",
      filterParam: "travel_styles",
    },
    {
      title: "GEOGRAPHY",
      items: [],
      apiEndpoint: "geographies",
      filterParam: "geographies",
    },
    {
      title: "COUNTRY",
      items: [],
      apiEndpoint: "countries",
      filterParam: "country",
    },
  ]);

  const handleToggle = () => setIsToggled(!isToggled);
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);

  const getAuthToken = () =>
    localStorage.getItem("auth_token_login") ||
    localStorage.getItem("auth_token_register");

  // *** FIXED: Use Promise.all for efficient and reliable data fetching for accordions
  useEffect(() => {
    const fetchAllAccordionData = async () => {
      const authToken = getAuthToken();
      try {
        const promises = accordionData.map(async (section) => {
          if (!section.apiEndpoint) return section;
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`,
              {
                headers: authToken
                  ? { Authorization: `Bearer ${authToken}` }
                  : {},
              }
            );
            const items = response.data.data || response.data || [];
            const formattedItems = Array.isArray(items)
              ? items.map((item) => ({
                  id: item.id,
                  title: item.title || item.name || "Unknown",
                }))
              : [];
            return { ...section, items: formattedItems };
          } catch (err) {
            console.error(
              `Failed to fetch accordion items for ${section.title}:`,
              err
            );
            return section; // Return original section on error
          }
        });
        const newAccordionData = await Promise.all(promises);
        setAccordionData(newAccordionData);
      } catch (error) {
        console.error("Error fetching accordion data:", error);
      }
    };
    fetchAllAccordionData();
  }, []); // Run only once on mount

  // Fetch initial and static data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const authToken = getAuthToken();
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      try {
        const [packagesRes, tourCategoryRes, bestPickedRes, lesserWondersRes] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}tour-categories`, {
              headers,
            }),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}packages/get-top-packages`,
              { headers }
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}packages/get-lesser-known-packages`,
              { headers }
            ),
          ]);

        const fetchedPackages = packagesRes.data.data || [];
        setPackages(fetchedPackages);
        setAllPackages(fetchedPackages);
        setFilteredPackages(fetchedPackages); // Initially, show all

        setTour_category(tourCategoryRes.data.data || []);
        setBestpicked(bestPickedRes.data.data || []);
        setLesserWonders(lesserWondersRes.data.data || []);
      } catch (err) {
        setError("Failed to fetch initial page data. Please try again.");
        console.error("Data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyAllFilters = useCallback(
    (basePackages) => {
      let packagesToFilter =
        basePackages || (isApiFiltered ? filteredPackages : allPackages);

      if (!Array.isArray(packagesToFilter)) {
        packagesToFilter = [];
      }

      const filtered = packagesToFilter.filter((pkg) => {
        if (!pkg) return false;
        const adultPrice = parseFloat(pkg.adult_price) || 0;
        const duration = parseInt(pkg.number_of_days, 10) || 0;

        // *** FIXED: Correct country filter logic
        const countryIdFilter = selectedItems["COUNTRY"]?.[0];
        const matchesCountry = countryIdFilter
          ? pkg.country_id === countryIdFilter
          : true;

        return (
          adultPrice >= priceRange[0] &&
          adultPrice <= priceRange[1] &&
          duration >= durationRange[0] &&
          duration <= durationRange[1] &&
          matchesCountry
        );
      });

      setFilteredPackages(filtered);
      setNoResultsFound(filtered.length === 0);
    },
    [
      allPackages,
      filteredPackages,
      isApiFiltered,
      priceRange,
      durationRange,
      selectedItems,
    ]
  );

  // Effect to re-apply local filters (price/duration) when they change
  useEffect(() => {
    if (!isLoading) {
      applyAllFilters();
    }
  }, [priceRange, durationRange, applyAllFilters, isLoading]);

  const filterPackagesByAccordion = async (currentSelectedItems) => {
    const authToken = getAuthToken();
    const queryParts = [];

    for (const sectionTitle in currentSelectedItems) {
      const section = accordionData.find((item) => item.title === sectionTitle);
      if (section && section.filterParam && section.title !== "COUNTRY") {
        // Exclude country from API call
        currentSelectedItems[sectionTitle].forEach((itemId) => {
          queryParts.push(`${section.filterParam}[]=${itemId}`);
        });
      }
    }

    // If only the country filter is selected, don't make an API call.
    // Let the local `applyAllFilters` handle it.
    if (queryParts.length === 0) {
      setIsApiFiltered(false);
      applyAllFilters(allPackages); // Apply filters to the full list
      return;
    }

    setIsApiFiltered(true);
    const queryString = queryParts.join("&");
    const url = `${process.env.NEXT_PUBLIC_API_URL}packages?${queryString}`;

    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(url, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });
      const apiFilteredPackages = response.data.data || [];
      applyAllFilters(apiFilteredPackages); // Apply all filters on the new API results
    } catch (err) {
      // *** FIXED: Handle 404 specifically as "No Results"
      if (err.response && err.response.status === 404) {
        setFilteredPackages([]);
        setNoResultsFound(true);
      } else {
        setError("Failed to fetch filtered packages.");
        console.error("Filter error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccordionItemClick = (sectionIndex, itemId) => {
    const newSelectedItems = { ...selectedItems };
    const sectionTitle = accordionData[sectionIndex].title;
    const currentSelections = newSelectedItems[sectionTitle] || [];

    if (sectionTitle === "COUNTRY") {
      newSelectedItems[sectionTitle] = currentSelections.includes(itemId)
        ? []
        : [itemId];
    } else {
      if (currentSelections.includes(itemId)) {
        newSelectedItems[sectionTitle] = currentSelections.filter(
          (id) => id !== itemId
        );
      } else {
        newSelectedItems[sectionTitle] = [...currentSelections, itemId];
      }
    }
    // Cleanup empty arrays
    if (newSelectedItems[sectionTitle]?.length === 0) {
      delete newSelectedItems[sectionTitle];
    }

    setSelectedItems(newSelectedItems);

    // Decide whether to call API or filter locally
    const hasNonCountryApiFilter = Object.keys(newSelectedItems).some(
      (key) => key !== "COUNTRY"
    );

    if (hasNonCountryApiFilter) {
      filterPackagesByAccordion(newSelectedItems);
    } else {
      // If only country filter is active (or no accordion filters), filter locally
      setIsApiFiltered(false);
      applyAllFilters(allPackages);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([30, 8000]);
    setDurationRange([1, 30]);
    setSelectedItems({});
    setIsApiFiltered(false);
    setFilteredPackages(allPackages);
    setNoResultsFound(false);
    setError(null);
  };

  const displayPackages =
    isApiFiltered || noResultsFound || Object.keys(selectedItems).length > 0
      ? filteredPackages
      : allPackages;

  return (
    <>
      <Banner />
      <section className={style["tour-package-page"]}>
        <div className={`container-fluid`}>
          <div className={style["tour-packagebtn-container"]}>
            <button className={style["btn-toggle"]} onClick={handleToggle}>
              <LuMenu /> FILTER
            </button>
          </div>
          <div className={style["tour-package-container"]}>
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
                    step={100}
                    min={30}
                    max={8000}
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
                  <p>
                    Price Range: ${priceRange[0]} — ${priceRange[1]}
                  </p>
                </div>

                <div className={style["filter-header"]}>
                  <h4>Duration</h4>
                </div>
                <div className={style["duration-range"]}>
                  <Range
                    step={1}
                    min={1}
                    max={30}
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
                  <p>
                    Days: {durationRange[0]} — {durationRange[1]} Days
                  </p>
                </div>

                <div className={style["accordion-range"]}>
                  {accordionData.map((accordion, index) => (
                    <Accordion
                      key={accordion.title}
                      title={accordion.title}
                      items={accordion.items || []}
                      isOpenInitially={true}
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
                    Clear Filters
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
                onClick={handleToggle}
              >
                Apply
              </button>
            </div>
            {/* right */}
            <div
              className={`${style["right"]} ${
                isToggled ? style["filter-full-width"] : ""
              }`}
            >
              <h3>Tour Packages</h3>
              {isLoading ? (
                <p>Loading packages...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : noResultsFound ? (
                <div className={style["no-results"]}>
                  <h4>No packages found matching your criteria</h4>
                  <p>
                    Please try adjusting your selections or clear the filters.
                  </p>
                  <button
                    className={style["btn-one"]}
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <TourPackageTab
                  tour_category={tour_category}
                  packages={displayPackages}
                  breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                />
              )}

              <div>
                <FeaturedIntegratedTravel type="package"/>
              </div>

              {bestPicked.length > 0 && (
                <section className={style["pakage-bes-picked"]}>
                  <div className="container-fluid">
                    <h3 className="pb-3">Best picked for you</h3>
                    <Carousal
                      bestPicked={bestPicked}
                      count={4}
                      type="tour-bestPicked"
                    />
                  </div>
                </section>
              )}

              {lesserWonders.length > 0 && (
                <section className={style["pakage-bes-picked"]}>
                  <h3 className="pb-3">Lesser-Known Wonders</h3>
                  <Carousal
                    wonders={lesserWonders}
                    count={3}
                    type="tour-wonders"
                  />
                </section>
              )}

              <section className={style["pakage-bes-picked"]}>
                <h3 className="pb-3">Holidays by theme</h3>
                <HolidaysTab />
                <div className="text-center mt-4">
                  <button className={style["btn-one"]}>Full List</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourPackage;
