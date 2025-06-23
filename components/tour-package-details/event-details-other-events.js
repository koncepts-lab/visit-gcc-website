import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function PakageDetailsOtherPackages(props) {
  return (
    <>
      <Link
        className={`item ${style["item-padding"]}`}
        href={`/events/${props.events.id}`}
      >
        <div className={style["PakageDetailsOtherPackages"]}>
          <img
            src={
              props.events.event_photo_urls[0] || "/images/placeholder.jpg"
            }
            className="w-100"
            alt=""
            style={{ height: "146px" }}
          />
          <div className={style["PakageDetailsOtherPackages-text"]}>
            <span>
              <h4>{props.events.name}</h4>
              <p style={{ fontSize: "14px" }}>{props.events.description}</p>
            </span>
            <span>
              <Link href={`/events/${props.events.id}`}>
                <FaChevronRight />
              </Link>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PakageDetailsOtherPackages;
