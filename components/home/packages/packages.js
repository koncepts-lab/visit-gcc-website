import React from 'react'
import Link from 'next/link';
import style from './pakages.module.css';
import { FaArrowRightLong } from "react-icons/fa6";
const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomePackage(props) {
    return (
        <>
        <Link href="#0"  className={`item ${style['item-padding']}`}>
                <div className={style['bg-black-shade']}></div>
                <img src={props.image} className='w-100' alt="" />
                <div className={style['home-packages-text']}>
                    <h4>{props.heading}</h4>
                    <p>{props.description}</p>
                    <ArrowIcon />
                </div>
            </Link>

        </>
    )
}

export default SingleHomePackage
