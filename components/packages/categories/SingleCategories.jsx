import React from 'react';
import Link from 'next/link';
import { FaRegHeart } from "react-icons/fa";

const SingleCategories = ({ value }) => {
  return (
    <div className="item" key={value.id}>
      <div className='blog-box pakage-item'>
        <img src={value.image} className='w-100' alt="" />
        <div className='star-icon'><FaRegHeart /></div>
        <div className='ratings'>{value.ratings}</div>
        <h4>{value.heading}</h4>
        <p>{value.description}</p>
        <div className='full-box'>
          <div className='half-box'>From <b>AED {value.price}</b>/ Person</div>
          <div className='half-box'>
          <Link href={`packages/${value.slug}`} className='details-btn'>View Details</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCategories;
