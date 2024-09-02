import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";

const ArrowIcon = () => <FaArrowRightLong />;

function FeaturedTravel(props) {
    return (
        <>
            <div   className={`item ${style['item-padding']}`}>
                <div className={style['featured-travel']}>
                    <img src={props.image} className='w-100' alt={props.heading} />
                    <span>
                        <div>
                        <h4>{props.heading}</h4>
                        <p>{props.description}</p>
                        </div>
                    </span>

                </div>
            </div>
        </>
    );
}

export default FeaturedTravel;

