"use client"; // Ensure this component is treated as a Client Component

import React, { useState } from "react";
import Slider from "react-slick";
import style from "./style.module.css"; // Ensure correct path for styles

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Importing icons
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosCloudyNight, IoIosAirplane } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { GiCruiser } from "react-icons/gi";
import { FaFerry, FaTrain } from "react-icons/fa";
import Map from "@components/map/Map";

// Main Tab Component
const HighlightTab = ({
  highlight,
  photo,
  faq,
  ticket,
  sponsor,
  venue,
  latitude,
  longitude,
}) => {
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
        return <HighlightContent highlight={highlight} />;
      case "PhotoGalleryEventHighlights":
        return <PhotoGalleryEventHighlightsContent photoGallery={photo} />;
      case "FAQSection":
        return <FAQSectionContent faq={faq} />;
      case "TicketInformation":
        return <TicketInformationContent ticket={ticket} />;
      case "SponsorsAndPartners":
        return <SponsorsAndPartnersContent sponsors={sponsor} />;
      case "VenueInformation":
        return (
          <VenueInformationContent
            venue={venue}
            latitude={latitude}
            longitude={longitude}
          />
        );
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

// No Data Message Component
const NoDataMessage = ({ message }) => (
  <div style={{ textAlign: "center", padding: "2rem", color: "#6c757d" }}>
    <p>{message}</p>
  </div>
);

// Highlight Tab Content
const HighlightContent = ({ highlight }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Check if highlight data exists
  if (!highlight || highlight.trim() === "") {
    return (
      <NoDataMessage message="No highlight information available at the moment." />
    );
  }

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
      <p>{highlight}</p>
    </div>
  );
};

// Photo Gallery Tab Content
const PhotoGalleryEventHighlightsContent = ({ photoGallery }) => {
  // Check if photo gallery data exists
  if (
    !photoGallery ||
    !Array.isArray(photoGallery) ||
    photoGallery.length === 0
  ) {
    return (
      <NoDataMessage message="No photos or event highlights available at the moment." />
    );
  }

  const carouselSettings = {
    dots: true,
    infinite: photoGallery.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: photoGallery.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: photoGallery.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: photoGallery.length > 1,
        },
      },
    ],
  };

  return (
    <div className="photoGalleryContainer">
      <h4>Photo Gallery / Event Highlights</h4>
      <Slider {...carouselSettings}>
        {photoGallery.map((image, index) => (
          <div key={index} className={style.carouselSlide}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="rounded-4 col-sm-10 col-12"
              style={{ height: "252px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// FAQ Tab Content
const FAQSectionContent = ({ faq }) => {
  // Check if FAQ data exists
  if (!faq || faq.trim() === "") {
    return (
      <NoDataMessage message="No frequently asked questions available at the moment." />
    );
  }

  return (
    <div>
      <h4>FAQ Section</h4>
      <p>{faq}</p>
    </div>
  );
};

// Ticket Information Tab Content
const TicketInformationContent = ({ ticket }) => {
  // Check if ticket data exists
  if (!ticket || ticket.trim() === "") {
    return (
      <NoDataMessage message="No ticket information available at the moment." />
    );
  }

  return (
    <div>
      <h4>Ticket Information</h4>
      <p>{ticket}</p>
    </div>
  );
};

// Sponsors Tab Content
const SponsorsAndPartnersContent = ({ sponsors }) => {
  // Check if sponsors data exists
  if (!sponsors || sponsors.trim() === "") {
    return (
      <NoDataMessage message="No sponsors and partners information available at the moment." />
    );
  }

  return (
    <div>
      <h4>Sponsors and Partners</h4>
      <div className="container pt-2">
        <div className="row">
          <p>{sponsors}</p>
        </div>
      </div>
    </div>
  );
};

// Venue Information Tab Content
const VenueInformationContent = ({ venue, latitude, longitude }) => {
  // Check if venue data exists
  const hasVenueData = venue && venue.trim() !== "";
  const hasCoordinates = latitude && longitude;

  if (!hasVenueData && !hasCoordinates) {
    return (
      <NoDataMessage message="No venue information available at the moment." />
    );
  }

  return (
    <div>
      <h4>Venue Information</h4>
      <div className="container">
        <div className={`row ${style["Legend-ul"]}`}>
          {hasVenueData && <p>{venue}</p>}
          {hasCoordinates ? (
            <Map latitude={latitude} longitude={longitude} />
          ) : (
            <div
              style={{ textAlign: "center", padding: "1rem", color: "#6c757d" }}
            >
              <p>Map location not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightTab;
