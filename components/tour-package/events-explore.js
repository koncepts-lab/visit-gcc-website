"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExploreEventsContainer from "./event-responsive-masonry";

const EventsExploreTab = ({ events }) => {
  const [allEvents, setAllEvents] = useState(events || []); // Events for the "All" tab
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // Use lowercase "all"
  const [countries, setCountries] = useState([]); // Fetched countries
  const [countryEvents, setCountryEvents] = useState({}); // Events per country, e.g., { "UAE": [...], "Bahrain": [...] }

  // Sync allEvents with the events prop whenever it changes
  useEffect(() => {
    setAllEvents(events || []);
  }, [events]);

  // Fetch countries from the API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}countries`
        );
        const fetchedCountries = response.data.data || response.data || [];
        setCountries(fetchedCountries);
      } catch (err) {
        // Set a specific error for country fetching if needed, or a general one
        setErrorEvents("Failed to fetch country list. Please refresh.");
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch events for a specific country when the tab is clicked
  const fetchEventsByCountry = async (countryId) => {
    try {
      setLoadingEvents(true);
      setErrorEvents(null); // Clear previous errors before a new fetch

      const response = await axios.get(
        // --- CHANGE --- Simplified the API call, as the "all" case is handled by not calling this function
        `${process.env.NEXT_PUBLIC_API_URL}events?country[]=${countryId}`
      );

      const fetchedEvents = response.data.data || response.data || [];
      setCountryEvents((prev) => ({
        ...prev,
        [countryId]: fetchedEvents,
      }));
    } catch (err) {
      setErrorEvents(`Failed to fetch events for this country.`);
      console.error(`Error fetching events for country ${countryId}:`, err);
      // Also cache an empty array on failure to prevent re-fetching constantly
      setCountryEvents((prev) => ({
        ...prev,
        [countryId]: [],
      }));
    } finally {
      // --- CHANGE --- Use finally to ensure loading is always set to false
      setLoadingEvents(false);
    }
  };

  // --- THIS IS THE KEY CHANGE ---
  // This function now resets the error state on every tab click,
  // preventing stale errors from appearing on cached tabs.
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setErrorEvents(null); // Reset error state immediately on any tab change

    // Fetch events only if the tab is not "all" and its events haven't been fetched yet
    if (tabId !== "all" && countryEvents[tabId] === undefined) {
      fetchEventsByCountry(tabId);
    }
  };

  const renderTabContent = (countryId) => {
    // --- RENDER LOGIC FOR THE "ALL" TAB ---
    if (countryId === "all") {
      // The "All" tab doesn't depend on the loading/error state of other tabs
      if (!allEvents || allEvents.length === 0) {
        return (
          <div className="text-center p-5 text-muted">
            No events found at the moment.
          </div>
        );
      }
      return <ExploreEventsContainer events={allEvents} />;
    }

    // --- RENDER LOGIC FOR COUNTRY TABS ---
    const countryName = countries.find((c) => c.uuid_id === countryId)?.name;
    const countryEventsList = countryEvents[countryId];

    // Show spinner ONLY when loading this specific tab's content
    if (loadingEvents && activeTab === countryId) {
      return (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // Show error if one occurred for this specific tab
    if (errorEvents && activeTab === countryId) {
      return (
        <div className="p-4 text-center text-muted">
          <h4>Events in {countryName}</h4>
          <p>{errorEvents}</p>
        </div>
      );
    }

    // Show a message if the data exists but is empty
    if (countryEventsList && countryEventsList.length === 0) {
      return (
        <div className="p-4 text-center text-muted">
          <h4>Events in {countryName}</h4>
          <p>No events found for this country.</p>
        </div>
      );
    }

    // Render the events if they exist
    if (countryEventsList) {
      return <ExploreEventsContainer events={countryEventsList} />;
    }

    // This state should not normally be reached if logic is correct, but serves as a fallback.
    return null;
  };

  // Combine static "All" tab with fetched countries
  const tabList = [
    { uuid_id: "all", name: "All" },
    ...countries,
  ];

  return (
    <section className={style.innerpage}>
      <div className={`container-fluid`}>
        <div className="row pb-2">
          <div className="col-md-12">
            <div className={`pr-0 ${style["country-container-box"]}`}>
              <div className={style["country-container"]}>
                <ul
                  className={`nav nav-tabs border-0 ${style["country-nav-tabs"]}`}
                  id="eventsTab"
                  role="tablist"
                >
                  {tabList.map((country) => (
                    <li
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                      key={country.uuid_id}
                    >
                      <button
                        className={`nav-link border-0 ${
                          style["country-nav-link"]
                        } ${
                          activeTab === country.uuid_id
                            ? `active ${style["active-tab"]}`
                            : ""
                        }`}
                        id={`${country.uuid_id}-events-tab`}
                        data-bs-toggle="tab"
                        data-bs-target={`#${country.uuid_id}-events-content`}
                        type="button"
                        role="tab"
                        aria-controls={`${country.uuid_id}-events-content`}
                        aria-selected={activeTab === country.uuid_id}
                        onClick={() => handleTabClick(country.uuid_id)}
                      >
                        {country.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content" id="eventsTabContent">
                  {tabList.map((country) => (
                    <div
                      className={`tab-pane fade ${
                        activeTab === country.uuid_id ? "show active" : ""
                      }`}
                      id={`${country.uuid_id}-events-content`}
                      role="tabpanel"
                      aria-labelledby={`${country.uuid_id}-events-tab`}
                      key={`${country.uuid_id}-content`}
                    >
                      {activeTab === country.uuid_id && (
                        <div
                          className={`${style["documentation-container"]} p-0`}
                        >
                          {renderTabContent(country.uuid_id)}
                        </div>
                      )}
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

export default EventsExploreTab;