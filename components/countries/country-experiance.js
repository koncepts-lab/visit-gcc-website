import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { FaUser } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

function CountryExperiance(props) {
  return (
    <Link href={`/blogs/${props.blogs.uuid_id}`}>
      <div className={`${style["flip-container"]} item`}>
        <div className={style["flipper"]}>
          <div className={style["front"]}>
            {/* front content */}
            <img
              src={props.blogs.banner_image_url}
                          onError={(e) => {
    e.currentTarget.src = "/images/placeholder.jpg"; // Fallback if image fails to load
  }}
              alt={props.blogs.heading}
              className="w-100" style={{height: '250px'}}
            />
            <div className={style["block-content"]}>
              <h4>{props.blogs.heading}</h4>
              <div className={style["tag"]}>
                <span>
                  <FaUser />
                </span>
                {props.blogs.author_name}
              </div>
              {/* <div className={style["tag"]}>
                <span>
                  <BsChatFill />
                </span>
                0 Comment
              </div>
              <div className={style["tag"]}>
                <span>
                  <AiFillLike />
                </span>
                {props.blogs.number_of_likes} Likes
              </div> */}
            </div>
          </div>
          <div className={style["back"]}>
            {/* back content */}
            <h3>
              <FaTwitter />
            </h3>
            <p>{props.blogs.description1}</p>
            {/* <Link
            href={`/blogs/${props.blogs.uuid_id}`}
            target=""
            rel="noopener noreferrer"
          >
            {props.link}
          </Link> */}
            <div className={style["block-content"]}>
              <div className={style["tag"]}>
                <span>
                  <FaUser />
                </span>
                {props.blogs.author_name}
              </div>
              {/* <div className={style["tag"]}>
                <span>
                  <BsChatFill />
                </span>
                0 Comment
              </div>
              <div className={style["tag"]}>
                <span>
                  <AiFillLike />
                </span>
                {props.blogs.number_of_likes} Likes
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CountryExperiance;
