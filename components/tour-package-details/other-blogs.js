import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaChevronRight } from "react-icons/fa6";

function OtherBlogs(props) {
  return (
    <>
      <Link
        className={`item ${style["item-padding"]}`}
        href={`/blogs/${props.link}`}
        key={props.key}
      >
        <div className={style["PakageDetailsOtherPackages"]}>
          <img
            src={props.image}
            className="w-100"
            alt=""
            style={{ height: "130px" }}
          />
          <div className={style["PakageDetailsOtherPackages-text"]}>
            <span>
              <h4>{props.heading}</h4>
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
