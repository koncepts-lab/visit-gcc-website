import React from 'react';
import Link from 'next/link';
import style from './events.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeEvents({ image, date, heading, description }) {
    console.log(date); // Debugging line
    return (
        <Link href="event-details" className={`item ${style['item-padding']}`}>
            <div className={style['event-box']}>
                <img src={image} className='w-100' alt={heading} />
                <div className={style['date']}>{date}</div>
                <h4>{heading}</h4>
                <p>{description}</p>
            </div>
        </Link>
    );
}


export default SingleHomeEvents;
