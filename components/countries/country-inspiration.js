import React from 'react'
import Link from 'next/link';
import style from './style.module.css';
import { CiCircleChevRight } from "react-icons/ci"; 

function CountryInspiration(props) {
    return (
        <div>
            <Link href="#0" className={`item ${style['item-padding']}`}>        
                <div className={style['country-explore-item']}>
                    <img src={props.image} className='w-100' alt="" />
                    <div className={style['country-explore-text']}>
                        <span><h4>{props.heading}</h4><p>{props.description}</p></span>
                        <span className={style['icon-next']}>
                            <div><CiCircleChevRight /></div>                           
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CountryInspiration;
