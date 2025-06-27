import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function EventScroll({ key, id, image, heading, description }) {
  const imageUrl = image || "/images/placeholder.jpg"; 

  return (
    <>
      <div className={`item ${style["item-padding"]}`} key={key}>
        <div className={style["event-scroll"]}>
          <img src={imageUrl} className="w-100" style={{width: "360px", height: '263px'}} alt={heading || "Event"} /> {/* Added alt for accessibility */}
          <div className={style["event-scroll-text"]}>
            <span>
              <h4 style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,  
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              height: '64px'
                            }}>{heading}</h4>
              <p  style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 4,  
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>{description}</p>
            </span>
            <span>
              <Link href={`/events/${id}`}>
                <FaChevronRight />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventScroll;