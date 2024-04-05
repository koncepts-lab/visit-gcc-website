import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const ArrowIcon = () => <FaArrowRightLong />;
 
function SingleExperience(props) {
  return (
    <>
    <div  className="item">
    <div className='experience-box'>
      <img src={props.image} className='w-100' alt="" />
      <h4>{props.heading}</h4>
       
      </div>
    </div>
    
    </>
  )
}

export default SingleExperience



