import React from 'react'
import Link from 'next/link';
import style from './style.module.css';


function RatingCarousel(props) { 

    return (
        <>
            <Link className={`item ${style['item-padding']}`} href="#0">
                <div className={style['country-explore-item']}>
                    <div className={style['country-explore-text']}>
                        <div className={style['RatingCarousel-top']}>
                            <h6>{props.headingIcon}</h6>
                            <h4>{props.heading}</h4>
                        </div>
                        <p>{props.description}</p>
                        <div className='clearfix'></div>
                        <div className={style['RatingCarousel-top']}>

                            Posted :<p>{props.date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default RatingCarousel

