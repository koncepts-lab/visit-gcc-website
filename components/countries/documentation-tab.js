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
                      id="emergency-numbers-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#emergency-numbers"
                      type="button"
                      role="tab"
                      aria-controls="emergency-numbers"
                      aria-selected="true"
                    >
                      Emergency Numbers
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
                      id="important-apps-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#important-apps"
                      type="button"
                      role="tab"
                      aria-controls="important-apps"
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
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="emergency-numbers"
                    role="tabpanel"
                    aria-labelledby="emergency-numbers-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            {/* <h4 className="pb-2">Important Contact Numbers</h4> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/Police.svg"
                                  alt="Police"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>Police</p>
                                <p>999</p>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/Ambulance.svg"
                                  alt="Ambulance"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>Ambulance</p>
                                <p>998</p>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/Fire.svg"
                                  alt="Fire"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>Fire Department</p>
                                <p>997</p>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/Tourist call center.svg"
                                  alt="Tourist call center"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>Tourism Call Centre</p>
                                <p>800 555</p>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/International call center.svg"
                                  alt="International call center"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>International Tourism Call Centre</p>
                                <p>+971 4 555 5555</p>
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className={style["important_numbers"]}>
                              <span>
                                <img
                                  src="../images/icons/emergency-numbers/Road assistance.svg"
                                  alt="Road assistance"
                                  height={45}
                                  className="img-center"
                                />
                              </span>
                              <span>
                                <p>Road Assistance</p>
                                <p>
                                  800 4330
                                  <br />
                                  <small>
                                    (Dubai Roads and Transport Authority)
                                  </small>
                                </p>
                              </span>
                            </div>
                          </div>
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
                        <div className="row">
                          <div className="col-md-12">
                            {/* <h4 className="pb-2">General Information</h4> */}
                          </div>
                        </div>
                        <div className="row g-4">
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Currancy.svg"
                                alt="Currency"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Currency</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                AED (1 USD ≈ 3.67 AED)
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Time Zone.svg"
                                alt="Time Zone"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Time zone</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                GST (UTC+4)
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Country Code.svg"
                                alt="Country Code"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Country Code</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                +971
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Sim Card.svg"
                                alt="Sim Card"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Etisalat/ Du</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Sim Card
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Airport.svg"
                                alt="Airport"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Airport (DXB)</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Busiest airport
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/general-information/Capital City.svg"
                                alt="Capital City"
                                height={45}
                                className="img-center"
                              />
                            </span>
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
                    id="important-apps"
                    role="tabpanel"
                    aria-labelledby="important-apps-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row g-4">
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Metro.svg"
                                alt="Metro"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Nol Card/ Hafilat Card</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Metro/ Bus payment
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Route Planner.svg"
                                alt="Route Planner"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>S’hail App</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Route planner
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Ride.svg"
                                alt="Ride"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Careem</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Ride-hailing across all emirates
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Udrive.svg"
                                alt="Udrive"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Udrive</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Hourly car rentals
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Grocery.svg"
                                alt="Grocery"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Noon minutes</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Instant Grocery
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Food App.svg"
                                alt="Food"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Smiles</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Food Grocery Lifestyle App
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Navigation.svg"
                                alt="Navigation"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Google Maps</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Navigation
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/important-apps/Shopping app.svg"
                                alt="Shopping"
                                height={45}
                                className="img-center"
                              />
                            </span>
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
                    id="emergency-services"
                    role="tabpanel"
                    aria-labelledby="emergency-services-tab"
                  >
                    <div className={style["documentation-container"]}>
                      <div className="container">
                        <div className="row g-4">
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Hospital.svg"
                                alt="Hospital"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Rashid Hospital</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Government hospital (Dubai)
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Hospital.svg"
                                alt="Hospital"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Sheikh Khalifa Medical City</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Govt best hospital
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Hospital.svg"
                                alt="Hospital"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>American Hospital</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Private hospital
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Pharmacy.svg"
                                alt="Pharmacy"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Life Pharmacy</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                24/7 pharmacy chains
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Clinic.svg"
                                alt="Clinic"
                                height={45}
                                className="img-center"
                              />
                            </span>
                            <div>
                              <b>Aster Clinic</b>
                              <p className="mb-0" style={{ color: "grey" }}>
                                Clinic Services
                              </p>
                            </div>
                          </div>
                          <div className="col-md-4 d-flex gap-2">
                            <span>
                              <img
                                src="../images/icons/emergency-services/Travel insurance.svg"
                                alt="Travel Insurance"
                                height={45}
                                className="img-center"
                              />
                            </span>
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
