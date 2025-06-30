import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

// 🧠 Helper to clamp description to 9 words
function truncateToWords(text, wordLimit = 9) {
  if (!text) return "";
  const words = text.trim().split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "…";
}

function SingleBestPicked({ packages, type }) {
  return (
    <Link
      href={
        type === "tour-bestPicked"
          ? `/tour-package/${packages.id}`
          : `/attractions/${packages.id}`
      }
    >
      <div className={`item ${style["item-padding"]}`}>
        <div className={style["best-picked-box"]}>
          <img
            src={packages?.photo_urls?.[0] || "/images/placeholder.jpg"}
            className="w-100"
            style={{ width: "360px", height: "330px" }}
            alt={packages.name}
          />
          <span>
            <h4>{packages.name}</h4>
            <p style={{height: '60px'}}>{truncateToWords(packages.description, 8)}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default SingleBestPicked;
