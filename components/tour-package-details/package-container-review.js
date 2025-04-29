import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";

const ArrowIcon = () => <FaArrowRightLong />;

function SinglePackageContainerReview(props) {
  return (
    <>
      <div className="item">
        <div className={style["best-picked-box"]}>
          <img
            src={props.image}
            className="w-full h-[540px] md:h-[540px] h-auto object-cover"
            // style={{ height: "540px" }}
            alt={props.heading}
          />
        </div>
      </div>
    </>
  );
}

export default SinglePackageContainerReview;
