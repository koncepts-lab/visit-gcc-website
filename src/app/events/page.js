"use client";
import React, { useState, useEffect, use } from "react";
import { Range } from "react-range";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Link from "next/link";
import Banner from "../../../components/banner/banner";
import Carousal from "../../../components/carousel/Carousal";
import Accordion from "../../../components/accordion/accordion";
import EventsExploreTab from "../../../components/tour-package/events-explore";
import UpcomingEvents from "../../../components/tour-package/upcoming-events";

const Country = () => {
  // Basic state
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize with today's date
  const today = new Date();

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [30, 3900],
    selectedDate: today,
    selectedItems: {}, // { "EVENT TYPE": [1, 2], "LANGUAGE": [3] }
  });

  const [accordionData, setAccordionData] = useState([
    {
      title: "DATE",
      items: [
        { id: "upcoming", title: "Upcoming Events (sorted by date)" },
        { id: "past", title: "Past Events (sorted by date)" },
        { id: "today", title: "Todays Events" },
        { id: "thisWeek", title: "This Weeks Events" },
        { id: "thisMonth", title: "This Months Events" },
      ],
    },
    {
      title: "EVENT TYPE",
      items: [],
      apiEndpoint: "event-types",
      filterEndpoint: "events",
    },
    {
      title: "EVENT LOCATION",
      items: [],
      apiEndpoint: "event-locations",
      filterEndpoint: "events",
    },
    {
      title: "EVENT FORMAT",
      items: [],
      apiEndpoint: "event-formats",
      filterEndpoint: "events",
    },
    {
      title: "LANGUAGE",
      items: [],
      apiEndpoint: "languages",
      filterEndpoint: "events",
    },
    {
      title: "DURATION",
      items: [],
      apiEndpoint: "event-durations",
      filterEndpoint: "events",
    },
    {
      title: "AGE GROUP",
      items: [],
      apiEndpoint: "age-groups",
      filterEndpoint: "events",
    },
  ]);

  // Helper function to get auth token
  const getAuthToken = () => {
    return (
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register")
    );
  };

  // Helper function to check if calendar date filter is active
  const isCalendarDateActive = () => {
    const todayDate = new Date();
    const selected = filters.selectedDate;

    // Compare just the date parts, not the full datetime
    return (
      selected.getFullYear() !== todayDate.getFullYear() ||
      selected.getMonth() !== todayDate.getMonth() ||
      selected.getDate() !== todayDate.getDate()
    );
  };

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events`
        );

        const fetchedEvents = response.data.data || response.data || [];
        setAllEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again.");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Fetch lesser wonders
  useEffect(() => {
    const fetchLesserWonders = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/get-lesser-known-events`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLesserWonders(response.data);
      } catch (err) {
        console.error("Error fetching lesser wonders:", err);
      }
    };

    fetchLesserWonders();
  }, []);

  // Fetch accordion items
  useEffect(() => {
    const fetchAccordionItems = async () => {
      const authToken = getAuthToken();
      if (!authToken) return;

      const updatedAccordionData = [...accordionData];

      for (let i = 0; i < updatedAccordionData.length; i++) {
        const section = updatedAccordionData[i];

        if (section.apiEndpoint && section.items.length === 0) {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );

            const items = response.data.data || response.data || [];
            updatedAccordionData[i].items = items.map((item) => ({
              id: item.id,
              title: item.title || item.name,
            }));
          } catch (err) {
            console.error(`Failed to fetch ${section.title}:`, err);
          }
        }
      }

      setAccordionData(updatedAccordionData);
    };

    fetchAccordionItems();
  }, []);

  // Date filter functions
  const filterByDateOption = (events, dateOption) => {
    const now = new Date();
    const todayString = now.toISOString().split("T")[0];

    switch (dateOption) {
      case "upcoming":
        return events
          .filter((event) => event.start_date >= todayString)
          .sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

      case "past":
        return events
          .filter((event) => event.end_date < todayString)
          .sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

      case "today":
        return events.filter(
          (event) =>
            event.start_date <= todayString && event.end_date >= todayString
        );

      case "thisWeek":
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
        const startOfWeekString = startOfWeek.toISOString().split("T")[0];
        const endOfWeekString = endOfWeek.toISOString().split("T")[0];
        return events.filter(
          (event) =>
            event.start_date <= endOfWeekString &&
            event.end_date >= startOfWeekString
        );

      case "thisMonth":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const startOfMonthString = startOfMonth.toISOString().split("T")[0];
        const endOfMonthString = endOfMonth.toISOString().split("T")[0];
        return events.filter(
          (event) =>
            event.start_date <= endOfMonthString &&
            event.end_date >= startOfMonthString
        );

      default:
        return events;
    }
  };

  // Price filter function
  const filterByPrice = (events, priceRange) => {
    return events.filter((event) => {
      const priceString = (event.adult_price || "0")
        .toString()
        .replace(/[^0-9.]/g, "");
      const adultPrice = parseFloat(priceString);

      if (isNaN(adultPrice)) return false;

      return adultPrice >= priceRange[0] && adultPrice <= priceRange[1];
    });
  };

  // Calendar date filter function
  const filterByCalendarDate = (events, selectedDate) => {
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    console.log("Filtering by calendar date:", selectedDateString);

    const filtered = events.filter((event) => {
      const startDate = event.start_date;
      const endDate = event.end_date;

      console.log(
        "Comparing event range:",
        startDate,
        "to",
        endDate,
        "with selected:",
        selectedDateString
      );

      // Check if selected date falls within the event's date range (inclusive)
      return selectedDateString >= startDate && selectedDateString <= endDate;
    });

    console.log("Calendar filtered events:", filtered.length);
    return filtered;
  };

  // API filter function for accordion items
  const fetchFilteredEventsByAPI = async (sectionTitle, selectedIds) => {
    const authToken = getAuthToken();
    if (!authToken) return [];

    const section = accordionData.find((item) => item.title === sectionTitle);
    if (!section || !section.filterEndpoint) return [];

    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}${section.filterEndpoint}`;
      let params = [];

      // Build parameters based on section type
      switch (sectionTitle) {
        case "EVENT TYPE":
          params = selectedIds.map((id) => `event_types[]=${id}`);
          break;
        case "EVENT LOCATION":
          params = selectedIds.map((id) => `event_locations[]=${id}`);
          break;
        case "EVENT FORMAT":
          params = selectedIds.map((id) => `event_formats[]=${id}`);
          break;
        case "LANGUAGE":
          params = selectedIds.map((id) => `languages[]=${id}`);
          break;
        case "DURATION":
          params = selectedIds.map((id) => `event_durations[]=${id}`);
          break;
        case "AGE GROUP":
          params = selectedIds.map((id) => `age_groups[]=${id}`);
          break;
        default:
          return [];
      }

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const response = await axios.get(url);

      return response.data.data || response.data || [];
    } catch (err) {
      console.error(`Error filtering events by ${sectionTitle}:`, err);
      return [];
    }
  };

  // Main filter function
  const applyAllFilters = async () => {
    let eventsToFilter = [...allEvents];
    const { priceRange, selectedDate, selectedItems } = filters;

    // Check if any filters are active
    const isPriceFilterActive = priceRange[0] !== 30 || priceRange[1] !== 3900;
    const isCalendarDateFilterActive = isCalendarDateActive();
    const hasAccordionFilters = Object.keys(selectedItems).length > 0;

    console.log("Filter states:", {
      isPriceFilterActive,
      isCalendarDateFilterActive,
      hasAccordionFilters,
      selectedDate: selectedDate.toISOString().split("T")[0],
    });

    // If no filters are active, show all events
    if (
      !isPriceFilterActive &&
      !isCalendarDateFilterActive &&
      !hasAccordionFilters
    ) {
      console.log("No filters active, showing all events");
      setFilteredEvents(allEvents);
      return;
    }

    try {
      setIsLoading(true);

      // Apply API-based accordion filters first
      const apiFilterSections = Object.keys(selectedItems).filter(
        (section) => section !== "DATE"
      );

      if (apiFilterSections.length > 0) {
        // Get filtered events from each API section
        const filteredEventsSets = await Promise.all(
          apiFilterSections.map((section) =>
            fetchFilteredEventsByAPI(section, selectedItems[section])
          )
        );

        // Find intersection of all filtered sets
        if (filteredEventsSets.length > 0) {
          eventsToFilter = filteredEventsSets.reduce(
            (intersection, currentSet) => {
              if (intersection.length === 0) return currentSet;
              return intersection.filter((event) =>
                currentSet.some((e) => e.id === event.id)
              );
            }
          );
        }
      }

      // Apply date filter if selected
      if (selectedItems["DATE"] && selectedItems["DATE"].length > 0) {
        const dateOption = selectedItems["DATE"][0];
        console.log("🚀 ~ applyAllFilters ~ dateOption:", dateOption);
        eventsToFilter = filterByDateOption(eventsToFilter, dateOption);
      }

      // Apply price filter
      if (isPriceFilterActive) {
        console.log("Applying price filter:", priceRange);
        eventsToFilter = filterByPrice(eventsToFilter, priceRange);
      }

      // Apply calendar date filter
      if (isCalendarDateFilterActive) {
        console.log("Applying calendar date filter");
        eventsToFilter = filterByCalendarDate(eventsToFilter, selectedDate);
      }

      console.log("Final filtered events:", eventsToFilter.length);
      setFilteredEvents(eventsToFilter);
    } catch (err) {
      console.error("Error applying filters:", err);
      setFilteredEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters whenever filter state changes
  useEffect(() => {
    if (allEvents.length > 0) {
      applyAllFilters();
    }
  }, [filters, allEvents]);

  // Handler functions
  const handlePriceRangeChange = (values) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: values,
    }));
  };

  const handleDateChange = (date) => {
    console.log("Calendar date changed to:", date);
    setFilters((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  const handleAccordionItemClick = (sectionIndex, clickedTitle) => {
    const section = accordionData[sectionIndex];
    const clickedItem = section.items.find(
      (item) => item.title === clickedTitle
    );

    if (!clickedItem) return;

    const itemId = clickedItem.id;
    const sectionTitle = section.title;

    setFilters((prev) => {
      const newSelectedItems = { ...prev.selectedItems };

      // Handle DATE section (single selection)
      if (sectionTitle === "DATE") {
        if (newSelectedItems[sectionTitle]?.includes(itemId)) {
          delete newSelectedItems[sectionTitle];
        } else {
          newSelectedItems[sectionTitle] = [itemId];
        }
      } else {
        // Handle other sections (multiple selection)
        if (newSelectedItems[sectionTitle]) {
          if (newSelectedItems[sectionTitle].includes(itemId)) {
            // Remove item
            newSelectedItems[sectionTitle] = newSelectedItems[
              sectionTitle
            ].filter((id) => id !== itemId);
            if (newSelectedItems[sectionTitle].length === 0) {
              delete newSelectedItems[sectionTitle];
            }
          } else {
            // Add item
            newSelectedItems[sectionTitle].push(itemId);
          }
        } else {
          // Create new array with item
          newSelectedItems[sectionTitle] = [itemId];
        }
      }

      return {
        ...prev,
        selectedItems: newSelectedItems,
      };
    });
  };

  const clearAllFilters = () => {
    const todayDate = new Date();
    setFilters({
      priceRange: [30, 3900],
      selectedDate: todayDate,
      selectedItems: {},
    });
  };

  // Helper function to get selected item titles for accordion
  const getSelectedItemTitles = (sectionTitle) => {
    const selectedIds = filters.selectedItems[sectionTitle] || [];
    const section = accordionData.find((item) => item.title === sectionTitle);

    if (!section) return [];

    return selectedIds
      .map((id) => section.items.find((item) => item.id === id)?.title)
      .filter(Boolean);
  };

  // Check if any filters are active
  const isAnyFilterActive = () => {
    const { priceRange, selectedItems } = filters;
    const isPriceFilterActive = priceRange[0] !== 30 || priceRange[1] !== 3900;
    const isCalendarDateFilterActive = isCalendarDateActive();
    const hasAccordionFilters = Object.keys(selectedItems).length > 0;

    return (
      isPriceFilterActive || isCalendarDateFilterActive || hasAccordionFilters
    );
  };

  const displayEvents = isAnyFilterActive() ? filteredEvents : allEvents;
  const noResultsFound = isAnyFilterActive() && filteredEvents.length === 0;

  // Fetch past events for lesser wonders section
  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/past`
        );
        const fetchedEvents = response.data.data;
        setLesserWonders(fetchedEvents);
      } catch (err) {
        console.error("Error fetching past events:", err);
      }
    };
    fetchPastEvents();
  }, []);

  return (
    <>
      <Banner />
      <section className={style["events-full-container"]}>
        <div className="container">
          <Link
            className="row"
            href={`/events/${allEvents[0]?.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="col-md-6">
              <img
                src={
                  allEvents[0]?.event_photo_urls[0] ||
                  "/images/placeholder-image.jpg"
                }
                className={`img-fluid w-100`}
                alt="Featured Event"
              />
            </div>
            <div className={`col-md-6 ${style["d-flex"]}`}>
              <div className={style["events-top-text"]}>
                <h3>{allEvents[0]?.name}</h3>
                <p className="mb-2">{allEvents[0]?.highlight}</p>
                <p>{allEvents[0]?.description}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="container-fluid py-lg-5">
          <div className="row">
            <div className="col-md-12">
              <Carousal
                eventScroll={allEvents}
                count={5}
                type="event-page-scroll"
              />
            </div>
          </div>
        </div>

        <div className={style["explore-event-container"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3 mb-4">
                <div className={`p-3 ${style["event-left-container"]}`}>
                  <h4 className="pt-2">Price Range</h4>
                  <div className={style["price-range"]}>
                    <Range
                      step={1}
                      min={30}
                      max={3900}
                      values={filters.priceRange}
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
                    <div>
                      <p className={style["price-range-text"]}>
                        Price Range: ${filters.priceRange[0]} — $
                        {filters.priceRange[1]}
                      </p>
                    </div>
                  </div>

                  <div className={style["media-calendar"]}>
                    <h4 className="pt-2">Calendar</h4>
                    <Calendar
                      onChange={handleDateChange}
                      value={filters.selectedDate}
                    />
                  </div>

                  <div className={style["accordion-range"]}>
                    {accordionData.map((accordion, index) => (
                      <Accordion
                        key={index}
                        title={accordion.title}
                        items={accordion.items.map((item) => item.title)}
                        isOpenInitially={true}
                        onItemClick={(clickedTitle) =>
                          handleAccordionItemClick(index, clickedTitle)
                        }
                        selectedItems={getSelectedItemTitles(accordion.title)}
                      />
                    ))}
                  </div>

                  <div className="mt-3">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <h3>Explore the Latest Events and Happenings</h3>
                {isLoading ? (
                  <p>Loading events...</p>
                ) : noResultsFound ? (
                  <div className={style["no-results"]}>
                    <h4>No events found with the selected filters.</h4>
                    <p>Please try adjusting your selections.</p>
                    <button
                      className="btn btn-primary"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <EventsExploreTab events={displayEvents} />
                  </>
                )}
                <UpcomingEvents />

                <section className={style["pakage-bes-picked"]}>
                  <div className="container pt-5">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-1 text-center font-weight-bold">
                          {lesserWonders.length > 0 ? "Past Events" : ""}
                        </h3>
                      </div>
                      <div className="col-md-12">
                        {lesserWonders.length > 0 && (
                          <Carousal
                            wonders={lesserWonders}
                            count={3}
                            type="past-events"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Country;
