import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";

const ArrowIcon = () => <FaArrowRightLong />;

function SinglePackageContainerReview(props) {
   //console.log("🚀 ~ image:", props);
          const imageUrl = props.image || "/images/placeholder.jpg";      
  return (
    <>
      <style>
        {`
          .responsive-image {
            height: 540px;
            width: 100%;
            object-fit: cover;
          }

          @media (max-width: 768px) {
            .responsive-image {
              height: auto !important;
            }
          }
        `}
      </style>

      <div className="item">
        <div className={style["best-picked-box"]}>
          <img
            src={imageUrl}
            className="w-100 sm:h-auto responsive-image"
            style={{ height: "540px" }}
            alt={props.heading}
          />
        </div>
      </div>
    </>
  );
}

export default SinglePackageContainerReview;
