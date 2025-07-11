"use client";
import React, { useState, useEffect, useCallback } from "react";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import { Range } from "react-range";
import Carousal from "../../../components/carousel/Carousal";
import HolidaysTab from "../../../components/tour-package/holidays-tab";
import Accordion from "../../../components/accordion/accordion";
import { LuMenu } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import FeaturedIntegratedTravel from "@components/tour-package/featured-integrated-travel";
import EventTab from "@components/tour-package/event-tab";
import Link from "next/link";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

const AttractionsPage = () => {
  const { setIsLoading } = useLoading(); // 2. USE THE LOADER HOOK

  // All your original state declarations remain unchanged
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [tour_category, setTour_category] = useState([]);
  const [error, setError] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [durationRange, setDurationRange] = useState([1, 8]);
  const [selectedItems, setSelectedItems] = useState({});
  const [isToggled, setIsToggled] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
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

  const firstBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 3, 1500: 3 };

  // --- All your handler functions remain unchanged ---
  const handleToggle = () => setIsToggled(!isToggled);
  const handlePriceRangeChange = (values) => setPriceRange(values);
  const handleDurationRangeChange = (values) => setDurationRange(values);
  const clearPriceFilter = () => setPriceRange([10, 1000]);
  const clearDurationFilter = () => setDurationRange([1, 8]);
  const handleAccordionItemClick = (sectionIndex, itemId) => {
    const newSelectedItems = { ...selectedItems };
    const section = accordionData[sectionIndex];
    const sectionTitleKey = section.title;
    const currentSelections = newSelectedItems[sectionTitleKey] || [];

    if (section.filterParam === "country_id") {
      newSelectedItems[sectionTitleKey] =
        currentSelections[0] === itemId ? [] : [itemId];
    } else {
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
  const clearAllFilters = () => {
    setPriceRange([10, 1000]);
    setDurationRange([1, 8]);
    setSelectedItems({});
  };

  const buildQueryParams = useCallback(() => {
    const params = {};
    if (priceRange[0] !== 10 || priceRange[1] !== 1000) {
      params.min_price = priceRange[0];
      params.max_price = priceRange[1];
    }
    if (durationRange[0] !== 1 || durationRange[1] !== 8) {
      params.min_duration = durationRange[0];
      params.max_duration = durationRange[1];
    }
    Object.entries(selectedItems).forEach(([sectionTitle, selectedIds]) => {
      if (selectedIds && selectedIds.length > 0) {
        const sectionConfig = accordionData.find(
          (s) => s.title === sectionTitle
        );
        if (sectionConfig) {
          params[sectionConfig.filterParam] = selectedIds;
        }
      }
    });
    return params;
  }, [priceRange, durationRange, selectedItems, accordionData]);

  // This function is for on-demand filtering, so it uses its own loading state
  const fetchFilteredAttractions = useCallback(async () => {
    setIsFiltering(true);
    setError(null);
    try {
      const filterParams = buildQueryParams();
      const url = `${process.env.NEXT_PUBLIC_API_URL}attractions`;
      const response = await axios.get(url, { params: filterParams });
      const fetchedData = (response.data.data || response.data || []).map(
        (item, index) => ({ ...item, id: item.id ?? `attraction-${index}` })
      );
      setPackages(fetchedData);
      setNoResultsFound(fetchedData.length === 0);
    } catch (err) {
      console.error("Error fetching filtered attractions:", err);
      setError("Failed to apply filters.");
      setPackages([]);
    } finally {
      setIsFiltering(false);
    }
  }, [buildQueryParams]);

  const handleSearch = () => {
    fetchFilteredAttractions();
    if (isToggled) setIsToggled(false);
  };

  // 3. CONSOLIDATED EFFECT FOR INITIAL PAGE LOAD
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Show global loader
      setError(null);

      try {
        const endpoints = {
          attractions: `${process.env.NEXT_PUBLIC_API_URL}attractions`,
          topAttractions: `${process.env.NEXT_PUBLIC_API_URL}attractions/get-top-attractions`,
          lesserWonders: `${process.env.NEXT_PUBLIC_API_URL}attractions/get-lesser-known-attractions`,
          categories: `${process.env.NEXT_PUBLIC_API_URL}att-categories`,
          ...Object.fromEntries(
            accordionData.map((s) => [
              s.filterParam,
              `${process.env.NEXT_PUBLIC_API_URL}${s.apiEndpoint}`,
            ])
          ),
        };

        const responses = await Promise.all(
          Object.values(endpoints).map((url) => axios.get(url))
        );

        const [
          attractionsRes,
          topAttractionsRes,
          lesserWondersRes,
          categoriesRes,
          ...accordionRes
        ] = responses;

        // Process main content
        const allAttractionsData = (
          attractionsRes.data.data ||
          attractionsRes.data ||
          []
        ).map((item, i) => ({ ...item, id: item.id ?? `attraction-${i}` }));
        setPackages(allAttractionsData);
        setAllPackages(allAttractionsData);
        setBestpicked(
          (topAttractionsRes.data?.data || topAttractionsRes.data || []).map(
            (item, i) => ({ ...item, id: item.id ?? `top-attraction-${i}` })
          )
        );
        setLesserWonders(
          (lesserWondersRes.data.data || lesserWondersRes.data || []).map(
            (item, i) => ({ ...item, id: item.id ?? `unique-attraction-${i}` })
          )
        );
        setTour_category(
          (categoriesRes.data.data || categoriesRes.data || []).map(
            (cat, i) => ({ ...cat, id: cat.id ?? `attractioncategory-${i}` })
          )
        );

        // Process accordion data
        const newAccordionData = [...accordionData];
        accordionRes.forEach((res, index) => {
          const items = res.data.data || res.data || [];
          newAccordionData[index].items = Array.isArray(items)
            ? items.map((item, itemIndex) => ({
                title: item.name || item.title || "Unknown",
                id:
                  item.id ??
                  `${newAccordionData[index].filterParam}-${itemIndex}`,
              }))
            : [];
        });
        setAccordionData(newAccordionData);
      } catch (err) {
        console.error("Failed to load initial page data:", err);
        setError("Could not load attractions. Please try refreshing the page.");
      } finally {
        setIsLoading(false); // Hide global loader after all fetches are done
      }
    };

    fetchInitialData();
  }, [setIsLoading]); // Run this consolidated fetch only once on component mount

  // This useEffect now only handles re-fetching when filters change
  useEffect(() => {
    const hasFilters =
      Object.keys(selectedItems).length > 0 ||
      priceRange[0] !== 10 ||
      priceRange[1] !== 1000 ||
      durationRange[0] !== 1 ||
      durationRange[1] !== 8;

    if (!hasFilters) {
      if (packages.length !== allPackages.length) {
        setPackages(allPackages);
        setNoResultsFound(false);
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchFilteredAttractions();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [
    priceRange,
    durationRange,
    selectedItems,
    allPackages,
    fetchFilteredAttractions,
  ]);

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  const displayItems = packages;

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
                      Price: AED {priceRange[0]} — AED {priceRange[1]}
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
                    className={`${style["btn-one"]} my-3 btn btn-secondary col-md-12 col-sm-3 col-12`}
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
                className={`${style["btn-one"]} ${style["btn-mobile"]} col-md-12 col-sm-3 col-12`}
                onClick={handleSearch}
                disabled={isFiltering}
              >
                {isFiltering ? "Searching..." : "Apply"}
              </button>
            </div>
            <div
              className={`${style["right"]} ${
                isToggled ? style["filter-full-width"] : ""
              }`}
            >
              <h3>Attractions</h3>
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
