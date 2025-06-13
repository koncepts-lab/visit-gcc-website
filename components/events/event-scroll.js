import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function EventScroll({ key, id, image, heading, description }) {
  return (
    <>
      <div className={`item ${style["item-padding"]}`} key={key}>
        <div className={style["event-scroll"]}>
          <img src={image} className="w-100" alt="" />
          <div className={style["event-scroll-text"]}>
            <span>
              <h4>{heading}</h4>
              <p>{description}</p>
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
