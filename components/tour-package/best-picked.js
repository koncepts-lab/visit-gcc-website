import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from "next/link";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleBestPicked(props) {
  return (
    <>
      <Link href={`/tour-package/${props.packages.id}`}>
        <div className={`item ${style["item-padding"]}`}>
          <div className={style["best-picked-box"]}>
            <img
              src={props.packages.photo_urls[0]}
              className="w-100"
              alt={props.packages.name}
            />
            <span>
              <h4>{props.packages.name}</h4>
              <p>{props.packages.description}</p>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default SingleBestPicked;
