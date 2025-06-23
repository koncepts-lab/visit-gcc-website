import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function PakageDetailsOtherPackages(props) {
  return (
    <>
      <Link
        className={`item ${style["item-padding"]}`}
        href={`/tour-package/${props.packages.id}`}
      >
        <div className={style["PakageDetailsOtherPackages"]}>
          <img
            src={
              props.packages?.photo_urls[0] || "/images/placeholder.jpg"
            }
            className="w-100"
            alt=""
            style={{ height: "146px" }}
          />
          <div className={style["PakageDetailsOtherPackages-text"]}>
            <span>
              <h4>{props.packages.name}</h4>
              <p style={{ fontSize: "14px" }}>{props.packages.description}</p>
            </span>
            <span>
              <Link href="#0">
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
