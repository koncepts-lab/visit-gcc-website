import React from 'react'
import style from './style.module.css';


function TabSlider(props) {
    return (
        <>
            <a className="item">
                <div className={style['bg-black-shade']}></div>
                <img src={props.image} className='w-100' alt="" />
                <div className={style['country-tabslide-text']}>
                    <h4>{props.heading}</h4>
                    <h5>{props.subHeading}</h5>
                    <p>{props.description}</p>

                </div>
            </a>

        </>
    )
}

export default TabSlider
