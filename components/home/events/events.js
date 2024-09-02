import React from 'react';
import style from './events.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeEvents(props) {
    return (
        <>
            <div className="item">   
                <div className={style['event-box']}>
                    <img src={props.image} className='w-100' alt={props.heading} />
                    <div className={style['date']}>{props.date}</div>
                    <h4>{props.heading}</h4>
                    <p>{props.description}</p>
                </div>
            </div>
        </>
    );
}

export default SingleHomeEvents;
