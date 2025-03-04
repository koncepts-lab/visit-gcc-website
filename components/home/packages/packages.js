import React from "react";
import Link from "next/link";
import style from "./pakages.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomePackage({ link, photo_url, name, description }) {
  return (
    <Link
      href={`/tour-package/${link}`}
      className={`item ${style["item-padding"]}`}
      style={{ height: "244px" }}
    >
      <div className={style["bg-black-shade"]}></div>
      <img src={photo_url} className="w-100" alt={name} />
      <div className={style["home-packages-text"]}>
        <h4>{name}</h4>
        <p>{description}</p>
        <ArrowIcon />
      </div>
    </Link>
  );
}

export default SingleHomePackage;
