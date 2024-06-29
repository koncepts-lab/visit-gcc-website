import React from 'react';
import style from './experience.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomeExperience(props) {
    return (
        <>
            <a className="item">
                <div className={style['experience-box']}>
                    <img src={props.image} className='w-100' alt="" />
                    <h4>{props.heading}</h4>
                </div>
            </a>
        </>
    );
}

export default SingleHomeExperience;
