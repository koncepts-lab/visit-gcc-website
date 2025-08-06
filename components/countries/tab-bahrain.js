"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';

const TabsBahrain = () => {
   const countryData = [
        {
            id: 1,
            heading: 'Discover the Ancient Dilmun Civilization',
            subHeading: 'Journey Through Time',
            description: 'Unveil the mysteries of Bahrain\'s early history as you explore the remnants of the Dilmun civilization, one of the most important ancient cultures in the Arabian Gulf. Visit the Qal’at al-Bahrain (Bahrain Fort), a UNESCO World Heritage Site, and delve into the artifacts and structures that reveal the region\'s historical significance.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Step Back in Time with Historic Forts',
            subHeading: 'Journey Through Time',
            description: 'Journey through Bahrain\'s fortified past by visiting its impressive forts. From the 16th-century Bahrain Fort to the 19th-century Rifa Fort, these architectural marvels o er a glimpse into the strategic importance of Bahrain throughout the ages. Experience the stunning views and historical narratives that these forts provide.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore Museums that Tell Bahrain\'s Story',
            subHeading: 'Journey Through Time',
            description: ' Immerse yourself in Bahrain\'s rich heritage at its diverse museums. The Bahrain National Museum offers a comprehensive overview of the country\'s history, while the Bahrain Maritime Museum highlights the island\'s seafaring legacy. Each museum presents interactive exhibits and artifacts that bring Bahrain’s past to life.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: 'Revel in the Bahrain International Music Festiva',
            subHeading: 'Journey Through Time',
            description: 'Join the festivities at the Bahrain International Music Festival, a vibrant celebration of global music and dance. Experience performances by renowned artists from around the world, showcasing the island’s role as a cultural crossroads in the Arabian Gulf.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Embrace the Charm of Traditional Crafts',
            subHeading: 'Journey Through Time',
            description: 'Discover the intricate beauty of Bahrain\'s traditional crafts, from hand-woven textiles to beautifully crafted pottery. Visit local artisans and markets to purchase unique souvenirs and learn about the techniques that have been passed down through generations.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Celebrate at Lively Cultural Events',
            subHeading: 'Journey Through Time',
            description: 'Dive into Bahrain\'s dynamic cultural scene with festivals and events that celebrate its diverse heritage. From the annual Spring of Culture festival to the Bahrain Food Festival, these events o er an opportunity to engage with local traditions and experience the island\'s vibrant community spirit.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: ' Savor the Richness of Machboos',
            subHeading: 'Journey Through Time',
            description: ' Indulge in Machboos, Bahrain\'s beloved spiced rice dish, typically accompanied by tender meat or seafood. This flavorful dish blends Arabian spices with Persian influences, offering a taste of Bahrain\'s rich culinary heritage.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: ' Delight in Traditional Bahraini Sweets',
            subHeading: 'Journey Through Time',
            description: ' Treat yourself to Bahraini sweets like Halwa, a delicious dessert made from saffron, rosewater, and nuts. These confections are not only a culinary delight but also a symbol of Bahrain\'s rich and diverse food culture.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Experience Fusion Cuisine at Local Eateries',
            subHeading: 'Journey Through Time',
            description: 'Discover Bahrain\'s unique culinary fusion in local eateries that blend traditional Bahraini flavors with international influences. Enjoy dishes that reflect the island\'s role as a melting pot of cultures, offering an array of tastes that cater to every palate.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: 'Shop in Style at Manama’s Luxury Malls',
            subHeading: 'Journey Through Time',
            description: 'Experience a shopping spree in Manama’s upscale malls, such as City Centre Bahrain and The Avenues. These high-end shopping destinations o er a range of designer boutiques, luxury brands, and exclusive items that cater to discerning shoppers.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Explore the Charm of Traditional Souks',
            subHeading: 'Journey Through Time',
            description: ' Wander through the vibrant Bab El Bahrain Souk and discover a treasure trove of traditional crafts, spices, and textiles. This bustling marketplace provides a taste of Bahrain’s rich trading history and an opportunity to find unique, handcrafted souvenirs.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Discover Local Artistry in Boutique Stores',
            subHeading: 'Journey Through Time',
            description: 'Uncover unique local crafts and artworks in boutique stores across Bahrain. From contemporary jewelry to traditional textiles, these boutiques o er a glimpse into Bahrain’s artistic heritage and provide a chance to purchase distinctive items that reflect the island’s cultural richness',
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

export default TabsBahrain;
