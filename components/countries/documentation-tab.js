"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
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

const DocumentationTabs = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <section className={style.innerpage}>
      <div className={`container ${style["light-bg"]}`}>
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
                      className={`nav-link active border-0 ${style["country-nav-link"]} ${style["active-tab"]}`}
                      id="tour-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#tour"
                      type="button"
                      role="tab"
                      aria-controls="tour"
                      aria-selected="true"
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
                      id="passport-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#passport"
                      type="button"
                      role="tab"
                      aria-controls="passport"
                      aria-selected="false"
                    >
                      Important Apps
                    </button>
                  </li>
                  <li
                    className={`nav-item ${style["country-nav-item"]}`}
                    role="presentation"
                  >
                    <button
                      className={`nav-link border-0 ${style["country-nav-link"]}`}
                      id="other-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#other"
                      type="button"
                      role="tab"
                      aria-controls="other"
                      aria-selected="false"
                    >
                      Emergency Services
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="tour"
                    role="tabpanel"
                    aria-labelledby="tour-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            {/* <h4 className="pb-2">Important Contact Numbers</h4> */}
                          </div>
                        </div>
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
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="passport"
                    role="tabpanel"
                    aria-labelledby="passport-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
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
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="other"
                    role="tabpanel"
                    aria-labelledby="other-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
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
                                backgroundColor: "#94CEBC",
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
