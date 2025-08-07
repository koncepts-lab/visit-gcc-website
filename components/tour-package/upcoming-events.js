

import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

function UpcomingEvents() {
  const [expandedDateItem, setExpandedDateItem] = useState(null);
  const containerRef = useRef(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const intervalRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedDateItem(expandedDateItem === index ? null : index);
  };

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  handleResize(); // Call on mount
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const truncateDescription = (description, maxLength) => {
    if (!description) return "";
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

  const truncateHeading = (heading, maxLength) => {
    if (!heading) return "";
    if (heading.length <= maxLength) {
      return heading;
    }
    return heading.substring(0, maxLength) + "...";
  };

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/upcoming`
        );
        const fetchedEvents = response.data.data;
        setEvents(fetchedEvents);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setIsLoading(false);
        setError("Failed to fetch packages. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  const handleImageClick = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (windowWidth >= 992) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(1);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (isDragging) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      intervalRef.current = setInterval(() => {
        if (events.length > slidesToShow) {
          setCurrentSlide(
            (prevSlide) => (prevSlide + 1) % (events.length - slidesToShow + 1)
          );
        }
      }, 6000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging, events.length, slidesToShow]);

  useEffect(() => {
    if (containerRef.current && !isDragging) {
      const slideWidth = containerRef.current.offsetWidth / slidesToShow;
      const scrollAmount =
        windowWidth >= 992
          ? currentSlide * slideWidth * 0.8
          : currentSlide * slideWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentSlide, slidesToShow, windowWidth, isDragging]);

  // --- FIX START ---
  // Abstracted the logic to snap to the correct slide into its own function.
  const snapToNearestSlide = () => {
    if (!containerRef.current) return;

    // This calculation determines how far the user has scrolled per slide.
    const slideWidth = containerRef.current.offsetWidth / slidesToShow;
    const scrollPerSlide = windowWidth >= 992 ? slideWidth * 0.8 : slideWidth;

    if (scrollPerSlide > 0) {
      // Find the nearest slide index based on the final scroll position.
      const newSlideIndex = Math.round(
        containerRef.current.scrollLeft / scrollPerSlide
      );
      
      // Ensure the calculated index is within the valid bounds.
      const maxSlideIndex = events.length - slidesToShow;
      const clampedIndex = Math.max(0, Math.min(newSlideIndex, maxSlideIndex));

      // Set the new current slide. This will trigger the expansion effect.
      setCurrentSlide(clampedIndex);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    // Only trigger the snap if a drag was in progress.
    if (isDragging) {
      setIsDragging(false);
      containerRef.current.style.cursor = "grab";
      snapToNearestSlide(); // Snap to the slide when the mouse leaves the container.
    }
  };

  const handleMouseUp = () => {
    // Only trigger the snap if a drag was in progress.
    if (isDragging) {
      setIsDragging(false);
      containerRef.current.style.cursor = "grab";
      snapToNearestSlide(); // Snap to the slide when the mouse button is released.
    }
  };
  // --- FIX END ---

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const calculateDynamicWidth = (index) => {
    const isExpanded = windowWidth >= 992 && index === currentSlide;
    const baseWidth = 100 / slidesToShow;
    return slidesToShow === 1 ? baseWidth : isExpanded ? 60 : 40;
  };

  return (
    <section className={style["pakage-bes-picked"]}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h3
              className="pb-3 pt-md-5 pt-4"
              style={{
                marginInline: "auto",
                fontWeight: 600,
                width: "fit-content",
              }}
            >
              {events.length > 0 ? "Upcoming Events" : ""}
            </h3>
          </div>
          <div className="col-md-12">
            <div className="upcoming-events-picked">
              <div className={``}>
                <div>
                  <div
                    ref={containerRef}
                    className={`${style["upcoming-carousel-container"]} `}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                      cursor: "grab",
                      userSelect: "none",
                      overflowX: "hidden",
                    }}
                  >
                    {events.map((event, index) => {
                      const dynamicWidth = calculateDynamicWidth(index);
                      const isExpanded =
                        windowWidth >= 992 && index === currentSlide;
                      const imageUrl =
                        event.event_photo_urls[0] || "/images/placeholder.jpg";

                      return (
                        <div
                          key={index}
                          className={`col-xl-${isExpanded ? 7 : 5} col-lg-${
                            isExpanded ? 7 : 5
                          } col-md-12 col-12 d-flex flex-row`}
                          style={{
                            flex: `0 0 ${dynamicWidth}%`,
                            maxWidth: `${dynamicWidth}%`,
                            transition:
                              "flex 0.3s ease-in-out, max-width 0.3s ease-in-out",
                          }}
                        >
                          <div className={`${style["upcoming-item-padding"]}`}>
                            <div className={style["event-box"]}>
                              <Link href={`/events/${event.id}`}>
                                <img
                                  src={imageUrl}
                                  className=""
                                  alt=""
                                  onClick={() => handleImageClick(event.id)}
                                  onDragStart={(e) => e.preventDefault()}
                                />
                              </Link>
                              <div className={style["event-scroll"]}>
                                <Link
                                  href={`/events/${event.id}`}
                                  className={`${style["event-upcoming-button"]} text-start`}
                                >
                                  {event.event_type.title}
                                </Link>
                                <div className={style["event-scroll-text"]}>
                                  <span>
                                    <span>
                                      <h4>
                                        {isExpanded
                                          ? truncateHeading(event.name, 100)
                                          : truncateHeading(event.name, 50)}
                                      </h4>
                                      <p className="text-black-50 d-lg-block d-none">
                                        {isExpanded
                                          ? truncateDescription(
                                              event.description,
                                              100
                                            )
                                          : truncateDescription(
                                              event.description,
                                              50
                                            )}{" "}
                                      </p>
                                      <p className="text-black-50 d-lg-none d-block">
                                        {truncateDescription(
                                          event.description,
                                          120
                                        )}{" "}
                                      </p>
                                    </span>
                                  </span>
                                </div>
                                <div className=" col-12 pt-0 ">
                                  <ul
                                    className={style["plus-ul-upcoming"]}
                                    style={{
                                      paddingBottom: isMobile ? "115px" : "70px",
                                      right: "19px",
                                    }}
                                  >
                                    {expandedDateItem === index &&
                                      event.start_date &&
                                      event.end_date &&
                                      (() => {
                                        const [
                                          startYear,
                                          startMonth,
                                          startDay,
                                        ] = event.start_date.split("-");
                                        const monthIndex = [
                                          "Jan","Feb","Mar","Apr","May","Jun",
                                          "Jul","Aug","Sep","Oct","Nov","Dec",
                                        ];
                                        const monthStartName =
                                          monthIndex[
                                            parseInt(startMonth, 10) - 1
                                          ];

                                        const [endYear, endMonth, endDay] =
                                          event.end_date.split("-");
                                        const monthEndName =
                                          monthIndex[
                                            parseInt(endMonth, 10) - 1
                                          ];

                                        return (
                                          <>
                                            <li
                                              style={{
                                                paddingInline: "5px",
                                              }}
                                            >
                                              <b>{monthStartName}</b>
                                              <br />
                                              <b>{startDay}</b>
                                            </li>
                                            <li>to</li>
                                            <li>
                                              {" "}
                                              <b>{monthEndName}</b>
                                              <br />
                                              <b>{endDay}</b>
                                            </li>
                                          </>
                                        );
                                      })()}
                                  </ul>
                                  <button
                                    className={style["btn-plus2"]}
                                    onClick={() => toggleExpand(index)}
                                  >
                                    <FiPlus />
                                  </button>
                                  <div
                                    className={` ${
                                      style["date-provider"]
                                    } ps-xl-3 ps-lg-4 ps-1 d-flex  text-black align-items-center flex-xl-row flex-lg-${
                                      isExpanded ? "row" : "column"
                                    } flex-column`}
                                  >
                                    <p
                                      className={`align-items-center text-black pt-3 pe-lg-${
                                        isExpanded ? "3" : "1"
                                      } pe-3`}
                                    >
                                      <span
                                        className={`pe-${
                                          isExpanded ? "3" : "1"
                                        } pe-md-3 pe-2`}
                                      >
                                        <FaUserCircle size={27} color="grey" />
                                      </span>
                                      <span className="fw-semibold align-self-center text-black-50 col-12">
                                        BY:{" "}
                                      </span>
                                      {event.provider}
                                    </p>
                                    <span
                                      className={`pe-3 d-xl-${
                                        isExpanded ? "block" : "none"
                                      } d-lg-${
                                        isExpanded ? "block" : "none"
                                      } d-none`}
                                    >
                                      |
                                    </span>
                                    <p
                                      className={`pt-md-3 d-block text-black d-lg-${
                                        isExpanded ? "block" : "none"
                                      }`}
                                    >
                                      {event.start_date}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {events.length > slidesToShow && (
                  <div className={style["pagination-dots"]}>
                    {Array.from({
                      length: events.length - slidesToShow + 1,
                    }).map((_, index) => (
                      <span
                        key={index}
                        className={`${style["dot"]} ${
                          index === currentSlide ? style["active"] : ""
                        }`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;