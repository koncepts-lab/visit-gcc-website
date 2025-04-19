"use client";
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";

const eventData = {
    All: [
        {
            src: "/images/demo/01.jpg",
            title: "Beautiful Yas Island and Dubai",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 4,
            description: "Explore the stunning Yas Island and the vibrant city of Dubai.",
            startDate: "01",
            endDate: "07"
        },
        {
            src: "/images/demo/02.jpg",
            title: "Dubai Jain Tour",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 5,
            description: "Discover the Jain heritage and culture in Dubai.",
            startDate: "10",
            endDate: "15"
        },
        {
            src: "/images/demo/03.jpg",
            title: "Dubai Extravaganza",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 3,
            description: "Experience the extravagance and luxury of Dubai.",
            startDate: "18",
            endDate: "25"
        },
        {
            src: "/images/demo/04.jpg",
            title: "Dubai Miracle Garden",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 4,
            description: "Wander through the floral wonders of Dubai Miracle Garden.",
            startDate: "05",
            endDate: "12"
        },
        {
            src: "/images/demo/05.jpg",
            title: "Dubai Mall",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 5,
            description: "Indulge in shopping and entertainment at the iconic Dubai Mall.",
            startDate: "20",
            endDate: "30"
        },
        {
            src: "/images/demo/06.jpg",
            title: "Dubai Aquarium & Underwater Zoo",
            provider: "John Smith",
            date: "04 July 2024",
            rating: 3,
            description: "Explore the marine life at Dubai Aquarium & Underwater Zoo.",
            startDate: "15",
            endDate: "22"
        },
    ],
    UAE: [
        {
            src: "/images/demo/01.jpg",
            title: "Abu Dhabi City Tour",
            provider: "Local Guide",
            date: "12 August 2024",
            rating: 4,
            description: "Discover the capital city of UAE with this comprehensive tour.",
            startDate: "08",
            endDate: "10"
        },
        {
            src: "/images/demo/03.jpg",
            title: "Desert Safari in UAE",
            provider: "Adventure Company",
            date: "20 September 2024",
            rating: 5,
            description: "Experience the thrill of a desert safari in the UAE.",
            startDate: "17",
            endDate: "19"
        },
    ],
    Bahrain: [
        {
            src: "/images/demo/02.jpg",
            title: "Bahrain National Museum Visit",
            provider: "Culture Authority",
            date: "05 October 2024",
            rating: 4,
            description: "Explore the rich history and heritage of Bahrain.",
            startDate: "02",
            endDate: "04"
        },
    ],
    Kuwait: [
        {
            src: "/images/demo/04.jpg",
            title: "Kuwait Towers Exploration",
            provider: "Tourism Board",
            date: "18 November 2024",
            rating: 3,
            description: "Visit the iconic Kuwait Towers and enjoy panoramic views.",
            startDate: "15",
            endDate: "17"
        },
    ],
    Oman: [
        {
            src: "/images/demo/05.jpg",
            title: "Muscat City Tour",
            provider: "Oman Tours",
            date: "01 December 2024",
            rating: 5,
            description: "Discover the beauty and culture of Muscat.",
            startDate: "28",
            endDate: "30"
        },
    ],
    "Saudi Arabia": [
        {
            src: "/images/demo/06.jpg",
            title: "Riyadh Historical Tour",
            provider: "Saudi Travels",
            date: "10 January 2025",
            rating: 4,
            description: "Explore the historical sites of Riyadh.",
            startDate: "07",
            endDate: "09"
        },
        {
            src: "/images/demo/06.jpg",
            title: "Riyadh Historical Tour",
            provider: "Saudi Travels",
            date: "10 January 2025",
            rating: 4,
            description: "Explore the historical sites of Riyadh.",
            startDate: "07",
            endDate: "09"
        },
    ],
    Qatar: [
        {
            src: "/images/demo/01.jpg",
            title: "Doha City Highlights",
            provider: "Qatar Excursions",
            date: "25 February 2025",
            rating: 4,
            description: "Discover the modern marvels and cultural heritage of Doha.",
            startDate: "22",
            endDate: "24"
        },
    ],
};

const EventsExploreTab = ({ }) => {
    const [activeTab, setActiveTab] = useState('All');
    const countryTabs = Object.keys(eventData);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const ExploreEventsContainer = ({ events }) => {
        const [expandedItems, setExpandedItems] = useState([]);

        const toggleExpand = (index) => {
            setExpandedItems((prevExpandedItems) =>
                prevExpandedItems.includes(index)
                    ? prevExpandedItems.filter((item) => item !== index)
                    : [...prevExpandedItems, index]
            );
        };

        return (
            <ResponsiveMasonry>
                <Masonry>
                    {events.map((image, i) => (
                        <div key={i} className="masonry-item">
                            <img
                                src={image.src}
                                style={{ width: "100%", display: "block" }}
                                alt={image.title}
                            />
                            <div className="event-masonry-item-content">
                                <h5>{image.title}</h5>
                                <div className={style['provider-date']}>
                                    <p>{image.provider}</p> &nbsp; | &nbsp;
                                    <p>{image.date}</p>
                                </div>
                                <div className={style['star-section']}>
                                    <div className={style['star']}>
                                        <Rating
                                            count={5}
                                            value={image.rating}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false}
                                        />
                                    </div>
                                    <div><IoChatbubbleOutline /></div>
                                    <div><FaRegLightbulb /></div>
                                </div>

                                <ul className={style['pakages-ul']}>
                                    <li><p className="text-start">{image.description}</p></li>
                                </ul>

                                <ul className={style['plus-ul']}>
                                    {expandedItems.includes(i) && (
                                        <>
                                            <li><b>{image.startDate}</b><br />Jan</li>
                                            <li>to</li>
                                            <li><b>{image.endDate}</b><br />Feb</li>
                                        </>
                                    )}
                                </ul>

                                <Link href="/event-details" className={`${style['event-detail-button']} text-start`}>SHOPPING & RETAIL</Link>

                                <button className={style['btn-plus']} onClick={() => toggleExpand(i)}>
                                    <FiPlus />
                                </button>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        );
    };

    return (
        <section className={style.innerpage} >
            <div className={`container-fluid ${style['pr-0']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                    {countryTabs.map((tabId) => (
                                        <li className={`nav-item ${style['country-nav-item']}`} key={tabId} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['country-nav-link']} ${activeTab === tabId ? style['active-tab'] : ''}`}
                                                id={`${tabId}-tab`}
                                                data-bs-toggle="tab"
                                                data-bs-target={`#${tabId}`}
                                                type="button"
                                                role="tab"
                                                aria-controls={tabId}
                                                aria-selected={activeTab === tabId}
                                                onClick={() => handleTabChange(tabId)}
                                            >
                                                {tabId}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {countryTabs.map((tabId) => (
                                        <div
                                            key={tabId}
                                            className={`tab-pane fade ${activeTab === tabId ? 'show active' : ''}`}
                                            id={tabId}
                                            role="tabpanel"
                                            aria-labelledby={`${tabId}-tab`}
                                        >
                                            <div className={`${style['documentation-container']} p-0`}>
                                                <div className='container-fluid'>
                                                    <div className='row'>
                                                        <div className='col-md-12 p-0'>
                                                            <ExploreEventsContainer events={eventData[tabId]} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventsExploreTab;