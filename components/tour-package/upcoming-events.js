import React, { useState, useRef, useEffect } from 'react';
import style from "./style.module.css";
import Link from 'next/link';
import { FaUserCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

function UpcomingEvents() {
    const [expandedItems, setExpandedItems] = useState(false);
    const containerRef = useRef(null);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(2); // Default value
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const toggleExpand = () => {
        setExpandedItems(!expandedItems);
    };

    const truncateDescription = (description, maxLength) => {
        if (!description) return "";
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    const eventsData = [
        { id: 1, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/01.jpg", provider: "Admin", date: "02-Nov-2017", type: "Family", startDate: "15", startMonth: "Mar", endDate: "17", endMonth: "Mar" },
        { id: 2, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/02.jpg", provider: "Admin", date: "02-Nov-2017", type: "Workshop", startDate: "20", startMonth: "Apr", endDate: "22", endMonth: "Apr" },
        { id: 3, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/03.jpg", provider: "Admin", date: "02-Nov-2017", type: "Workshop", startDate: "10", startMonth: "May", endDate: "12", endMonth: "May" },
        { id: 4, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/01.jpg", provider: "Admin", date: "02-Nov-2017", type: "Workshop", startDate: "05", startMonth: "Jun", endDate: "07", endMonth: "Jun" },
        { id: 5, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/02.jpg", provider: "Admin", date: "02-Nov-2017", type: "Workshop", startDate: "25", startMonth: "Jul", endDate: "27", endMonth: "Jul" },
        { id: 6, heading: 'Pellentesque molestie ante vitae consectetur.', description: 'Lorem Ipsum is dummy text', image: "/images/best-picked/03.jpg", provider: "Admin", date: "02-Nov-2017", type: "Workshop", startDate: "01", startMonth: "Aug", endDate: "03", endMonth: "Aug" },
    ];

    const handleImageClick = (id) => {
        setExpandedItemId(expandedItemId === id ? null : id);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Determine slides to show based on screen width
        if (windowWidth >= 992) { // lg or larger
            setSlidesToShow(2);
        } else {
            setSlidesToShow(1);
        }
    }, [windowWidth]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % (eventsData.length - slidesToShow + 1));
        }, 6000);

        return () => clearInterval(interval);
    }, [eventsData.length, slidesToShow]);

    useEffect(() => {
        if (containerRef.current) {
            const slideWidth = containerRef.current.offsetWidth / slidesToShow;
            // Check if the window width is large enough for 80% scrolling
            const scrollAmount = windowWidth >= 992 ? currentSlide * slideWidth * 0.8 : currentSlide * slideWidth; // Scroll 80% for lg and above, 100% for below
            containerRef.current.scrollTo({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    }, [currentSlide, slidesToShow, windowWidth]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault(); // Prevent text selection during drag
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Reduced scroll speed
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    // Function to calculate dynamic width based on expanded state
    const calculateDynamicWidth = (index) => {
        const isExpanded = windowWidth >= 992 && index === currentSlide; // Only expand on larger screens and if it's the current slide
        const baseWidth = 100 / slidesToShow; // Width when not expanded

        let expandedWidth;

        if (slidesToShow === 1) {
            expandedWidth = isExpanded ? baseWidth : baseWidth; // Adjusted for single slide view
        } else {
            expandedWidth = isExpanded ? 60 : 40; // Adjusted for two slide view
        }

        return expandedWidth;
    };

    return (
        <div className={`${style['upcoming-carousel-container-wrapper']}`}>
            <div>
                <div
                    ref={containerRef}
                    className={`${style['upcoming-carousel-container']} ${style['draggable']}`}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        overflowX: 'hidden', // Hide scrollbar
                    }}
                >
                    {eventsData.map((event, index) => {
                        const dynamicWidth = calculateDynamicWidth(index);
                        const isExpanded = windowWidth >= 992 && index === currentSlide;

                        return (
                            <div
                                key={index}
                                className={`col-xl-${isExpanded ? 7 : 5} col-lg-${isExpanded ? 7 : 5} col-md-12 col-12 d-flex flex-row`}
                                style={{
                                    flex: `0 0 ${dynamicWidth}%`, // control width of item
                                    maxWidth: `${dynamicWidth}%`,
                                    transition: 'flex 0.3s ease-in-out, max-width 0.3s ease-in-out', // Smooth transition
                                }}
                            >
                                <div className={`${style['upcoming-item-padding']}`}>
                                    <div className={style['event-box']}>
                                        <img src={event.image} className='' alt="" onClick={() => handleImageClick(event.id)} />
                                        <div className={style['event-scroll']}>
                                            <Link href="/event-details" className={`${style['event-upcoming-button']} text-start`}>
                                                {event.type}
                                            </Link>
                                            <div className={style['event-scroll-text']}>
                                                <span>
                                                    <h4>{event.heading}</h4>
                                                    <p className='text-black-50'>{truncateDescription(event.description, 80)}</p>
                                                </span>
                                            </div>
                                            <div className='border-top col-12 pt-3 pb-1'>
                                                <ul className={style['plus-ul-upcoming']} style={{ paddingBottom: '90px', right: '20px' }}>
                                                    {expandedItems && (
                                                        <>
                                                            <li>
                                                                <b>{event.startDate}</b>
                                                                <br />
                                                                {event.startMonth}
                                                            </li>
                                                            <li>to</li>
                                                            <li>
                                                                <b>{event.endDate}</b>
                                                                <br />
                                                                {event.endMonth}
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                                <button className={style['btn-plus']} style={{ marginTop: '-35px', right: '20px' }} onClick={toggleExpand}>
                                                    <FiPlus />
                                                </button>
                                                <div className={` ${style['provider-date']} ps-lg-${isExpanded ? '4' : '1'} ps-4 d-flex flex-xl-row flex-lg-${isExpanded ? 'row' : 'column'}`} >
                                                    <p  className={`pe-lg-${isExpanded ? '3' : '1'} pe-3`} >
                                                        <span className={`pe-${isExpanded ? '3' : '1'} pe-3`}>
                                                            <FaUserCircle size={27} color='grey' />
                                                        </span>
                                                        <span className='fw-semibold text-black-50 col-12'>BY: </span>
                                                        {event.provider}
                                                    </p>
                                                    <span className={`pe-3 d-lg-${isExpanded ? 'block' : 'none'}`} >|</span>
                                                    <p>{event.date}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={style['pagination-dots']}>
                {Array.from({ length: eventsData.length - slidesToShow + 1 }).map((_, index) => (
                    <span
                        key={index}
                        className={`${style['dot']} ${index === currentSlide ? style['active'] : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default UpcomingEvents;