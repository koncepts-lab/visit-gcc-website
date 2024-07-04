"use client";

import React, { useState } from 'react';
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Countries from '../../../components/countries/countries';
import { Range } from 'react-range';
import Accordion from '../../../components/accordion/Accordion';
import TourPackageTab from '../../../components/tour-package/tour-package-tab';


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
                        </div>
                        {/* right end */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Country;
