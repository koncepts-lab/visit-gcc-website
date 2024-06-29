import React from 'react';
import style from './style.module.css';

function CountryExperiance(props) {
    return (
        <>
            <a className="item">
                <div className={style['country-explore-item']}>
                    <img src={props.image} className='w-100' alt="" />
                    <div className={style['country-explore-text']}>
                        <h4>{props.heading}</h4>
                        <p>{props.description}</p>
                    </div>
                </div>
            </a>
        </>
    )
}

export default CountryExperiance;
