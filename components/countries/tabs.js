"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';

const Tabs = () => {
    const countryData = [
        { id: 1, heading: 'Unveiling the Rich History and Heritage', subHeading: 'Journey Through Time', description: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry', image: "/images/country/01.jpg" },
        { id: 2, heading: 'unveiling the Rich History and Heritage', subHeading: 'Journey Through Time', description: 'Lorem Ipsum is simply dummy text of the printing typesetting industry. Lorem Ipsum has been the industry', image: "/images/country/02.jpg" },

    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <section className={style.innerpage}>
            <div className={`container ${style['light-bg']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <div className={style['ul-container']}>
                                    <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link active border-0 ${style['country-nav-link']} ${style['active-tab']}`}
                                                id="History-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#History"
                                                type="button"
                                                role="tab"
                                                aria-controls="History"
                                                aria-selected="true"
                                            >
                                                History and Heritage
                                            </button>
                                        </li>
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['country-nav-link']}`}
                                                id="Culture-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Culture"
                                                type="button"
                                                role="tab"
                                                aria-controls="Culture"
                                                aria-selected="false"
                                            >
                                                Culture and Traditions
                                            </button>
                                        </li>
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['country-nav-link']}`}
                                                id="Food-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#Food"
                                                type="button"
                                                role="tab"
                                                aria-controls="Food"
                                                aria-selected="false"
                                            >
                                                Food and Culinary
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
                                                Luxury and Shopping
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="History"
                                        role="tabpanel"
                                        aria-labelledby="History-tab"
                                    >
                                        {/* tab-slider */}
                                        <div className={style['country-tab']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <Carousal country={countryData} count={1} type="country-tab" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* tab-slider end */}

                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Culture"
                                        role="tabpanel"
                                        aria-labelledby="Culture-tab"
                                    >
                                        {/* tab-slider */}
                                        <div className={style['country-tab']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <Carousal country={countryData} count={1} type="country-tab" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* tab-slider end */}

                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Food"
                                        role="tabpanel"
                                        aria-labelledby="Food-tab"
                                    >
                                        {/* tab-slider */}
                                        <div className={style['country-tab']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <Carousal country={countryData} count={1} type="country-tab" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* tab-slider end */}

                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Luxury"
                                        role="tabpanel"
                                        aria-labelledby="Luxury-tab"
                                    >
                                        {/* tab-slider */}
                                        <div className={style['country-tab']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <Carousal country={countryData} count={1} type="country-tab" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* tab-slider end */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tabs;
