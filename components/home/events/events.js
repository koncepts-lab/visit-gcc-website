import React from "react";
import Link from "next/link";
import style from "./events.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeEvents({ event_photo_urls, date, name, description, link }) {

    const imageUrl = event_photo_urls || "/images/placeholder.jpg";

  function formatDate(isoDateString) {
    // Return early if the input is not valid
    if (!isoDateString) {
      return "";
    }

    // Create a Date object from the input string
    const date = new Date(isoDateString);

    // Check if the created date is valid
    if (isNaN(date.getTime())) {
      return "";
    }

    // Get the day and add a leading zero if it's a single digit (e.g., 5 -> "05")
    const day = String(date.getDate()).padStart(2, "0");

    // Get the month (which is 0-indexed), add 1, and add a leading zero
    const month = String(date.getMonth() + 1).padStart(2, "0");

    // Get the full year
    const year = date.getFullYear();

    // Combine the parts into the desired format
    return `${day}-${month}-${year}`;
  }
  return (
    <Link href={`/events/${link}`} className={`item ${style["item-padding"]}`}>
      <div className={style["event-box"]}>
        <img
          src={imageUrl}
          className="w-100"
          alt={name}
          style={{ height: "214px" }}
        />
        <div className={style["date"]}>{formatDate(date)}</div>
        <h4  style={{height: '64px',
                display: '-webkit-box',
                WebkitLineClamp: 3,  
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>{name}</h4>
        <p
            style={{
                display: '-webkit-box',
                WebkitLineClamp: 4,  
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>{description}</p>
      </div>
    </Link>
  );
}

export default SingleHomeEvents;
