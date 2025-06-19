"use client";

import React, { useState, useEffect } from "react";
import { Range } from "react-range";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Link from "next/link";
import Carousal from "../../../components/carousel/Carousal";
import Accordion from "../../../components/accordion/accordion";
import EventsExploreTab from "../../../components/tour-package/events-explore";
import { RiInformationLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaRegHeart } from "react-icons/fa6";
import { FaPlus, FaBaby } from "react-icons/fa";
import { BiSolidPlusCircle } from "react-icons/bi";
import { PiMinusCircleFill } from "react-icons/pi";
import { GiPerson } from "react-icons/gi";
import { MdOutlineBoy } from "react-icons/md";
import { GoShare } from "react-icons/go";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Get booking data from localStorage
  const jsonString = localStorage.getItem("booking_data");
  const dataString = localStorage.getItem("data");

  // Parse the JSON strings into objects
  const data = JSON.parse(jsonString);
  const slugPackageData = JSON.parse(dataString);

  const [price, setPrice] = useState({
    adult_price: slugPackageData?.adult_price || 0,
    child_price: slugPackageData?.child_price || 0,
    infant_price: slugPackageData?.infant_price || 0,
  });

  // Calculate initial totals from booking data
  const initialTotals = {
    adults: 0,
    children: 0,
    infants: 0,
  };

  const finalTotals =
    data?.rooms?.reduce((accumulator, currentRoom) => {
      accumulator.adults += currentRoom.adults;
      accumulator.children += currentRoom.children;
      accumulator.infants += currentRoom.infants;
      return accumulator;
    }, initialTotals) || initialTotals;

  const [guests, setGuests] = useState({
    adults: finalTotals.adults,
    children: finalTotals.children,
    infants: finalTotals.infants,
  });

  const [slugPackage, setSlugPackage] = useState([]);

  // Calculate total price
  const calculateTotalPrice = () => {
    const adultTotal = guests.adults * (price.adult_price || 0);
    const childTotal = guests.children * (price.child_price || 0);
    const infantTotal = guests.infants * (price.infant_price || 0);

    return adultTotal + childTotal + infantTotal;
  };

  const totalPrice = calculateTotalPrice();

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

  const updateGuestCount = (type, change) => {
    setGuests((prevGuests) => {
      const newValue = prevGuests[type] + change;

      if (newValue >= 0 && newValue <= 3) {
        return { ...prevGuests, [type]: newValue };
      }
      return prevGuests;
    });
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Update price when slugPackageData changes
  useEffect(() => {
    if (slugPackageData) {
      setPrice({
        adult_price: slugPackageData.adult_price || 0,
        child_price: slugPackageData.child_price || 0,
        infant_price: slugPackageData.infant_price || 0,
      });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch packages data
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

  // Format time to "mins:sec"
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const pakageDetailsOtherPackages = [
    {
      id: 1,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/01.jpg",
    },
    {
      id: 2,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/02.jpg",
    },
    {
      id: 3,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/03.jpg",
    },
    {
      id: 4,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/04.jpg",
    },
    {
      id: 5,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/05.jpg",
    },
    {
      id: 6,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/06.jpg",
    },
  ];

  return (
    <div>
      <Banner />
      <div>
        <div className="">
          <div className={`container ${style["checkout-package-details"]}`}>
            <div className="row pt-5">
              <div className="col-md-8">
                <h2 className="d-flex justify-content-between fw-bolder">
                  Tour Package Booking Checkout
                  <button
                    className="rounded-2 fw-semibold fs-6 px-1 bg-white"
                    style={{
                      border: "4px solid #5ab2b3",
                      color: "#5ab2b3",
                      height: "39px",
                    }}
                  >
                    Customizable
                  </button>
                </h2>
                <p style={{ fontSize: "14px", color: "black" }}>
                  Guest Signup - Tour Package Booking{" "}
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
                          className="align-items-center  fw-semibold"
                          style={{ color: "#5ab2b3", height: "12px" }}
                        >
                          <FaUser
                            size={23}
                            className="me-3"
                            color="#e7e7e7"
                            style={{ marginTop: "-11px" }}
                          />
                          Adult{" "}
                        </p>
                        <div className="">
                          <div className="col-12">
                            <input
                              className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12 `}
                              placeholder="LastName (in English)*"
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
                              placeholder="First & middle name(in English)*"
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
                          {/* gender buttons  */}
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
                      <h1 className="m-2 pt-2 pb-2 ms-0 fw-bolder">
                        Travel Details
                      </h1>
                      <label>Pick-up point*</label>
                      <br />
                      <select className={`${style["promo_select"]} col-12`}>
                        <option>Please select pick-up point*</option>
                      </select>

                      <label className="pe-0 me-0 pt-3">Special Requests</label>
                      <br />
                      <input
                        className={`${style["promo_input"]} my-2 col-12`}
                        placeholder="Please enter Special Requests"
                      />

                      <label className="pt-2">Package Addons</label>
                      <br />
                      <select className={`${style["promo_select"]} col-12`}>
                        <option>
                          Add travel medical insurance details if required
                        </option>
                      </select>

                      <h1 className="m-3 ms-0 pt-1 fw-bolder">Contact Info</h1>
                      <div className="d-flex flex-xl-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3">
                        <div className="col-xl-6 col-12">
                          <label className="">Contact Name</label>
                          <br />
                          <input
                            className={`${style["promo_input"]} my-2 col-12`}
                            placeholder="Please enter contact name *"
                          />
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-12">
                          <label className="">Contact Number</label>
                          <br />
                          <select
                            className={`${style["promo_select"]} my-2`}
                            style={{ width: "68px", paddingLeft: "5px" }}
                          >
                            <option>+918</option>
                          </select>
                          <input
                            className={`${style["promo_input"]} my-2 ms-xl-1 ms-lg-1 ms-2`}
                            style={{ width: "240px" }}
                            placeholder="Mobile Number*"
                          />
                        </div>
                      </div>
                      <div className="my-2">
                        <label className="pe-0 me-0">Email Address</label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12`}
                          placeholder="All important updates will be send to this email ID*"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-4 my-md-0 my-5">
                <label className="text-black fw-semibold fs-4">
                  Package Price
                </label>
                <br />
                <div
                  className="col-11 text-black-50 my-2"
                  style={{ height: "2px", borderTop: "3px dashed #e2e2e2" }}
                />

                <div
                  className="col-11 text-black pt-3"
                  style={{ borderBottom: "2px solid #e2e2e2" }}
                >
                  <h5 className="pt-2 d-flex pb-2 justify-content-between col-11">
                    <span>
                      <b>Price</b>
                    </span>
                  </h5>

                  {/* Show adult pricing if there are adults */}
                  {guests.adults > 0 && (
                    <div className="d-flex justify-content-between">
                      <p className="text-black">
                        {guests.adults} Adult{guests.adults > 1 ? "s" : ""}
                      </p>
                      {/* <p className="text-black">
                        AED{" "}
                        {(guests.adults * (price.adult_price || 0)).toFixed(2)}
                      </p> */}
                    </div>
                  )}

                  {/* Show children pricing if there are children */}
                  {guests.children > 0 && (
                    <div className="d-flex justify-content-between">
                      <p className="text-black">
                        {guests.children} Child
                        {guests.children > 1 ? "ren" : ""}
                      </p>
                      {/* <p className="text-black">
                        AED{" "}
                        {(guests.children * (price.child_price || 0)).toFixed(
                          2
                        )}
                      </p> */}
                    </div>
                  )}

                  {/* Show infant pricing if there are infants */}
                  {guests.infants > 0 && (
                    <div className="d-flex justify-content-between">
                      <p className="text-black">
                        {guests.infants} Infant{guests.infants > 1 ? "s" : ""}
                      </p>
                      {/* <p className="text-black">
                        AED{" "}
                        {(guests.infants * (price.infant_price || 0)).toFixed(
                          2
                        )}
                      </p> */}
                    </div>
                  )}

                  <h5 className="pt-2 d-flex pb-1 justify-content-between col-11">
                    <span>
                      <b>Total</b>
                    </span>
                    <span>
                      <b>AED {totalPrice.toFixed(2)}</b>
                    </span>
                  </h5>
                </div>

                <span className="col-10 ps-1 pt-2 d-flex justify-content-end">
                  <button className={style["btn-one"]}>Pay Now</button>
                </span>

                <p className="col-lg-12 col-xl-12 col-12 pt-4 my-2">
                  By proceeding, I acknowledge that I have
                  <br className="d-lg-block d-none" />
                  read and agree to the Company Terms &{" "}
                  <br className="d-lg-block d-none" />
                  Conditions and Privacy Statement.
                </p>
                <button
                  className="bg-white col-11 d-flex justify-content-between"
                  style={{ border: "none", color: "#5ab2b3" }}
                  onClick={toggleAccordion}
                >
                  <span className="fw-semibold">
                    Cancellation &{" "}
                    <br className="d-lg-none d-md-block d-none" /> Date Change{" "}
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

                <div className="my-2">
                  <label className="text-black fw-semibold fs-4">
                    Promotions
                  </label>
                  <br />
                  <label className="pt-1">Promo code</label>
                  <br />
                  <div>
                    <input
                      className={`${style["promo_input"]} col-xl-8 col-lg-7 col-md-10`}
                      style={{ height: "35px" }}
                    />
                    <button
                      className={`${style["btn-one"]} my-lg-0 my-md-1 my-2`}
                      style={{ padding: "6px 10px" }}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="pt-4 d-flex flex-xl-row flex-lg-column flex-column">
                    <div>
                      <label
                        className="text-black fw-semibold"
                        style={{ fontSize: "1.42rem" }}
                      >
                        Complete Booking In
                      </label>
                      <br />
                      <p>
                        {" "}
                        &nbsp; The package price will refresh
                        <br className="d-lg-block d-none" /> &nbsp; After
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

                  <div className="pt-3 d-flex flex-xl-row flex-md-column flex-column ">
                    <div className="col-lg-8 col-12 ">
                      <label className="text-black fw-semibold fs-4">
                        Loyalty Rewards
                      </label>
                      <br />
                      <p>
                        Enroll in our loyalty program{" "}
                        <br className="d-lg-block d-none" /> to earn travel
                        rewards on future bookings
                      </p>
                    </div>
                    <div className="align-content-center">
                      <button
                        className={`${style["btn-one"]} my-lg-0 my-md-1 my-2`}
                        style={{ padding: "6px 10px" }}
                      >
                        Learn More
                      </button>
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
                        <button className={`${style["ordinary_button"]}`}>
                          <FaRegHeart size={20} /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
