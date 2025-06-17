"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";
import axios from "axios";

const HolidaysTab = (props) => {
  const [tabsData, setTabsData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    const fetchTabs = async () => {
      setIsLoading(true);
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        let response;
        if (props.type === "attractions") {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}att-holiday-themes`
          );
        } else {
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}holiday-themes`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
        }

        const fetchedTabs = response.data.data || response.data || [];
        const formattedTabs = fetchedTabs.map((tab) => ({
          id: tab.uuid_id,
          name: tab.title,
          description: tab.description,
        }));

        const allTabsData = [
          {
            id: "all",
            name: "All Themes",
            description:
              "Explore all our exciting holiday packages across various themes.",
          },
          ...formattedTabs,
        ];

        setTabsData(allTabsData);
        setActiveTab("all"); // Set the first tab (All Themes) as active
        setIsLoading(false);
      } catch (err) {
        console.log("🚀 ~ fetchTabs ~ err:", err);
        setIsLoading(false);
        setError("Failed to fetch holiday themes. Please try again.");
      }
    };
    fetchTabs();
  }, []);

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const fetchedPackages = response.data.data || response.data || [];
        setAllPackages(fetchedPackages);
        setFilteredPackages(fetchedPackages.slice(0, 5)); // Initially show all packages, max 5
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch packages. Please try again.");
      }
    };
    fetchAllPackages();
  }, []);

  useEffect(() => {
    const fetchPackagesByTheme = async () => {
      // If "all" tab is selected, show all packages (max 5)
      if (activeTab === "all") {
        setFilteredPackages(allPackages.slice(0, 5));
        return;
      }

      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}holiday-themes/theme/get-by-theme?holiday_theme_id=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const themePackages = response.data.data || response.data || [];
        setFilteredPackages(themePackages.slice(0, 5)); // Show max 5 packages from the theme
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch packages for this theme. Please try again.");
      }
    };

    if (activeTab) {
      fetchPackagesByTheme();
    }
  }, [activeTab, allPackages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = (description) => {
    // Get packages to display (already filtered by activeTab)
    const displayPackages = filteredPackages;

    return (
      <div className={`${style["documentation-container"]} p-0`}>
        <div className="container">
          <div className="row">
            {/* First package */}
            <div className="col-md-6 p-0 d-flex pb-2 ms-md-0 ms-3">
              <img
                src={
                  displayPackages[0]?.photo_urls?.[0] ||
                  "../images/tour/358-608.jpg"
                }
                className={`${style["img-Holidays"]} col-6`}
                alt="Destination"
              />
              <div className={`col-6 p-0 ${style["vertical-center"]}`}>
                <div className={style["tour-holidays-text"]}>
                  <h5>Destination</h5>
                  <h6>{displayPackages[0]?.name || "UAE"}</h6>
                  <span className={style["line"]}></span>
                  <p>{description}</p>
                  <ul>
                    <li>
                      <Link href="#0" className={style["fb"]}>
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link href="#0" className={style["tw"]}>
                        <FaTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link href="#0" className={style["gp"]}>
                        <FaGooglePlusG />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Second, third packages */}
            <div className="col-md-3">
              <div className={style["tour-holidays-box"]}>
                <img
                  src={
                    displayPackages[1]?.photo_urls?.[0] ||
                    "../images/tour/269-273.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{displayPackages[1]?.name || "Saudi"}</p>
                </span>
              </div>
              <div
                className={`mb-0 ${style["tour-holidays-box"]} ${style["mobile-pb"]}`}
              >
                <img
                  src={
                    displayPackages[2]?.photo_urls?.[0] ||
                    "../images/tour/02.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{displayPackages[2]?.name || "Saudi"}</p>
                </span>
              </div>
            </div>

            {/* 4, 5 packages */}
            <div className="col-md-3">
              <div className={style["tour-holidays-box"]}>
                <img
                  src={
                    displayPackages[3]?.photo_urls?.[0] ||
                    "../images/tour/03.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{displayPackages[3]?.name || "Saudi"}</p>
                </span>
              </div>
              <div className={`mb-0 ${style["tour-holidays-box"]}`}>
                <img
                  src={
                    displayPackages[4]?.photo_urls?.[0] ||
                    "../images/tour/04.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{displayPackages[4]?.name || "Saudi"}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>; // Or your loading component
  }

  if (error) {
    return <p>Error: {error}</p>; // Or your error component
  }

  return (
    <section className={style.innerpage}>
      <div className={`container-fluid ${style["pr-0"]}`}>
        <div className="row pb-2">
          <div className="col-md-12">
            <div className={`pr-0 ${style["country-container-box"]}`}>
              <div className={style["country-container"]}>
                <ul
                  className={`nav nav-tabs border-0 ${style["country-nav-tabs"]}`}
                  id="myTab"
                  role="tablist"
                >
                  {tabsData.map((tab, index) => (
                    <li
                      key={tab.id}
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${
                          style["country-nav-link"]
                        } ${activeTab === tab.id ? "active" : ""}`}
                        id={`${tab.id}-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${tab.id}`}
                        type="button"
                        role="tab"
                        aria-controls={tab.id}
                        aria-selected={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id)}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                  {tabsData.map((tab, index) => (
                    <div
                      key={tab.id}
                      className={`tab-pane fade ${
                        activeTab === tab.id ? "show active" : ""
                      }`}
                      id={tab.id}
                      role="tabpanel"
                      aria-labelledby={`${tab.id}-tab`}
                    >
                      {renderTabContent(tab.description)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HolidaysTab;
