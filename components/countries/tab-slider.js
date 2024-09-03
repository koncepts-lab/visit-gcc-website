import React from 'react'
import Link from 'next/link';
import style from './style.module.css';


function TabSlider(props) {
    return (
        <>
        <Link href="#0" className="item">
                <div className={style['bg-black-shade']}></div>
                <img src={props.image} className='w-100' alt="" />
                <div className={style['country-tabslide-text']}>
                    <h4>{props.heading}888</h4>
                //* <h5>{props.subHeading}</h5> //*
                    <p>{props.description}</p> 
                </div>
            </Link>

        </>
    )
}

export default TabSlider
