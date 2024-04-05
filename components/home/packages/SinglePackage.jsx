import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const ArrowIcon = () => <FaArrowRightLong />;
 
function SinglePackage(props) {
  return (
    <>
    <div  className="item">
      <img src={props.image} className='w-100' alt="" /> 
      <div>
        <h4>{props.heading}</h4>
        <p>{props.description}</p>
        <ArrowIcon />
      </div>
    </div>
    
    </>
  )
}

export default SinglePackage
