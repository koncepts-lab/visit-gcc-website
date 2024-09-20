"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';


const TabsKuwait = () => {
    const countryData = [
        {
            id: 1,
            heading: ' Uncover Kuwait\'s History through its Historic Landmarks and Museums',
            subHeading: 'Journey Through Time',
            description: 'Explore Kuwait\'s rich past by visiting its significant historic sites. The Kuwait National Museum offers a comprehensive look at Kuwait\'s cultural and historical journey, showcasing artifacts from ancient times through the modern era. Nearby, Al Kout Fort stands as a testament to Kuwait\'s defensive architecture and its strategic importance in the region. Wander through these landmarks to gain insight into Kuwait\'s maritime heritage and its transformation into a modern state.',
            image: "/images/country/01.jpg"
        },
        { 
            id: 2,
            heading: 'Discover Kuwait\'s Maritime Legacy',
            subHeading: 'Journey Through Time',
            description: ' Dive into Kuwait\'s deep maritime history at the Kuwait Maritime Museum, which highlights the country\'s seafaring traditions and maritime trade. Learn about Kuwait\'s historical pearl diving industry and its impact on the region\'s economy. The museum\'s exhibits provide a vivid portrayal of Kuwait\'s naval prowess and its role in regional trade networks.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore Traditional Souks and Historical Sites',
            subHeading: 'Journey Through Time',
            description: 'Experience Kuwait\'s vibrant past by visiting traditional markets like the Souk Al-Mubarakiya, one of the oldest souks in Kuwait. This bustling marketplace offers a glimpse into traditional Kuwaiti life, with its array of spices, textiles, and crafts. Additionally, explore historical sites such as Kuwait\'s Old Government Palace to understand the architectural evolution and historical governance of the country.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: 'Delve into Kuwaiti Culture with Traditional Music and Dance',
            subHeading: 'Journey Through Time',
            description: 'Immerse yourself in Kuwaiti culture by enjoying traditional performances such as ‘Ardah, a folk dance featuring swordplay and rhythmic drumming. Attend local festivals and cultural events to experience live performances of Kuwaiti music and dance, which reflect the rich Bedouin heritage and contemporary influences.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Experience the Art of Falconry',
            subHeading: 'Journey Through Time',
            description: ' Discover the ancient art of falconry, a traditional sport deeply rooted in Kuwaiti culture. Visit falconry centers where you can learn about the training and handling of these majestic birds. Participate in exhibitions and demonstrations to appreciate this revered practice, which symbolizes the close bond between Kuwaitis and their natural heritage.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore the Blend of Bedouin Traditions and Modern Influences',
            subHeading: 'Journey Through Time',
            description: 'Experience the unique fusion of Bedouin traditions and modern Kuwaiti life through cultural centers and events. Visit the Sheikh Jaber Al-Ahmad Cultural Centre to witness a blend of traditional Kuwaiti architecture and contemporary cultural expressions. Engage with local art and craft exhibitions that highlight the evolving nature of Kuwaiti culture while honoring its deep-rooted traditions.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: 'Taste the Diverse Kuwaiti Cuisine',
            subHeading: 'Journey Through Time',
            description: 'Savor the flavors of Kuwaiti cuisine, which includes beloved dishes like Harees, a slow-cooked mixture of wheat and meat, and Shawarma, a popular street food. Visit local restaurants to experience a range of traditional dishes that reflect the rich culinary heritage of Kuwait, prepared with authentic spices and techniques.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Explore Vibrant Food Markets and Street Food',
            subHeading: 'Journey Through Time',
            description: 'Discover Kuwait\'s dynamic food scene by exploring vibrant street food markets and local eateries. From savory kebabs and fresh seafood to sweet delicacies, the street food offers a taste of Kuwait\'s culinary diversity. The Souk Al-Mubarakiya is an excellent place to sample a variety of traditional snacks and meals.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Dine in Upscale Restaurants and International Cuisine',
            subHeading: 'Journey Through Time',
            description: ' Experience Kuwait\'s upscale dining scene at high-end restaurants in The Avenues Mall and other luxury venues. These restaurants o er a fusion of Kuwaiti and international flavors, providing gourmet dining experiences in sophisticated settings. Enjoy a diverse range of cuisines from around the world while appreciating the luxurious ambiance and world-class service.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: ' Shop at Opulent Malls like The Avenues and 360 Mall',
            subHeading: 'Journey Through Time',
            description: ' Indulge in luxury shopping at Kuwait’s premier malls, including The Avenues and 360 Mall. These shopping destinations feature a wide range of high-end international brands, designer boutiques, and upscale dining options. Enjoy a world-class shopping experience in environments that combine modern elegance with cutting-edge design.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Discover Unique Finds in Traditional Souks',
            subHeading: 'Journey Through Time',
            description: 'Explore Kuwait’s traditional souks, such as Souk Al-Mubarakiya, where you can find unique handcrafted items, spices, textiles, and traditional Kuwaiti goods. These markets o er a charming contrast to modern shopping centers, allowing you to discover authentic souvenirs and experience the local market culture.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Explore Local Artistry and High-End Boutique Stores',
            subHeading: 'Journey Through Time',
            description: 'Uncover Kuwait’s vibrant artistic scene by visiting boutique stores that feature local craftsmanship and contemporary art. From handmade jewelry and textiles to bespoke home décor, these boutiques o er distinctive items that reflect Kuwait’s rich cultural heritage and modern creativity',
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

export default TabsKuwait;
