import React from 'react';
import Link from 'next/link';
import style from './events.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeEvents({ event_photo_urls, date, name, description, link }) {
    console.log(date); // Debugging line
    return (
        <Link href={`/event-details/${link}`} className={`item ${style['item-padding']}`}>
            <div className={style['event-box']}>
                <img src={event_photo_urls} className='w-100' alt={name} />
                <div className={style['date']}>{date}</div>
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
        </Link>
    );
}


export default SingleHomeEvents;
