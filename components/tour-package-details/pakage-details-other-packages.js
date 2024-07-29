import React from 'react'
import style from './style.module.css';
import { FaChevronRight } from "react-icons/fa6";


function PakageDetailsOtherPackages(props) {

    return (
        <>
            <a className="item">
                <div className={style['PakageDetailsOtherPackages']}>
                    <img src={props.image} className='w-100' alt="" />
                    <div className={style['PakageDetailsOtherPackages-text']}>
                        <span><h4>{props.heading}</h4>
                            <p>{props.description}</p></span>
                        <span><a href='#0'><FaChevronRight /></a></span>

                    </div>
                </div>
            </a>
        </>
    )
}

export default PakageDetailsOtherPackages

