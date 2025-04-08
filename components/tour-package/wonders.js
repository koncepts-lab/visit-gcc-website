import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";
import Link from 'next/link';

const ArrowIcon = () => <FaArrowRightLong />;

function Singlewonders(props) {
    return (
        <>
            <div className={`item ${style['single-item-padding']}`}> 
                <div className={style['best-picked-box']}>
                    <img src={props.image} className='w-100' alt={props.heading} />
                    <span>
                        <Link href={`/tour-package/${props.link}`}>
                        <h4>{props.heading}</h4>
                        <p>{props.description}</p></Link>           
                    </span>
                </div>
            </div>
        </>
    );
}

export default Singlewonders;
