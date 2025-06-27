import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleBestPicked({ packages, type }) {
  return (
    <Link
      href={
        type === "tour-bestPicked"
          ? `/tour-package/${packages.id}`
          : `/attractions/${packages.id}`
      }
    >
      <div className={`item ${style["item-padding"]}`} >
        <div className={style["best-picked-box"]}>
          <img
            src={packages?.photo_urls?.[0] || "/images/placeholder.jpg"}
            className="w-100"
            style={{ width: "360px", height: "330px" }}
            alt={packages.name}
          />
          <span>
            <h4>{packages.name}</h4>
            <p>{packages.description}</p>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default SingleBestPicked;
