"use client";
import React, { useState } from 'react';
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Countries from '../../../components/countries/countries';
import { Range } from 'react-range';
import TourPackageTab from '../../../components/tour-package/tour-package-tab';
import { CiMobile3 } from "react-icons/ci";
import Carousal from '../../../components/carousel/Carousal';
import HolidaysTab from '../../../components/tour-package/holidays-tab';
import Accordion from '../../../components/accordion/accordion';


const Country = () => {
    const [priceRange, setPriceRange] = useState([30, 3900]);
    const [durationRange, setDurationRange] = useState([1, 10]);

    const handlePriceRangeChange = (values) => {
        setPriceRange(values);
    };

    const handleDurationRangeChange = (values) => {
        setDurationRange(values);
    };

    const accordionData = [
        {
            title: 'ACTIVITIES',
            items: ['Hiking', 'Camping', 'Wildlife Watching', 'Water Sports']
        },
        {
            title: 'CULTURAL ACTIVITIES',
            items: ['Sightseeing', 'Museums', 'Historical Sites', 'Festivals', 'Food and Wine Tours']
        },
        {
            title: 'RELAXATION AND REJUVENATION',
            items: ['Spas', 'Wellness Retreats', 'Yoga Sessions', 'Meditation']
        },
        {
            title: 'FILTER BY STAY',
            items: ['Budget-Friendly Motels', 'Luxurious Five-Star Resorts', 'Apartments', 'Private Villas', 'Homestays', 'Boutique Hotels', 'Tents']
        },
        {
            title: 'TRAVEL STYLE',
            items: ['Luxury', 'Adventure', 'Family-Friendly', 'Couple', 'Group Tour', 'Budget Friendly']
        },
        {
            title: 'GEOGRAPHY',
            items: ['Coastal', 'Desert', 'Mountain', 'Nature', 'Sea', 'Forest']
        }
    ];

    const bestPickedData = [
        { id: 1, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/01.jpg" },
        { id: 2, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/02.jpg" },
        { id: 3, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/03.jpg", },
        { id: 4, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/01.jpg" },
        { id: 5, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/02.jpg" },
        { id: 6, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/03.jpg", },
    ];
    const wondersData = [
        { id: 1, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/01.jpg" },
        { id: 2, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/02.jpg" },
        { id: 3, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/03.jpg", },
        { id: 4, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/01.jpg" },
        { id: 5, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/02.jpg" },
        { id: 6, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/03.jpg", },
    ];

    return (
        <>
            <Banner />
            <Countries />

            <section className={style['tour-package-page']}>
                <div className={`container-fluid ${style['tour-package-page-container']}`}>
                    <div className='row'>
                        {/* left */}
                        <div className='col-md-3'>
                            <div className={style['package-filter']}>
                                <h4>Filter</h4>
                                <div className={style['price-range']}>
                                    <Range
                                        step={1}
                                        min={30}
                                        max={3900}
                                        values={priceRange}
                                        onChange={handlePriceRangeChange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '6px',
                                                    width: '100%',
                                                    backgroundColor: '#ccc'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '24px',
                                                    width: '24px',
                                                    borderRadius: '50%',
                                                    border: 'solid 3px #41a6ab',
                                                    backgroundColor: '#fff'
                                                }}
                                            />
                                        )}
                                    />
                                    <div>
                                        <p>Price Range: ${priceRange[0]} — ${priceRange[1]}</p>
                                    </div>
                                </div>

                                <h4>Duration</h4>
                                <div className={style['duration-range']}>
                                    <Range
                                        step={1}
                                        min={1}
                                        max={30}
                                        values={durationRange}
                                        onChange={handleDurationRangeChange}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '6px',
                                                    width: '100%',
                                                    backgroundColor: '#ccc'
                                                }}
                                            >
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: '24px',
                                                    width: '24px',
                                                    borderRadius: '50%',
                                                    border: 'solid 3px #41a6ab',
                                                    backgroundColor: '#fff'
                                                }}
                                            />
                                        )}
                                    />
                                    <div>
                                        <p>Days: {durationRange[0]} — {durationRange[1]} Days</p>
                                    </div>
                                </div>

                                <div className={style['accordion-range']}>
                                    {accordionData.map((accordion, index) => (
                                        <Accordion key={index} title={accordion.title} items={accordion.items} isOpenInitially={true} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* left end */}

                        {/* right */}
                        <div className={`col-md-9 ${style['pr-0']}`}>
                            <h3>GCC Countries</h3>
                            <TourPackageTab />

                            <section className={style['cta-section']}>
                                <div className={style['cta-section-container']}>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className={`col-md-6 ${style['cta-half-left']}`}>

                                                <div className={`container ${style['cta-half-container']}`}>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <div className={style['cta-section-left']}>
                                                                <span><CiMobile3 /></span>
                                                                <span><h5>CALL NOW</h5><p>for free consultation</p></span>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className={style['cta-section-right']}>
                                                                <a href='tel:+5866 958 5545'>: +5866 958 5545</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='col-md-6 '>
                                                            <div className={style['cta-section-left']}>
                                                                <span><CiMobile3 /></span>
                                                                <span><h5>MAIL US NOW</h5><p>for free consultation</p></span>
                                                            </div>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div className={style['cta-section-right']}>
                                                                <a href='mailto:info@consultaid.com'>:info@consultaid.com</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* bes picked for you */}
                            <section className={style['pakage-bes-picked']}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h3 className='pb-3'>Best picked for you</h3>
                                        </div>
                                        <div className='col-md-12'>
                                            <Carousal bestPicked={bestPickedData} count={4} type="tour-bestPicked" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* bes picked for you END*/}


                            {/* bes picked for you */}
                            <section className={style['pakage-bes-picked']}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h3 className='pb-3'>Lesser-Known Wonders</h3>
                                            <p className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br />Lorem Ipsum has been the industry's standard dummy text</p>
                                        </div>
                                        <div className='col-md-12'>
                                            <Carousal wonders={wondersData} count={3} type="tour-wonders" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* bes picked for you END*/}


                            {/* bes picked for you */}
                            <section className={style['pakage-bes-picked']}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <h3 className='pb-3'>Holidays by theme</h3>
                                            <HolidaysTab />
                                        </div>

                                    </div>

                                    <div className='row'>
                                        <div className='col-md-12 text-center mt-4'>
                                            <button className={style['btn-one']}>Full List</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* bes picked for you END*/}





                        </div>
                        {/* right end */}



                    </div>
                </div>
            </section>


        </>
    );
}

export default Country;
