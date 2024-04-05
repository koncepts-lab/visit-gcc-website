import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
const ArrowIcon = () => <FaArrowRightLong />;
 
function SingleEvents(props) {
  return (
    <>
    <div  className="item">
    <div className='event-box'>
      <img src={props.image} className='w-100' alt="" />
      <div className='date'>{props.date}</div>
        <h4>{props.heading}</h4>
        <p>{props.description}</p>
       
      </div>
    </div>
    
    </>
  )
}

export default SingleEvents



