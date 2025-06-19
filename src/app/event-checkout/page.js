"use client";

import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Link from "next/link";
import Carousal from "../../../components/carousel/Carousal";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaUser,
  FaRegHeart,
  FaRegCalendarAlt,
  FaRegClock,
} from "react-icons/fa";
import { GoShare } from "react-icons/go";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  // The initial time is 720 seconds (12 minutes), which matches the target image.
  const initialTime = 720;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [gender, setGender] = useState("");
  const [travellers, setTravellers] = useState([
    {
      id: 1,
      lastName: "",
      firstName: "",
      idType: "",
      idNumber: "",
      gender: "",
    },
  ]);
  const [nextTravellerId, setNextTravellerId] = useState(2);

  const handleInputChange = (travellerId, field, value) => {
    setTravellers((prevTravellers) =>
      prevTravellers.map((traveller) =>
        traveller.id === travellerId
          ? { ...traveller, [field]: value }
          : traveller
      )
    );
  };

  const handleGenderChange = (travellerId, gender) => {
    setTravellers((prevTravellers) =>
      prevTravellers.map((traveller) =>
        traveller.id === travellerId ? { ...traveller, gender } : traveller
      )
    );
  };

  const handleAddTraveller = () => {
    setTravellers((prevTravellers) => [
      ...prevTravellers,
      {
        id: nextTravellerId,
        lastName: "",
        firstName: "",
        idType: "",
        idNumber: "",
        gender: "",
      },
    ]);
    setNextTravellerId(nextTravellerId + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // 1000 ms = 1 second

    return () => clearInterval(interval);
  }, []);

  // Format time to "mins:sec"
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const updateGuestCount = (type, change) => {
    setGuests((prevGuests) => {
      const newValue = prevGuests[type] + change;

      if (newValue >= 0 && newValue <= 3) {
        return { ...prevGuests, [type]: newValue };
      }
      return prevGuests;
    });
  };

  const [slugPackage, setSlugPackage] = useState([]);
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages`
        );
        const packageData = response.data.data || response.data || [];
        console.log("packages Data:", packageData);
        setSlugPackage(packageData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchPackageData();
  }, []);

  return (
    <div>
      <Banner />
      <div>
        <div className="">
          <div className={`container ${style["checkout-package-details"]}`}>
            <div className="row pt-5">
              {/* LEFT SIDE - Personal Information */}
              <div className="col-md-8">
                <h2 className="fw-bolder">Rabeh Saqer Night</h2>
                <p style={{ fontSize: "14px", color: "black" }}>
                  Things to do{" "}
                </p>
                <p className="fs-6">
                  <Link href="#">
                    <span style={{ color: "#5ab2b3" }} className="fs-6">
                      {" "}
                      Register or Sign in
                    </span>
                  </Link>{" "}
                  to Visitgcc.com to manage your bookings with ease!
                </p>

                <div>
                  <h1 className="m-3 ms-0 pt-3 fw-bolder">
                    Personal Information
                  </h1>
                  <form className="col-xxl-10 col-xl-12">
                    {travellers.map((traveller) => (
                      <div key={traveller.id} className="pt-1">
                        <p
                          className="align-items-center fw-semibold d-flex"
                          style={{ color: "#5ab2b3", height: "25px" }}
                        >
                          <FaUser size={23} className="me-3" color="#e7e7e7" />
                          Adult {traveller.id}
                        </p>
                        <div className="">
                          <div className="col-12">
                            <input
                              className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12 `}
                              placeholder="Last name (in English)*"
                              value={traveller.lastName}
                              onChange={(e) =>
                                handleInputChange(
                                  traveller.id,
                                  "lastName",
                                  e.target.value
                                )
                              }
                            />
                            <br className="d-xl-none d-lg-block" />
                            <input
                              className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-5 col-lg-6 col-12`}
                              placeholder="First & middle name (in English)*"
                              value={traveller.firstName}
                              onChange={(e) =>
                                handleInputChange(
                                  traveller.id,
                                  "firstName",
                                  e.target.value
                                )
                              }
                            />
                            <br />
                          </div>
                          <div className="col-12 pt-2">
                            <input
                              className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12`}
                              placeholder="ID Type*"
                              value={traveller.idType}
                              onChange={(e) =>
                                handleInputChange(
                                  traveller.id,
                                  "idType",
                                  e.target.value
                                )
                              }
                            />
                            <br className="d-xl-none d-lg-block" />
                            <input
                              className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 col-lg-6 col-12 `}
                              placeholder="ID number*"
                              value={traveller.idNumber}
                              onChange={(e) =>
                                handleInputChange(
                                  traveller.id,
                                  "idNumber",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          {/* gender buttons */}
                          <div
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                          >
                            <button
                              type="button"
                              className={`${
                                traveller.gender === "male" ? "active" : ""
                              }`}
                              onClick={() =>
                                handleGenderChange(traveller.id, "male")
                              }
                              style={{
                                backgroundColor:
                                  traveller.gender === "male"
                                    ? "#5ab2b3"
                                    : "white",
                                color:
                                  traveller.gender === "male"
                                    ? "white"
                                    : "#686767",
                                padding: "5px 45px",
                                fontSize: "13px",
                                border: "#e2e2e2 2px solid",
                                borderRadius: "5px",
                              }}
                            >
                              Male
                            </button>
                            <button
                              type="button"
                              className={`promo_input ${
                                traveller.gender === "female" ? "active" : ""
                              } ms-md-3 ms-2 `}
                              onClick={() =>
                                handleGenderChange(traveller.id, "female")
                              }
                              style={{
                                backgroundColor:
                                  traveller.gender === "female"
                                    ? "#5ab2b3"
                                    : "white",
                                color:
                                  traveller.gender === "female"
                                    ? "white"
                                    : "#686767",
                                padding: "5px 42px",
                                fontSize: "13px",
                                border: "#e2e2e2 2px solid",
                                borderRadius: "5px",
                              }}
                            >
                              Female
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div>
                      <h1 className="m-3 ms-0 pt-1 fw-bolder">Contact Info</h1>
                      <div className="d-flex flex-xl-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3">
                        <div className="col-xl-6 col-12">
                          <label className="">Contact Name</label>
                          <br />
                          <input
                            className={`${style["promo_input"]} my-2 col-12`}
                            placeholder="Please enter contact name"
                          />
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-12">
                          <label className="">Contact Number</label>
                          <br />
                          <select
                            className={`${style["promo_select"]} my-2`}
                            style={{ width: "68px", paddingLeft: "5px" }}
                          >
                            <option>+971</option>
                          </select>
                          <input
                            className={`${style["promo_input"]} my-2 ms-xl-1 ms-lg-1 ms-2`}
                            style={{ width: "240px" }}
                            placeholder="Mobile Number"
                          />
                        </div>
                      </div>
                      <div className="my-2">
                        <label className="pe-0 me-0">Email Address</label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12`}
                          placeholder="All important updates will be send to this email ID"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* RIGHT SIDE - Package Details Sidebar */}
              <div className="col-md-4 my-md-0 my-5">
                <div
                  className={`d-flex justify-content-between ${style["price-container"]}`}
                >
                  <div className="d-flex">
                    <span className="fw-bolder fs-4 text-center ">₹6,599</span>
                  </div>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <div className="d-flex gap-2">
                      <button className={style["btn-one"]}>Pay Now</button>
                      <button className={`${style["btn-two"]} mb-0`}>
                        Contact Seller
                      </button>
                    </div>
                    <div
                      className="text-end"
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                        lineHeight: "1.2",
                      }}
                    >
                      You can now directly communicate
                      <br />
                      with the Seller of this package
                    </div>
                  </div>
                </div>

                <div className="my-4">
                  <h3 className="fw-bolder">Dubai Frame</h3>
                  <p style={{ color: "#80878b" }}>Entry Ticket</p>
                  <div className="d-flex align-items-center mb-2">
                    <FaRegCalendarAlt color="#80878b" className="me-2" />
                    <span>Sun, Feb 09</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaRegClock color="#80878b" className="me-2" />
                    <span>11:00 AM - 07:00 PM</span>
                  </div>
                </div>
                <hr />

                <div className="text-black">
                  <div className="d-flex justify-content-between">
                    <p>Price</p>
                    <p className="fw-semibold">AED 121.00</p>
                  </div>
                  <p className="text-black-50" style={{ marginTop: "-10px" }}>
                    2 Adult
                  </p>
                  <p className="text-black-50" style={{ marginTop: "-10px" }}>
                    1 Children
                  </p>
                </div>
                <hr />

                <div className="d-flex justify-content-between pt-1">
                  <p className="fw-bolder fs-5">Total</p>
                  <p className="fw-bolder fs-5">AED 121.00</p>
                </div>

                <p
                  className="col-12 pt-4 my-2"
                  style={{ fontSize: "14px", color: "#6c757d" }}
                >
                  By proceeding, I acknowledge that I have read and agree to the
                  Event Terms & Conditions and Privacy Policy.
                </p>

                <button
                  className="bg-white col-12 d-flex justify-content-between p-0 mt-3"
                  style={{ border: "none", color: "#5ab2b3" }}
                  onClick={toggleAccordion}
                >
                  <span className="fw-semibold">
                    Cancellation & Date Change
                  </span>
                  <IoIosArrowDown
                    color="grey"
                    size={22}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </button>
                <hr className="mt-2" />

                {/* <div className="my-2">
 <label className="text-black fw-semibold fs-4">
 Promotions
 </label>
 <br />
 <label className="pt-1">Promo Code</label>
 <br />
 <div className="d-flex">
 <input
 className={`${style["promo_input"]} col-8`}
 style={{ height: "38px" }}
 />
 <button
 className={`${style["btn-one"]}`}
 style={{ padding: "6px 20px" }}
 >
 Apply
 </button>
 </div>
 </div> */}

                <div className="pt-4 d-flex flex-xl-row flex-lg-column flex-column">
                  <div>
                    <label
                      className="text-black fw-semibold"
                      style={{ fontSize: "1.42rem" }}
                    >
                      Complete Registration In
                    </label>
                    <br />
                    <p>
                      {" "}
                      &nbsp; Ticket price or availability updates
                      <br className="d-lg-block d-none" /> &nbsp; after promo
                      applications
                    </p>
                  </div>
                  <div
                    className="rounded-pill align-content-center ms-3"
                    style={{
                      height: "85px",
                      width: "85px",
                      border: "4px solid #5ab2b3",
                    }}
                  >
                    <h1 className="align-items-center align-self-center d-flex flex-column ms-2 my-1 text-black-50">
                      <span style={{ fontSize: "23px" }}>
                        {minutes < 10 ? `0${minutes}` : minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                      <span style={{ fontSize: "12px" }}>mins</span>
                    </h1>
                  </div>
                </div>
                <div className="pt-2">
                  <div>
                    <label className="text-black fw-semibold fs-4">
                      Social Sharing Incentive
                    </label>
                    <br />
                    <p className=" fw-normal pt-1">
                      {" "}
                      Travel & Save! Share your tour booking and
                      <br className="d-lg-block d-none" />
                      unlock exclusive travel perks!
                    </p>
                    <div className="d-flex gap-3 pt-1">
                      <button className={`${style["ordinary_button"]}`}>
                        <GoShare size={21} /> Share
                      </button>
                      {/* <button className={`${style["ordinary_button"]}`}>
 <FaRegHeart size={20} /> Save
 </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- REST OF YOUR PAGE (UNCHANGED) --- */}
        <div className="container">
          <img
            src="/images/blank.png"
            className="w-100"
            style={{ height: "400px", borderRadius: "15px" }}
            alt="Banner"
          />
          <div
            className="d-flex justify-content-between px-4"
            style={{ marginTop: "-33px" }}
          >
            <p className="text-black-50 ">
              Date: <span className="text-white">19- JAN-2017</span>
            </p>
            <p className="text-black-50 ">
              Tag: <span className="text-white"> Business</span>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 d-flex justify-content-center">
              <h3>Other Packages</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row pt-2 pb-5">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={slugPackage}
                count={5}
                type="pakage-details-other-packages"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Ask_ur_questions />
      </div>
    </div>
  );
};

export default Checkout;
