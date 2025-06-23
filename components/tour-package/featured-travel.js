import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

function FeaturedTravel(props) {
  return (
    <>
      <Link
        className={`item ${style["item-padding"]}`}
        href={`/tour-package/${props.id}`}
      >
        <div className={style["featured-travel"]}>
          <img src={props.image} className="w-100" style={{width: '360px', height: '300px'}} alt={props.heading} />
          <span>
            <div>
              <h4>{props.heading}</h4>
              <p>{props.description}</p>
            </div>
          </span>
        </div>
      </Link>
    </>
  );
}

export default FeaturedTravel;
