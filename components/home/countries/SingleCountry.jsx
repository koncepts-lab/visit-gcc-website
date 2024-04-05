import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

const SingleCountry = (props) => {
  return (
    <div className="col-md-2">
      <img src={props.image} alt="" /> 
      <div>
        <h4>{props.heading}</h4>
        <ArrowIcon />
      </div>
    </div>
  );
}

export default SingleCountry;
