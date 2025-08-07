"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Range } from "react-range";
import { LuMenu } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Carousal from "../../../components/carousel/Carousal";
import HolidaysTab from "../../../components/tour-package/holidays-tab";
import Accordion from "../../../components/accordion/accordion";
import TourPackageTab from "../../../components/tour-package/tour-package-tab";
import FeaturedIntegratedTravel from "@components/tour-package/featured-integrated-travel";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const TourPackage = () => {
  const { setIsLoading } = useLoading(); // 2. USE THE LOADER HOOK

  // --- STATE MANAGEMENT ---
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [error, setError] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [priceRange, setPriceRange] = useState([30, 10000]);
  const [durationRange, setDurationRange] = useState([1, 30]);
  const debouncedPriceRange = useDebounce(priceRange, 300);
  const debouncedDurationRange = useDebounce(durationRange, 300);
  const [selectedItems, setSelectedItems] = useState({});
  const [lastApiFilteredPackages, setLastApiFilteredPackages] = useState(null);
  const [tour_category, setTour_category] = useState([]);
  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);

  const accordionDataConfig = useMemo(
    () => [
      {
        title: "ACTIVITIES",
        apiEndpoint: "activities",
        filterParam: "activities",
      },
      {
        title: "CULTURAL ACTIVITIES",
        apiEndpoint: "cultural-activities",
        filterParam: "cultural_activities",
      },
      {
        title: "RELAXATION AND REJUVENATION",
        apiEndpoint: "relaxation-rejuvenations",
        filterParam: "rejuvenations",
      },
      {
        title: "FILTER BY STAY",
        apiEndpoint: "stay-type",
        filterParam: "stay_types",
      },
      {
        title: "TRAVEL STYLE",
        apiEndpoint: "travel-style",
        filterParam: "travel_styles",
      },
      {
        title: "GEOGRAPHY",
        apiEndpoint: "geographies",
        filterParam: "geographies",
      },
      { title: "COUNTRY", apiEndpoint: "countries", filterParam: "country" },
    ],
    []
  );
  const [accordionData, setAccordionData] = useState(
    accordionDataConfig.map((d) => ({ ...d, items: [] }))
  );

  const firstBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 3 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 2, 1400: 3 };
  const clearPriceFilter = () => setPriceRange([30, 10000]);
  const clearDurationFilter = () => setDurationRange([1, 30]);

  const handleToggle = () => setIsToggled(!isToggled);
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);
  const getAuthToken = () =>
    localStorage.getItem("auth_token_login") ||
    localStorage.getItem("auth_token_register");

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
            console.error(
              `Failed to fetch accordion items for ${section.title}:`,
              err
            );
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
  }, [accordionDataConfig]);

  // EFFECT 2: Fetch initial page data (Packages, Categories, etc.)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); //  <-- SHOW LOADER
      setError(null);
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
        setAllPackages(fetchedPackages);
        setFilteredPackages(fetchedPackages);
        setTour_category(tourCategoryRes.data.data || []);
        setBestpicked(bestPickedRes.data || []);
        setLesserWonders(lesserWondersRes.data || []);
      } catch (err) {
        setError("Failed to fetch initial page data. Please try again.");
        console.error("Data fetch error:", err);
      } finally {
        setIsLoading(false); // <-- HIDE LOADER
      }
    };
    fetchData();
  }, [setIsLoading]); // Add setIsLoading to dependency array

  // EFFECT 3: Unified filtering effect (no change here)
  useEffect(() => {
    const applyFilters = async () => {
      // This is not the main page load, so we use a local state
      // instead of the global setIsLoading.
      setError(null);
      setNoResultsFound(false);

      const authToken = getAuthToken();
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
      const queryParts = [];
      let needsApiCall = false;

      for (const sectionTitle in selectedItems) {
        const section = accordionData.find(
          (item) => item.title === sectionTitle
        );
        if (section && section.filterParam && section.title !== "COUNTRY") {
          needsApiCall = true;
          selectedItems[sectionTitle].forEach((itemId) => {
            queryParts.push(`${section.filterParam}[]=${itemId}`);
          });
        }
      }

      let basePackages = allPackages;

      if (needsApiCall) {
        const queryString = queryParts.join("&");
        const url = `${process.env.NEXT_PUBLIC_API_URL}packages?${queryString}`;
        try {
          const response = await axios.get(url, { headers });
          basePackages = response.data.data || [];
          setLastApiFilteredPackages(basePackages);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            basePackages = [];
          } else {
            setError("Failed to fetch filtered packages.");
            basePackages = [];
          }
        }
      } else if (lastApiFilteredPackages !== null) {
        basePackages = allPackages;
        setLastApiFilteredPackages(null);
      }

      const locallyFiltered = basePackages.filter((pkg) => {
        if (!pkg) return false;
        const adultPrice = parseFloat(pkg.adult_price) || 0;
        const duration = parseInt(pkg.number_of_days, 10) || 0;
        const matchesPrice =
          adultPrice >= debouncedPriceRange[0] &&
          adultPrice <= debouncedPriceRange[1];
        const matchesDuration =
          duration >= debouncedDurationRange[0] &&
          duration <= debouncedDurationRange[1];
        const countryIdFilter = selectedItems["COUNTRY"]?.[0];
        const matchesCountry = countryIdFilter
          ? pkg.country_id === countryIdFilter
          : true;
        return matchesPrice && matchesDuration && matchesCountry;
      });

      setFilteredPackages(locallyFiltered);

      const hasActiveFilters =
        Object.keys(selectedItems).length > 0 ||
        priceRange[0] !== 30 ||
        priceRange[1] !== 10000 ||
        durationRange[0] !== 1 ||
        durationRange[1] !== 30;
      if (locallyFiltered.length === 0 && hasActiveFilters) {
        setNoResultsFound(true);
      }
    };

    if (allPackages.length > 0) {
      applyFilters();
    }
  }, [
    debouncedPriceRange,
    debouncedDurationRange,
    selectedItems,
    allPackages,
    accordionData,
    lastApiFilteredPackages,
  ]);

  const handleAccordionItemClick = useCallback(
    (sectionIndex, itemId) => {
      const sectionTitle = accordionData[sectionIndex].title;
      setSelectedItems((currentSelected) => {
        const newSelectedItems = { ...currentSelected };
        const currentSelections = newSelectedItems[sectionTitle] || [];
        if (sectionTitle === "COUNTRY") {
          newSelectedItems[sectionTitle] = currentSelections.includes(itemId)
            ? []
            : [itemId];
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
    },
    [accordionData]
  );

  const clearAllFilters = () => {
    setPriceRange([30, 10000]);
    setDurationRange([1, 30]);
    setSelectedItems({});
    setLastApiFilteredPackages(null);
    setFilteredPackages(allPackages);
    setNoResultsFound(false);
    setError(null);
  };

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  // The global loader will be active, so we don't need to show a local loading message.
  // The content will render once the loader is hidden.

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
                    max={10000}
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
                    Price Range: AED {priceRange[0]} — AED {priceRange[1]}
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
                  <div className="d-flex justify-content-between align-items-center mt-2">
                                      <p className="mb-0" style={{ fontSize: "0.9em" }}>
                    Days: {durationRange[0]} — {durationRange[1]} Days
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
                      key={accordion.title}
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
                    className={`${style["btn-one"]} my-3 btn btn-secondary col-md-12 col-sm-3 col-12`}
                    onClick={clearAllFilters}
                  >
                    Clear ALL Filters
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
                className={`${style["btn-one"]} ${style["btn-mobile"]} col-md-12 col-sm-3 col-12`}
                onClick={handleToggle}
              >
                Apply
              </button>
            </div>

            {/* Right Side - Content */}
            <div
              className={`${style["right"]} ${
                isToggled ? style["filter-full-width"] : ""
              }`}
            >
              <h3>Tour Packages</h3>
              {noResultsFound ? (
                <div className={style["no-results"]}>
                  <h4 className="text-black">No packages found matching your criteria</h4>
                  <p className="text-black">
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
                  packages={filteredPackages}
                  breakPoints={isToggled ? firstBreakPoints : secondBreakPoints}
                />
              )}
              <div>
                <FeaturedIntegratedTravel type="package" />
              </div>
              <div
                className="d-flex flex-column flex-md-row justify-content-md-between align-items-center px-3 px-md-4 py-3 gap-3 gap-md-0"
                style={{
                  backgroundColor: "#009597",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <div className="d-flex align-items-center justify-content-center justify-content-md-start w-100 w-md-auto">
                  <div className="me-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="text-center text-md-start">
                    <div style={{ fontSize: "12px", opacity: "0.9" }}>
                      CALL NOW
                    </div>
                    <div style={{ fontSize: "13px", opacity: "0.9" }}>
                      for free consultation
                    </div>
                  </div>
                  <Link
                    className="ms-3 text-white text-decoration-none"
                    href={"tel:+5869585545"}
                    style={{ fontSize: "16px", fontWeight: "600" }}
                  >
                    : +586 958 5545
                  </Link>
                </div>
                <div
                  className="px-3 py-2 d-none d-md-flex justify-content-center"
                  style={{
                    backgroundColor: "#328EA8",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "50%",
                    minWidth: "40px",
                    textAlign: "center",
                  }}
                >
                  OR
                </div>
                <div
                  className="d-md-none w-100 text-center"
                  style={{ fontSize: "12px", opacity: "0.7" }}
                >
                  ───── OR ─────
                </div>
                <div className="d-flex align-items-center justify-content-center justify-content-md-end w-100 w-md-auto">
                  <div className="me-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="text-center text-md-start">
                    <div style={{ fontSize: "12px", opacity: "0.9" }}>
                      MAIL US NOW
                    </div>
                    <div style={{ fontSize: "13px", opacity: "0.9" }}>
                      for free consultation
                    </div>
                  </div>
                  <Link
                    href={"mailto:info@consultqid.com"}
                    className="ms-3 text-white text-decoration-none"
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      wordBreak: "break-all",
                    }}
                  >
                    : info@consultqid.com
                  </Link>
                </div>
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
                  <button className={style["btn-one"]}>
                    <Link href="/tour-package" style={{ color: "white" }}>
                      Full List
                    </Link>
                  </button>
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
