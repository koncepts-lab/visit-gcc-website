import React from 'react'
import Link from 'next/link';
import style from './style.module.css';
import { FaChevronRight } from "react-icons/fa6"; 


function EventScroll(props) {
    return (
        <>
            <div className={`item ${style['item-padding']}`}  key={props.key}>            
                <div className={style['event-scroll']}>
                    <img src={props.image} className='w-100' alt="" />
                    <div className={style['event-scroll-text']}>
                        <span><h4>{props.heading}</h4>
                            <p>{props.description}</p></span>
                        <span><Link href='{props.Link}'><FaChevronRight /></Link></span>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EventScroll


