"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';


const TabsSaudiArabia = () => {
   const countryData = [
        {
            id: 1,
            heading: 'Explore Diriyah\'s Historical Significance',
            subHeading: 'Journey Through Time',
            description: 'Visit Diriyah, the birthplace of the Saudi state and a UNESCO World Heritage Site. This historic town, with its mud-brick architecture and traditional Najdi buildings, o ers a glimpse into the early days of the Kingdom. The At-Turaif District, in particular, highlights the rich history and cultural heritage of Saudi Arabia.',
            image: "/images/country/01.jpg"
        },
        { 
            id: 2,
            heading: 'Discover the Ancient Wonders of Al-Ula',
            subHeading: 'Journey Through Time',
            description: ' Wander through the stunning landscapes and archaeological marvels of Al-Ula, an ancient oasis town in the northwest of Saudi Arabia. The site includes the rock-cut tombs of Madain Saleh (also known as Al-Hijr), which date back to the Nabatean period and are an important part of Saudi Arabia\'s historical and cultural legacy.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Learn About Saudi Arabia\'s Islamic Heritage',
            subHeading: 'Journey Through Time',
            description: 'Explore the profound Islamic heritage of Saudi Arabia by visiting key religious sites such as the Masjid al-Haram in Mecca, the world\'s largest mosque and the site of the Kaaba, and the Prophet\'s Mosque in Medina, where the Prophet Muhammad is buried. These sacred places are central to the Islamic faith and attract millions of pilgrims each year.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: ' Experience the Hajj Pilgrimage',
            subHeading: 'Journey Through Time',
            description: 'Witness the annual Hajj pilgrimage, one of the Five Pillars of Islam, which draws millions of Muslims from around the world to Mecca. This religious journey is a profound expression of faith and unity, with rituals that have been performed for centuries, reflecting the deep spiritual significance of the pilgrimage.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Enjoy Traditional Saudi Dance and Music',
            subHeading: 'Journey Through Time',
            description: ' Immerse yourself in Saudi Arabia\'s vibrant cultural scene by experiencing traditional dance forms like the Ardah, a folk dance performed with swords and accompanied by drumming and chanting. Explore the diverse musical heritage of the Kingdom through performances and festivals that showcase traditional instruments and songs.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Discover Saudi Arabia\'s Cultural Practices',
            subHeading: 'Journey Through Time',
            description: ' Engage with Saudi Arabia\'s rich cultural practices and values through local festivals and cultural events. From the annual Janadriyah Festival, which celebrates Saudi heritage and traditions, to the traditional hospitality practices of Saudi families, these experiences provide insight into the customs and social fabric of the Kingdom. Discover the NEOM Project: A Vision for Future Cultural Tourism. NEOM is Saudi Arabia\'s revolutionary $500 billion initiative to build a futuristic city blending technology, sustainability, and cultural heritage. Located in the northwest of Saudi Arabia, NEOM promises to captivate global tourists with its innovative approach to urban living.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: 'Indulge in Kabsa and Other Traditional Dishes',
            subHeading: 'Journey Through Time',
            description: ' Enjoy Kabsa, a flavorful dish made with spiced rice, meat (such as chicken, lamb, or beef), and a blend of aromatic spices. This quintessential Saudi dish is a staple at family gatherings and special occasions. Also, try other traditional dishes like Mandi and Harees, which are integral to Saudi culinary traditions.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Taste the Rich Flavors of Jareesh',
            subHeading: 'Journey Through Time',
            description: 'Jareesh, a comforting dish made from cracked wheat and meat, slow-cooked to create a savory, porridge-like consistency. This dish is often enjoyed during Ramadan and special celebrations, reflecting the Kingdom\'s rich culinary heritage and communal dining culture.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore Modern Culinary Innovations',
            subHeading: 'Journey Through Time',
            description: 'Experience the evolving food scene in Saudi Arabia, where traditional flavors meet modern culinary techniques. Visit contemporary restaurants that o er innovative takes on classic dishes, blending local ingredients with international influences to create a unique dining experience.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: 'Shop at Kingdom Centre in Riyadh',
            subHeading: 'Journey Through Time',
            description: 'Discover luxury shopping at Kingdom Centre, one of Riyadh\'s most iconic malls. With its high-end boutiques, upscale dining options, and stunning architecture, Kingdom Centre o ers a premier shopping experience that showcases both international brands and local designer labels.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: ' Explore Al Faisaliah Mall',
            subHeading: 'Journey Through Time',
            description: 'Visit Al Faisaliah Mall in Riyadh, known for its elegant design and high-end shopping options. The mall features a range of luxury stores, from global fashion brands to exclusive local boutiques, and o ers a sophisticated shopping environment.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Discover Unique Finds in Vibrant Shopping Districts',
            subHeading: 'Journey Through Time',
            description: 'lore Saudi Arabia\'s vibrant shopping districts, such as Jeddah\'s Al-Balad historic area and the modern shopping precincts in Dhahran. These districts o er a mix of luxury brands, traditional souqs, and artisanal products, providing a diverse shopping experience that reflects the Kingdom\'s rich cultural heritage',
            image: "/images/country/02.jpg"
        }
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
                                                    <Carousal country={countryDataTwo} count={1} type="country-tab" />
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
                                                    <Carousal country={countryDataThree} count={1} type="country-tab" />
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
                                                    <Carousal country={countryDataFour} count={1} type="country-tab" />
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

export default TabsSaudiArabia;
