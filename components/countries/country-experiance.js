import React from 'react';
import style from './style.module.css';
import { FaUser } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

function CountryExperiance(props) {
    return (
        <div className={`${style['flip-container']} item`} ontouchstart="this.classList.toggle('hover');">
            <div className={style['flipper']}>
                <div className={style['front']}>
                    {/* front content */}
                    <img src={props.image} alt={props.heading} className='w-100' />
                    <div className={style['block-content']}>
                        <h4>{props.heading}</h4>
                        <div className={style['tag']}><span><FaUser /></span>Name</div>
                        <div className={style['tag']}><span><BsChatFill /></span>0 Comment</div>
                        <div className={style['tag']}><span><AiFillLike /></span>0 Likes</div>
                    </div>
                </div>
                <div className={style['back']}>
                    {/* back content */}
                    <h3><FaTwitter /></h3>
                    <p>{props.description}</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer">{props.link}</a>
                    <div className={style['block-content']}>
                        <div className={style['tag']}><span><FaUser /></span>Name</div>
                        <div className={style['tag']}><span><BsChatFill /></span>0 Comment</div>
                        <div className={style['tag']}><span><AiFillLike /></span>0 Likes</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryExperiance;
