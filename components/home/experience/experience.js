import React from 'react';
import Link from 'next/link';
import style from './experience.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeExperience(props) {
    return (
        <>
        <Link href={`/tour-package/${props.link}`}  className={`item ${style['item-padding']}`}>
                <div className={style['experience-box']}>
                    <img src={props.photo_urls} className='w-100' alt="" />
                    <h4>{props.name}</h4>
                </div>
            </Link>
        </>
    );
}

export default SingleHomeExperience;
