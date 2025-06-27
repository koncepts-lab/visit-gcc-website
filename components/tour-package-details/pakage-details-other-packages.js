import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function PakageDetailsOtherPackages({ packages, type }) {
  const href =
    type === "pakage-details-other-packages"
      ? `/tour-package/${packages.id}`
      : `/attractions/${packages.id}`;

  return (
    <Link className={`item ${style["item-padding"]}`} href={href}>
      <div className={style["PakageDetailsOtherPackages"]}>
        <img
          src={packages?.photo_urls?.[0] || "/images/placeholder.jpg"}
          className="w-100"
          alt={packages.name}
          style={{ height: "146px" }}
        />
        <div className={style["PakageDetailsOtherPackages-text"]}>
          <span>
            <h4>{packages.name}</h4>
            <p style={{ fontSize: "14px" }}>{packages.description}</p>
          </span>
          <span>
            <FaChevronRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default PakageDetailsOtherPackages;
