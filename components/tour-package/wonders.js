import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

// 🔪 Truncates any text to N words and adds ellipsis if needed
function truncateToWords(text, wordLimit = 9) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "…";
}

function Singlewonders(props) {
  return (
    <>
      <Link
        className={`item ${style["single-item-padding"]}`}
        href={`${props.link}`}
      >
        <div className={style["best-picked-box"]}>
          <img
            src={props.image || "images/placeholder.jpg"}
            className="w-100"
            style={{ width: "360px", height: "312px" }}
            alt={props.heading}
          />
          <span>
            <h4 >{truncateToWords(props.description, 6)}</h4>
            <p style={{height: '52px'}}>{truncateToWords(props.description, 7)}</p>
          </span>
        </div>
      </Link>
    </>
  );
}

export default Singlewonders;
