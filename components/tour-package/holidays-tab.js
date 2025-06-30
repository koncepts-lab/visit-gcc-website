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

  // --- 1. Fetch Themes and All Their Items in One Go ---
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const themesApiUrl =
          props.type === "attractions"
            ? `${process.env.NEXT_PUBLIC_API_URL}att-holiday-themes`
            : `${process.env.NEXT_PUBLIC_API_URL}holiday-themes/get-package-holiday-themes`;

        const response = await axios.get(themesApiUrl);
        const fetchedThemes = response.data.data || response.data || [];

        const itemsKey = props.type === "attractions" ? "attractions" : "packages";

        const formattedTabs = fetchedThemes.map((tab) => ({
          id: tab.id,
          name: tab.title,
          description: tab.description,
          items: tab[itemsKey] || [],
        }));

        let allItemsAggregated = [];
        formattedTabs.forEach(tab => {
          allItemsAggregated.push(...tab.items);
        });

        const uniqueAllItems = Array.from(new Map(allItemsAggregated.map(item => [item.id, item])).values());
        
        const allTabsData = [
          {
            id: "all",
            name: "All Themes",
            description: `Explore all our exciting ${props.type || 'holiday packages'} across various themes.`,
            items: uniqueAllItems,
          },
          ...formattedTabs,
        ];

        setTabsData(allTabsData);
        setActiveTab("all"); // Set the initial active tab

      } catch (err) {
        console.error("Error fetching holiday data:", err);
        setError("Failed to fetch holiday data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [props.type]); // Re-run only if the component type changes

  // Bootstrap JS import
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // This function now receives the specific items it needs to render
  const renderTabContent = (description, items = []) => {
    // The items parameter defaults to an empty array to prevent errors
    const displayItems = items;

    // A graceful fallback for when there are fewer than 5 items
    const getItem = (index) => displayItems[index] || {};

    return (
      <div className={`${style["documentation-container"]} p-0`}>
        <div className="container">
          <div className="row">
            {/* First item */}
            <div className="col-md-6 p-0 d-flex pb-2 ms-md-0 ms-3">
              <img
                src={
                  getItem(0).photo_urls?.[0] || "../images/placeholder.jpg"
                }
                className={`${style["img-Holidays"]} col-6`}
                alt="Destination"
              />
              <div className={`col-6 p-0 ${style["vertical-center"]}`}>
                <div className={style["tour-holidays-text"]}>
                  <h5>Destination</h5>
                  <h6>{getItem(0).name || "Destination Name"}</h6>
                  <span className={style["line"]}></span>
                  <p>{description}</p>
                  <ul>
                    <li><Link href="#0" className={style["fb"]}><FaFacebookF /></Link></li>
                    <li><Link href="#0" className={style["tw"]}><FaTwitter /></Link></li>
                    <li><Link href="#0" className={style["gp"]}><FaGooglePlusG /></Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Second, third items */}
            <div className="col-md-3">
              <div className={style["tour-holidays-box"]}>
                <img
                  src={
                    getItem(1).photo_urls?.[0] || "../images/placeholder.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{getItem(1).name || "Destination Name"}</p>
                </span>
              </div>
              <div className={`mb-0 ${style["tour-holidays-box"]} ${style["mobile-pb"]}`}>
                <img
                  src={
                    getItem(2).photo_urls?.[0] || "../images/placeholder.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{getItem(2).name || "Destination Name"}</p>
                </span>
              </div>
            </div>

            {/* 4th, 5th items */}
            <div className="col-md-3">
              <div className={style["tour-holidays-box"]}>
                <img
                  src={
                    getItem(3).photo_urls?.[0] || "../images/placeholder.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{getItem(3).name || "Destination Name"}</p>
                </span>
              </div>
              <div className={`mb-0 ${style["tour-holidays-box"]}`}>
                <img
                  src={
                    getItem(4).photo_urls?.[0] || "../images/placeholder.jpg"
                  }
                  className="w-100"
                  alt="Destination"
                />
                <span>
                  <h6>Destination</h6>
                  <p>{getItem(4).name || "Destination Name"}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                  {tabsData.map((tab) => (
                    <li
                      key={tab.id}
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${
                          style["country-nav-link"]
                        } ${activeTab === tab.id ? "active" : ""}`}
                        id={`${tab.id}-tab-button`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${tab.id}-tab-pane`}
                        type="button"
                        role="tab"
                        aria-controls={`${tab.id}-tab-pane`}
                        aria-selected={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id)}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                  {isLoading ? (
                    <div className="text-center p-5">Loading content...</div>
                  ) : error ? (
                     <div className="alert alert-warning text-center m-3">{error}</div>
                  ) : (
                    // Render a tab pane for EACH tab. React/Bootstrap will handle showing the active one.
                    tabsData.map((tab) => (
                      <div
                        key={tab.id}
                        className={`tab-pane fade ${ activeTab === tab.id ? "show active" : "" }`}
                        id={`${tab.id}-tab-pane`}
                        role="tabpanel"
                        aria-labelledby={`${tab.id}-tab-button`}
                      >
                        {/* Render the content, passing the specific items for this tab */}
                        {renderTabContent(tab.description, tab.items.slice(0, 5))}
                      </div>
                    ))
                  )}
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