import React, { useState } from "react";
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import style from "./style.module.css"; // Adjust the import according to your style file location
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdDownhillSkiing } from "react-icons/md";
import { IoBusOutline } from "react-icons/io5";
import { GiSailboat } from "react-icons/gi";

const images = [
    {
        src: "/images/demo/01.jpg",
        title: "Dubai Shopping Festival",
        provider: "by Tour provider",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        startDate: "08",
        endDate: "08",
        date: "15 November, 2017",
        rating: 4
    },
    {
        src: "/images/demo/02.jpg",
        title: "Dubai Jain Tour",
        provider: "John Smith",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        startDate: "08",
        endDate: "08",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Extravaganza",
        provider: "John Smith",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        startDate: "08",
        endDate: "08",
        date: "04 July 2024",
        rating: 3
    },
    {
        src: "/images/demo/04.jpg",
        title: "Dubai Miracle Garden",
        provider: "John Smith",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        startDate: "08",
        endDate: "08",
        date: "04 July 2024",
        rating: 4
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Mall",
        provider: "John Smith",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        startDate: "08",
        endDate: "08",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/06.jpg",
        title: "Dubai Aquarium & Underwater Zoo",
        provider: "John Smith",
        description: "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
        date: "04 July 2024",
        startDate: "08",
        endDate: "08",
        rating: 3
    },
];



const ExploreEventsContainer = ({ breakPoints }) => {
    const [expandedItems, setExpandedItems] = useState([]); // To track which items are expanded

    // Toggle function for expanding/collapsing the ul
    const toggleExpand = (index) => {
        setExpandedItems((prevExpandedItems) =>
            prevExpandedItems.includes(index)
                ? prevExpandedItems.filter((item) => item !== index)
                : [...prevExpandedItems, index]
        );
    };

    return (
        <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
            <Masonry>
                {images.map((image, i) => (
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

                            {/* Toggleable UL */}
                            <ul className={style['plus-ul']}>
                         
                                {expandedItems.includes(i) && (
                                    <>
                                        <li><b>{image.startDate}</b><br/>Jan</li>
                                        <li>to</li>
                                        <li><b>{image.endDate}</b><br/>Feb</li>
                                    </>
                                )}
                            </ul>

                            <Link href="/event-details" className={`${style['event-detail-button']} text-start`}>SHOPPING & RETAIL</Link>

                            <button  className={style['btn-plus']} onClick={() => toggleExpand(i)}>  
                                <FiPlus />
                            </button>
                        </div>
                    </div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
    );
};

export default ExploreEventsContainer;
