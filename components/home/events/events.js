import React from "react";
import Link from "next/link";
import style from "./events.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeEvents({ event_photo_urls, date, name, description, link }) {
  const imageUrl = event_photo_urls || "/images/placeholder.jpg";

  // --- MODIFICATION IS HERE ---
  function formatDate(isoDateString) {
    // Return early if the input is not valid
    if (!isoDateString) {
      return "";
    }

    const date = new Date(isoDateString);

    // Check if the created date is valid
    if (isNaN(date.getTime())) {
      return "";
    }

    // Define the options for the "25 July 2025" format
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    // Use toLocaleDateString with the 'en-GB' locale to get the correct order
    return date.toLocaleDateString("en-GB", options);
  }
  // --- END OF MODIFICATION ---

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
        <h4
          style={{
            height: "64px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginTop: "20px",
          }}
        >
          {name}
        </h4>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "90px",
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  );
}

export default SingleHomeEvents;
