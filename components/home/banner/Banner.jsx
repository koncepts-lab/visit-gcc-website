import React from 'react';
import { CiSearch } from "react-icons/ci";
import './banner.css';

function Banner() {
  return (
    <div className='banner' >
      <div className='search'>
        <h2 className='text-center'>Explore Boundless Beauty: Visit GCC, 
          Where Culture Meets Charm!</h2>
        <input type="text" placeholder="Type your destination" />
        <button><CiSearch /></button>
      </div>
    </div>
  );
}



export default Banner;