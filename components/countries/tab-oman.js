"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';


const TabsOman = () => {
    const countryData = [
        {
            id: 1,
            heading: 'Journey Through Oman\'s Ancient Forts and Historical Sites',
            subHeading: 'Journey Through Time',
            description: 'Explore Oman\'s rich historical tapestry by visiting iconic forts such as the Nizwa Fort, renowned for its impressive architecture and strategic significance in Omani history. The fort\'s towering walls and intricate defensive design o er a glimpse into the country\'s military past. Additionally, the Bahla Fort, a UNESCO World Heritage Site, showcases the ancient mudbrick architecture and is a testament to Oman\'s historical significance as a center of trade and culture.',
            image: "/images/country/01.jpg"
        },
        { 
            id: 2,
            heading: ' Discover Oman\'s Maritime Legacy',
            subHeading: 'Journey Through Time',
            description: ' Delve into Oman\'s maritime history by exploring its historic ports and landmarks. The Sultan Qaboos Port in Muscat, one of the region\'s oldest harbors, reflects Oman\'s long-standing role as a trading hub. Visit the Maritime Museum in Muscat to learn about Oman\'s seafaring heritage, including its traditional dhows and navigation techniques that played a crucial role in maritime trade across the Indian Ocean.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Explore Traditional Villages and Historic Landmarks',
            subHeading: 'Journey Through Time',
            description: 'Wander through traditional Omani villages such as Misfat al Abriyeen, known for its ancient irrigation systems and terraced gardens. Experience the historical charm of Jabrin Castle, an architectural marvel of the 17th century that served as a royal residence and a center of learning. These landmarks provide insight into Oman\'s traditional lifestyle and historical development.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: 'Experience Omani Festivals and Traditional Arts',
            subHeading: 'Journey Through Time',
            description: ' Immerse yourself in Oman\'s cultural vibrancy by participating in traditional festivals such as Muscat Festival, which celebrates Omani culture with music, dance, and arts. The festival showcases traditional performances, crafts, and culinary delights, o ering a deep dive into Omani heritage.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: ' Engage with Traditional Omani Crafts',
            subHeading: 'Journey Through Time',
            description: ' Discover the artistry behind traditional Omani crafts, including incense burning and silver jewelry crafting. Visit local markets and workshops to witness the intricate processes involved in creating frankincense, a resin used in ceremonial and daily practices. Explore the craftsmanship of Omani silver jewelry, known for its elaborate designs and cultural significance, reflecting the rich artistic heritage of the region.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore Omani Music and Dance',
            subHeading: 'Journey Through Time',
            description: 'Experience the rhythm of Omani culture through traditional music and dance performances. Attend events featuring Ribaat (traditional Omani songs) and Bar’ah (a dance performed with swords), which are integral to Omani celebrations and ceremonies. These performances o er a captivating look at the musical and dance traditions that are central to Omani cultural identity.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: 'Delight in Traditional Omani Dishes',
            subHeading: 'Journey Through Time',
            description: ' Savor the flavors of Omani cuisine with traditional dishes such as Shuwa, a slow-cooked lamb marinated in spices and cooked underground, providing a unique and flavorful culinary experience. Another staple is Harees, a wheat and meat dish often enjoyed during special occasions and festivals.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: ' Explore Oman\'s Culinary Fusion',
            subHeading: 'Journey Through Time',
            description: 'Experience the blend of Arabian and Indian flavors in Omani cuisine. Visit local eateries that o er a fusion of traditional Omani dishes with Indian influences, reflecting the rich cultural interactions of the region. Enjoy dishes that combine aromatic spices and cooking techniques from both cuisines, o ering a diverse and flavorful dining experience.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Discover Omani Food Markets and Street Food',
            subHeading: 'Journey Through Time',
            description: 'Explore Omani food markets to taste a variety of local street foods and delicacies. The Mutrah Souq in Muscat offers an array of traditional snacks and sweets, such as Omani halwa, a sweet treat made from sa ron and rosewater. The market is also a great place to sample other local specialties and experience the vibrant food culture of Oman.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: '  Shop at Muscat\'s Premier Malls',
            subHeading: 'Journey Through Time',
            description: 'Indulge in luxury shopping at Muscat\'s high-end malls such as Muscat Grand Mall and The Avenues Mall. These shopping destinations o er a range of international luxury brands, fine dining options, and entertainment facilities, providing a sophisticated retail experience in a modern setting.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Find Exquisite Omani Crafts and Souvenirs',
            subHeading: 'Journey Through Time',
            description: 'Discover unique Omani crafts in traditional souks and markets. Explore the Mutrah Souq for handcrafted items like silver jewelry, traditional khanjars (curved daggers), and handwoven textiles. These markets o er authentic souvenirs that reflect Oman\'s rich artisanal heritage.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Experience Contemporary and Traditional Shopping Centers',
            subHeading: 'Journey Through Time',
            description: 'Blend contemporary shopping with traditional experiences by visiting both modern malls and historical souks. Enjoy the luxury o erings in places like Sultan Qaboos Street, while also exploring traditional markets that provide a glimpse into Oman\'s cultural and commercial history. This combination of shopping environments o ers a diverse retail experience catering to various tastes and interests',
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

export default TabsOman;
