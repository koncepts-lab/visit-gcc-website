import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";

const ArrowIcon = () => <FaArrowRightLong />;

function Singlewonders(props) {
    return (
        <>
            <div className="item">
                <div className={style['best-picked-box']}>
                    <img src={props.image} className='w-100' alt={props.heading} />
                    <span>
                        <h4>{props.heading}</h4>
                        <p>{props.description}</p>
                    </span>

                </div>
            </div>
        </>
    );
}

export default Singlewonders;
