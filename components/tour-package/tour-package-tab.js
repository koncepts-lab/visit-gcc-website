"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyWrapper from './responsive-masonry';
import Carousal from '../carousel/Carousal';


const TourPackageTab = () => {
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
                                            id="All-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#All"
                                            type="button"
                                            role="tab"
                                            aria-controls="All"
                                            aria-selected="true"
                                        >
                                            All
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Season-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Season"
                                            type="button"
                                            role="tab"
                                            aria-controls="Season"
                                            aria-selected="false"
                                        >
                                            Season
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="trending-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#trending"
                                            type="button"
                                            role="tab"
                                            aria-controls="trending"
                                            aria-selected="false"
                                        >
                                            Trending
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="new-activities-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#new-activities"
                                            type="button"
                                            role="tab"
                                            aria-controls="new-activities"
                                            aria-selected="false"
                                        >
                                            New activities
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="combo-offers-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#combo-offers"
                                            type="button"
                                            role="tab"
                                            aria-controls="combo-offers"
                                            aria-selected="false"
                                        >
                                            Combo Offers
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="All"
                                        role="tabpanel"
                                        aria-labelledby="All-tab"
                                    >
                                        <div className={`${style['documentation-container']} p-0`}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12 p-0'>
                                                        <MyWrapper /> {/* Use the MyWrapper component */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Season"
                                        role="tabpanel"
                                        aria-labelledby="Season-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Season</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="trending"
                                        role="tabpanel"
                                        aria-labelledby="trending-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Trending</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="new-activities"
                                        role="tabpanel"
                                        aria-labelledby="new-activities-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>New Activities</h4>
                                                        <MyWrapper /> {/* Use the MyWrapper component */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="combo-offers"
                                        role="tabpanel"
                                        aria-labelledby="combo-offers-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Combo Offers</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
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

                <div className='row'>
                    <div className='col-md-12 text-center mt-4 mb-5'>
                        <button className={style['btn-one']}>Show Me More</button>
                    </div>
                </div>

                {/* explore */}



                <div className='row'>
                    <div className='col-md-12 p-0'>
                        <section className={style['countries-explore-container']}>
                            <div className={style['countries-explore']}>
                                <div className='container-fluid'>
                                    <div className="row">
                                        <div className="col-md-12 pb-3 text-center">
                                            <h3>Featured Travel</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* CountryExplore */}
                                <div className={style['country-explore2']}>
                                    <div className='container'>
                                        <div className='row'>
                                            <Carousal countryExplore={countryExplore} count={3} type="country-explore" />
                                        </div>
                                        <div className='row'>
                                            <div className='col-md-12 text-center mt-4'>
                                                <button className={style['btn-one']}>Full List</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                {/* CountryExplore */}

            </div>
        </section>





    );
};

export default TourPackageTab;
