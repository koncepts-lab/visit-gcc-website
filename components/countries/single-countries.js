import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import style from './style.module.css'; // Ensure the correct path to your CSS module

const ArrowIcon = () => <FaArrowRightLong />;

const SingleCountry = (props) => {
  return (
    <div className="col-xxl-2 col-xl-2 col-lg-4 col-md-2 col-sm-2 col-6">
      <img src={props.image} alt={props.heading} />
      <div className={style['title-countries']}>
        <h4>{props.heading}</h4>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default SingleCountry;
