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
        const authToken =
          localStorage.getItem("auth_token_login") ||
          localStorage.getItem("auth_token_register");
        if (!authToken) {
          setErrorEvents("Authentication token not found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}countries`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const fetchedCountries = response.data.data || response.data || [];

        setCountries(fetchedCountries);
      } catch (err) {
        setErrorEvents("Failed to fetch countries. Please try again.");
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch events for a specific country when the tab is clicked
  const fetchEventsByCountry = async (countryId) => {
    try {
      setLoadingEvents(true);
      setErrorEvents(null);
      let response;

      if (countryId == "all") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events?country[]=${countryId}`
        );
      } else {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events?country[]=${countryId}`
        );
      }

      const fetchedEvents = response.data.data || response.data || [];
      setCountryEvents((prev) => ({
        ...prev,
        [countryId]: fetchedEvents,
      }));
      setLoadingEvents(false);
    } catch (err) {
      setErrorEvents(`Failed to fetch events for country ${countryId}.`);
      console.error(`Error fetching events for country ${countryId}:`, err);
      setLoadingEvents(false);
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== "all" && !countryEvents[tabId]) {
      // Fetch events for the country if not already fetched, skip for "all"
      fetchEventsByCountry(tabId);
    }
  };

  const renderTabContent = (countryId) => {
    if (countryId === "all") {
      // Use lowercase "all"
      if (loadingEvents)
        return (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        );
      if (errorEvents)
        return (
          <div className="p-4 text-center text-muted">
            <h4>
              Events in {countries.find((c) => c.uuid_id === countryId)?.name}
            </h4>
            <p>No events found for this country.</p>
          </div>
        );
      if (allEvents.length === 0)
        return (
          <div className="text-center p-5 text-muted">
            No events found at the moment.
          </div>
        );
      return <ExploreEventsContainer events={allEvents} />;
    }

    // Render country-specific events
    const countryEventsList = countryEvents[countryId] || [];
    if (loadingEvents)
      return (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    if (errorEvents)
      return (
        <div className="p-4 text-center text-muted">
          <h4>
            Events in {countries.find((c) => c.uuid_id === countryId)?.name}
          </h4>
          <p>No events found for this country.</p>
        </div>
      );
    if (!countryEvents[countryId])
      return (
        <div className="p-4 text-center text-muted">
          <h4>
            Events in {countries.find((c) => c.uuid_id === countryId)?.name}
          </h4>
          <p>Loading events...</p>
        </div>
      );
    if (countryEventsList.length === 0)
      return (
        <div className="p-4 text-center text-muted">
          <h4>
            Events in {countries.find((c) => c.uuid_id === countryId)?.name}
          </h4>
          <p>No events found for this country.</p>
        </div>
      );
    return <ExploreEventsContainer events={countryEventsList} />;
  };

  // Combine static "All" tab with fetched countries
  const tabList = [
    { uuid_id: "all", name: "All" }, // Static "All" tab
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
