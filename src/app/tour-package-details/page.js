import React from 'react'
import style from './style.module.css';
import Banner from '../../../components/banner/banner'
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from '../../../components/carousel/Carousal';

function Page() {
    const tourPackageDetailsReviewsData = [
        { id: 1, heading: 'Best Picked', ratingnumber: '3', image: "/images/tour-package-details/01.jpg" },
        { id: 2, heading: 'Best Picked', ratingnumber: '4', image: "/images/tour-package-details/02.jpg" }
    ];

    return (
        <>
            <Banner />
            <section className={style['tour-package-details']}>
                <div className={`container ${style['container-package-details']}`}>
                    <div className='row'>
                        <div className='col-md-7'>
                            <h3>4 DAYS IN SALALAH</h3>
                            <p className=''><a href='#'>By Easytours24h-Hanoi Day Tours</a></p>
                            <div className={style['flex-package-details']}>
                                <span><FaCircle color="#04ac6a" className={style['circle-icon']} /><FaCircle color="#04ac6a" className={style['circle-icon']} /><FaCircle color="#04ac6a" className={style['circle-icon']} /><FaCircle color="#04ac6a" className={style['circle-icon']} /><FaCircle color="#04ac6a" className={style['circle-icon']} /><p className='pt-2'>2.471 reviews</p></span>
                                <span><PiSealCheckFill className={style['PiSealCheckFill']} />Recommended by 99% of travellers<IoMdInformationCircleOutline className={style['IoMdInformationCircleOutline']} /></span>
                                <span><MdIosShare className={style['MdIosShare']} /><FaRegHeart className={style['FaRegHeart']} /></span>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div className={style['flex-package-details-right']}>
                                <span className={style['min-w']}><p>Starting From</p><h3>₹6,599</h3><h4><del>₹28,599</del></h4></span>
                                <span><button className={style['btn-one']}>Book Now</button></span>
                                <span><button className={style['btn-two']}>Contact Seller</button><p>You can now directly communicate with the Selier of this package</p></span>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-7'>
                            {/* best picked for you */}
                            <section className={style['pakage-bes-picked']}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h3 className='pb-3'>Best picked for you</h3>
                                        </div>
                                        <div className='col-md-12'>
                                            <Carousal packageDetailsReview={tourPackageDetailsReviewsData} count={1} type="tour-package-details-reviews" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* best picked for you END*/}
                            <img src="../images/partner-with-us.jpg" alt="Bahrain" />
                        </div>
                        <div className='col-md-5'>
                            <div className={style['flex-package-details-right']}>
                                <span className={style['min-w']}><p>Starting From</p><h3>₹6,599</h3><h4><del>₹28,599</del></h4></span>
                                <span><button className={style['btn-one']}>Book Now</button></span>
                                <span><button className={style['btn-two']}>Contact Seller</button><p>You can now directly communicate with the Selier of this package</p></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Page;
