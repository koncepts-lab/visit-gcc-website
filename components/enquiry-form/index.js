import React, { useEffect, useState } from "react";
import style from "./style.module.css";

export default function EnquiryForm({ isOpen, onClose }) {
  const [countryCodes, setCountryCodes] = useState([]);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    destination: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Fetch country codes
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const codes = data
          .map((country) => ({
            name: country.name.common,
            code: country.idd?.root
              ? `${country.idd.root}${
                  country.idd.suffixes ? country.idd.suffixes[0] : ""
                }`
              : null,
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountryCodes(codes);
        if (codes.length > 0) {
          setFormData((prev) => ({ ...prev, countryCode: codes[0].code }));
        }
      })
      .catch((err) => console.error("Failed to fetch country codes:", err));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate phone number (basic validation)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{7,15}$/; // Basic regex for 7-15 digits
    return phoneRegex.test(phone);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Validate required fields
    if (!formData.lastName || !formData.firstName || !formData.email) {
      setSubmitMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Validate phone number if provided
    if (formData.phoneNumber && !validatePhoneNumber(formData.phoneNumber)) {
      setSubmitMessage("Please enter a valid phone number (7-15 digits).");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send form data to the Next.js API route
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Log the raw response for debugging
      const text = await response.text();
      console.log("Raw response:", text);

      // Try to parse JSON, fallback if invalid
      let result;
      try {
        result = text ? JSON.parse(text) : { message: "No response body" };
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        result = { message: "Server returned invalid response" };
      }

      if (response.ok) {
        setSubmitMessage(
          "Enquiry submitted successfully! We will contact you soon."
        );
        setFormData({
          lastName: "",
          firstName: "",
          email: "",
          countryCode: countryCodes[0]?.code || "",
          phoneNumber: "",
          destination: "",
          country: "",
        });
      } else {
        setSubmitMessage(
          result.message || "Failed to submit enquiry. Please try again later."
        );
      }
    } catch (error) {
      console.error("Failed to submit enquiry:", error);
      setSubmitMessage("Failed to submit enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className="fw-bold">Traveller Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className={`${style["Enquiry-div"]}`}>
              <input
                className={`${style["promo_input"]} col-xl-6 col-12`}
                placeholder="Last name (in English)*"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <br className="d-xl-none d-lg-block" />
              <input
                className={`${style["promo_input"]} col-xl-6`}
                placeholder="First and Middle name (in English)*"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <br />
            </div>
            <div className={`${style["Enquiry-div"]}`}>
              <div className="col-xl-6 col-12">
                <label>Email Address</label>
                <input
                  className={`${style["promo_input"]} col-12 `}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <br className="d-xl-none d-lg-block" />
              <div className="col-xl-6 col-12">
                <label>Contact Number</label>
                <div className="d-flex">
                  <select
                    className={`${style["promo_select"]} col-3 `}
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                  >
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.code} ({country.name})
                      </option>
                    ))}
                  </select>
                  <input
                    className={`${style["promo_input"]} col-9`}
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={`${style["Enquiry-div"]}`}>
              <div className="col-xl-6 col-12">
                <label>Destination</label>
                <input
                  className={`${style["promo_input"]} col-12 `}
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
              </div>
              <br className="d-xl-none d-lg-block" />
              <div className="col-xl-6 col-12">
                <label>Country</label>
                <input
                  className={`${style["promo_input"]} col-12 `}
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12 pt-3">
              <button
                type="submit"
                className={style["submitButton"]}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
            {submitMessage && (
              <div className="col-12 pt-3 text-center">
                <p
                  style={{
                    color: submitMessage.includes("successfully")
                      ? "green"
                      : "red",
                  }}
                >
                  {submitMessage}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
