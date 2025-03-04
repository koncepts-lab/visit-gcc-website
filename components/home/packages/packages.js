import React from 'react';
import Link from 'next/link';
import style from './pakages.module.css';
import { FaArrowRightLong } from "react-icons/fa6";

const ArrowIcon = () => <FaArrowRightLong />;

function SingleHomePackage({ link = "#", image, heading, description }) {
    return (
        <Link href={link || "#"} className={`item ${style['item-padding']}`}>
            <div className={style['bg-black-shade']}></div>
            <img src={image} className="w-100" alt={heading || "Package Image"} />
            <div className={style['home-packages-text']}>
                <h4>{heading}</h4>
                <p>{description}</p>
                <ArrowIcon />
            </div>
        </Link>
    );
}

export default SingleHomePackage;
