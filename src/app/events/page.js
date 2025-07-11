"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Range } from "react-range";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Link from "next/link";
import Banner from "../../../components/banner/banner";
import Carousal from "../../../components/carousel/Carousal";
import { LuMenu } from "react-icons/lu";
import Accordion from "../../../components/accordion/accordion";
import EventsExploreTab from "../../../components/tour-package/events-explore";
import UpcomingEvents from "../../../components/tour-package/upcoming-events";
import { useLoading } from "@components/LoadingProvider";

const Country = () => {
  const { setIsLoading } = useLoading();

  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [lesserWonders, setLesserWonders] = useState([]);
  const [error, setError] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  const today = new Date();
  const [filters, setFilters] = useState({
    priceRange: [30, 3900],
    selectedDate: today,
    selectedItems: {},
  });

  // --- CHANGE ---
  // Added `filterEndpoint` to accordion data for cleaner API calls.
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
      apiEndpoint: "event-types/get-event-types",
      filterEndpoint: "events",
    },
    {
      title: "EVENT LOCATION",
      items: [],
      apiEndpoint: "event-locations/get-event-locations",
      filterEndpoint: "events",
    },
    {
      title: "EVENT FORMAT",
      items: [],
      apiEndpoint: "event-formats/get-event-formats",
      filterEndpoint: "events",
    },
    {
      title: "LANGUAGE",
      items: [],
      apiEndpoint: "languages/get-languages",
      filterEndpoint: "events",
    },
    {
      title: "DURATION",
      items: [],
      apiEndpoint: "event-durations/get-event-durations",
      filterEndpoint: "events",
    },
    {
      title: "AGE GROUP",
      items: [],
      apiEndpoint: "age-groups/get-age-groups",
      filterEndpoint: "events",
    },
  ]);

  const isCalendarDateActive = () => {
    const todayDate = new Date();
    const selected = filters.selectedDate;
    return (
      selected.getFullYear() !== todayDate.getFullYear() ||
      selected.getMonth() !== todayDate.getMonth() ||
      selected.getDate() !== todayDate.getDate()
    );
  };

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

  const filterByCalendarDate = (events, selectedDate) => {
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    return events.filter(
      (event) =>
        selectedDateString >= event.start_date &&
        selectedDateString <= event.end_date
    );
  };

  // --- CHANGE ---
  // Replaced the old API filtering function with the more robust version
  // that uses `filterEndpoint` and a `switch` statement.
  const fetchFilteredEventsByAPI = async (sectionTitle, selectedIds) => {
    const section = accordionData.find((item) => item.title === sectionTitle);
    if (!section || !section.filterEndpoint) return [];
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}${section.filterEndpoint}`;
      let params = [];
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

  const applyAllFilters = useCallback(async () => {
    // Start with a clean copy of all events
    let baseEvents = [...allEvents];
    const { priceRange, selectedDate, selectedItems } = filters;
    const isPriceFilterActive = priceRange[0] !== 30 || priceRange[1] !== 3900;
    const isCalendarDateFilterActive = isCalendarDateActive();
    const hasAccordionFilters = Object.values(selectedItems).some(
      (arr) => arr.length > 0
    );

    // If no filters are active at all, just show all events.
    if (
      !isPriceFilterActive &&
      !isCalendarDateFilterActive &&
      !hasAccordionFilters
    ) {
      setFilteredEvents(allEvents);
      return;
    }

    // --- API FILTERING LOGIC ---
    // Identify sections that need API filtering (i.e., not the "DATE" section)
    const apiFilterSections = Object.keys(selectedItems).filter(
      (section) => section !== "DATE" && selectedItems[section]?.length > 0
    );

    // If there are any API-based filters active, fetch and intersect the results.
    if (apiFilterSections.length > 0) {
      const filteredEventsSets = await Promise.all(
        apiFilterSections.map((section) =>
          fetchFilteredEventsByAPI(section, selectedItems[section])
        )
      );

      // If any filter returned results, calculate the intersection
      if (filteredEventsSets.length > 0) {
        // Start with the first set of results
        const initialSet = filteredEventsSets[0];
        const initialSetIds = new Set(initialSet.map((e) => e.id));

        // Find the common events by ID across all fetched sets
        const intersectedIds = filteredEventsSets
          .slice(1)
          .reduce((acc, currentSet) => {
            const currentSetIds = new Set(currentSet.map((e) => e.id));
            return new Set([...acc].filter((id) => currentSetIds.has(id)));
          }, initialSetIds);

        // The new base for filtering is the events that match all API filters
        baseEvents = allEvents.filter((event) =>
          intersectedIds.has(event.id)
        );
      }
    }

    // --- CLIENT-SIDE FILTERING ---
    // Apply remaining filters on the (potentially smaller) baseEvents list.
    let finalFilteredEvents = baseEvents;

    if (selectedItems["DATE"] && selectedItems["DATE"].length > 0) {
      finalFilteredEvents = filterByDateOption(
        finalFilteredEvents,
        selectedItems["DATE"][0]
      );
    }
    if (isPriceFilterActive) {
      finalFilteredEvents = filterByPrice(finalFilteredEvents, priceRange);
    }
    if (isCalendarDateFilterActive) {
      finalFilteredEvents = filterByCalendarDate(
        finalFilteredEvents,
        selectedDate
      );
    }

    setFilteredEvents(finalFilteredEvents);
  }, [allEvents, filters]);

  // Consolidated useEffect for initial page load (from your correct version)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [eventsRes, pastEventsRes, ...accordionRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}events`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}events/get-lesser-known-events`
          ),
          ...accordionData.map((section) => {
            if (!section.apiEndpoint)
              return Promise.resolve({ data: { data: section.items } });
            return axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}${section.apiEndpoint}`
            );
          }),
        ]);

        const fetchedEvents = eventsRes.data.data || eventsRes.data || [];
        setAllEvents(fetchedEvents);
        setFilteredEvents(fetchedEvents);

        const fetchedPastEvents = pastEventsRes.data;
        setLesserWonders(fetchedPastEvents);

        const newAccordionData = await Promise.all(
          accordionRes.map(async (response, index) => {
            const section = accordionData[index];
            if (!section.apiEndpoint) return section;
            const fetchedItems = response.data.data || response.data || [];
            const formattedItems = fetchedItems.map((item) => ({
              id: item.id,
              title: item.title || item.name,
            }));
            return { ...section, items: formattedItems };
          })
        );
        setAccordionData(newAccordionData);
      } catch (err) {
        console.error("Error fetching initial page data:", err);
        setError("Failed to fetch page data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [setIsLoading]); // Note: an empty dependency array would be better here if accordionData isn't meant to be refetched.

  const handleToggle = () => setIsToggled(!isToggled);

  useEffect(() => {
    if (allEvents.length > 0) {
      applyAllFilters();
    }
  }, [filters, allEvents, applyAllFilters]);

  const handlePriceRangeChange = (values) =>
    setFilters((prev) => ({ ...prev, priceRange: values }));
  const handleDateChange = (date) =>
    setFilters((prev) => ({ ...prev, selectedDate: date }));
  const handleAccordionItemClick = (sectionIndex, clickedId) => {
    const section = accordionData[sectionIndex];
    if (!section) return;
    const itemId = clickedId;
    const sectionTitle = section.title;
    setFilters((prev) => {
      const newSelectedItems = { ...prev.selectedItems };
      if (sectionTitle === "DATE") {
        newSelectedItems[sectionTitle] = newSelectedItems[
          sectionTitle
        ]?.includes(itemId)
          ? []
          : [itemId];
      } else {
        const currentSelection = newSelectedItems[sectionTitle] || [];
        newSelectedItems[sectionTitle] = currentSelection.includes(itemId)
          ? currentSelection.filter((id) => id !== itemId)
          : [...currentSelection, itemId];
      }
      return { ...prev, selectedItems: newSelectedItems };
    });
  };
  const clearAllFilters = () => {
    setFilters({
      priceRange: [30, 3900],
      selectedDate: new Date(),
      selectedItems: {},
    });
  };

  function isAnyFilterActive() {
    const { priceRange, selectedItems } = filters;
    return (
      priceRange[0] !== 30 ||
      priceRange[1] !== 3900 ||
      isCalendarDateActive() ||
      Object.values(selectedItems).some((arr) => arr.length > 0)
    );
  }

  const displayEvents = isAnyFilterActive() ? filteredEvents : allEvents;
  const noResultsFound = isAnyFilterActive() && filteredEvents.length === 0;

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <section className={style["events-full-container"]}>
        <div className="container">
          <Link
            className="row"
            href={allEvents.length > 0 ? `/events/${allEvents[0]?.id}` : "#"}
            style={{ textDecoration: "none" }}
          >
            <div className="col-md-6">
              <img
                src={
                  allEvents?.[0]?.event_photo_urls?.[0] ||
                  "/images/placeholder.jpg"
                }
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.jpg";
                }}
                className="img-fluid w-100"
                style={{ maxHeight: "487px", objectFit: "cover" }}
                alt="Featured Event"
              />
            </div>
            <div className={`col-md-6 ${style["d-flex"]}`}>
              <div className={style["events-top-text"]}>
                <h3 className="mt-md-0 mt-4">{allEvents[0]?.name}</h3>
                <p
                  className="mb-2"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {allEvents[0]?.highlight}
                </p>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {allEvents[0]?.description}
                </p>
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
            <div className={style["tour-packagebtn-container"]}>
              <button
                className={style["btn-toggle"]}
                onClick={handleToggle}
                style={{ background: "none", border: "none" }}
              >
                <LuMenu /> FILTER
              </button>
            </div>
            <div className="row">
              <div className="col-md-3 mb-4">
                <div
                  className={`p-3 ${style["event-left-container"]} ${
                    isToggled ? style["highlight"] : ""
                  }`}
                >
                  <h4 className="pt-2">Price Range</h4>
                  <div className={style["price-range"]}>
                    <Range
                      step={10}
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
                        Price: AED {filters.priceRange[0]} — AED{" "}
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
                        items={accordion.items}
                        isOpenInitially={true}
                        onItemClick={(clickedId) =>
                          handleAccordionItemClick(index, clickedId)
                        }
                        selectedItems={
                          filters.selectedItems[accordion.title] || []
                        }
                      />
                    ))}
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-secondary col-12"
                      onClick={clearAllFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={`col-md-8 ${
                  isToggled ? style["filter-full-width"] : ""
                }`}
              >
                <h3>Explore the Latest Events and Happenings</h3>
                {noResultsFound ? (
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
                  <EventsExploreTab events={displayEvents} />
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