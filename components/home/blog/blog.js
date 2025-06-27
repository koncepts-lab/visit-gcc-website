import React from "react";
import Link from "next/link";
import style from "./blog.module.css";

function SingleHomeBlog(props) {
      const imageUrl = props.image || "/images/placeholder.jpg";

  return (
    <Link
      href={`/blogs/${props.link}`}
      className={`item ${style["item-padding"]}`}>
      <div className={style["blog-box"]}>
        <img
          src={imageUrl}
          className="w-100"
          alt=""
          style={{ height: "152px" }}
        />
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
      </div>
    </Link>
  );
}

export default SingleHomeBlog;
