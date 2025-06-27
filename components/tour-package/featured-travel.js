import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

function truncateToWords(text, wordLimit = 70) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "…";
}

function FeaturedTravel(props) {
  return (
    <>
      <Link className={`item ${style["item-padding"]}`} href={props.link}>
        <div className={style["featured-travel"]}>
          <img
            src={props.image || "/images/placeholder.jpg"}
            className="w-100"
            style={{ width: "360px", height: "300px" }}
            alt={props.heading}
          />
          <span>
            <div className="p-3">
              <h4 style={{height: '54px'}}>{truncateToWords(props.heading, 5)}</h4>
              <p className="text-black">
                {truncateToWords(props.description, 8)}
              </p>
            </div>
          </span>
        </div>
      </Link>
    </>
  );
}

export default FeaturedTravel;
