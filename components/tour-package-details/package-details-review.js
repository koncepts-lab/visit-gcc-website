import React from 'react';
import style from './style.module.css';
import { IoIosStar } from "react-icons/io";
import Link from 'next/link';


function SinglePackageContainerReviewImage({ heading, description }) { // Destructure props
    return (
        <>
            <div className="item">
                <div className={style['review-text']}>
                    <div className={style['review-text-top']}>
                        <span><IoIosStar /></span>
                        <span><h1>4.3</h1></span>
                        <span><p>Very good</p><Link href='#0'>13 reviews</Link></span>
                    </div>

                    <div className={style['review-text-body']}>
                        <p>What guests loved most</p>
                        <span><div><h3>B</h3></div><div><p>{heading}</p></div></span>
                        <span><p className={style['content-p']}><small>{description}</small></p></span>

                    </div>


                </div>
            </div>
        </>
    );
}

export default SinglePackageContainerReviewImage;
