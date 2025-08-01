"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
// Note: Fa-icons are not used in the dynamic render, but kept here as you had them.
import {
  FaMoneyBillWave,
  FaClock,
  FaPhone,
  FaSimCard,
  FaPlaneDeparture,
  FaCity,
  FaBusAlt,
  FaMapMarkedAlt,
  FaCar,
  FaCarSide,
  FaShoppingBag,
  FaSmile,
  FaHospital,
  FaClinicMedical,
  FaCapsules,
  FaUserShield,
} from "react-icons/fa";

// --- Data for all countries ---
const countryData = {
  "United Arab Emirates": {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time zone",
        subtitle: "GST (UTC+4)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+971",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "Etisalat/ Du",
        subtitle: "Sim Card",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Airport (DXB)",
        subtitle: "Busiest airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Abu Dhabi",
        subtitle: "Capital city",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Metro.svg",
        title: "Nol Card/ Hafilat Card",
        subtitle: "Metro/ Bus payment",
      },
      {
        icon: "../images/icons/important-apps/Route Planner.svg",
        title: "S’hail App",
        subtitle: "Route planner",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Careem",
        subtitle: "Ride-hailing across all emirates",
      },
      {
        icon: "../images/icons/important-apps/Udrive.svg",
        title: "Udrive",
        subtitle: "Hourly car rentals",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "Noon minutes",
        subtitle: "Instant Grocery",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "Smiles",
        subtitle: "Food Grocery Lifestyle App",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
      {
        icon: "../images/icons/important-apps/Shopping app.svg",
        title: "Noon",
        subtitle: "Shopping app",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police",
        subtitle: "999",
      },
      {
        icon: "../images/icons/emergency-numbers/Ambulance.svg",
        title: "Ambulance",
        subtitle: "998",
      },
      {
        icon: "../images/icons/emergency-numbers/Fire.svg",
        title: "Fire Department",
        subtitle: "997",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "800 555",
      },
      {
        icon: "../images/icons/emergency-numbers/International call center.svg",
        title: "International Tourism Call Centre",
        subtitle: "+971 4 555 5555",
      },
      {
        icon: "../images/icons/emergency-numbers/Road assistance.svg",
        title: "Road Assistance",
        subtitle:
          "800 4330<br/><small>(Dubai Roads and Transport Authority)</small>",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Rashid Hospital",
        subtitle: "Government hospital (Dubai)",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Sheikh Khalifa Medical City",
        subtitle: "Govt best hospital",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "American Hospital",
        subtitle: "Private hospital",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "Life Pharmacy",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Clinic.svg",
        title: "Aster Clinic",
        subtitle: "Clinic Services",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "Daman",
        subtitle: "Travel insurance providers",
      },
    ],
  },
  "Saudi Arabia": {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time Zone",
        subtitle: "AST (UTC+3)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+966",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "STC / Mobily / Zain",
        subtitle: "SIM Cards",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Riyadh (RUH)",
        subtitle: "King Khalid International Airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Riyadh",
        subtitle: "Capital City",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Metro.svg",
        title: "Tamm App",
        subtitle: "Parking, traffic fines, metro updates",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Jeeny",
        subtitle: "Local ride-hailing",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Careem / Uber",
        subtitle: "Ride-hailing across major cities",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Theeb",
        subtitle: "Intercity bus bookings",
      },
      {
        icon: "../images/icons/important-apps/Udrive.svg",
        title: "Yelo",
        subtitle: "Hourly car rentals",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "HungerStation",
        subtitle: "Food delivery",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "Nana",
        subtitle: "Grocery delivery",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police",
        subtitle: "999",
      },
      {
        icon: "../images/icons/emergency-numbers/Ambulance.svg",
        title: "Ambulance",
        subtitle: "997",
      },
      {
        icon: "../images/icons/emergency-numbers/Fire.svg",
        title: "Fire Department",
        subtitle: "998",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "930",
      },
      {
        icon: "../images/icons/emergency-numbers/Road assistance.svg",
        title: "Road Assistance",
        subtitle: "920000560 (Riyadh) / 920012345 (Jeddah)",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "King Faisal Specialist Hospital",
        subtitle: "Government hospital (Riyadh/Jeddah)",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Dr. Sulaiman Al Habib / Saudi German Hospital",
        subtitle: "Private hospitals",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "Nahdi",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "Tawuniya / Bupa Arabia",
        subtitle: "Travel insurance providers",
      },
    ],
  },
  Qatar: {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time Zone",
        subtitle: "AST (UTC+3)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+974",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "Ooredoo / Vodafone",
        subtitle: "SIM Cards",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Doha (DOH)",
        subtitle: "Hamad International Airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Doha",
        subtitle: "Capital City",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Karwa",
        subtitle: "Official taxi service",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Careem",
        subtitle: "Ride-hailing",
      },
      {
        icon: "../images/icons/important-apps/Metro.svg",
        title: "Metroexpress",
        subtitle: "Metro ride-sharing",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Strong Rent a Car",
        subtitle: "Hourly car rentals",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "Talabat",
        subtitle: "Food delivery",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "Snoonu",
        subtitle: "Grocery delivery",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police / Ambulance / Fire",
        subtitle: "999",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "+974 4144 5150",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Hamad Medical Corporation",
        subtitle: "Government hospital",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Sidra Medicine",
        subtitle: "Private hospital",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "Kulud Pharmacy",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "Qatar Insurance / Doha Insurance",
        subtitle: "Travel insurance providers",
      },
    ],
  },
  Oman: {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time Zone",
        subtitle: "GST (UTC+4)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+968",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "Omantel / Ooredoo",
        subtitle: "SIM Cards",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Muscat (MCT)",
        subtitle: "Muscat International Airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Muscat",
        subtitle: "Capital City",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Otaxi",
        subtitle: "Official taxi app",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "Talabat",
        subtitle: "Food delivery",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "Carrefour Oman",
        subtitle: "Grocery delivery",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Mark Rent A Car",
        subtitle: "Hourly car rentals",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police / Ambulance / Fire",
        subtitle: "9999",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "+968 24 685 777",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Royal Hospital",
        subtitle: "Government hospital",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Aster Hospital",
        subtitle: "Private hospital",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "Muscat Pharmacy",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "National Life / Oman Insurance",
        subtitle: "Travel insurance providers",
      },
    ],
  },
  Bahrain: {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time Zone",
        subtitle: "AST (UTC+3)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+973",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "Batelco / Zain / STC",
        subtitle: "SIM Cards",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Manama (BAH)",
        subtitle: "Bahrain International Airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Manama",
        subtitle: "Capital City",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Bolt",
        subtitle: "Ride-hailing",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Careem",
        subtitle: "Ride-hailing",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "Talabat",
        subtitle: "Food delivery",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "InstaShop",
        subtitle: "Grocery delivery",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Sixt Rent a Car",
        subtitle: "Hourly car rentals",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police / Ambulance / Fire",
        subtitle: "999",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "+973 1757 7577",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Salmaniya Medical Complex",
        subtitle: "Government hospital",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "American Mission Hospital",
        subtitle: "Private hospital",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "Al Hilal Pharmacy",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "Takaful International / Medgulf",
        subtitle: "Travel insurance providers",
      },
    ],
  },
  Kuwait: {
    generalInfo: [
      {
        icon: "../images/icons/general-information/Time zone.svg",
        title: "Time Zone",
        subtitle: "AST (UTC+3)",
      },
      {
        icon: "../images/icons/general-information/Country Code.svg",
        title: "Country Code",
        subtitle: "+965",
      },
      {
        icon: "../images/icons/general-information/Sim card.svg",
        title: "Zain / Ooredoo / STC",
        subtitle: "SIM Cards",
      },
      {
        icon: "../images/icons/general-information/Airport.svg",
        title: "Kuwait City (KWI)",
        subtitle: "Kuwait International Airport",
      },
      {
        icon: "../images/icons/general-information/Capital City.svg",
        title: "Kuwait City",
        subtitle: "Capital City",
      },
    ],
    importantApps: [
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Careem",
        subtitle: "Ride-hailing",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Taxi4Kuwait",
        subtitle: "Local taxi app",
      },
      {
        icon: "../images/icons/important-apps/Food App.svg",
        title: "Talabat",
        subtitle: "Food delivery",
      },
      {
        icon: "../images/icons/important-apps/Grocery.svg",
        title: "Carrefour Kuwait",
        subtitle: "Grocery delivery",
      },
      {
        icon: "../images/icons/important-apps/Ride.svg",
        title: "Speedy Car Rental",
        subtitle: "Hourly car rentals",
      },
      {
        icon: "../images/icons/important-apps/Navigation.svg",
        title: "Google Maps",
        subtitle: "Navigation",
      },
    ],
    emergencyNumbers: [
      {
        icon: "../images/icons/emergency-numbers/Police.svg",
        title: "Police / Ambulance / Fire",
        subtitle: "112",
      },
      {
        icon: "../images/icons/emergency-numbers/Tourist call center.svg",
        title: "Tourism Call Centre",
        subtitle: "+965 2291 8000",
      },
    ],
    emergencyServices: [
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Al-Amiri Hospital",
        subtitle: "Government hospital",
      },
      {
        icon: "../images/icons/emergency-services/Hospital.svg",
        title: "Dar Al Shifa Hospital",
        subtitle: "Private hospital",
      },
      {
        icon: "../images/icons/emergency-services/Pharmacy.svg",
        title: "YIACO Pharmacy",
        subtitle: "24/7 pharmacy chains",
      },
      {
        icon: "../images/icons/emergency-services/Travel insurance.svg",
        title: "Gulf Insurance Group / Warba Insurance",
        subtitle: "Travel insurance providers",
      },
    ],
  },
};

const DocumentationTabs = ({ countryName }) => {
  // Use the passed countryName to get data, or default to UAE if not found
  const data = countryData[countryName] || countryData["United Arab Emirates"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <section className={style.innerpage}>
      <div className={`container `}>
        <div className="row pb-2">
          <div className="col-md-12">
            <div className={`pr-0 ${style["country-container-box"]}`}>
              <div className={style["country-container"]}>
                <ul
                  className={`nav nav-tabs border-0 ${style["country-nav-tabs"]}`}
                  id="myTab"
                  role="tablist"
                >
                  <li
                    className={`nav-item ${style["country-nav-item"]}`}
                    role="presentation"
                  >
                    <button
                      className={`nav-link active border-0 ${style["country-nav-link"]}`}
                      id="important-apps-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#important-apps"
                      type="button"
                      role="tab"
                      aria-controls="important-apps"
                      aria-selected="true"
                    >
                      Usefull Apps
                    </button>
                  </li>
                  <li
                    className={`nav-item ${style["country-nav-item"]}`}
                    role="presentation"
                  >
                    <button
                      className={`nav-link border-0 ${style["country-nav-link"]}`}
                      id="general-info-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#general-info"
                      type="button"
                      role="tab"
                      aria-controls="general-info"
                      aria-selected="false"
                    >
                      General Information
                    </button>
                  </li>
                  <li
                    className={`nav-item ${style["country-nav-item"]}`}
                    role="presentation"
                  >
                    <button
                      className={`nav-link border-0 ${style["country-nav-link"]}`}
                      id="emergency-services-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#emergency-services"
                      type="button"
                      role="tab"
                      aria-controls="emergency-services"
                      aria-selected="false"
                    >
                      Emergency Services
                    </button>
                  </li>
                  <li
                    className={`nav-item ${style["country-nav-item"]}`}
                    role="presentation"
                  >
                    <button
                      className={`nav-link border-0 ${style["country-nav-link"]} }`}
                      id="emergency-numbers-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#emergency-numbers"
                      type="button"
                      role="tab"
                      aria-controls="emergency-numbers"
                      aria-selected="false"
                    >
                      Emergency Numbers
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="important-apps"
                    role="tabpanel"
                    aria-labelledby="important-apps-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row g-4">
                          {data.importantApps.map((item, index) => (
                            <div
                              key={index}
                              className="col-lg-4 px-0 d-flex gap-2"
                            >
                              <span>
                                <img
                                  src={item.icon}
                                  alt={item.title}
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <div>
                                <b>{item.title}</b>
                                <p className="mb-0" style={{ color: "grey" }}>
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="general-info"
                    role="tabpanel"
                    aria-labelledby="general-info-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row g-4">
                          {data.generalInfo.map((item, index) => (
                            <div
                              key={index}
                              className="col-lg-4 px-0 d-flex gap-2"
                            >
                              <span>
                                <img
                                  src={item.icon}
                                  alt={item.title}
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <div>
                                <b>{item.title}</b>
                                <p className="mb-0" style={{ color: "grey" }}>
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="emergency-services"
                    role="tabpanel"
                    aria-labelledby="emergency-services-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row g-4">
                          {data.emergencyServices.map((item, index) => (
                            <div
                              key={index}
                              className="col-lg-4 px-0 d-flex gap-2"
                            >
                              <span>
                                <img
                                  src={item.icon}
                                  alt={item.title}
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <div>
                                <b>{item.title}</b>
                                <p className="mb-0" style={{ color: "grey" }}>
                                  {item.subtitle}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="emergency-numbers"
                    role="tabpanel"
                    aria-labelledby="emergency-numbers-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row">
                          {data.emergencyNumbers.map((item, index) => (
                            <div key={index} className="col-lg-4 px-0">
                              <div className={style["important_numbers"]}>
                                <span>
                                  <img
                                    src={item.icon}
                                    alt={item.title}
                                    height={45}
                                    className="img-center"
                                  />
                                </span>
                                <span>
                                  <p>{item.title}</p>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item.subtitle,
                                    }}
                                  />
                                </span>
                              </div>
                            </div>
                          ))}
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
    </section>
  );
};

export default DocumentationTabs;
