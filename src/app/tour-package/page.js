"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Countries from "../../../components/countries/countries";
import { Range } from "react-range";
import { CiMobile3 } from "react-icons/ci";
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
  const [durationRange, setDurationRange] = useState([1, 10]);
  const [isToggled, setIsToggled] = useState(false);
  const firstBreakPoints = { 350: 1, 750: 2, 1200: 2, 1500: 4 };
  const secondBreakPoints = { 350: 1, 750: 2, 1200: 2, 1500: 3 };
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [filteredByAccordion, setFilteredByAccordion] = useState([]);
  const [bestPicked, setBestpicked] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleDurationRangeChange = (values) => {
    setDurationRange(values);
  };

  const clearPriceFilter = () => {
    setPriceRange([30, 8000]);
    applyAllFilters();
  };

  const clearDurationFilter = () => {
    setDurationRange([1, 10]);
    applyAllFilters();
  };

  useEffect(() => {
    if (allPackages.length > 0) {
      applyAllFilters();
    }
  }, [priceRange, durationRange, selectedItems]);

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

  useEffect(() => {
    const fetchAccordionItems = async (index) => {
      const section = accordionData[index];
      if (!section.apiEndpoint) {
        return;
      }

      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`,
          {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          }
        );
        console.log(
          `fetchAccordionItems (${section.title}) response:`,
          response
        );
        const items = response.data.data || response.data || [];
        setAccordionData((prevData) => {
          const newData = [...prevData];
          newData[index].items = Array.isArray(items)
            ? items.map((item, itemIndex) => ({
                title: item.title || item.name || "Unknown",
                id: item.id ?? `${section.title.toLowerCase()}-${itemIndex}`,
              }))
            : [];
          return newData;
        });
      } catch (err) {
        setError(`Failed to fetch ${section.title}. Please try again.`);
      }
    };

    accordionData.forEach((section, index) => {
      if (section.apiEndpoint) {
        fetchAccordionItems(index);
      }
    });
  }, []);

  useEffect(() => {
    const fetchBestpicked = async () => {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/get-top-packages`,
          {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          }
        );

        const fetchedBestpicked = (
          response.data?.data ||
          response.data ||
          []
        ).map((pkg, index) => ({
          ...pkg,
          id: pkg.id ?? `bestpicked-${index}`,
        }));
        setBestpicked(fetchedBestpicked);
      } catch (err) {
        setError("Failed to fetch best picked packages. Please try again.");
      }
    };
    fetchBestpicked();
  }, []);

  useEffect(() => {
    const fetchLesserWonders = async () => {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/get-lesser-known-packages`,
          {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          }
        );
        const fetchedLesserWonders = (
          response.data.data ||
          response.data ||
          []
        ).map((pkg, index) => ({
          ...pkg,
          id: pkg.id ?? `lesserwonder-${index}`,
        }));
        setLesserWonders(fetchedLesserWonders);
      } catch (err) {
        setError("Failed to fetch lesser-known wonders. Please try again.");
      }
    };
    fetchLesserWonders();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages`
        );
        console.log("fetchPackages response:", response);
        const fetchedPackages = (response.data.data || response.data || []).map(
          (pkg, index) => ({
            ...pkg,
            id: pkg.id ?? `package-${index}`,
          })
        );
        setPackages(fetchedPackages);
        setAllPackages(fetchedPackages);
      } catch (err) {
        setError("Failed to fetch packages. Please try again.");
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchTour_category = async () => {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}tour-categories`,
          {
            headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
          }
        );
        console.log("fetchTour_category response:", response);
        const allTour_category = (
          response.data.data ||
          response.data ||
          []
        ).map((category, index) => ({
          ...category,
          id: category.id ?? `tourcategory-${index}`,
        }));
        setTour_category(allTour_category);
      } catch (err) {
        setError("Failed to fetch tour categories. Please try again.");
      }
    };
    fetchTour_category();
  }, []);

  const handleAccordionItemClick = async (sectionIndex, itemId) => {
    console.log("handleAccordionItemClick called:", {
      sectionIndex,
      itemId,
      selectedItems,
    });

    const newSelectedItems = { ...selectedItems };
    const sectionTitle = accordionData[sectionIndex].title;

    if (sectionTitle === "COUNTRY") {
      if (
        newSelectedItems[sectionTitle] &&
        newSelectedItems[sectionTitle].includes(itemId)
      ) {
        console.log(`Deselecting ${itemId} from COUNTRY`);
        delete newSelectedItems[sectionTitle];
      } else {
        console.log(`Selecting ${itemId} in COUNTRY`);
        newSelectedItems[sectionTitle] = [itemId];
      }
    } else {
      const currentSelections = newSelectedItems[sectionTitle] || [];
      if (currentSelections.includes(itemId)) {
        console.log(`Deselecting ${itemId} from ${sectionTitle}`);
        newSelectedItems[sectionTitle] = currentSelections.filter(
          (id) => id !== itemId
        );
        if (newSelectedItems[sectionTitle].length === 0) {
          delete newSelectedItems[sectionTitle];
        }
      } else {
        console.log(`Selecting ${itemId} in ${sectionTitle}`);
        newSelectedItems[sectionTitle] = [...currentSelections, itemId];
      }
    }

    console.log("Updated selectedItems:", newSelectedItems);
    setSelectedItems(newSelectedItems);
    await filterPackagesByAccordion(newSelectedItems);
  };

  const filterPackagesByAccordion = async (selectedItemsToFilter) => {
    if (Object.keys(selectedItemsToFilter).length === 0) {
      setFilteredByAccordion([]);
      applyAllFilters();
      return;
    }

    const registerToken = localStorage.getItem("auth_token_register");
    const loginToken = localStorage.getItem("auth_token_login");
    let authToken = null;

    if (loginToken) {
      authToken = loginToken;
    } else if (registerToken) {
      authToken = registerToken;
    }

    try {
      const queryParams = new URLSearchParams();
      for (const sectionTitle in selectedItemsToFilter) {
        const section = accordionData.find(
          (item) => item.title === sectionTitle
        );
        if (section && section.filterParam) {
          selectedItemsToFilter[sectionTitle].forEach((itemId) => {
            queryParams.append(`${section.filterParam}[]`, itemId);
          });
        }
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}packages?${queryParams.toString()}`,
        {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        }
      );
      console.log("filterPackagesByAccordion response:", response);
      const allFilteredPackages = (
        response.data.data ||
        response.data ||
        []
      ).map((pkg, index) => ({
        ...pkg,
        id: pkg.id ?? `filtered-${index}`,
      }));
      const uniquePackages = allFilteredPackages.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i
      );
      setFilteredByAccordion(uniquePackages);
      applyAllFilters(uniquePackages);
    } catch (err) {
      setError("Failed to fetch filtered packages.");
    }
  };

  const applyAllFilters = (basePackages = null) => {
    let packagesToFilter = basePackages;

    if (!packagesToFilter) {
      packagesToFilter =
        filteredByAccordion.length > 0 ? filteredByAccordion : allPackages;
    }

    console.log("applyAllFilters - packagesToFilter:", packagesToFilter);

    if (!Array.isArray(packagesToFilter)) {
      packagesToFilter = [];
    }

    const filtered = packagesToFilter.filter((pkg) => {
      if (!pkg) return false;
      console.log("Filtering package:", pkg);
      const adultPrice = parseFloat(pkg.adult_price) || 0;
      const duration = pkg.number_of_days || 0;
      const matchesCountry =
        selectedItems["COUNTRY"] && selectedItems["COUNTRY"].length > 0
          ? (pkg.country_id || 0) === parseInt(selectedItems["COUNTRY"][0])
          : true;
      return (
        adultPrice >= priceRange[0] &&
        adultPrice <= priceRange[1] &&
        duration >= durationRange[0] &&
        duration <= durationRange[1] &&
        matchesCountry
      );
    });

    setNoResultsFound(filtered.length === 0);
    setFilteredPackages(filtered);
  };

  const handleSearch = () => {
    applyAllFilters();
    if (isToggled) {
      setIsToggled(false);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([30, 8000]);
    setDurationRange([1, 10]);
    setSelectedItems({});
    setFilteredByAccordion([]);
    setFilteredPackages([]);
    setNoResultsFound(false);
    applyAllFilters();
  };

  const displayPackages =
    filteredPackages.length > 0 ? filteredPackages : packages;

  return (
    <>
      <Banner />
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
            {/* left */}
            <div
              className={`${style["left"]} ${
                isToggled ? `${style["highlight"]}` : ""
              }`}
            >
              <div className={style["package-filter"]}>
                <div className={style["filter-header"]}>
                  <h4 className="pt-2">Price Range</h4>
                </div>
                <div className={style["price-range"]}>
                  <Range
                    step={1}
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
                  <div className="d-flex">
                    <p>
                      Price Range: ${priceRange[0]} — ${priceRange[1]}
                    </p>
                    <button
                      onClick={clearPriceFilter}
                      className="btn btn-link text-primary"
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
                  <div className="d-flex">
                    <p>
                      Days: {durationRange[0]} — {durationRange[1]} Days
                    </p>
                    <button
                      onClick={clearDurationFilter}
                      className="btn btn-link text-primary"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className={style["accordion-range"]}>
                  {accordionData.map((accordion, index) => {
                    console.log(`Rendering Accordion ${accordion.title}:`, {
                      selectedItems: selectedItems[accordion.title] || [],
                    });
                    return (
                      <Accordion
                        key={index}
                        title={accordion.title}
                        items={accordion.items || []}
                        isOpenInitially={true}
                        onItemClick={(itemId) =>
                          handleAccordionItemClick(index, itemId)
                        }
                        selectedItems={selectedItems[accordion.title] || []}
                      />
                    );
                  })}
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
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            {/* left end */}

            {/* right */}
            <div
              className={`${style["right"]}  ${
                isToggled ? `${style["filter-full-width"]}` : ""
              }`}
            >
              <h3>Tour Packages</h3>
              {noResultsFound ? (
                <div className={style["no-results"]}>
                  <h4>No packages found with the selected filters</h4>
                  <p>
                    Please try adjusting your price range, duration, country, or
                    activity selections
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
                <FeaturedIntegratedTravel />
              </div>

              {/* best picked for you */}
              <section className={style["pakage-bes-picked"]}>
                <div className="container-fluid">
                  {bestPicked.length > 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Best picked for you</h3>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          bestPicked={bestPicked}
                          count={4}
                          type="tour-bestPicked"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
              {/* best picked for you END*/}

              {/* lesser-known wonders */}
              <section className={style["pakage-bes-picked"]}>
                <div className="container p-0">
                  {lesserWonders.length > 0 && (
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Lesser-Known Wonders</h3>
                        <p className="text-center">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. <br />
                          Lorem Ipsum has been the industry's standard dummy
                          text
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Carousal
                          wonders={lesserWonders}
                          count={3}
                          type="tour-wonders"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
              {/* lesser-known wonders END*/}

              {/* holidays by theme */}
              <section className={style["pakage-bes-picked"]}>
                <div className="container p-0">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="pb-3">Holidays by theme</h3>
                      <HolidaysTab />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 text-center mt-4">
                      <button className={style["btn-one"]}>Full List</button>
                    </div>
                  </div>
                </div>
              </section>
              {/* holidays by theme END*/}
            </div>
            {/* right end */}
          </div>
        </div>
      </section>
    </>
  );
};

export default TourPackage;
