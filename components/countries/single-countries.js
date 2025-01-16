import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import { FaArrowRightLong } from "react-icons/fa6";
import style from './style.module.css'; // Ensure the correct path to your CSS module

const ArrowIcon = () => <FaArrowRightLong />;



const SingleCountry = (props) => {
  return (
    <div className="col-xxl-2 col-xl-2 col-lg-4 col-md-2 col-sm-2 col-6">
      <Link href={props.link}> {/* Pass link directly without curly braces */}
        <img src={props.image} alt={props.heading} />
        
      </Link>
    </div>
  );
}

export default SingleCountry;
