"use client";

import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Link from "next/link";
import Carousal from "../../../components/carousel/Carousal";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaRegHeart, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialTime = 720;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // --- State for Data & UI ---
  const [bookingDetails, setBookingDetails] = useState(null);
  const [otherItems, setOtherItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // --- State for Form Inputs ---
  const [formData, setFormData] = useState({
    pick_up_point: "",
    contact_name: "",
    contact_number: "",
    email: "",
    special_request: "",
    add_ons: "",
    country_code: "+91",
  });
  
  const [travellers, setTravellers] = useState([
    { id: 1, last_name: "", first_name: "", id_type: "", id_number: "", gender: "" },
  ]);
  const [nextTravellerId, setNextTravellerId] = useState(2);
  const [formErrors, setFormErrors] = useState({});

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  // --- Handlers for Form Inputs ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleTravellerInputChange = (travellerId, field, value) => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === travellerId ? { ...t, [field]: value } : t))
    );
    const errorKey = `travelers.${travellers.findIndex(t => t.id === travellerId)}.${field}`;
    if (formErrors[errorKey]) setFormErrors(prev => ({ ...prev, [errorKey]: null }));
  };

  const handleGenderChange = (travellerId, gender) => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === travellerId ? { ...t, gender } : t))
    );
  };

  const handleAddTraveller = () => {
    setTravellers((prev) => [
      ...prev,
      { id: nextTravellerId, last_name: "", first_name: "", id_type: "", id_number: "", gender: "" },
    ]);
    setNextTravellerId(nextTravellerId + 1);
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  // --- Razorpay Payment Logic ---
  const handlePayNow = async () => {
    setFormErrors({});
    const authToken = localStorage.getItem("auth_token_login");
    if (!authToken) { alert("You must be logged in to make a payment."); return; }

    let validationErrors = {};
    if (!formData.contact_name) validationErrors.contact_name = ["Contact name is required."];
    if (!formData.contact_number) validationErrors.contact_number = ["Contact number is required."];
    if (!formData.email) validationErrors.email = ["Email is required."];
    
    travellers.forEach((t, index) => {
        if(!t.first_name) validationErrors[`travelers.${index}.first_name`] = ["First name is required."];
        if(!t.last_name) validationErrors[`travelers.${index}.last_name`] = ["Last name is required."];
        if(!t.id_type) validationErrors[`travelers.${index}.id_type`] = ["ID Type is required."];
        if(!t.id_number) validationErrors[`travelers.${index}.id_number`] = ["ID Number is required."];
        if(!t.gender) validationErrors[`travelers.${index}.gender`] = ["Gender is required."];
    });

    if (Object.keys(validationErrors).length > 0) {
        setFormErrors(validationErrors);
        alert("Please fill in all required fields.");
        return;
    }

    let orderDetails;
    try {
        const orderResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}payment/create-order/${bookingId}`, {},
            { headers: { Authorization: `Bearer ${authToken}` } }
        );
        orderDetails = orderResponse.data;
        if (!orderDetails.success) { alert(orderDetails.message || "Failed to create payment order."); return; }
    } catch (error) { console.error("Error creating Razorpay order:", error); alert("Could not initiate payment."); return; }

    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: orderDetails.name,
        description: orderDetails.description,
        order_id: orderDetails.order_id,
        handler: async function (response) {
            const finalCheckoutData = {
                ...formData,
                travelers: travellers,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
            };

            try {
                const verifyResponse = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}payment/verify/${bookingId}`,
                    finalCheckoutData,
                    { headers: { Authorization: `Bearer ${authToken}` } }
                );

                if (verifyResponse.data.success) {
                    alert("Booking confirmed successfully!");
                    router.push('/my-bookings');
                } else {
                    alert(verifyResponse.data.message || "Payment verification failed.");
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    setFormErrors(error.response.data.errors);
                    alert("Please review the errors on the form.");
                } else {
                    console.error("Error verifying payment:", error.response?.data || error);
                    alert("Payment verification failed. Please contact support.");
                }
            }
        },
        prefill: { name: orderDetails.prefill.name, email: orderDetails.prefill.email },
        theme: { color: "#5ab2b3" },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => { alert("Payment failed: " + resp.error.description); });
      rzp.open();
    } else {
      alert("Payment gateway is not available. Please refresh the page.");
    }
  };

  // --- useEffect Hooks ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchOtherItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events`);
        setOtherItems(response.data.data || response.data || []);
      } catch (err) { console.error("Error fetching other items:", err); }
    };
    fetchOtherItems();
  }, []);

  useEffect(() => {
    if (!bookingId) { setError("Booking ID is missing."); setIsLoading(false); return; }
    const authToken = localStorage.getItem("auth_token_login");
    if (!authToken) { setError("Please log in."); setIsLoading(false); return; }

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}booking-details/${bookingId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const apiData = response.data || {};
        if (!apiData.booking) throw new Error("Invalid booking data from API.");
        setBookingDetails(apiData);
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to fetch booking details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookingData();
  }, [bookingId]);

  // --- Helper Functions (This is the Fix) ---
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  // --- Render Logic ---
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  if (isLoading) return <div className="container text-center py-5"><h2>Loading your booking details...</h2></div>;
  if (error) return <div className="container text-center py-5"><h2 className="text-danger">{error}</h2></div>;
  if (!bookingDetails) return <div className="container text-center py-5"><h2>No booking details found.</h2></div>;
  
  const bookingInfo = bookingDetails.booking;
  const itemDetails = bookingInfo.event || bookingInfo.package || bookingInfo.attraction || {};
  const itemName = itemDetails.name || "Your Booking";
  const itemAdultPrice = parseFloat(itemDetails.adult_price || 0).toFixed(2);
  const itemStartDate = formatDate(bookingInfo.start_date);
  const itemStartTime = formatTime(itemDetails.start_time);
  const itemEndTime = formatTime(itemDetails.end_time);
  const totalAmount = parseFloat(bookingInfo.total_amount || 0).toFixed(2);
  const totalAdults = bookingDetails.total_adults || 0;
  
  return (
    <div>
      <Banner />
      <div>
        <div className="">
          <div className={`container ${style["checkout-package-details"]}`}>
            <div className="row pt-5">
              <div className="col-md-8">
                <h2 className="fw-bolder">{itemName}</h2>
                <p style={{ fontSize: "14px", color: "black" }}>Things to do</p>
                <p className="fs-6"><Link href="/login"><span style={{ color: "#5ab2b3" }} className="fs-6"> Register or Sign in</span></Link> to Visitgcc.com to manage your bookings with ease!</p>
                <div>
                  <h1 className="m-3 ms-0 pt-3 fw-bolder">Personal Information</h1>
                  <form className="col-xxl-10 col-xl-12">
                    {travellers.map((traveller, index) => (
                      <div key={traveller.id} className="pt-1">
                        <p className="align-items-center fw-semibold d-flex" style={{ color: "#5ab2b3", height: "25px" }}><FaUser size={23} className="me-3" color="#e7e7e7" />Adult {index + 1}</p>
                        <div>
                          <div className="col-12">
                            <input className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12 ${formErrors[`travelers.${index}.last_name`] ? style.error : ''}`} placeholder="Last name (in English)*" value={traveller.last_name} onChange={(e) => handleTravellerInputChange(traveller.id, "last_name", e.target.value)} />
                            <br className="d-xl-none d-lg-block" />
                            <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-5 col-lg-6 col-12 ${formErrors[`travelers.${index}.first_name`] ? style.error : ''}`} placeholder="First & middle name (in English)*" value={traveller.first_name} onChange={(e) => handleTravellerInputChange(traveller.id, "first_name", e.target.value)} />
                            {formErrors[`travelers.${index}.last_name`] && <p className="text-danger small">{formErrors[`travelers.${index}.last_name`][0]}</p>}
                            {formErrors[`travelers.${index}.first_name`] && <p className="text-danger small">{formErrors[`travelers.${index}.first_name`][0]}</p>}
                          </div>
                          <div className="col-12 pt-2">
                             <input className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12 ${formErrors[`travelers.${index}.id_type`] ? style.error : ''}`} placeholder="ID Type*" value={traveller.id_type} onChange={(e) => handleTravellerInputChange(traveller.id, "id_type", e.target.value)} />
                            <br className="d-xl-none d-lg-block" />
                            <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 col-lg-6 col-12 ${formErrors[`travelers.${index}.id_number`] ? style.error : ''}`} placeholder="ID number*" value={traveller.id_number} onChange={(e) => handleTravellerInputChange(traveller.id, "id_number", e.target.value)} />
                            {formErrors[`travelers.${index}.id_type`] && <p className="text-danger small">{formErrors[`travelers.${index}.id_type`][0]}</p>}
                            {formErrors[`travelers.${index}.id_number`] && <p className="text-danger small">{formErrors[`travelers.${index}.id_number`][0]}</p>}
                          </div>
                          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <button type="button" onClick={() => handleGenderChange(traveller.id, "male")} style={{ backgroundColor: traveller.gender === "male" ? "#5ab2b3" : "white", color: traveller.gender === "male" ? "white" : "#686767", padding: "5px 45px", fontSize: "13px", border: "#e2e2e2 2px solid", borderRadius: "5px" }}>Male</button>
                            <button type="button" className="ms-md-3 ms-2" onClick={() => handleGenderChange(traveller.id, "female")} style={{ backgroundColor: traveller.gender === "female" ? "#5ab2b3" : "white", color: traveller.gender === "female" ? "white" : "#686767", padding: "5px 42px", fontSize: "13px", border: "#e2e2e2 2px solid", borderRadius: "5px" }}>Female</button>
                            {formErrors[`travelers.${index}.gender`] && <p className="text-danger small d-block">{formErrors[`travelers.${index}.gender`][0]}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                    {totalAdults > travellers.length && <button type="button" onClick={handleAddTraveller} className="btn btn-outline-primary btn-sm mt-2">+ Add Traveller</button>}
                    
                    <div>
                      <h1 className="m-3 ms-0 pt-1 fw-bolder">Contact Info</h1>
                      <div className="d-flex flex-xl-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3">
                        <div className="col-xl-6 col-12">
                          <label className="">Contact Name*</label><br />
                          <input className={`${style["promo_input"]} my-2 col-12 ${formErrors.contact_name ? style.error : ''}`} placeholder="Please enter contact name" name="contact_name" value={formData.contact_name} onChange={handleFormChange}/>
                          {formErrors.contact_name && <p className="text-danger small">{formErrors.contact_name[0]}</p>}
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-12">
                          <label className="">Contact Number*</label><br />
                          <select name="country_code" value={formData.country_code} onChange={handleFormChange} className={`${style["promo_select"]} my-2`} style={{ width: "80px", paddingLeft: "5px" }}>
                            <option value="+91">+91</option>
                            <option value="+971">+971</option>
                            <option value="+966">+966</option>
                          </select>
                          <input className={`${style["promo_input"]} my-2 ms-xl-1 ms-lg-1 ms-2 ${formErrors.contact_number ? style.error : ''}`} style={{ width: "240px" }} placeholder="Mobile Number" name="contact_number" value={formData.contact_number} onChange={handleFormChange}/>
                          {formErrors.contact_number && <p className="text-danger small">{formErrors.contact_number[0]}</p>}
                        </div>
                      </div>
                      <div className="my-2">
                        <label className="pe-0 me-0">Email Address*</label><br />
                        <input className={`${style["promo_input"]} my-2 col-12 ${formErrors.email ? style.error : ''}`} placeholder="All important updates will be send to this email ID" name="email" type="email" value={formData.email} onChange={handleFormChange}/>
                        {formErrors.email && <p className="text-danger small">{formErrors.email[0]}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="col-md-4 my-md-0 my-5">
                <div className={`d-flex justify-content-between ${style["price-container"]}`}>
                  <div className="d-flex"><span className="fw-bolder fs-4 text-center ">AED {itemAdultPrice}</span></div>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <div className="d-flex gap-2">
                      <button onClick={handlePayNow} className={style["btn-one"]}>Pay Now</button>
                      <button className={`${style["btn-two"]} mb-0`}>Contact Seller</button>
                    </div>
                    <div className="text-end" style={{ fontSize: "12px", color: "#6c757d", lineHeight: "1.2" }}>You can now directly communicate<br />with the Seller of this package</div>
                  </div>
                </div>

                <div className="my-4">
                  <h3 className="fw-bolder">{itemName}</h3>
                  <p style={{ color: "#80878b" }}>Entry Ticket</p>
                  <div className="d-flex align-items-center mb-2"><FaRegCalendarAlt color="#80878b" className="me-2" /><span>{itemStartDate}</span></div>
                  <div className="d-flex align-items-center"><FaRegClock color="#80878b" className="me-2" /><span>{itemStartTime} - {itemEndTime}</span></div>
                </div>
                <hr />

                <div className="text-black">
                  <div className="d-flex justify-content-between"><p>Price</p><p className="fw-semibold">AED {totalAmount}</p></div>
                  {bookingDetails.total_adults > 0 && <p className="text-black-50" style={{ marginTop: "-10px" }}>{bookingDetails.total_adults} Adult{bookingDetails.total_adults > 1 ? "s" : ""}</p>}
                  {bookingDetails.total_children > 0 && <p className="text-black-50" style={{ marginTop: "-10px" }}>{bookingDetails.total_children} Child{bookingDetails.total_children > 1 ? "ren" : ""}</p>}
                  {bookingDetails.total_infants > 0 && <p className="text-black-50" style={{ marginTop: "-10px" }}>{bookingDetails.total_infants} Infant{bookingDetails.total_infants > 1 ? "s" : ""}</p>}
                </div>
                <hr />

                <div className="d-flex justify-content-between pt-1"><p className="fw-bolder fs-5">Total</p><p className="fw-bolder fs-5">AED {totalAmount}</p></div>
                <p className="col-12 pt-4 my-2" style={{ fontSize: "14px", color: "#6c757d" }}>By proceeding, I acknowledge that I have read and agree to the Event Terms & Conditions and Privacy Policy.</p>
                <button className="bg-white col-12 d-flex justify-content-between p-0 mt-3" style={{ border: "none", color: "#5ab2b3" }} onClick={toggleAccordion}>
                  <span className="fw-semibold">Cancellation & Date Change</span>
                  <IoIosArrowDown color="grey" size={22} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
                </button>
                <hr className="mt-2" />
                <div className="pt-4 d-flex flex-xl-row flex-lg-column flex-column">
                  <div>
                    <label className="text-black fw-semibold" style={{ fontSize: "1.42rem" }}>Complete Registration In</label><br />
                    <p>Ticket price or availability updates<br className="d-lg-block d-none" />after promo applications</p>
                  </div>
                  <div className="rounded-pill align-content-center ms-3" style={{ height: "85px", width: "85px", border: "4px solid #5ab2b3" }}>
                    <h1 className="align-items-center align-self-center d-flex flex-column ms-2 my-1 text-black-50">
                      <span style={{ fontSize: "23px" }}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
                      <span style={{ fontSize: "12px" }}>mins</span>
                    </h1>
                  </div>
                </div>
                <div className="pt-2">
                  <div>
                    <label className="text-black fw-semibold fs-4">Social Sharing Incentive</label><br />
                    <p className=" fw-normal pt-1">Travel & Save! Share your tour booking and<br className="d-lg-block d-none" />unlock exclusive travel perks!</p>
                    <div className="d-flex gap-3 pt-1"><button className={`${style["ordinary_button"]}`}><GoShare size={21} /> Share</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <img src={otherItems?.[0]?.event_photo_urls?.[0] || "/images/blank.png"} className="w-100" style={{ height: "400px", borderRadius: "15px" }} alt="Banner" />
          <div className="d-flex justify-content-between px-4" style={{ marginTop: "-33px" }}>
            <p className="text-black-50 ">Date: <span className="text-black">{formatDate(otherItems?.[0]?.start_date)}</span></p>
            <p className="text-black-50 ">Tag: <span className="text-black"> {otherItems?.[0]?.category}</span></p>
          </div>
        </div>

        <div className="container">
          <div className="row"><div className="col-md-12 pt-5 d-flex justify-content-center"><h3>Other Events</h3></div></div>
        </div>
        <div className="container-fluid">
          <div className="row pt-2 pb-5"><div className="col-md-12"><Carousal pakageDetailsOtherPackages={otherItems} count={5} type="event-details-other-events" /></div></div>
        </div>
      </div>
      <div><Ask_ur_questions /></div>
    </div>
  );
};

export default Checkout;