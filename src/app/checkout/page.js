"use client";
import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Link from "next/link";
import Carousal from "../../../components/carousel/Carousal";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

// --- Pop-up styles ---
const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
};

const popupStyle = {
  backgroundColor: "white",
  padding: "30px 40px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
  maxWidth: "90%",
  width: "450px",
  borderTop: "5px solid #5ab2b3",
};

const popupButtonStyle = {
  backgroundColor: "#5ab2b3",
  color: "white",
  border: "none",
  padding: "12px 30px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "20px",
  transition: "background-color 0.2s",
};


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

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialTime = 720;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const [bookingData, setBookingData] = useState(null);
  const [slugPackage, setSlugPackage] = useState([]);
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";


  const totalTravellersAllowed =
    (bookingData?.total_adults || 0) +
    (bookingData?.total_children || 0) +
    (bookingData?.total_infants || 0);

  const addTraveller = () => {
    if (
      totalTravellersAllowed > 0 &&
      travellers.length >= totalTravellersAllowed
    ) {
      enqueueSnackbar(
        `The booking is for ${totalTravellersAllowed} traveller(s). You cannot add more.`,
        { variant: "warning" }
      );
      return;
    }

    setTravellers([
      ...travellers,
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

  const removeTraveller = (idToRemove) => {
    setTravellers(
      travellers.filter((traveller) => traveller.id !== idToRemove)
    );
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage("");
    router.replace("/");
  };

  useEffect(() => {
    const validateForm = () => {
      const isFormDataValid =
        formData.contact_name.trim() !== "" &&
        formData.contact_number.trim() !== "" &&
        /\S+@\S+\.\S+/.test(formData.email);
      const areTravellersValid = travellers.every(
        (t) =>
          t.first_name.trim() !== "" &&
          t.last_name.trim() !== "" &&
          t.id_type.trim() !== "" &&
          t.id_number.trim() !== "" &&
          t.gender !== ""
      );
      setIsFormValid(isFormDataValid && areTravellersValid);
    };
    validateForm();
  }, [formData, travellers]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleTravellerInputChange = (travellerId, field, value) => {
    setTravellers((prevTravellers) =>
      prevTravellers.map((traveller) =>
        traveller.id === travellerId
          ? { ...traveller, [field]: value }
          : traveller
      )
    );
    const errorKey = `travelers.${travellers.findIndex(
      (t) => t.id === travellerId
    )}.${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: null }));
    }
  };

  const handleGenderChange = (travellerId, gender) => {
    setTravellers((prevTravellers) =>
      prevTravellers.map((traveller) =>
        traveller.id === travellerId ? { ...traveller, gender } : traveller
      )
    );
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchOtherPackageData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages`
        );
        setSlugPackage(response.data.data || response.data || []);
      } catch (err) {
        console.error("Error fetching other packages:", err);
      }
    };
    fetchOtherPackageData();
  }, []);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBookingData = async () => {
      const authToken = localStorage.getItem("auth_token_login");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }
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
        setBookingData(apiData);
        if (apiData.booking?.email)
          setFormData((prev) => ({ ...prev, email: apiData.booking.email }));
        if (apiData.booking?.contact_name)
          setFormData((prev) => ({
            ...prev,
            contact_name: apiData.booking.contact_name,
          }));
      } catch (err) {
        console.error("Error fetching booking data:", err);
        enqueueSnackbar("Could not load booking details.", {
          variant: "error",
        });
        router.replace("/");
      }
    };
    fetchBookingData();
  }, [bookingId, router]);

  const handlePayNow = async () => {
    setErrors({});
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      enqueueSnackbar("Please fill in all required fields correctly.", {
        variant: "error",
      });
      return;
    }

    const finalCheckoutData = {
      ...formData,
      travelers: travellers,
    };

    const bookingAmount = bookingData
      ? parseFloat(bookingData.booking.total_amount)
      : 0;

    if (bookingAmount === 0) {
      try {
        enqueueSnackbar("Confirming your free booking...", {
          variant: "info",
        });
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}payment/confirm-free/${bookingId}`,
          finalCheckoutData,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        if (response.data.success) {
          setSuccessMessage(
            `Booking successful! Your Booking ID is: ${bookingId}`
          );
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
              setSuccessMessage(
                `${bookingId}`
              );
              setShowSuccessPopup(true);
            } else {
              enqueueSnackbar(
                verifyResponse.data.message || "Payment verification failed.",
                { variant: "error" }
              );
            }
          } catch (error) {
            if (error.response && error.response.status === 422) {
              setErrors(error.response.data.errors);
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalPrice = bookingData
    ? parseFloat(bookingData.booking.total_amount).toFixed(2)
    : "0.00";
  const totalAdults = bookingData?.total_adults || 0;
  const totalChildren = bookingData?.total_children || 0;
  const totalInfants = bookingData?.total_infants || 0;
  const bookingItemName =
    bookingData?.booking?.package?.name ||
    bookingData?.booking?.event?.name ||
    bookingData?.booking?.attraction?.name ||
    "Your Booking";

  return (
    <>
      {showSuccessPopup && (
    <div style={popupOverlayStyle}>
  <div style={popupStyle}>
    {/* ✅ Tick Icon */}
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
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

    {/* ✅ Heading */}
    <h2 style={{ color: "#333", textAlign: "center", marginBottom: "10px" }}>
      Booking Successful!
    </h2>

    {/* ✅ Message */}
    <p style={{ fontSize: "16px", textAlign: "center", marginBottom: "12px" }}>
      Your booking has been confirmed.
    </p>

    {/* ✅ Booking ID Display */}
    <p style={{ textAlign: "center", fontWeight: 500, marginBottom: "6px" }}>
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
      }}
      title="Click to copy"
    >
      {successMessage}
    </div>

    {/* ✅ OK Button */}
    <button
      onClick={handleClosePopup}
      style={popupButtonStyle}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4a9a9c")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#5ab2b3")}
    >
      OK
    </button>
  </div>
</div>

      )}

      {/* Add the class here for the padding-bottom rule */}
      <div className={style.checkoutPageContainer}>
        <Banner />
        <div>
          <div className="">
            <div className={`${style["checkout-package-details"]} container`}>
              <div className="row pt-5">
                <div className="col-md-8">
                  <h2 className="d-flex justify-content-between fw-bolder">
                    {bookingItemName}
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
                  {/* <p style={{ fontSize: "14px", color: "black" }}>
                    Guest Signup - Tour Package Booking
                  </p> */}
                  <div className="pt-3">
                    <h1 className="ms-0 fw-bolder">Personal Information</h1>
                    <form className="col-xxl-10 col-xl-12">
                      {travellers.map((traveller, index) => (
                        <div
                          key={traveller.id}
                          className="pt-1 mb-4 border-bottom pb-3"
                        >
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <p
                              className="align-items-center fw-semibold mb-0"
                              style={{ color: "#5ab2b3" }}
                            >
                              <FaUser
                                size={23}
                                className="me-3"
                                color="#e7e7e7"
                                style={{ marginTop: "-5px" }}
                              />
                              Traveller {index + 1}
                            </p>
                            {index > 0 && (
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger d-flex align-items-center"
                                onClick={() => removeTraveller(traveller.id)}
                              >
                                <FaTrashAlt size={12} className="me-1" /> Remove
                              </button>
                            )}
                          </div>
                          <div className="col-12">
                            <input
                              className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12`}
                              placeholder="LastName (in English)*"
                              value={traveller.last_name}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "last_name",
                                  e.target.value
                                )
                              }
                            />
                            <br className="d-xl-none d-lg-block" />
                            <input
                              className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-5 col-lg-6 col-12`}
                              placeholder="First & middle name(in English)*"
                              value={traveller.first_name}
                              onChange={(e) =>
                                handleTravellerInputChange(
                                  traveller.id,
                                  "first_name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-12 pt-2">
                            <input
                              className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12`}
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
                            <br className="d-xl-none d-lg-block" />
                            <input
                              className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 col-lg-6 col-12`}
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
                          </div>
                        </div>
                      ))}

                      {/* --- MODIFIED: Conditionally render "Add" button based on limit --- */}
                      {bookingData?.type === "package" &&
                        travellers.length < totalTravellersAllowed && (
                          <div className="text-center my-3">
                            <button
                              type="button"
                              className="btn text-white"
                              style={{ backgroundColor: "#149699" }}
                              onClick={addTraveller}
                            >
                              + Add another traveller
                            </button>
                          </div>
                        )}

                      <div>
                        <h1 className="m-2 pt-2 pb-2 ms-0 fw-bolder">
                          Travel Details
                        </h1>
                        <label>Pick-up point</label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12`}
                          placeholder="Please enter pick-up point"
                          name="pick_up_point"
                          value={formData.pick_up_point}
                          onChange={handleFormChange}
                        />
                        <label className="pe-0 me-0 pt-3">
                          Special Requests
                        </label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12`}
                          placeholder="Please enter Special Requests"
                          name="special_request"
                          value={formData.special_request}
                          onChange={handleFormChange}
                        />
                        <label className="pt-2">Package Addons</label>
                        <br />
                        <input
                          className={`${style["promo_input"]} my-2 col-12`}
                          placeholder="Add travel medical insurance details if required"
                          name="add_ons"
                          value={formData.add_ons}
                          onChange={handleFormChange}
                        />
                        <h1 className="m-3 ms-0 pt-1 fw-bolder">
                          Contact Info
                        </h1>
                        <div className="d-flex flex-xl-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3">
                          <div className="col-xl-6 col-12">
                            <label className="">Contact Name*</label>
                            <br />
                            <input
                              className={`${style["promo_input"]} my-2 col-12`}
                              placeholder="Please enter contact name"
                              name="contact_name"
                              value={formData.contact_name}
                              onChange={handleFormChange}
                            />
                          </div>
                          <div className="col-xl-6 col-lg-8 col-md-12 col-12">
                            <label className="">Contact Number*</label>
                            <br />
                            <select
                              name="country_code"
                              value={formData.country_code}
                              onChange={handleFormChange}
                              className={`${style["promo_select"]} my-2`}
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
                              className={`${style["promo_input"]} my-2 ms-xl-1 ms-lg-1 ms-2`}
                              style={{ width: "240px" }}
                              placeholder="Mobile Number"
                              name="contact_number"
                              value={formData.contact_number}
                              onChange={handleFormChange}
                            />
                          </div>
                        </div>
                        <div className="my-2">
                          <label className="pe-0 me-0">Email Address*</label>
                          <br />
                          <input
                            className={`${style["promo_input"]} my-2 col-12`}
                            placeholder="All important updates will be send to this email ID"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
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
                    {totalAdults > 0 && (
                      <p className="d-flex justify-content-between text-black">
                        <span>
                          {totalAdults} Adult{totalAdults > 1 ? "s" : ""}
                        </span>
                      </p>
                    )}
                    {totalChildren > 0 && (
                      <p className="d-flex justify-content-between text-black">
                        <span>
                          {totalChildren} Child{totalChildren > 1 ? "ren" : ""}
                        </span>
                      </p>
                    )}
                    {totalInfants > 0 && (
                      <p className="d-flex justify-content-between text-black">
                        <span>
                          {totalInfants} Infant{totalInfants > 1 ? "s" : ""}
                        </span>
                      </p>
                    )}
                    <h5 className="pt-2 d-flex pb-1 justify-content-between col-11">
                      <span>
                        <b>Total</b>
                      </span>
                      <span>
                        <b>AED {totalPrice}</b>
                      </span>
                    </h5>
                  </div>
                  <span className="col-10 ps-1 pt-2 d-flex justify-content-end">
                    <button
                      onClick={handlePayNow}
                      className={style["btn-one"]}
                      disabled={!isFormValid}
                    >Pay Now
                      
                    </button>
                  </span>
                  <p className="col-lg-12 col-xl-12 col-12 pt-4 my-2">
                    By proceeding, I acknowledge that I have
                    <br className="d-lg-block d-none" /> read and agree to the
                    Company Terms & <br className="d-lg-block d-none" />{" "}
                    Conditions and Privacy Statement.
                  </p>
                  <button
                    className="bg-white col-11 d-flex justify-content-between"
                    style={{ border: "none", color: "#5ab2b3" }}
                    onClick={toggleAccordion}
                  >
                    <span className="fw-semibold">
                      Cancellation &{" "}
                      <br className="d-lg-none d-md-block d-none" /> Date
                      Change{" "}
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
                          The package price will refresh
                          <br className="d-lg-block d-none" /> After
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
              src={
                slugPackage?.[0]?.event_photo_urls?.[0] || "/images/blank.png"
              }
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
                <span className="text-white">
                  {slugPackage?.[0]?.start_date}
                </span>
              </p>
              <p className="text-black-50 ">
                Tag:{" "}
                <span className="text-white">
                  {" "}
                  {slugPackage?.[0]?.category}
                </span>
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

        {/* --- STICKY FOOTER FOR MOBILE --- */}
        <div className={style.stickyPayContainer}>
          <div className={style.priceText}>AED {totalPrice}</div>
          <button
            onClick={handlePayNow}
            style={{ backgroundColor: "#149699" }}
            disabled={!isFormValid}
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};
export default Checkout;