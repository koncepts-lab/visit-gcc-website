"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';


const TabsQatar = () => {
    const countryData = [
        {
            id: 1,
            heading: 'Unveil the Legacy of the Ancient Qatari Civilization',
            subHeading: 'Journey Through Time',
            description: 'Dive into the fascinating history of Qatar as you explore the Al Zubarah Fort, a UNESCO World Heritage Site. This well-preserved 18th-century fort o ers a glimpse into Qatar\'s ancient trading hub, revealing the strategic importance and vibrant culture of early Qatari civilization. Extend your journey by visiting nearby archaeological sites where you can uncover ancient settlements and artifacts that illuminate Qatar\'s historical significance.',
            image: "/images/country/01.jpg"
        },
        { 
            id: 2,
            heading: 'Explore Majestic Forts and Museums',
            subHeading: 'Journey Through Time',
            description: ' Step back in time by exploring Qatar\'s majestic forts and world-class museums. The imposing Al Khor Fort and the elegant Umm Salal Mohammed Fort stand as testaments to the country\'s strategic past. Meanwhile, the Museum of Islamic Art and Qatar National Museum house extraordinary collections that bring Qatar\'s rich heritage and artistic achievements into sharp focus, o ering visitors a comprehensive understanding of its historical evolution.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Wander Through Cultural Heritage Sites',
            subHeading: 'Journey Through Time',
            description: 'Experience the charm of Qatar\'s cultural heritage by wandering through iconic sites like Souq Waqif and the Pearl-Qatar. Souq Waqif is a lively marketplace where traditional architecture and vibrant commerce converge, o ering a taste of authentic Qatari life. The Pearl-Qatar, a modern waterfront development, contrasts this with its luxurious surroundings while reflecting the country\'s blend of historical and contemporary influence.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: 'Experience the Glitz of the Qatar International Food Festival',
            subHeading: 'Journey Through Time',
            description: ' Indulge in a culinary extravaganza at the Qatar International Food Festival, a dazzling event that brings together a global array of flavors and Qatari cuisine. This festival features gourmet food, live cooking demonstrations, and captivating entertainment, o ering a vibrant celebration of Qatar\'s diverse food culture and its role as a culinary crossroads.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Delight in Traditional Qatari Arts and Crafts',
            subHeading: 'Journey Through Time',
            description: ' Immerse yourself in the exquisite world of Qatari arts and crafts, from intricate weaving and pottery to traditional silverwork. Visit local artisans and markets to witness the craftsmanship that has been passed down through generations, and discover unique, handcrafted items that reflect the rich artistic heritage of Qatar.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Celebrate at Spectacular Cultural Festivals',
            subHeading: 'Journey Through Time',
            description: 'Join in the festivities at Qatar\'s spectacular cultural festivals, such as the Doha Cultural Festival and Qatar National Day celebrations. These events o er a lively showcase of traditional music, dance, and art, allowing you to experience the vibrant cultural spirit and deep-rooted heritage that define Qatari identity.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: 'Savor the Rich Flavors of Majboos',
            subHeading: 'Journey Through Time',
            description: ' Experience the bold and aromatic flavors of Majboos, Qatar\'s signature spiced rice dish. Often served with tender meat or seafood, this dish combines a blend of spices that reflect Qatar\'s rich culinary traditions and regional influences, o ering a delicious taste of the country\'s gastronomic heritage.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Indulge in Sweet Delights like Luqaimat',
            subHeading: 'Journey Through Time',
            description: ' Treat yourself to Luqaimat, delightful sweet dumplings drenched in date syrup. These golden, syrupy bites are a beloved part of Qatari dessert traditions, o ering a perfect balance of sweetness and texture that captures the essence of local culinary delights.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Experience Innovative Dining at Trendy Restaurants',
            subHeading: 'Journey Through Time',
            description: ' Explore Qatar\'s evolving dining scene at trendy restaurants that blend traditional flavors with modern culinary techniques. These innovative eateries o er a fresh take on classic Qatari dishes and international cuisine, providing a diverse and exciting dining experience that reflects the country\'s cosmopolitan flair',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: 'Shop in Opulence at Doha\'s Luxury Malls',
            subHeading: 'Journey Through Time',
            description: 'Indulge in a premium shopping experience at Doha\'s luxury malls, such as The Gate Mall and Villaggio Mall. These high-end shopping destinations feature designer boutiques, upscale brands, and exclusive items, making them the perfect place for a lavish retail experience in the heart of Qatar',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Explore the Vibrant Souqs',
            subHeading: 'Journey Through Time',
            description: ' Discover the vibrant atmosphere of Souq Waqif, where traditional Qatari crafts, spices, and textiles are on display. This bustling market o ers a rich sensory experience and a chance to find unique, handcrafted souvenirs that capture the essence of Qatar\'s rich trading history.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Discover Unique Finds in Boutique Stores',
            subHeading: 'Journey Through Time',
            description: 'Uncover distinctive local artistry and craftsmanship in boutique stores across Qatar. From contemporary jewelry and traditional textiles to innovative art pieces, these shops o er a glimpse into Qatar\'s creative scene and provide one-of-a-kind items that reflect the country\'s cultural richness',
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

export default TabsQatar;
