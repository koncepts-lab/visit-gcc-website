"use client";  // Ensure this is at the top of the file

import React, { useState } from 'react';
import { Range } from 'react-range';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  // Import Calendar styles
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Carousal from '../../../components/carousel/Carousal'; 
import Accordion from '../../../components/accordion/accordion';
import EventsExploreTab from '../../../components/tour-package/events-explore';
import UpcomingEvents from "../../../components/tour-package/upcoming-events";


const eventScrollData = [
  {
    id: 1,
    heading: "Project Heading55",
    description: "Industry Name",
    image: "/images/other-packages/01.jpg",
    link: "www.google.com",
  },
  {
    id: 2,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/02.jpg",
    link: "www.google.com",
  },
  {
    id: 3,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/03.jpg",
    link: "www.google.com",
  },
  {
    id: 4,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/04.jpg",
    link: "www.google.com",
  },
  {
    id: 5,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/05.jpg",
    link: "www.google.com",
  },
  {
    id: 6,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/06.jpg",
    link: "www.google.com",
  },
];

const Country = () => {
  const [priceRange, setPriceRange] = useState([30, 3900]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const accordionData = [
    {
        title: 'DATE',
        items: ['Upcoming Events (sorted by date)', 'Past Events (sorted by date)', 'Todays Events', 'This Weeks Events', 'This Months Events']
    },
    {
        title: 'EVENT TYPE',
        items: ['Festivals and Celebrations', 'Cultural Events', 'Sports and Fitness Events', 'Conferences and Exhibitions', 'Food and Beverage Events', 'Family and Entertainment', 'Events', 'Educational Events', 'Business and Economic']
    },
    {
        title: 'EVENT LOCATION',
        items: ['Dubai, UAE', 'Abu Dhabi, UAE', 'Bahrain', 'Kuwait', 'Oman', 'Saudi Arabia', 'Other locations']
    },
    {
        title: 'EVENT FORMAT',
        items: ['Arabic', 'English', 'French', 'Other languages']
    },
    {
        title: 'LANGUAGE',
        items: ['Luxury', 'Adventure', 'Family-Friendly', 'Couple', 'Group Tour', 'Budget Friendly']
    },
    {
        title: 'DURATION',
        items: ['Half-day events', 'Full-day events', 'Multi-day events']
    },
    {
        title: 'AGE GROUP',
        items: ['Adults only', 'Family-friendly events', 'Childrens events']
    }
];


const wondersData = [
  { id: 1, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/01.jpg" },
  { id: 2, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/02.jpg" },
  { id: 3, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/03.jpg", },
  { id: 4, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/01.jpg" },
  { id: 5, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/02.jpg" },
  { id: 6, heading: 'Best Picked', description: 'Lorem Ipsum is dummy text', image: "/images/wonders/03.jpg", },
];


  return (
    <>
      <Banner />
      <section className={style["events-full-container"]}>
        {/* Intro section */}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/events/03.jpg"
                className={`${style["banner-box-logo"]} img-fluid w-100`}
                alt="Banner"
              />
            </div>
            <div className={`col-md-6 ${style["d-flex"]}`}>
              <div className={style["events-top-text"]}>
                <h3>Top Picks</h3>
                <p className="mb-2">
                  Don't miss out on these unmissable events!
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Event Scroll */}
        <div className="container-fluid py-lg-5">
          <div className="row">
            <div className="col-md-12">
              <Carousal eventScroll={eventScrollData} count={5} type="event-page-scroll" />
            </div>
          </div>
        </div>

        <div className={style['explore-event-container']}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <div className={style['event-left-container']}>
                  <h4 className="pt-2">Price Range</h4>
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
                            backgroundColor: '#ccc',
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
                            backgroundColor: '#fff',
                          }}
                        />
                      )}
                    />
                    <div>
                      <p className={style['price-range-text']}>
                        Price Range: ${priceRange[0]} — ${priceRange[1]}
                      </p>
                    </div>
                  </div>

                  <div className={style['media-calendar']}>
                    <h4 className="pt-2">Calendar</h4>
                    <Calendar onChange={handleDateChange} value={selectedDate} />
                  </div>

                  <div className={style['accordion-range']}>
                    {accordionData.map((accordion, index) => (
                      <Accordion
                        key={index}
                        title={accordion.title}
                        items={accordion.items}
                        isOpenInitially={true}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <h3>Explore the Latest Events and Happenings</h3>
                <EventsExploreTab />

                {/* Upcoming Events */}
                <section className={style['pakage-bes-picked']}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-3">Upcoming Events</h3> 
                      </div>
                      <div className="col-md-12">
                        <div className="upcoming-events-picked">
                          <UpcomingEvents/>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Lesser-known wonders */}
                <section className={style['pakage-bes-picked']}>
                  <div className="container pt-5">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="pb-1">Lesser-Known Wonders</h3>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry...
                        </p>
                      </div>
                      <div className="col-md-12">
                        <Carousal wonders={wondersData} count={3} type="past-events" />
                      </div>
                    </div>
                  </div>
                </section>

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Country;
