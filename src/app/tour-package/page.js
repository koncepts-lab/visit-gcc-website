"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Range } from "react-range";
import { LuMenu } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Carousal from "../../../components/carousel/Carousal";
import HolidaysTab from "../../../components/tour-package/holidays-tab";
import Accordion from "../../../components/accordion/accordion";
import TourPackageTab from "../../../components/tour-package/tour-package-tab";
import FeaturedIntegratedTravel from "@components/tour-package/featured-integrated-travel";

// --- KEY IMPROVEMENT 1: Create a Debounce Hook ---
// This hook takes a value and a delay, and only returns the latest value
// after the specified delay has passed without the value changing.
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the value changes again
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};


const TourPackage = () => {
  // --- STATE MANAGEMENT ---

  // Package data states
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  // UI and loading states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);

  // --- KEY IMPROVEMENT 2: Separate "Live" and "Debounced" Filter State ---
  // `priceRange` updates instantly for the UI text.
  // `debouncedPriceRange` updates after a delay and is used for actual filtering.
  const [priceRange, setPriceRange] = useState([30, 10000]);
  const [durationRange, setDurationRange] = useState([1, 30]);
  const debouncedPriceRange = useDebounce(priceRange, 300); // 300ms delay
  const debouncedDurationRange = useDebounce(durationRange, 300); // 300ms delay

  const [selectedItems, setSelectedItems] = useState({});
  const [lastApiFilteredPackages, setLastApiFilteredPackages] = useState(null); // Store API results separately

  // Static/Carousel data states
  const [tour_category, setTour_category] = useState([]);
  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);

  // Accordion data configuration (memoized to prevent re-creation on renders)
  const accordionDataConfig = useMemo(() => [
    { title: "ACTIVITIES", apiEndpoint: "activities", filterParam: "activities" },
    { title: "CULTURAL ACTIVITIES", apiEndpoint: "cultural-activities", filterParam: "cultural_activities" },
    { title: "RELAXATION AND REJUVENATION", apiEndpoint: "relaxation-rejuvenations", filterParam: "rejuvenations" },
    { title: "FILTER BY STAY", apiEndpoint: "stay-type", filterParam: "stay_types" },
    { title: "TRAVEL STYLE", apiEndpoint: "travel-style", filterParam: "travel_styles" },
    { title: "GEOGRAPHY", apiEndpoint: "geographies", filterParam: "geographies" },
    { title: "COUNTRY", apiEndpoint: "countries", filterParam: "country" },
  ], []);
  const [accordionData, setAccordionData] = useState(accordionDataConfig.map(d => ({ ...d, items: [] })));

  // Carousel responsive breakpoints
  const firstBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 3 };

  // --- HANDLERS AND HELPERS ---

  const handleToggle = () => setIsToggled(!isToggled);
  // These now only update the "live" state, the debounce hook handles the rest.
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);
  const getAuthToken = () =>
    localStorage.getItem("auth_token_login") ||
    localStorage.getItem("auth_token_register");


  // --- DATA FETCHING AND LOGIC (useEffect Hooks) ---

  // EFFECT 1: Fetch data for accordion filters on initial mount
  useEffect(() => {
    const fetchAllAccordionData = async () => {
      const authToken = getAuthToken();
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      try {
        const promises = accordionDataConfig.map(async (section) => {
          if (!section.apiEndpoint) return { ...section, items: [] };
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`,
              { headers }
            );
            const items = response.data.data || response.data || [];
            const formattedItems = Array.isArray(items)
              ? items.map((item) => ({
                  id: item.uuid_id || item.id,
                  title: item.title || item.name || "Unknown",
                }))
              : [];
            return { ...section, items: formattedItems };
          } catch (err) {
            console.error(`Failed to fetch accordion items for ${section.title}:`, err);
            return { ...section, items: [] };
          }
        });
        const newAccordionData = await Promise.all(promises);
        setAccordionData(newAccordionData);
      } catch (error) {
        console.error("Error fetching accordion data:", error);
      }
    };
    fetchAllAccordionData();
  }, [accordionDataConfig]); // Depends on the stable memoized config

  // EFFECT 2: Fetch initial page data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const authToken = getAuthToken();
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      try {
        const [packagesRes, tourCategoryRes, bestPickedRes, lesserWondersRes] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}tour-categories`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages/get-top-packages`, { headers }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages/get-lesser-known-packages`, { headers }),
          ]);

        const fetchedPackages = packagesRes.data.data || [];
        setAllPackages(fetchedPackages);
        setFilteredPackages(fetchedPackages);

        setTour_category(tourCategoryRes.data.data || []);
        setBestpicked(bestPickedRes.data || []);

        setLesserWonders(lesserWondersRes.data || []);
      } catch (err) {
        setError("Failed to fetch initial page data. Please try again.");
        console.error("Data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // Runs only once

  // --- KEY IMPROVEMENT 3: A single, unified filtering effect ---
  // This effect runs ONLY when the debounced sliders or accordion selections change.
  // It orchestrates both API calls and local filtering efficiently.
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      setError(null);
      setNoResultsFound(false);

      const authToken = getAuthToken();
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const queryParts = [];
      let needsApiCall = false;

      // Build query string for API filtering (excluding Country, Price, Duration)
      for (const sectionTitle in selectedItems) {
        const section = accordionData.find((item) => item.title === sectionTitle);
        if (section && section.filterParam && section.title !== "COUNTRY") {
          needsApiCall = true;
          selectedItems[sectionTitle].forEach((itemId) => {
            queryParts.push(`${section.filterParam}[]=${itemId}`);
          });
        }
      }

      let basePackages = allPackages; // Start with all packages by default

      // If API filters are active, fetch new data from the server
      if (needsApiCall) {
        const queryString = queryParts.join("&");
        const url = `${process.env.NEXT_PUBLIC_API_URL}packages?${queryString}`;
        try {
          const response = await axios.get(url, { headers });
          basePackages = response.data.data || [];
          setLastApiFilteredPackages(basePackages); // Cache the API result
        } catch (err) {
          if (err.response && err.response.status === 404) {
            basePackages = [];
          } else {
            setError("Failed to fetch filtered packages.");
            console.error("Filter error:", err);
            basePackages = [];
          }
        }
      } else if (lastApiFilteredPackages !== null) {
        // If API filters were just cleared, revert to the full list.
        basePackages = allPackages;
        setLastApiFilteredPackages(null);
      }
      
      // --- Apply local filters (Price, Duration, Country) on the `basePackages` ---
      // This part is now very fast as it runs on a pre-filtered list (if applicable)
      // and only after the user stops interacting with the controls.
      const locallyFiltered = basePackages.filter((pkg) => {
        if (!pkg) return false;
        const adultPrice = parseFloat(pkg.adult_price) || 0;
        const duration = parseInt(pkg.number_of_days, 10) || 0;

        const matchesPrice = adultPrice >= debouncedPriceRange[0] && adultPrice <= debouncedPriceRange[1];
        const matchesDuration = duration >= debouncedDurationRange[0] && duration <= debouncedDurationRange[1];
        
        const countryIdFilter = selectedItems["COUNTRY"]?.[0];
        const matchesCountry = countryIdFilter ? pkg.country_id === countryIdFilter : true;
        
        return matchesPrice && matchesDuration && matchesCountry;
      });

      setFilteredPackages(locallyFiltered);

      const hasActiveFilters = Object.keys(selectedItems).length > 0 ||
        priceRange[0] !== 30 || priceRange[1] !== 10000 ||
        durationRange[0] !== 1 || durationRange[1] !== 30;

      if (locallyFiltered.length === 0 && hasActiveFilters) {
        setNoResultsFound(true);
      }

      setIsLoading(false);
    };
    
    // Don't run this effect during the initial data load.
    if (!isLoading && allPackages.length > 0) {
      applyFilters();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceRange, debouncedDurationRange, selectedItems, allPackages]);


  // Handles clicking an item in any accordion filter
  const handleAccordionItemClick = useCallback((sectionIndex, itemId) => {
    // This function is now much simpler. It just updates state.
    // The main useEffect will handle the filtering logic.
    const sectionTitle = accordionData[sectionIndex].title;
    setSelectedItems(currentSelected => {
      const newSelectedItems = { ...currentSelected };
      const currentSelections = newSelectedItems[sectionTitle] || [];

      if (sectionTitle === "COUNTRY") {
        newSelectedItems[sectionTitle] = currentSelections.includes(itemId) ? [] : [itemId];
      } else {
        newSelectedItems[sectionTitle] = currentSelections.includes(itemId)
          ? currentSelections.filter((id) => id !== itemId)
          : [...currentSelections, itemId];
      }
      
      if (newSelectedItems[sectionTitle]?.length === 0) {
        delete newSelectedItems[sectionTitle];
      }
      
      return newSelectedItems;
    });
  }, [accordionData]);

  const clearAllFilters = () => {
    setPriceRange([30, 10000]);
    setDurationRange([1, 30]);
    setSelectedItems({});
    setLastApiFilteredPackages(null);
    setFilteredPackages(allPackages); // Reset to all packages
    setNoResultsFound(false);
    setError(null);
  };

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
            {/* Left Side - Filters */}
            <div className={`${style["left"]} ${isToggled ? style["highlight"] : ""}`}>
              <div className={style["package-filter"]}>
                <div className={style["filter-header"]}>
                  <h4 className="pt-2">Price Range</h4>
                </div>
                {/* --- The Range component now updates the "live" state --- */}
                <div className={style["price-range"]}>
                  <Range
                    step={100} min={30} max={10000}
                    values={priceRange}
                    onChange={handlePriceRangeChange}
                    renderTrack={({ props, children }) => (<div {...props} style={{...props.style, height: "6px", width: "100%", backgroundColor: "#ccc"}}>{children}</div>)}
                    renderThumb={({ props }) => (<div {...props} style={{...props.style, height: "24px", width: "24px", borderRadius: "50%", border: "solid 3px #41a6ab", backgroundColor: "#fff"}}/>)}
                  />
                  <p>Price Range: ${priceRange[0]} — ${priceRange[1]}</p>
                </div>

                <div className={style["filter-header"]}><h4>Duration</h4></div>
                <div className={style["duration-range"]}>
                  <Range
                    step={1} min={1} max={30}
                    values={durationRange}
                    onChange={handleDurationRangeChange}
                    renderTrack={({ props, children }) => (<div {...props} style={{...props.style, height: "6px", width: "100%", backgroundColor: "#ccc"}}>{children}</div>)}
                    renderThumb={({ props }) => (<div {...props} style={{...props.style, height: "24px", width: "24px", borderRadius: "50%", border: "solid 3px #41a6ab", backgroundColor: "#fff"}}/>)}
                  />
                  <p>Days: {durationRange[0]} — {durationRange[1]} Days</p>
                </div>
                
                <div className={style["accordion-range"]}>
                  {accordionData.map((accordion, index) => (
                    <Accordion
                      key={accordion.title}
                      title={accordion.title}
                      items={accordion.items || []}
                      isOpenInitially={true}
                      onItemClick={(itemId) => handleAccordionItemClick(index, itemId)}
                      selectedItems={selectedItems[accordion.title] || []}
                    />
                  ))}
                </div>

                <div className={style["filter-buttons"]}>
                  <button className={`${style["btn-one"]} mt-3`} onClick={clearAllFilters}>Clear Filters</button>
                </div>
                <button className={`${style["btn-toggle"]} ${style["btn-close"]}`} onClick={handleToggle}><IoIosCloseCircleOutline /></button>
              </div>
              <button className={`${style["btn-one"]} ${style["btn-mobile"]}`} onClick={handleToggle}>Apply</button>
            </div>

            {/* Right Side - Content */}
            <div className={`${style["right"]} ${isToggled ? style["filter-full-width"] : ""}`}>
              <h3>Tour Packages</h3>
              {isLoading ? (
                <p>Loading packages...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : noResultsFound ? (
                <div className={style["no-results"]}>
                  <h4>No packages found matching your criteria</h4>
                  <p>Please try adjusting your selections or clear the filters.</p>
                  <button className={style["btn-one"]} onClick={clearAllFilters}>Clear All Filters</button>
                </div>
              ) : (
                <TourPackageTab
                  tour_category={tour_category}
                  packages={filteredPackages} // This is always the correct list to display
                  breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                />
              )}

              <div><FeaturedIntegratedTravel type="package"/></div>

              {bestPicked.length > 0 && (
                <section className={style["pakage-bes-picked"]}>
                  <div className="container-fluid">
                    <h3 className="pb-3">Best picked for you</h3>
                    <Carousal bestPicked={bestPicked} count={4} type="tour-bestPicked" />
                  </div>
                </section>
              )}

              {lesserWonders.length > 0 && (
                <section className={style["pakage-bes-picked"]}>
                  <h3 className="pb-3">Lesser-Known Wonders</h3>
                  <Carousal wonders={lesserWonders} count={3} type="tour-wonders"/>
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