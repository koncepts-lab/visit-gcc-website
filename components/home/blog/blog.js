import React from "react";
import Link from "next/link";
import style from "./blog.module.css";

function SingleHomeBlog(props) {
  return (
    <Link
      href={`/blogs/${props.link}`}
      className={`item ${style["item-padding"]}`}
    >
      <div className={style["blog-box"]}>
        <img src={props.image} className="w-100" alt="" />
        <h4>{props.heading}</h4>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}

export default SingleHomeBlog;
