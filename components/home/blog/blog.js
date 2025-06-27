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
        <h4 
            style={{
              height: '44px',
        display: '-webkit-box',
        WebkitLineClamp: 2,  
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>{props.heading}</h4>
        <p
    style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,  
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}
        >
          {props.description}
        </p>
      </div>
    </Link>
  );
}

export default SingleHomeBlog;
