import React from "react";
import style from "./style.module.css";
import Banner from "../../../../components/banner/banner";
import Carousal from "../../../../components/carousel/Carousal";
import DocumentationTabs from "../../../../components/countries/documentation-tab";
import GettingAroundTab from "../../../../components/countries/getting-around-tab";
import TabsUae from "../../../../components/countries/tab-uae";
import CountriesUae from "../../../../components/countries/countries-uae";
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

function Country() {
  const countryDestinationsData = [
    {
      id: 1,
      heading: "Destination Heading 1",
      description: "Luxury",
      image: "/images/blog/01.jpg",
    },
    {
      id: 2,
      heading: "Destination Heading 2",
      description: "Culture",
      image: "/images/blog/02.jpg",
    },
    {
      id: 3,
      heading: "Destination Heading 3",
      description: "Coastal Escapes",
      image: "/images/blog/03.jpg",
    },
    {
      id: 4,
      heading: "Destination Heading 4",
      description: "History",
      image: "/images/blog/04.jpg",
    },
    {
      id: 5,
      heading: "Destination Heading 5",
      description: "Events",
      image: "/images/blog/01.jpg",
    },
  ];

  const countryExperiance = [];

  return (
    <div>
      <Banner />
      <CountriesUae />
      <div className={style["section-normal"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>A Blend of Ancient Traditions and Modern Wonders</h3>
              <p>
                Funding freemium technology focus equity bootstrapping user
                niche market. Seed round agile growth hacking return investment
                alpha investor advisor marketing pitch.
              </p>
            </div>
          </div>
        </div>
      </div>
      <TabsUae />
      <section className={style["countries-explore-container"]}>
        <div className={style["countries-explore"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 pb-3">
                <h3>Explore your Destinations, Inspiration, Events</h3>
              </div>
            </div>
          </div>

          {/* CountryExplore */}
          <div className={style["country-explore"]}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Carousal
                    country={countryDestinationsData}
                    count={5}
                    type="country-tab-slider"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center mt-4">
                  <button className={style["btn-one"]}>Full List</button>
                </div>
              </div>
            </div>
          </div>
          {/* CountryExplore */}
        </div>
      </section>

      <div className={style["section-normal"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pb-3">
              <h3 className="mb-0" style={{ color: "grey" }}>
                Plan
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pb-3">
              <label>Where am I from?</label>
              <select className="form-control">
                <option>Select</option>
                <option>Place</option>
                <option>Place</option>
              </select>
            </div>
            <div className="col-md-4 pb-3">
              <label>Where am I going?</label>
              <select className="form-control">
                <option>Select</option>
                <option>Place</option>
                <option>Place</option>
              </select>
            </div>
            <div className="col-md-4 pb-3 d-flex align-items-end">
              <button className={`${style["btn-two"]} w-100`}>
                Get Visa Eligibility
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={style["section-documentation"]}>
        <div className={style["section-normal"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Important Information</h3>
              </div>
            </div>
          </div>
        </div>
        <DocumentationTabs />
      </div>

      {/* <div className={style['section-documentation']}>
                <div className={style['section-normal']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>Getting Around</h3>
                            </div>
                        </div>
                    </div>
                </div>
               <GettingAroundTab /> 
            </div> */}

      <section className={style["countries-explore-container"]}>
        <div className={style["countries-explore"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 pb-3">
                <h3>Experience</h3>
                <p>
                  Funding freemium technology focus equity bootstrapping usernce
                  niche market. Seed round agile growth hacking retur investment
                  alpha investor advisor marketing pitch.
                </p>
              </div>
            </div>
          </div>
          <div className="container py-5">
            <h2 className="fw-bold mb-5">Documentation</h2>

            {/* General Information */}
            <div className="card p-4 mb-5">
              <h4 className="fw-semibold mb-4">General Information</h4>
              <div className="row g-4">
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaMoneyBillWave
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Currency</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      AED (1 USD ≈ 3.67 AED)
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaClock
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Time zone</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      GST (UTC+4)
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaPhone
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Country Code</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      +971
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaSimCard
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Etisalat/ Du</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Sim Card
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaPlaneDeparture
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Airport (DXB)</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Busiest airport
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaCity
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Abu Dhabi</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Capital city
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important App */}
            <div className="card p-4 mb-5">
              <h4 className="fw-semibold mb-4">Important App</h4>
              <div className="row g-4">
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaBusAlt
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Nol Card/ Hafilat Card</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Metro/ Bus payment
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaMapMarkedAlt
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>S’hail App</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Route planner
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaCar
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Careem</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Ride-hailing across all emirates
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaCarSide
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Udrive</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Hourly car rentals
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaShoppingBag
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Noon minutes</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Instant Grocery
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaSmile
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Smiles</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Food Grocery Lifestyle App
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaMapMarkedAlt
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Google Maps</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Navigation
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaShoppingBag
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Noon</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Shopping app
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Services */}
            <div className="card p-4 mb-5">
              <h4 className="fw-semibold mb-4">Emergency Services</h4>
              <div className="row g-4">
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaHospital
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Rashid Hospital</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Government hospital (Dubai)
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaHospital
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Sheikh Khalifa Medical City</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Govt best hospital
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaHospital
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>American Hospital</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Private hospital
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaCapsules
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Life Pharmacy</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      24/7 pharmacy chains
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaClinicMedical
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Aster Clinic</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Clinic Services
                    </p>
                  </div>
                </div>
                <div className="col-md-4 d-flex gap-2">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-2"
                    style={{
                      backgroundColor: "#94CEBC", // Custom color
                      width: 40,
                      height: 40,
                    }}
                  >
                    <FaUserShield
                      className="text-white"
                      width={20}
                      height={20}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <b>Daman</b>
                    <p className="mb-0" style={{ color: "grey" }}>
                      Travel insurance providers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* countryExperiance */}
          <div className={style["country-experiance"]}>
            <div className="container">
              <div className="row">
                <div className="col-md-12 pb-3">
                  {/* <Carousal countryExperiance={countryExperiance} count={3} type="country-experiance" /> */}

                  <Carousal
                    countryExperiance={countryExperiance}
                    count={4}
                    countTab={1}
                    type="country-Experiance"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Country;
