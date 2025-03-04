import React from 'react';
import Link from 'next/link';
import style from './experience.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeExperience(props) {
    return (
        <>
        <Link href="tour-package-details"  className={`item ${style['item-padding']}`}>
                <div className={style['experience-box']}>
                    <img src={props.image} className='w-100' alt="" />
                    <h4>{props.heading}</h4>
                </div>
            </Link>
        </>
    );
}

export default SingleHomeExperience;
