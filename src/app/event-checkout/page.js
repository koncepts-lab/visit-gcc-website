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
import { useSearchParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

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
    contact_name: "",
    contact_number: "",
    email: "",
    country_code: "+91",
  });

  const [travellers, setTravellers] = useState([
    {
      id: 1,
      last_name: "",
      first_name: "",
      id_type: "",
      id_number: "",
      gender: "",
    },
  ]);
  const [nextTravellerId, setNextTravellerId] = useState(2);
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // --- State for Success Popup ---
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  useEffect(() => {
    const validateForm = () => {
      if (!bookingDetails) return false;

      // Condition 1: Form data
      const isFormDataValid =
        formData.contact_name.trim() !== "" &&
        formData.contact_number.trim() !== "" &&
        /\S+@\S+\.\S+/.test(formData.email);

      const totalAdults = bookingDetails.total_adults || 0;
      const totalChildren = bookingDetails.total_children || 0;
      const requiredTravellersCount = totalAdults + totalChildren;

      // Condition 2: Correct number of travellers
      const areAllTravellersAdded =
        travellers.length === requiredTravellersCount;

      // Condition 3: All traveller fields are filled
      const areTravellersValid = travellers.every(
        (t) =>
          t.first_name.trim() !== "" &&
          t.last_name.trim() !== "" &&
          t.id_type.trim() !== "" &&
          t.id_number.trim() !== "" &&
          t.gender !== ""
      );

      setIsFormValid(
        isFormDataValid && areTravellersValid && areAllTravellersAdded
      );
    };

    validateForm();
  }, [formData, travellers, bookingDetails]);

const countryCodes = [
  { name: "India", code: "+91" },
  { name: "USA", code: "+1" },
  { name: "UK", code: "+44" },
  { name: "UAE", code: "+971" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Qatar", code: "+974" },
  { name: "Oman", code: "+968" },
  { name: "Kuwait", code: "+965" },
  { name: "Bahrain", code: "+973" },
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "American Samoa", code: "+1-684" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1-242" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1-246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bermuda", code: "+1-441" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia & Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Cape Verde", code: "+238" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Congo", code: "+242" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1-767" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "El Salvador", code: "+503" },
  { name: "Estonia", code: "+372" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Guatemala", code: "+502" },
  { name: "Honduras", code: "+504" },
  { name: "Hong Kong", code: "+852" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1-876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Macau", code: "+853" },
  { name: "Madagascar", code: "+261" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Mexico", code: "+52" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Morocco", code: "+212" },
  { name: "Myanmar", code: "+95" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "Norway", code: "+47" },
  { name: "Pakistan", code: "+92" },
  { name: "Panama", code: "+507" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Puerto Rico", code: "+1-787" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Togo", code: "+228" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
];

  // --- Handlers for Form Inputs ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleTravellerInputChange = (travellerId, field, value) => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === travellerId ? { ...t, [field]: value } : t))
    );
    const errorKey = `travelers.${travellers.findIndex(
      (t) => t.id === travellerId
    )}.${field}`;
    if (formErrors[errorKey])
      setFormErrors((prev) => ({ ...prev, [errorKey]: null }));
  };

  const handleGenderChange = (travellerId, gender) => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === travellerId ? { ...t, gender } : t))
    );
  };

  const handleAddTraveller = () => {
    setTravellers((prev) => [
      ...prev,
      {
        id: nextTravellerId,
        last_name: "",
        first_name: "",
        id_type: "",
        id_number: "",
        gender: "",
      },
    ]);
    setNextTravellerId(nextTravellerId + 1);
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  const handlePayNow = async () => {
    setFormErrors({});
    const authToken = localStorage.getItem("auth_token_login");
    if (!authToken) {
      enqueueSnackbar("You must be logged in to make a payment.", {
        variant: "warning",
      });
      return;
    }

    let validationErrors = {};

    if (!formData.contact_name.trim())
      validationErrors.contact_name = ["Contact name is required."];
    if (!formData.contact_number.trim())
      validationErrors.contact_number = ["Contact number is required."];
    if (!formData.email.trim()) {
      validationErrors.email = ["Email is required."];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = ["Please enter a valid email address."];
    }

    travellers.forEach((t, index) => {
      if (!t.first_name.trim())
        validationErrors[`travelers.${index}.first_name`] = [
          "First name is required.",
        ];
      if (!t.last_name.trim())
        validationErrors[`travelers.${index}.last_name`] = [
          "Last name is required.",
        ];
      if (!t.id_type.trim())
        validationErrors[`travelers.${index}.id_type`] = [
          "ID Type is required.",
        ];
      if (!t.id_number.trim())
        validationErrors[`travelers.${index}.id_number`] = [
          "ID Number is required.",
        ];
      if (!t.gender)
        validationErrors[`travelers.${index}.gender`] = ["Gender is required."];
    });

    if (bookingDetails && travellers.length < bookingDetails.total_adults) {
      enqueueSnackbar(
        `Please add details for all ${bookingDetails.total_adults} adults.`,
        { variant: "warning" }
      );
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      enqueueSnackbar("Please fill in all required fields correctly.", {
        variant: "error",
      });
      return;
    }

    const finalCheckoutData = {
      ...formData,
      travelers: travellers,
    };

    const bookingAmount = bookingDetails
      ? parseFloat(bookingDetails.booking.total_amount)
      : 0;

    if (bookingAmount === 0) {
      try {
        enqueueSnackbar("Confirming your free booking...", { variant: "info" });
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}payment/confirm-free/${bookingId}`,
          finalCheckoutData,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        if (response.data.success) {
          setSuccessMessage(bookingId);
          setShowSuccessPopup(true);
        } else {
          enqueueSnackbar(
            response.data.message || "Could not confirm booking.",
            { variant: "error" }
          );
        }
      } catch (error) {
        console.error(
          "Error confirming free booking:",
          error.response?.data || error
        );
        enqueueSnackbar(
          error.response?.data?.message ||
            "An error occurred. Please try again.",
          { variant: "error" }
        );
      }
    } else {
      let orderDetails;
      try {
        const orderResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}payment/create-order/${bookingId}`,
          {},
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        orderDetails = orderResponse.data;
        if (!orderDetails.success) {
          enqueueSnackbar(
            orderDetails.message || "Failed to create payment order.",
            { variant: "error" }
          );
          return;
        }
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        enqueueSnackbar("Could not initiate payment. Please try again.", {
          variant: "error",
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: orderDetails.name,
        description: orderDetails.description,
        order_id: orderDetails.order_id,
        handler: async function (response) {
          const finalPaidCheckoutData = {
            ...finalCheckoutData,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          try {
            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}payment/verify/${bookingId}`,
              finalPaidCheckoutData,
              { headers: { Authorization: `Bearer ${authToken}` } }
            );

            if (verifyResponse.data.success) {
              setSuccessMessage(bookingId);
              setShowSuccessPopup(true);
            } else {
              enqueueSnackbar(
                verifyResponse.data.message || "Payment verification failed.",
                { variant: "error" }
              );
            }
          } catch (error) {
            if (error.response && error.response.status === 422) {
              setFormErrors(error.response.data.errors);
              enqueueSnackbar("Please review the errors on the form.", {
                variant: "error",
              });
            } else {
              console.error(
                "Error verifying payment:",
                error.response?.data || error
              );
              enqueueSnackbar(
                "Payment verification failed. Please contact support.",
                { variant: "error" }
              );
            }
          }
        },
        prefill: {
          name: orderDetails.prefill.name,
          email: orderDetails.prefill.email,
        },
        theme: { color: "#5ab2b3" },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          enqueueSnackbar("Payment failed: " + response.error.description, {
            variant: "error",
          });
          console.error("Razorpay payment failed:", response.error);
        });
        rzp.open();
      } else {
        enqueueSnackbar(
          "Payment gateway is not available. Please refresh the page.",
          { variant: "error" }
        );
      }
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchOtherItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events`
        );
        setOtherItems(response.data.data || response.data || []);
      } catch (err) {
        console.error("Error fetching other items:", err);
      }
    };
    fetchOtherItems();
  }, []);

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      setIsLoading(false);
      return;
    }
    const authToken = localStorage.getItem("auth_token_login");
    if (!authToken) {
      setError("Please log in to view your booking.");
      setIsLoading(false);
      return;
    }

    const fetchBookingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}booking-details/${bookingId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const apiData = response.data || {};

        if (apiData.is_payable === false) {
          enqueueSnackbar("This booking has already been completed.", {
            variant: "info",
          });
          router.replace("/");
          return;
        }

        if (!apiData.booking) throw new Error("Invalid booking data from API.");

        setBookingDetails(apiData);
        if (apiData.booking.email)
          setFormData((prev) => ({ ...prev, email: apiData.booking.email }));
        if (apiData.booking.contact_name)
          setFormData((prev) => ({
            ...prev,
            contact_name: apiData.booking.contact_name,
          }));
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to fetch booking details.");
        router.replace("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookingData();
  }, [bookingId, router]);

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    router.replace("/");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (isLoading)
    return (
      <div className="container text-center py-5">
        <h2>Loading your booking details...</h2>
      </div>
    );
  if (error)
    return (
      <div className="container text-center py-5">
        <h2 className="text-danger">{error}</h2>
      </div>
    );
  if (!bookingDetails)
    return (
      <div className="container text-center py-5">
        <h2>No booking details found.</h2>
      </div>
    );

  const bookingInfo = bookingDetails.booking;
  const itemDetails =
    bookingInfo.event || bookingInfo.package || bookingInfo.attraction || {};
  const itemName = itemDetails.name || "Your Booking";
  const itemAdultPrice = parseFloat(itemDetails.adult_price || 0).toFixed(2);
  const itemStartDate = formatDate(bookingInfo.start_date);
  const itemStartTime = formatTime(itemDetails.start_time);
  const itemEndTime = formatTime(itemDetails.end_time);
  const totalAmount = parseFloat(bookingInfo.total_amount || 0).toFixed(2);
  const totalAdults = bookingDetails.total_adults || 0;
  const totalChildren = bookingDetails.total_children || 0;

  
  // --- Popup Styles ---
  const popupOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1050,
  };

  const popupStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    width: "90%",
    maxWidth: "400px",
    fontFamily: "sans-serif",
  };

  const popupButtonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5ab2b3",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

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
                <div>
                  <h1 className="m-3 ms-0 pt-3 fw-bolder">
                    Personal Information
                  </h1>
                  <form className="col-xxl-10 col-xl-12">
                    {travellers.map((traveller, index) => (
                      <div key={traveller.id} className="pt-1">
                        <p
                          className="align-items-center fw-semibold d-flex"
                          style={{ color: "#5ab2b3", height: "25px" }}
                        >
                          <FaUser size={23} className="me-3" color="#e7e7e7" />
                          Traveller {index + 1}
                        </p>
                        <div>
                          <div className="col-12 d-flex flex-xl-row  flex-column">
                            <div className="col-xl-5 col-lg-6 col-12">
                            <input
                              className={`${
                                style["promo_input"]
                              }  col-12 `}
                              placeholder="Last name (in English)*"
                              value={traveller.last_name}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "last_name",
                                  e.target.value
                                )
                              }
                            />
                                                       
                            {formErrors[`travelers.${index}.last_name`] && (
                              <p className="text-danger small">
                                {formErrors[`travelers.${index}.last_name`][0]}
                              </p>
                            )}
                            </div>
                            {/* <br className="d-xl-none d-lg-block" /> */}
                            <div className="ms-xxl-5 ms-xl-5 ms-md-0 col-xl-5 col-lg-6 col-12 ">
                               <input
                              className={` col-12 ${
                                style["promo_input"]
                              } `}
                              placeholder="First & middle name (in English)*"
                              value={traveller.first_name}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "first_name",
                                  e.target.value
                                )
                              }
                            />
                               {formErrors[`travelers.${index}.first_name`] && (
                              <p className="text-danger small">
                                {formErrors[`travelers.${index}.first_name`][0]}
                              </p>
                            )}
                            </div>

                           
                          </div>
                          <div className="col-12 d-flex flex-xl-row  flex-column pt-2">
                            
                             <div className="col-xl-5 col-lg-6 col-12">
                             <input
                              className={`${
                                style["promo_input"]
                              } col-12 `}
                              placeholder="ID Type*"
                              value={traveller.id_type}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "id_type",
                                  e.target.value
                                )
                              }
                            />
                             {formErrors[`travelers.${index}.id_type`] && (
                              <p className="text-danger small">
                                {formErrors[`travelers.${index}.id_type`][0]}
                              </p>
                            )}
                            </div>
                            <div className="ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 col-lg-6 col-12">
                            <input
                              className={`${
                                style["promo_input"]
                              }  col-12`}
                              placeholder="ID number*"
                              value={traveller.id_number}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "id_number",
                                  e.target.value
                                )
                              }
                            />
                           
                            {formErrors[`travelers.${index}.id_number`] && (
                              <p className="text-danger small">
                                {formErrors[`travelers.${index}.id_number`][0]}
                              </p>
                            )}
                            </div>
                          </div>
                          <div
                            style={{ marginTop: "10px", marginBottom: "10px" }}
                          >
                            <button
                              type="button"
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
                              className="ms-md-3 ms-2"
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
                            {formErrors[`travelers.${index}.gender`] && (
                              <p className="text-danger small d-block">
                                {formErrors[`travelers.${index}.gender`][0]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {totalAdults + totalChildren > travellers.length && (
                      <button
                        type="button"
                        onClick={handleAddTraveller}
                        className="btn btn-outline-primary btn-sm mt-2"
                      >
                        + Add Traveller
                      </button>
                    )}

                    <div>
                      <h1 className="m-3 ms-0 pt-1 fw-bolder">Contact Info</h1>
                      <div className="d-flex flex-xl-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3">
                        <div className="col-xl-6 col-12">
                          <label className="">Contact Name*</label>
                          <br />
                          <input
                            className={`${style["promo_input"]} my-2 col-12 `}
                            placeholder="Please enter contact name"
                            name="contact_name"
                            value={formData.contact_name}
                            onChange={handleFormChange}
                          />
                          {formErrors.contact_name && (
                            <p className="text-danger small">
                              {formErrors.contact_name[0]}
                            </p>
                          )}
                        </div>
                        <div className="col-xl-6 col-lg-8 col-md-12 col-12">
                          <label className="">Contact Number*</label>
                          <br />
                          <select
                            name="country_code"
                            value={formData.country_code}
                            onChange={handleFormChange}
                            className={`${style["promo_select"]} my-2`}
                            style={{ width: "80px", paddingLeft: "5px" }}
                          >
                            {countryCodes.map((country) => (
                                <option
                                  key={`${country.name}-${country.code}`}
                                  value={country.code}
                                >
                                  {country.code}
                                </option>
                              ))}
                          </select>
                          <input
                            className={`${
                              style["promo_input"]
                            } my-2 ms-xl-1 ms-lg-1 ms-2 `}
                            style={{ width: "240px" }}
                            placeholder="Mobile Number"
                            name="contact_number"
                            value={formData.contact_number}
                            onChange={handleFormChange}
                          />
                          {formErrors.contact_number && (
                            <p className="text-danger small">
                              {formErrors.contact_number[0]}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="my-2">
                        <label className="pe-0 me-0">Email Address*</label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12 `}
                          placeholder="All important updates will be send to this email ID"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleFormChange}
                        />
                        {formErrors.email && (
                          <p className="text-danger small">
                            {formErrors.email[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-4 my-md-0 my-5">
                <div
                  className={`d-flex justify-content-between ${style["price-container"]}`}
                >
                  <div className="d-flex">
                    <span className="fw-bolder fs-4 text-center ">
                      AED {itemAdultPrice}
                    </span>
                  </div>
                  <div className="d-flex flex-column gap-2 align-items-end">
                    <div className="d-flex gap-2">
                      <button
                        onClick={handlePayNow}
                        className={style["btn-one"]}
                      >
                        Pay Now
                      </button>
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
                  <h3 className="fw-bolder">{itemName}</h3>
                  <p style={{ color: "#80878b" }}>Entry Ticket</p>
                  <div className="d-flex align-items-center mb-2">
                    <FaRegCalendarAlt color="#80878b" className="me-2" />
                    <span>{itemStartDate}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaRegClock color="#80878b" className="me-2" />
                    <span>
                      {itemStartTime} - {itemEndTime}
                    </span>
                  </div>
                </div>
                <hr />

                <div className="text-black">
                  <div className="d-flex justify-content-between">
                    <p>Price</p>
                    <p className="fw-semibold">AED {totalAmount}</p>
                  </div>
                  {bookingDetails.total_adults > 0 && (
                    <p className="text-black-50" style={{ marginTop: "-10px" }}>
                      {bookingDetails.total_adults} Adult
                      {bookingDetails.total_adults > 1 ? "s" : ""}
                    </p>
                  )}
                  {bookingDetails.total_children > 0 && (
                    <p className="text-black-50" style={{ marginTop: "-10px" }}>
                      {bookingDetails.total_children} Child
                      {bookingDetails.total_children > 1 ? "ren" : ""}
                    </p>
                  )}
                  {bookingDetails.total_infants > 0 && (
                    <p className="text-black-50" style={{ marginTop: "-10px" }}>
                      {bookingDetails.total_infants} Infant
                      {bookingDetails.total_infants > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <hr />

                <div className="d-flex justify-content-between pt-1">
                  <p className="fw-bolder fs-5">Total</p>
                  <p className="fw-bolder fs-5">AED {totalAmount}</p>
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
                      Ticket price or availability updates
                      <br className="d-lg-block d-none" />
                      after promo applications
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
                      Travel & Save! Share your tour booking and
                      <br className="d-lg-block d-none" />
                      unlock exclusive travel perks!
                    </p>
                    <div className="d-flex gap-3 pt-1">
                      <button className={`${style["ordinary_button"]}`}>
                        <GoShare size={21} /> Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <img
            src={otherItems?.[0]?.event_photo_urls?.[0] || "/images/blank.png"}
            className="w-100"
            style={{ height: "400px", borderRadius: "15px" }}
            alt="Banner"
          />
          <div
            className="d-flex justify-content-between px-4"
            style={{ marginTop: "-33px" }}
          >
            <p className="text-black-50 ">
              Date:{" "}
              <span className="text-black">
                {formatDate(otherItems?.[0]?.start_date)}
              </span>
            </p>
            <p className="text-black-50 ">
              Tag:{" "}
              <span className="text-black"> {otherItems?.[0]?.category}</span>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 d-flex justify-content-center">
              <h3>Other Events</h3>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row pt-2 pb-5">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={otherItems}
                count={5}
                type="event-details-other-events"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Ask_ur_questions />
      </div>

      {/* --- SUCCESS POPUP --- */}
      {showSuccessPopup && (
        <div style={popupOverlayStyle}>
          <div style={popupStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5ab2b3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2l4-4" />
              </svg>
            </div>
            <h2
              style={{
                color: "#333",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Booking Successful!
            </h2>
            <p
              style={{
                fontSize: "16px",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Your booking has been confirmed.
            </p>
            <p
              style={{
                textAlign: "center",
                fontWeight: 500,
                marginBottom: "6px",
              }}
            >
              Your Booking ID:
            </p>
            <div
              style={{
                backgroundColor: "#f1f1f1",
                padding: "10px 15px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "bold",
                color: "#333",
                fontSize: "15px",
                userSelect: "all",
                cursor: "pointer",
                marginBottom: "20px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(successMessage);
                enqueueSnackbar("Booking ID copied to clipboard!", { variant: "info" });
              }}
              title="Click to copy"
            >
              {successMessage}
            </div>
            <button
              onClick={handleClosePopup}
              style={popupButtonStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#4a9a9c")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#5ab2b3")
              }
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* --- STICKY FOOTER FOR MOBILE --- */}
      <div className={style.stickyPayContainer}>
        <div className={style.priceText}>AED {totalAmount}</div>
        <button
          onClick={handlePayNow}
          style={{ backgroundColor: "#149699" }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;