import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function OtherBlogs(props) {
        const imageUrl = props.image || "/images/placeholder.jpg";

  return (
    <>
      <Link
        className={`item ${style["item-padding"]}`}
        href={`/blogs/${props.link}`}
        key={props.key}
      >
        <div className={style["PakageDetailsOtherPackages"]}>
          <img
            src={props.image || "/images/placeholder.jpg"}
            className="w-100"
             onError={(e) => {
    e.currentTarget.src = "/images/placeholder.jpg";
  }}
            alt=""
            style={{ height: "130px" }}
          />
          <div className={style["PakageDetailsOtherPackages-text"]}>
            <span>
              <h4 style={{
height: '64px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>{props.heading}</h4>
              <p
                style={{
                  width: "110px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {props.description}
              </p>
            </span>
            <span>
              <Link href={`/blogs/${props.link}`}>
                <FaChevronRight />
              </Link>
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default OtherBlogs;
