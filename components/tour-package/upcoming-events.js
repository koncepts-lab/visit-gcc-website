import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

function UpcomingEvents() {
  // Corrected state to hold the index of the expanded item, or null if none are expanded
  const [expandedDateItem, setExpandedDateItem] = useState(null);
  const containerRef = useRef(null);
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(2); // Default value
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Corrected function to toggle expansion for a specific item by its index
  const toggleExpand = (index) => {
    setExpandedDateItem(expandedDateItem === index ? null : index);
  };

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
  const [allEvents, setAllEvents] = useState([]);
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
        setAllEvents(fetchedEvents);
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
    // Check if window is defined for server-side rendering
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      // Set initial width
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
    const interval = setInterval(() => {
      if (events.length > slidesToShow) {
        setCurrentSlide(
          (prevSlide) => (prevSlide + 1) % (events.length - slidesToShow + 1)
        );
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [events.length, slidesToShow]);

  useEffect(() => {
    if (containerRef.current) {
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
  }, [currentSlide, slidesToShow, windowWidth]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault(); // Prevent text selection during drag
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Reduced scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Function to calculate dynamic width based on expanded state
  const calculateDynamicWidth = (index) => {
    const isExpanded = windowWidth >= 992 && index === currentSlide; // Only expand on larger screens and if it's the current slide
    const baseWidth = 100 / slidesToShow; // Width when not expanded

    let expandedWidth;

    if (slidesToShow === 1) {
      expandedWidth = isExpanded ? baseWidth : baseWidth; // Adjusted for single slide view
    } else {
      expandedWidth = isExpanded ? 60 : 40; // Adjusted for two slide view
    }

    return expandedWidth;
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
                      cursor: isDragging ? "grabbing" : "grab",
                      userSelect: "none",
                      overflowX: "hidden", // Hide scrollbar
                    }}
                  >
                    {events.map((event, index) => {
                      const dynamicWidth = calculateDynamicWidth(index);
                      const isExpanded =
                        windowWidth >= 992 && index === currentSlide;
                      const imageUrl =
                        event.event_photo_urls[0] || "/images/placeholder.jpg"; // Use placeholder if 'image' is falsy

                      return (
                        <div
                          key={index}
                          className={`col-xl-${isExpanded ? 7 : 5} col-lg-${
                            isExpanded ? 7 : 5
                          } col-md-12 col-12 d-flex flex-row`}
                          style={{
                            flex: `0 0 ${dynamicWidth}%`, // control width of item
                            maxWidth: `${dynamicWidth}%`,
                            transition:
                              "flex 0.3s ease-in-out, max-width 0.3s ease-in-out", // Smooth transition
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
                                      paddingBottom: "70px",
                                      right: "19px",
                                    }}
                                  >
                                    {/* --- FIX START --- */}
                                    {/* Corrected logic to show date only for the clicked item */}
                                    {expandedDateItem === index &&
                                      event.start_date &&
                                      event.end_date &&
                                      (() => {
                                        const [startYear, startMonth, startDay] =
                                          event.start_date.split("-");
                                        const monthIndex = [
                                          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                                        ];
                                        const monthStartName =
                                          monthIndex[parseInt(startMonth, 10) - 1];

                                        const [endYear, endMonth, endDay] =
                                          event.end_date.split("-");
                                        const monthEndName =
                                          monthIndex[parseInt(endMonth, 10) - 1];

                                        return (
                                          <>
                                            <li style={{ paddingInline: "5px" }}>
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
                                    {/* --- FIX END --- */}
                                  </ul>
                                  <button
                                    className={style["btn-plus2"]}
                                    style={{
                                      // marginTop: "-35px",
                                      // right: "50px",
                                    }}
                                    // Corrected onClick to pass the item's index
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
                                    // style={{padding: '5px 0',marginTop: '50px', borderTop: '1px solid black'}}
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
                                      } d-lg-${isExpanded ? "block" : "none"} d-none`}
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