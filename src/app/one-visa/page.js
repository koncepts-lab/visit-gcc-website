"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OneVisa = () => {
  // State for the interactive section
  const [activeStakeholder, setActiveStakeholder] = useState(
    "United Arab Emirates (UAE)"
  );

  // Data for the "FOR WHOM" carousel
  const cards = [
    {
      title: "Students & Researchers",
      description:
        "Ideal for students attending short courses, exchange programs, or researchers engaging in collaborative academic projects.",
      icon: (
        <img
          src="/images/one-visa/icons-02.svg"
          style={{ height: "44px" }}
          className="bi mb-3 mx-auto"
          alt="Students Icon"
        />
      ),
    },
    {
      title: "Tourists",
      description:
        "Explore 6 countries with one visa—from Saudi Arabia’s ancient heritage sites to Dubai’s futuristic skyline.",
      icon: (
        <img
          src="/images/one-visa/icons-01.svg"
          style={{ height: "44px" }}
          className="bi mb-3 mx-auto"
          alt="Tourists Icon"
        />
      ),
    },
    {
      title: "Business Professionals",
      description:
        "Attend conferences in Riyadh, sign deals in Dubai, and network in Doha without visa hassles.",
      icon: (
        <img
          src="/images/one-visa/icons-03.svg"
          style={{ height: "44px" }}
          className="bi mb-3 mx-auto"
          alt="Business Icon"
        />
      ),
    },
    {
      title: "Investors",
      description:
        "Scout projects in Oman’s ports, Saudi megacities, or Bahrain’s fintech hubs with ease.",
      icon: (
        <img
          src="/images/one-visa/icons-04.svg"
          style={{ height: "44px" }}
          className="bi mb-3 mx-auto"
          alt="Investors Icon"
        />
      ),
    },
    {
      title: "Freelancers & Digital Nomads",
      description:
        "Creative professionals and remote workers can explore different GCC countries while continuing their work.",
      icon: (
        <img
          src="/images/one-visa/icons-05.svg"
          style={{ height: "44px" }}
          className="bi mb-3 mx-auto"
          alt="Freelancers Icon"
        />
      ),
    },
  ];

  const carouselItems = [];
  for (let i = 0; i < cards.length; i++) {
    const itemCards = [];
    for (let j = 0; j < 5; j++) {
      const cardIndex = (i + j) % cards.length;
      itemCards.push(cards[cardIndex]);
    }
    carouselItems.push(itemCards);
  }

  // --- COMPREHENSIVE DATA STRUCTURE FOR STAKEHOLDERS ---
  const stakeholderData = {
    "Saudi Arabia": {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="Vision 2030"
            />
          ),
          title: "Boost Vision 2030 Tourism",
          description:
            "Accelerate progress towards attracting 100 million tourists by offering seamless access to NEOM, AlUla, and Red Sea giga-projects.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Investment"
            />
          ),
          title: "Foreign Investment Magnet",
          description:
            "Simplify travel for investors exploring opportunities in Riyadh's financial district and Jeddah's burgeoning tech scene.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Events"
            />
          ),
          title: "Mega-Event Powerhouse",
          description:
            "Solidify the Kingdom's role as a host for global sports, entertainment, and cultural events by removing visa barriers for attendees.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="Aviation"
            />
          ),
          title: "Aviation & Logistics Hub",
          description:
            "Drive passenger traffic through King Khalid and King Abdulaziz airports, promoting stopover tourism and trade.",
        },
      ],
    },
    "United Arab Emirates (UAE)": {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="MICE"
            />
          ),
          title: "Reinforce Global MICE Leadership",
          description:
            "Cement Dubai/Abu Dhabi as top destinations for conferences and mega-events (e.g., COP28, GITEX) with hassle-free entry.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Tourism"
            />
          ),
          title: "Luxury Tourism Surge",
          description:
            "Attract high-net-worth travelers to cultural landmarks like the Louvre Abu Dhabi and Sheikh Zayed Mosque with seamless access.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Nomad"
            />
          ),
          title: "Digital Nomad Hub",
          description:
            "Leverage the visa to retain remote workers in Dubai's “virtual working program,” boosting long-term residency and spending.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="Aviation"
            />
          ),
          title: "Aviation Growth",
          description:
            "Enhance Emirates/Etihad transit passenger numbers by offering stopover tours across the entire GCC region.",
        },
      ],
    },
    Qatar: {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="Legacy"
            />
          ),
          title: "Post-World Cup Legacy",
          description:
            "Capitalize on 2022 World Cup infrastructure by making it easier for tourists to visit stadiums, museums, and new developments.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Business"
            />
          ),
          title: "Strengthen Business & LNG Sector",
          description:
            "Facilitate travel for professionals in the energy, finance, and logistics sectors, reinforcing Doha as a key business hub.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Culture"
            />
          ),
          title: "Cultural Tourism Expansion",
          description:
            "Promote attractions like the Museum of Islamic Art and Katara Cultural Village to a wider regional audience.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="Aviation"
            />
          ),
          title: "Qatar Airways Stopover Program",
          description:
            "Boost the successful stopover program by offering multi-country tour packages as an add-on for transit passengers.",
        },
      ],
    },
    Oman: {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="Eco-Tourism"
            />
          ),
          title: "Eco-Tourism & Adventure",
          description:
            "Showcase Oman's unique natural beauty, from the wadis to the fjords of Musandam, attracting adventure-seeking tourists.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Heritage"
            />
          ),
          title: "Cultural Heritage Promotion",
          description:
            "Increase visitor numbers to historic forts in Nizwa, the frankincense trail in Salalah, and Muscat's Royal Opera House.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Logistics"
            />
          ),
          title: "Boost Port & Logistics",
          description:
            "Enhance business travel to strategic ports like Sohar and Duqm, fostering trade and regional connectivity.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="Cruise"
            />
          ),
          title: "Cruise Tourism Growth",
          description:
            "Position Muscat as a premier cruise destination, allowing passengers to easily embark on land tours across the GCC.",
        },
      ],
    },
    Kuwait: {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="Business"
            />
          ),
          title: "Enhance Business Travel",
          description:
            "Streamline entry for professionals in the oil, gas, and finance industries, facilitating corporate travel and investment.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Shopping"
            />
          ),
          title: "Retail & Leisure Hub",
          description:
            "Attract regional shoppers and families to world-class malls like The Avenues and entertainment complexes.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Culture"
            />
          ),
          title: "Showcase Modern Culture",
          description:
            "Promote Kuwait's vibrant arts scene, modern architecture, and cultural centers like the Sheikh Jaber Al-Ahmad Cultural Centre.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="Medical"
            />
          ),
          title: "Medical Tourism Niche",
          description:
            "Simplify access for regional visitors seeking Kuwait's high-quality private healthcare services.",
        },
      ],
    },
    Bahrain: {
      bgColor: "#c8a867",
      textColor: "#4a3b1a",
      benefits: [
        {
          icon: (
            <img
              src="/images/one-visa/icons-09.svg"
              style={{ height: "44px" }}
              alt="F1"
            />
          ),
          title: "Formula 1 & Events Hub",
          description:
            "Boost attendance at the Bahrain Grand Prix and other international events by simplifying travel for fans from neighboring countries.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-10.svg"
              style={{ height: "44px" }}
              alt="Fintech"
            />
          ),
          title: "Financial & Fintech Gateway",
          description:
            "Reinforce Manama's position as a financial hub by easing access for bankers, investors, and fintech entrepreneurs.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-12.svg"
              style={{ height: "44px" }}
              alt="Weekend"
            />
          ),
          title: "Weekend Getaway Destination",
          description:
            "Solidify its role as a prime weekend destination for tourists from Saudi Arabia and other GCC states.",
        },
        {
          icon: (
            <img
              src="/images/one-visa/icons-11.svg"
              style={{ height: "44px" }}
              alt="History"
            />
          ),
          title: "Historical & Pearl-Diving Tourism",
          description:
            "Promote Bahrain's rich UNESCO World Heritage sites related to the pearl industry and ancient Dilmun civilization.",
        },
      ],
    },
  };

  const stakeholderBenefitItemsData =
    stakeholderData[activeStakeholder].benefits;
  const stakeholderSidebarItems = Object.keys(stakeholderData);

  // Your original theme colors
  const stakeholderPrimaryTextColor = "#2c3e50";
  const stakeholderSecondaryTextColor = "#566573";
  const stakeholderIconColor = "#6c757d";
  const stakeholderBorderColor = "#e9ecef";

  return (
    <section>
      <style>
        {`
          .largeText { font-size: 68px; text-wrap: nowrap; color: #3C3C3C; }
          .setWidth{ max-width: 70%; margin-inline: auto; }
          .marginTop{ margin-top: 0px; }
          @media (max-width: 1024px) { .largeText { font-size: 36px; } }
          @media (max-width: 768px) {
            .setWidth{ max-width: 100%; margin-inline: 16px; }
            .marginTop{ margin-top: 80px; }
          }  
        `}
      </style>

      {/* Hero Section */}
      <div className="position-relative w-100 ">
        <img
          src="/images/one-visa/banner.jpg"
          className="mt-md-0 mt-5"
          alt="GCC Unified Visa Banner"
        />
      </div>

      {/* "FOR WHOM IS THIS VISA A GAME-CHANGER?" Section */}
      <div className="py-5" style={{ backgroundColor: "#E3D7C7" }}>
        <h2 className="text-center mb-5">
          FOR WHOM IS THIS VISA A GAME-CHANGER?
        </h2>
        <div id="visaSlider" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {carouselItems.map((itemCards, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="row justify-content-center justify-content-sm-start flex-nowrap gx-3">
                  {itemCards.map((card, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="col-10 col-sm-8 col-md-5 col-lg-3 mb-4 d-flex"
                      style={{ minWidth: "280px", maxWidth: "320px" }}
                    >
                      <div className="card h-100 text-center p-4 shadow-sm">
                        {card.icon}
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text small">{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-link text-dark"
              type="button"
              data-bs-target="#visaSlider"
              data-bs-slide="prev"
              style={{ fontSize: "24px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 0 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="btn btn-link text-dark"
              type="button"
              data-bs-target="#visaSlider"
              data-bs-slide="next"
              style={{ fontSize: "24px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* "Why This Visa" Section */}
      <div className="col-12 h-auto" style={{ background: "#ECF1F7" }}>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <img
              src="/images/one-visa/Why-this-visa.jpg"
              style={{ width: "80%", height: "80%" }}
              alt="Why This Visa"
            />
          </div>
          <div className="col-lg-4 col-md-6 p-5">
            <div className="row g-4">
              <div className="col-12 mt-0">
                <div className=" border-0 h-100">
                  <div className=" p-0">
                    <h3
                      className="h5 fw-bold mb-3"
                      style={{ color: "#2c2c2c" }}
                    >
                      Economic Surge
                    </h3>
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#666",
                      }}
                    >
                      Unlock $1 trillion in combined GDP potential by
                      streamlining cross-border trade, tourism, and investment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-0">
                <div className=" border-0 h-100">
                  <div className=" p-0">
                    <h3
                      className="h5 fw-bold mb-3"
                      style={{ color: "#2c2c2c" }}
                    >
                      Regional Unity
                    </h3>
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#666",
                      }}
                    >
                      Strengthen GCC collaboration, positioning the bloc as a
                      single market rivaling the EU and ASEAN.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-0">
                <div className=" border-0 h-100">
                  <div className=" p-0">
                    <h3
                      className="h5 fw-bold mb-3"
                      style={{ color: "#2c2c2c" }}
                    >
                      Global Leadership
                    </h3>
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#666",
                      }}
                    >
                      Elevate the GCC as the world's most accessible high-growth
                      region, attracting 150M+ tourists annually by 2035.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-0">
                <div className=" border-0 h-100">
                  <div className=" p-0">
                    <h3
                      className="h5 fw-bold mb-3"
                      style={{ color: "#2c2c2c" }}
                    >
                      Sustainability
                    </h3>
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#666",
                      }}
                    >
                      Eco-tourism and smart city investments align with Saudi
                      Green Initiative and UAE Net Zero 2050 goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Key Features" Section */}
      <div className="py-5" style={{ backgroundColor: "#E3D7C7" }}>
        <div className="container">
          <h2
            className="text-center mb-5 fw-semibold"
            style={{ color: "#3C3C3C" }}
          >
            Key Features Of The GCC Unified Visa
          </h2>
          <div className="d-flex flex-xl-row flex-column gap-4 setWidth">
            <div className="col-xl-4">
              <div className="card h-100 text-center p-4">
                <img
                  src="/images/one-visa/icon-06.svg"
                  style={{ height: "44px" }}
                  className="bi mb-3 mx-auto"
                  alt="Multi Access Icon"
                />
                <h5 className="card-title">Easy Multi Access</h5>
                <p className="card-text" style={{ minHeight: "72px" }}>
                  Enter any GCC country multiple times with a single
                  application.
                </p>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card h-100 text-center p-4">
                <img
                  src="/images/one-visa/icons-07.svg"
                  style={{ height: "44px" }}
                  className="bi mb-3 mx-auto"
                  alt="Cost-Effective Icon"
                />
                <h5 className="card-title">Cost-Effective</h5>
                <p className="card-text" style={{ minHeight: "72px" }}>
                  Save 60% compared to individual visa costs.
                </p>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card h-100 text-center p-4">
                <img
                  src="/images/one-visa/icons-07.svg"
                  style={{ height: "44px" }}
                  className="bi mb-3 mx-auto"
                  alt="Opportunities Icon"
                />
                <h5 className="card-title">Expanded Opportunities</h5>
                <p className="card-text">
                  Projected to boost GCC tourism revenue by $30B annually by
                  2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- START: Benefits for Stakeholders Section --- */}
      <div style={{ padding: "50px 0" }} className="setWidth">
        <div className="container">
          <h2
            className="text-center mb-4 mb-md-5 fw-bold"
            style={{ color: stakeholderPrimaryTextColor }}
          >
            Benefits for Stakeholders
          </h2>
          {/* Mobile Dropdown */}
          <div className="d-xl-none mb-4">
            <select
              className="form-select form-select-lg"
              value={activeStakeholder}
              onChange={(e) => setActiveStakeholder(e.target.value)}
            >
              {stakeholderSidebarItems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="row justify-content-center align-items-stretch g-0">
            {/* Left Sidebar */}
            <div className="col-md-2 col-lg-2 d-none d-xl-flex flex-column">
              {stakeholderSidebarItems.slice(0, 3).map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveStakeholder(item)}
                  className="flex-fill d-flex align-items-center justify-content-center text-center p-3 fw-bold"
                  style={{
                    backgroundColor:
                      activeStakeholder === item
                        ? stakeholderData[item].bgColor
                        : "#c8a86733",
                    color: stakeholderData[item].textColor,
                    border: "none",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Central Content */}
            <div className="col-12 col-xl-8">
              <div className="bg-white shadow-sm h-100">
                <div className="row g-0">
                  {stakeholderBenefitItemsData
                    .slice(0, 2)
                    .map((benefit, index) => (
                      <div
                        key={index}
                        className={`col-12 col-sm-6 p-3 p-md-4 ${
                          index === 0 ? "border-end" : ""
                        } border-bottom`}
                        style={{
                          borderColor: `${stakeholderBorderColor} !important`,
                          minHeight: "170px",
                        }}
                      >
                        <div className="d-flex align-items-start">
                          <div
                            className="me-3 flex-shrink-0"
                            style={{
                              fontSize: "1.8rem",
                              color: stakeholderIconColor,
                              marginTop: "0.1rem",
                            }}
                          >
                            {benefit.icon}
                          </div>
                          <div>
                            <h6
                              className="fw-bold mb-1"
                              style={{
                                color: stakeholderPrimaryTextColor,
                                fontSize: "0.9rem",
                              }}
                            >
                              {benefit.title}
                            </h6>
                            <p
                              className="mb-0"
                              style={{
                                color: stakeholderSecondaryTextColor,
                                fontSize: "0.8rem",
                              }}
                            >
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row g-0">
                  {stakeholderBenefitItemsData
                    .slice(2, 4)
                    .map((benefit, index) => (
                      <div
                        key={index}
                        className={`col-12 col-sm-6 p-3 p-md-4 ${
                          index === 0 ? "border-end" : ""
                        }`}
                        style={{
                          borderColor: `${stakeholderBorderColor} !important`,
                          minHeight: "170px",
                        }}
                      >
                        <div className="d-flex align-items-start">
                          <div
                            className="me-3 flex-shrink-0"
                            style={{
                              fontSize: "1.8rem",
                              color: stakeholderIconColor,
                              marginTop: "0.1rem",
                            }}
                          >
                            {benefit.icon}
                          </div>
                          <div>
                            <h6
                              className="fw-bold mb-1"
                              style={{
                                color: stakeholderPrimaryTextColor,
                                fontSize: "0.9rem",
                              }}
                            >
                              {benefit.title}
                            </h6>
                            <p
                              className="mb-0"
                              style={{
                                color: stakeholderSecondaryTextColor,
                                fontSize: "0.8rem",
                              }}
                            >
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-md-2 col-lg-2 d-none d-xl-flex flex-column">
              {stakeholderSidebarItems.slice(3, 6).map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveStakeholder(item)}
                  className="flex-fill d-flex align-items-center justify-content-center text-center p-3 fw-bold"
                  style={{
                    backgroundColor:
                      activeStakeholder === item
                        ? stakeholderData[item].bgColor
                        : "#c8a86733",
                    color: stakeholderData[item].textColor,
                    border: "none",
                    transition: "background-color 0.3s ease",
                    borderBottom: "1px solid white",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* --- END: Benefits for Stakeholders Section --- */}

      {/* "Gateway to Six Nations" Section */}
      <div
        style={{
          backgroundColor: "#E3D7C7",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            className="mb-5 fw-bold"
            style={{ color: "#3C3C3C", fontSize: "2.25rem" }}
          >
            Your Gateway to Six Nations Awaits
          </h2>
          <div className="row justify-content-center gx-lg-5 setWidth">
            <div className="col-md-3 col-6 mb-4 text-center">
              <svg
                version="1.1"
                id="Layer_1_Explore"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                height={70}
                width={70}
                viewBox="0 0 51 50"
                style={{ enableBackground: "new 0 0 51 50" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fill="#68767F"
                    d="M23.45,0c1.3,0,2.59,0,3.89,0c0.23,0.2,0.52,0.08,0.77,0.11c3.16,0.37,6.18,1.2,8.96,2.74 c7.84,4.37,12.3,11.01,13.2,19.97c0.32,3.23-0.06,6.39-1.02,9.48c-3.07,9.78-11.8,16.63-21.79,17.38 c-3.77,0.28-7.44-0.15-10.93-1.59C7.78,44.47,2.55,37.95,0.88,28.6c-0.1-0.56-0.05-1.14-0.27-1.68c0-1.36,0-2.72,0-4.08 c0.11-0.03,0.09-0.11,0.1-0.19c0.19-2.33,0.68-4.6,1.58-6.75C5.94,7.16,12.43,1.94,21.77,0.27C22.33,0.17,22.91,0.22,23.45,0z M10.66,39.63c0.22,0.07,0.37-0.05,0.52-0.12c6.46-3,12.91-6,19.37-9c0.26-0.12,0.44-0.29,0.56-0.55c3-6.46,6-12.92,9-19.37 c0.06-0.14,0.25-0.3,0.12-0.43c-0.13-0.14-0.29,0.05-0.43,0.11c-6.46,3-12.91,6-19.37,9c-0.29,0.13-0.45,0.33-0.58,0.6 c-1.75,3.77-3.5,7.54-5.25,11.31C13.28,33.99,11.97,36.8,10.66,39.63z"
                  />
                  <path
                    fill="#68767F"
                    d="M28.22,24.88c0,1.52-1.21,2.73-2.73,2.73c-1.52,0-2.73-1.21-2.73-2.73c0-1.52,1.21-2.73,2.73-2.73 C27.02,22.15,28.22,23.36,28.22,24.88z"
                  />
                </g>
              </svg>
              <h5
                className="fw-bold text-uppercase mt-3 "
                style={{
                  color: "#5A6978",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                EXPLORE
              </h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <svg
                version="1.1"
                id="Layer_1_Plan"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 51 50"
                width={70}
                height={70}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fill="#68767F"
                    d="M50.47,22.89v-5.65c0-0.03,0-0.06,0-0.1c0-0.05,0-0.1,0-0.16v-2.18h-0.02c0-0.12-0.01-0.23-0.02-0.35 c-0.22-3.27-2.51-5.99-5.67-6.76c-1.26-0.31-2.56-0.21-3.84-0.2c-0.36,0-0.46-0.1-0.45-0.46c0.02-1.48,0.01-2.96,0.01-4.45 c0-0.23-0.01-0.47-0.07-0.69c-0.33-1.25-1.44-2.01-2.72-1.87c-1.25,0.14-2.2,1.16-2.22,2.45c-0.03,1.5-0.02,3,0,4.5 c0.01,0.42-0.13,0.51-0.52,0.51c-6.3-0.01-12.59-0.01-18.89,0c-0.4,0-0.53-0.1-0.52-0.51c0.03-1.5,0.03-3,0-4.5 C15.51,1.05,14.35-0.04,12.96,0c-1.39,0.04-2.43,1.12-2.44,2.53c-0.01,1.5-0.01,3,0.01,4.5c0.01,0.37-0.1,0.47-0.46,0.45 C9.42,7.46,8.75,7.47,8.09,7.48c-3.42,0.06-6.22,2.11-7.22,5.26c-0.22,0.68-0.29,1.37-0.32,2.06v0c-0.03,0.68-0.01,1.37-0.03,2.05 c-0.01,0.16,0,0.28,0.03,0.37v5.51c-0.02,0.09-0.03,0.19-0.03,0.33c0.02,6.35,0.01,12.71,0.02,19.06c0,0.52,0.01,1.06,0.11,1.57 c0.75,3.81,3.72,6.23,7.67,6.23c11.46,0.01,22.92,0,34.38,0c0.72,0,1.44-0.05,2.14-0.24c3.43-0.92,5.62-3.83,5.63-7.52 c0.01-6.35,0-12.71,0.01-19.06C50.48,23.03,50.48,22.96,50.47,22.89z M15.59,36.94c0,0.9-0.74,1.64-1.64,1.64H8.96 c-0.9,0-1.64-0.74-1.64-1.64v-4.98c0-0.9,0.74-1.64,1.64-1.64h4.98c0.9,0,1.64,0.74,1.64,1.64V36.94z M15.59,23.42 c0,0.9-0.74,1.64-1.64,1.64H8.96c-0.9,0-1.64-0.74-1.64-1.64v-4.98c0-0.9,0.74-1.64,1.64-1.64h4.98c0.9,0,1.64,0.74,1.64,1.64 V23.42z M29.81,36.94c0,0.9-0.74,1.64-1.64,1.64h-4.98c-0.9,0-1.64-0.74-1.64-1.64v-4.98c0-0.9,0.74-1.64,1.64-1.64h4.98 c0.9,0,1.64,0.74,1.64,1.64V36.94z M29.81,23.42c0,0.9-0.74,1.64-1.64,1.64h-4.98c-0.9,0-1.64-0.74-1.64-1.64v-4.98 c0-0.9,0.74-1.64,1.64-1.64h4.98c0.9,0,1.64,0.74,1.64,1.64V23.42z M44.03,23.42c0,0.9-0.74,1.64-1.64,1.64h-4.98 c-0.9,0-1.64-0.74-1.64-1.64v-4.98c0-0.9,0.74-1.64,1.64-1.64h4.98c0.9,0,1.64,0.74,1.64,1.64V23.42z"
                  />
                </g>
              </svg>
              <h5
                className="fw-bold text-uppercase mt-3"
                style={{
                  color: "#5A6978",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                PLAN
              </h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <svg
                viewBox="0 0 51 50"
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                id="Layer_1_Book"
              >
                <g>
                  <path
                    fill="#68767F"
                    d="M5.5,27.47c0-4.69,0-9.37,0-14.06C5.5,8.69,9.18,5,13.9,5c1.56,0,3.12-0.01,4.69,0.01 c0.32,0,0.47-0.07,0.58-0.4C20.04,1.85,22.6,0,25.47,0c2.92,0,5.47,1.83,6.36,4.6c0.11,0.33,0.25,0.41,0.58,0.4 C34.05,4.99,35.68,5,37.31,5c4,0.01,7.53,3.1,8.1,7.06c0.06,0.43,0.09,0.86,0.09,1.29c0,9.43,0,18.85,0,28.28 c0,4.68-3.7,8.36-8.38,8.37c-7.74,0-15.48,0-23.23,0c-4.68,0-8.38-3.69-8.38-8.37C5.5,36.91,5.5,32.19,5.5,27.47z M23.83,15.83c-0.04-0.5-0.2-0.94-0.6-1.27c-0.75-0.62-1.75-0.49-2.43,0.33c-1.31,1.57-2.63,3.14-3.92,4.72 c-0.26,0.32-0.4,0.31-0.64,0c-0.36-0.46-0.76-0.9-1.17-1.33c-0.65-0.68-1.65-0.73-2.34-0.13c-0.68,0.6-0.75,1.62-0.13,2.33 c0.9,1.03,1.81,2.06,2.74,3.07c0.78,0.86,1.86,0.83,2.61-0.07c1.82-2.16,3.62-4.34,5.43-6.51C23.66,16.64,23.8,16.26,23.83,15.83z M23.83,30.83c-0.04-0.47-0.19-0.9-0.56-1.23c-0.74-0.66-1.77-0.54-2.47,0.29c-1.32,1.58-2.65,3.17-3.95,4.76 c-0.22,0.27-0.35,0.29-0.57,0c-0.37-0.46-0.77-0.89-1.17-1.33c-0.66-0.72-1.67-0.79-2.37-0.17c-0.7,0.61-0.75,1.63-0.1,2.37 c0.89,1.02,1.79,2.03,2.7,3.03c0.79,0.86,1.86,0.83,2.61-0.06c1.82-2.16,3.62-4.34,5.43-6.51C23.65,31.64,23.8,31.27,23.83,30.83z M32.11,21.67c1.61,0,3.23,0,4.84,0c1.09,0,1.87-0.7,1.87-1.67c0-0.96-0.78-1.67-1.87-1.67c-3.19,0-6.39,0-9.58,0 c-1.09,0-1.87,0.7-1.87,1.66c0,0.96,0.78,1.66,1.87,1.67C28.95,21.67,30.53,21.67,32.11,21.67z M32.16,36.67c1.65,0,3.3,0.01,4.95,0c0.97-0.01,1.72-0.75,1.72-1.66c0.01-0.9-0.74-1.66-1.71-1.67c-3.3-0.01-6.6-0.01-9.89,0 c-0.55,0-1.02,0.21-1.35,0.65c-0.4,0.52-0.49,1.1-0.19,1.7c0.32,0.66,0.87,0.97,1.59,0.97C28.9,36.67,30.53,36.67,32.16,36.67z"
                  />
                </g>
              </svg>
              <h5
                className="fw-bold text-uppercase mt-3"
                style={{
                  color: "#5A6978",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                BOOK
              </h5>
            </div>
            <div className="col-md-3 col-6 mb-4 text-center">
              <svg
                viewBox="0 0 51 50"
                xmlns="http://www.w3.org/2000/svg"
                width={70}
                height={70}
                id="Layer_1_Experience"
              >
                <g>
                  <g>
                    <path
                      fill="#68767F"
                      d="M0,41.13c0-8.43,0-16.86,0-25.29c0.2-0.24,0.17-0.55,0.27-0.82c0.81-2.41,2.9-3.88,5.58-3.9 c2.09-0.01,4.18-0.01,6.27,0c0.34,0,0.47-0.07,0.45-0.43c-0.03-0.43-0.01-0.86-0.01-1.29c0.01-2.96,2.11-5.15,5.06-5.17 c5.24-0.03,10.49-0.02,15.73,0c2.4,0.01,4.19,1.4,4.89,3.68c0.27,0.89,0.18,1.81,0.18,2.71c0,0.37,0.07,0.5,0.48,0.5 c2.06-0.02,4.11,0.02,6.17-0.02c3.69-0.06,5.97,2.92,5.94,5.95c-0.08,7.68-0.03,15.36-0.03,23.04c0,1.72-0.67,3.15-1.95,4.29 c-1.13,1-2.49,1.39-3.98,1.39c-5.49,0-10.98,0-16.47,0c-7.55,0-15.1,0-22.65,0c-2.72,0-4.85-1.5-5.66-3.93 C0.18,41.61,0.21,41.32,0,41.13z M25.47,40.87c6.81,0.04,12.44-5.51,12.45-12.38c0.01-6.98-5.61-12.45-12.41-12.47 C18.69,16,13.07,21.52,13.06,28.4C13.04,35.35,18.63,40.85,25.47,40.87z"
                    />
                  </g>
                  <circle fill="#68767F" cx="25.64" cy="28.6" r="8.68" />
                </g>
              </svg>
              <h5
                className="fw-bold text-uppercase mt-3"
                style={{
                  color: "#5A6978",
                  fontSize: "1rem",
                  letterSpacing: "0.05em",
                }}
              >
                EXPERIENCE
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* "Quote" Section */}
      <div
        style={{
          backgroundColor: "#F0F4F8",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div className="setWidth" style={{ position: "relative" }}>
          <span
            style={{
              fontSize: "80px",
              color: "#5A6978",
              position: "absolute",
              top: "-25px",
              left: "-30px",
              fontFamily: "Georgia, serif",
              opacity: 0.9,
            }}
          >
            “
          </span>
          <p
            style={{
              fontSize: "1.5rem",
              color: "#666",
              marginBottom: "30px",
              fontWeight: 300,
              width: "85%",
              marginInline: "auto",
            }}
          >
            The GCC Unified Visa isn’t just a visa—it’s a revolution in how the
            world connects with ambition.”
          </p>
          <span
            style={{
              fontSize: "80px",
              color: "#5A6978",
              position: "absolute",
              bottom: "20px",
              right: "-30px",
              fontFamily: "Georgia, serif",
              opacity: 0.9,
            }}
          >
            ”
          </span>
          <div
            style={{
              borderTop: "2px solid #3C3C3C",
              width: "50px",
              margin: "30px auto 15px auto",
            }}
          ></div>
          <p style={{ color: "#3C3C3C", fontWeight: "bold", fontSize: "1rem" }}>
            GCC Secretary-General
          </p>
        </div>
      </div>
    </section>
  );
};

export default OneVisa;
