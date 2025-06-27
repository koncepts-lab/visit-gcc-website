import React from "react";
import Link from "next/link";
import style from "./pakages.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomePackage({ link, photo_url, name, description }) {
  const imageUrl = photo_url || "/images/placeholder.jpg";

  return (
    <Link
      href={`${link}`}
      className={`item ${style["item-padding"]}`}
      style={{ height: "auto" }}
    >
      <div className={style["bg-black-shade"]}></div>
      <img
        src={imageUrl} 
        className="w-100"
        alt={name || "Package Image"} 
        style={{ height: "230px" }}
      />
      <div className={style["home-packages-text"]}>
        <h4 style={{height: '64px'}}>{name}</h4>
        <p   style={{
    display: '-webkit-box',
    WebkitLineClamp: 2,  
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  }}>{description}</p>
        <ArrowIcon />
      </div>
    </Link>
  );
}

export default SingleHomePackage;