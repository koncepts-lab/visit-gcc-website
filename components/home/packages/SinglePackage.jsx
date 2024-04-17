import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const ArrowIcon = () => <FaArrowRightLong />;
 
function SinglePackage(props) {
  return (
    <>
    <a  className="item">
      <div className='bg-black-shade'></div>
      <img src={props.image} className='w-100' alt="" /> 
      <div>
        <h4>{props.heading}</h4>
        <p>{props.description}</p>
        <ArrowIcon />
      </div>
    </a>
    
    </>
  )
}

export default SinglePackage
