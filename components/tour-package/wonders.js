import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

function Singlewonders(props) {
  return (
    <>
      <Link
        className={`item ${style["single-item-padding"]}`}
        href={`/events/${props.id}`}
      >
        <div className={style["best-picked-box"]}>
          <img src={props.image} className="w-100" alt={props.heading} />
          <span>
            <h4>{props.heading}</h4>
            <p>{props.description}</p>
          </span>
        </div>
      </Link>
    </>
  );
}

export default Singlewonders;
