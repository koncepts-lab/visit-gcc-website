import React, { useState } from "react";
import Link from "next/link";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import style from "./style.module.css"; // Adjust the import according to your style file location
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdDownhillSkiing } from "react-icons/md";
import { IoBusOutline } from "react-icons/io5";
import { GiSailboat } from "react-icons/gi";

const ExploreEventsContainer = ({ events }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (index) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter((item) => item !== index)
        : [...prevExpandedItems, index]
    );
  };

  return (
    <ResponsiveMasonry>
      <Masonry>
        {events.map((event, i) => { 
          const imageUrl = event.event_photo_urls.length > 0
            ? event.event_photo_urls[0]
            : "/images/placeholder.jpg"; 
          return ( 
            <div key={i} className="masonry-item">
              <img
                src={imageUrl} // Use the conditionally determined imageUrl
                style={{ width: "100%", display: "block" }}
                alt={event.name || "Event Image"} // Changed 'event.title' to 'event.name' and added a fallback alt text
              />
              <div className="event-masonry-item-content">
                <h5>{event.name}</h5>
                <div className={style["provider-date"]}>
                  {event.provider && ( 
                    <>
                      <p className="mb-0">{event.provider}</p>
                      <span className="mx-2">|</span>
                    </>
                  )}{" "}
                  <p>{event.date}</p>
                </div>
                {/* <div className={style["star-section"]}>
                  <div className={style["star"]}>
                    <Rating
                      count={5}
                      value={event.rating}
                      size={24}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </div>
                  <div>
                    <IoChatbubbleOutline />
                  </div>
                  <div>
                    <FaRegLightbulb />
                  </div>
                </div> */}

                <ul className={style["pakages-ul"]}>
                  <li>
                    <p className="text-start">{event.description}</p>
                  </li>
                </ul>

                {/* Toggleable UL */}
                <ul className={style["plus-ul"]} style={{ paddingRight: "2px" }}>
                  {expandedItems.includes(i) &&
                    (() => {
                      // Parse event.date (e.g., "14 May, 2025")
                      const [startYear, startMonth, startDay] =
                        event.start_date.split("-");
                      const monthIndex = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ];
                      const monthStartName = monthIndex[parseInt(startMonth, 10) - 1]; // Convert to integer and adjust for 0-indexed array

                      const [endYear, endMonth, endDay] =
                        event.end_date.split("-");
                      // Assume endDate is in the same month and year (e.g., "08 May, 2025")
                      const monthEndName = monthIndex[parseInt(endMonth, 10) - 1]; // Convert to integer and adjust for 0-indexed array

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
                </ul>
                <p className="mb-3">
                  <span className="fw-bold">AED {event.adult_price}</span> /
                  person
                </p>

                <Link
                  href={`/events/${event.id}`}
                  className={`${style["event-detail-button"]} text-start`}
                >
                  {event.category}
                </Link>

                <button
                  className={style["btn-plus"]}
                  onClick={() => toggleExpand(i)}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ExploreEventsContainer;