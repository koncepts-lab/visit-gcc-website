import React from 'react'
import Link from 'next/link';
import style from './style.module.css';
import { FaChevronRight } from "react-icons/fa6"; 


function PakageDetailsOtherPackages(props) {

    return (
        <>
            <Link className={`item ${style['item-padding']}`} href="">
                <div className={style['PakageDetailsOtherPackages']}>
                    <img src={props.image} className='w-100' alt="" />
                    <div className={style['PakageDetailsOtherPackages-text']}>
                        <span><h4>{props.heading}</h4>
                            <p>{props.description}</p></span>
                        <span><Link href='#0'><FaChevronRight /></Link></span>

                    </div>
                </div>
            </Link>
        </>
    )
}

export default PakageDetailsOtherPackages


