"use client"; // Ensure this component is treated as a Client Component

import React, { useState } from "react";
import Slider from "react-slick";
import style from "./style.module.css"; // Ensure correct path for styles

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing icons
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoLocationSharp, IoIosCloudyNight } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GiCruiser } from "react-icons/gi";
import { FaFerry, FaTrain } from "react-icons/fa";
import { IoIosAirplane } from "react-icons/io";

// Main Tab Component
const HighlightTab = () => {
  const [activeTab, setActiveTab] = useState("Highlight");

  const tabs = [
    { name: "Highlight", label: "Highlight" },
    {
      name: "PhotoGalleryEventHighlights",
      label: "Photo Gallery / Event Highlights",
    },
    { name: "FAQSection", label: "FAQ Section" },
    { name: "TicketInformation", label: "Ticket Information" },
    { name: "SponsorsAndPartners", label: "Sponsors and Partners" },
    { name: "VenueInformation", label: "Venue Information" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Highlight":
        return <HighlightContent />;
      case "PhotoGalleryEventHighlights":
        return <PhotoGalleryEventHighlightsContent />;
      case "FAQSection":
        return <FAQSectionContent />;
      case "TicketInformation":
        return <TicketInformationContent />;
      case "SponsorsAndPartners":
        return <SponsorsAndPartnersContent />;
      case "VenueInformation":
        return <VenueInformationContent />;
      default:
        return null;
    }
  };

  return (
    <div className={style.tabContainer}>
      <div className={style.tabButtons}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${style.tabButton} ${
              activeTab === tab.name ? style.active : ""
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={style.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

// Highlight Tab Content
const HighlightContent = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const accordionTabs = [
    { name: "Day 1 - Arrival in Salalah", content: "Content for Day 1" },
    { name: "Day 2 - Salalah City Tour", content: "Content for Day 2" },
    { name: "Day 3 - East Salalah Tour", content: "Content for Day 3" },
    { name: "Day 4 - Farewell Salalah", content: "Content for Day 4" },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div>
      <h3>Timeline</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
    </div>
  );
};

// Photo Gallery Tab Content
const PhotoGalleryEventHighlightsContent = () => {
  const carouselSettings = {
    dots: true, // Enable dot pagination
    infinite: true, // Loop slides infinitely
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay interval in milliseconds
    arrows: false, // Hide navigation arrows
  };

  const images = [
    "https://dummyimage.com/2000x700/009497/ffffff.jpg&text=2000x700",
    "https://dummyimage.com/2000x700/962100/ffffff.jpg&text=2000x700",
    "https://dummyimage.com/2000x700/948500/ffffff.jpg&text=2000x700",
  ];

  return (
    <div className="photoGalleryContainer">
      <h4>Photo Gallery / Event Highlights</h4>
      <Slider {...carouselSettings}>
        {images.map((image, index) => (
          <div key={index} className={style.carouselSlide}>
            <img src={image} alt={`Slide ${index + 1}`} className="rounded-4" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// FAQ Tab Content
const FAQSectionContent = () => (
  <div>
    <h4>FAQ Section</h4>
    <p>Here are some frequently asked questions and answers.</p>
  </div>
);

// Ticket Information Tab Content
const TicketInformationContent = () => (
  <div>
    <h4>Ticket Information</h4>
    <p>Details about ticket booking and prices.</p>
  </div>
);

// Sponsors Tab Content
const SponsorsAndPartnersContent = () => (
  <div>
    <h4>Sponsors and Partners</h4>

    <div className="container pt-2">
      <div className="row">
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
        <div className="col-md-2 mb-4">
          <img src="../images/logo.svg" />
        </div>
      </div>
    </div>
  </div>
);

// Venue Information Tab Content
const VenueInformationContent = () => (
  <div>
    <h4>Venue Information</h4>

    <div className="container">
      <div className={`row ${style["Legend-ul"]}`}>
        <div className="col-md-8">
          <img src="../images/map.jpg" alt="Bahrain" />
        </div>
        <div className="col-md-4">
          <h4>Legend</h4>
          <ul>
            <li>
              <p>
                <IoLocationSharp />
                Start Location
              </p>
            </li>
            <li>
              <p>
                <IoLocationSharp />
                End Location
              </p>
            </li>
            <li>
              <p>
                <IoIosCloudyNight />
                Over Night
              </p>
            </li>
            <li>
              <p>
                <GoDotFill />
                Visited Location
              </p>
            </li>
            <li>
              <p>
                <GiCruiser />
                Cruise
              </p>
            </li>
            <li>
              <p>
                <FaFerry />
                Ferry
              </p>
            </li>
            <li>
              <p>
                <IoIosAirplane />
                Plane
              </p>
            </li>
            <li>
              <p>
                <FaTrain />
                Train
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default HighlightTab;
