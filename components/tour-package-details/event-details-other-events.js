import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function PakageDetailsOtherPackages(props) {
  return (
    <div className={style["package-card"]}>
      <div className={style["package-image"]}>
        <img
          src={props.events.event_photo_urls[0]}
          alt={props.events.name || "Package Image"}
          className="img-fluid"
        />
      </div>
      <div className={style["package-content"]}>
        <h5>{props.events.name || "No Heading Available"}</h5>
        <p>{props.events.description || "No Description Available"}</p>
        <Link
          href={`/packages/${props.events.id}`}
          className={style["package-link"]}
        >
          Learn More <FaChevronRight className={style["chevron-icon"]} />
        </Link>
      </div>
    </div>
  );
}

export default PakageDetailsOtherPackages;
