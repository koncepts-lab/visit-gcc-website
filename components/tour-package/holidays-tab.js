"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa6";

const HolidaysTab = () => {
    const countryExplore = [
        { id: 1, heading: 'Desitination Heading', description: 'Luxury', image: "/images/blog/01.jpg" },
        { id: 2, heading: 'Desitination Heading', description: 'Culture', image: "/images/blog/02.jpg" },
        { id: 3, heading: 'Desitination Heading', description: 'Coastal Esscapes', image: "/images/blog/03.jpg" },
        { id: 4, heading: 'Desitination Heading', description: 'History', image: "/images/blog/04.jpg" },
        { id: 5, heading: 'Desitination Heading', description: 'Events', image: "/images/blog/01.jpg" },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <section className={style.innerpage} >
            <div className={`container-fluid ${style['pr-0']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link active border-0 ${style['country-nav-link']} ${style['active-tab']}`}
                                            id="All-offer-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#All-offer"
                                            type="button"
                                            role="tab"
                                            aria-controls="All-offer"
                                            aria-selected="true"
                                        >
                                            All Offers
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Honeymoon-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Honeymoon"
                                            type="button"
                                            role="tab"
                                            aria-controls="Honeymoon"
                                            aria-selected="false"
                                        >
                                            Honeymoon
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Pilgimage-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Pilgimage"
                                            type="button"
                                            role="tab"
                                            aria-controls="Pilgimage"
                                            aria-selected="false"
                                        >
                                            Pilgimage
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Camping-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Camping"
                                            type="button"
                                            role="tab"
                                            aria-controls="Camping"
                                            aria-selected="false"
                                        >
                                            Camping
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Cruise-Vactions-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Cruise-Vactions"
                                            type="button"
                                            role="tab"
                                            aria-controls="Cruise-Vactions"
                                            aria-selected="false"
                                        >
                                            Cruise Vactions
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Beach-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Beach"
                                            type="button"
                                            role="tab"
                                            aria-controls="Beach"
                                            aria-selected="false"
                                        >
                                            Beach
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Luxury-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Luxury"
                                            type="button"
                                            role="tab"
                                            aria-controls="Luxury"
                                            aria-selected="false"
                                        >
                                            Luxury
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="All-offer"
                                        role="tabpanel"
                                        aria-labelledby="All-offer-tab"
                                    >
                                        <div className={`${style['documentation-container']} p-0`}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Honeymoon"
                                        role="tabpanel"
                                        aria-labelledby="Honeymoon-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Pilgimage"
                                        role="tabpanel"
                                        aria-labelledby="Pilgimage-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Camping"
                                        role="tabpanel"
                                        aria-labelledby="Camping-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Cruise-Vactions"
                                        role="tabpanel"
                                        aria-labelledby="Cruise-Vactions-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Beach"
                                        role="tabpanel"
                                        aria-labelledby="Beach-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Luxury"
                                        role="tabpanel"
                                        aria-labelledby="Luxury-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-3 p-0'>
                                                        <img src='../images/tour/358-608.jpg' className={style['img-Holidays']} />
                                                    </div>
                                                    <div className={`col-md-3 p-0 ${style['vertical-center']}`}>
                                                        <div className={style['tour-holidays-text']}>
                                                            <h5>Desitination</h5>
                                                            <h6>UAE</h6>
                                                            <span className={style['line']}></span>
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                                                            <ul>
                                                                <li><a href='#0'><FaFacebookF /></a></li>
                                                                <li><a href='#0'><FaTwitter /></a></li>
                                                                <li><a href='#0'><FaGooglePlusG /></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/269-273.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/02.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='col-md-3'>
                                                        <div className={style['tour-holidays-box']}>
                                                            <img src='../images/tour/03.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                        <div className={`mb-0 ${style['tour-holidays-box']}`}>
                                                            <img src='../images/tour/04.jpg' className='w-100' />
                                                            <span>
                                                                <h6>Destination</h6>
                                                                <p>Saudi</p>
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* explore */}




            </div>
        </section>
    );
};

export default HolidaysTab;
