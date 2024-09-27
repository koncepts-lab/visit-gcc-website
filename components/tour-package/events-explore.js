"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousal from '../carousel/Carousal';
// import MyWrapper from './responsive-masonry';



import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
// import style from "./style.module.css"; 
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdDownhillSkiing } from "react-icons/md";
import { IoBusOutline } from "react-icons/io5";
import { GiSailboat } from "react-icons/gi";
import MyWrapper from './responsive-masonry';

const images = [
    {
        src: "/images/demo/01.jpg",
        title: "Beautiful Yas Island and Dubai",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 4
    },
    {
        src: "/images/demo/02.jpg",
        title: "Dubai Jain Tour",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Extravaganza",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 3
    },
    {
        src: "/images/demo/04.jpg",
        title: "Dubai Miracle Garden",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 4
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Mall",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/06.jpg",
        title: "Dubai Aquarium & Underwater Zoo",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 3
    },


];
const EventsExploreTab = ({ breakPoints }) => {
    const countryExplore = [
        { id: 1, heading: 'Destination Heading', description: 'Luxury', image: "/images/blog/01.jpg" },
        { id: 2, heading: 'Destination Heading', description: 'Culture', image: "/images/blog/02.jpg" },
        { id: 3, heading: 'Destination Heading', description: 'Coastal Esscapes', image: "/images/blog/03.jpg" },
        { id: 4, heading: 'Destination Heading', description: 'History', image: "/images/blog/04.jpg" },
        { id: 5, heading: 'Destination Heading', description: 'Events', image: "/images/blog/01.jpg" },
    ];


    const featuredTravelData = [
        { id: 1, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/01.jpg" },
        { id: 2, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/02.jpg" },
        { id: 3, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/03.jpg", },
        { id: 4, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/01.jpg" },
        { id: 5, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/02.jpg" },
        { id: 6, heading: 'Travel Heading', description: 'Industry Name', image: "/images/best-picked/03.jpg", },
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
                                            id="UAE-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#UAE"
                                            type="button"
                                            role="tab"
                                            aria-controls="UAE"
                                            aria-selected="false"
                                        >
                                            UAE
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Bahrain-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Bahrain"
                                            type="button"
                                            role="tab"
                                            aria-controls="Bahrain"
                                            aria-selected="false"
                                        >
                                            Bahrain
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Kuwait-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Kuwait"
                                            type="button"
                                            role="tab"
                                            aria-controls="Kuwait"
                                            aria-selected="false"
                                        >
                                        Kuwait
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="Oman-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#Oman"
                                            type="button"
                                            role="tab"
                                            aria-controls="Oman"
                                            aria-selected="false"
                                        >
                                        Oman
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="saudi-arabia-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#saudi-arabia"
                                            type="button"
                                            role="tab"
                                            aria-controls="saudi-arabia"
                                            aria-selected="false"
                                        >
                                        Saudi Arabia
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="qatar-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#qatar"
                                            type="button"
                                            role="tab"
                                            aria-controls="qatar"
                                            aria-selected="false"
                                        >
                                        Qatar
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
                                            <div className='container-fluid'>
                                                <div className='row'>
                                                    <div className='col-md-12 p-0'>

                                                        <MyWrapper breakPoints={breakPoints} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="UAE"
                                        role="tabpanel"
                                        aria-labelledby="UAE-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>UAE</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Bahrain"
                                        role="tabpanel"
                                        aria-labelledby="Bahrain-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Bahrain</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Kuwait"
                                        role="tabpanel"
                                        aria-labelledby="Kuwait-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>New Activities</h4>
                                                        {/* <MyWrapper /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="Oman"
                                        role="tabpanel"
                                        aria-labelledby="Oman-tab"
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
                                        <div className='col-md-12 text-center mt-4'>
    <Carousal featuredTravel={featuredTravelData} count={4} type="tour-FeaturedTravel" />
    </div>

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

export default EventsExploreTab;
