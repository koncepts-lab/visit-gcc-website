"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "./style.module.css";
import { useSnackbar } from 'notistack';

function Page() {
  const [userId, setUserId] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // Validate PAN number (simple regex for Indian PAN card format)
  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format like ABCDE1234F
    return panRegex.test(pan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormErrors("");
    console.log("Form submitted with User ID:", userId, "and PAN:", panNumber);

    // Basic validation
    if (!userId || !panNumber) {
      setFormErrors("Both fields are required.");
      console.log("Error: Both fields are required.");
      return;
    }

    if (!validatePanNumber(panNumber)) {
      setFormErrors("Please enter a valid PAN number.");
      console.log("Error: Invalid PAN number format.");
      return;
    }

    // API call
    try {
      setIsLoading(true);
      console.log("Sending API request...");

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}vendors`, {
        user_id: userId,
        pan_number: panNumber,
      });

      // Log the successful response from the API
      console.log("API Response:", response.data);

      // Handle success
      enqueueSnackbar('Form submitted successfully!', { variant: 'success' });
      console.log("Form submission success");

      // Reset form
      setUserId("");
      setPanNumber("");
    } catch (error) {
      // Log the error response
      console.error("API Error:", error);

      setFormErrors("An error occurred while submitting the form. Please try again.");
      enqueueSnackbar('Error submitting form', { variant: 'error' });
    } finally {
      setIsLoading(false);
      console.log("Form submission completed.");
    }
  };

  return (
    <div className={styles["otp-main"]}>
      <div className={styles["otp-container"]}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="user-id" className="form-label">User ID</label>
          <input
            type="text"
            id="user-id"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={`form-control ${styles['form-control']}`}
            placeholder="Enter your User ID"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pan-number" className="form-label">PAN Number</label>
          <input
            type="text"
            id="pan-number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className={`form-control ${styles['form-control']}`}
            placeholder="Enter PAN Number"
            required
          />
          {formErrors && <div className="text-danger">{formErrors}</div>}
        </div>

        <button
          type="submit"
          className={`btn btn-success w-100 rounded-pill ${styles['btn-custom']}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
}

export default Page;
