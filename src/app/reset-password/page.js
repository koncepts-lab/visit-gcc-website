// app/reset-password/page.js (or your chosen path)
"use client";

import React, { useState, useEffect, Suspense } from "react";
import styles from "./style.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"; // For eye icons
import { TiTick } from "react-icons/ti"; // For success message

// Helper component to use useSearchParams because it needs to be in a Suspense boundary
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [token, setToken] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    // Add more password complexity rules if needed (e.g., uppercase, number, special character)
    // else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    //   newErrors.password = "Password must include uppercase, number, and special character.";
    // }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password && password !== confirmPassword) {
      // Only check match if password has a value
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear previous general API errors
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/reset-password`,
        {
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }
      );

      // Assuming 2xx status codes are successful
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem("auth_token_login", response.data.token.token);
        localStorage.setItem("userId", response.data.user.id);
        router.push(`/`);
        enqueueSnackbar(
          response.data?.message || "Password has been reset successfully!",
          { variant: "success" }
        );
        setShowSuccessMessage(true);
      } else {
        // This case might not be hit if axios throws for non-2xx, but good for completeness
        const message = response.data?.message || "Failed to reset password.";
        setApiError(message);
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      console.error(
        "Error resetting password:",
        error.response?.data || error.message
      );
      let message = "An error occurred. Please try again.";
      const newFieldErrors = {};

      if (error.response?.data?.errors) {
        // Handle Laravel-style validation errors
        for (const key in error.response.data.errors) {
          newFieldErrors[key] = error.response.data.errors[key][0]; // Take the first message
        }
        setErrors((prevErrors) => ({ ...prevErrors, ...newFieldErrors }));
        message = "Please correct the errors highlighted below.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      setApiError(message); // Set general API error to be displayed
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container || ""} mx-auto`}>
      <div className="text-center mb-4">
        <h2 className="fw-bold">Reset Your Password</h2>
        <p className="text-muted">Enter your new password below.</p>
      </div>

      <form onSubmit={handleResetPasswordSubmit} noValidate>
        {" "}
        {/* noValidate to prevent browser default validation */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-medium">
            New Password
          </label>
          <div className="input-group has-validation">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear error for this field when user types
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
                // If confirm password had a mismatch error, clear it too as it might now match
                if (errors.confirmPassword === "Passwords do not match.") {
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
              }}
              className={`form-control ${styles["form-control"] || ""} ${
                errors.password ? "border-danger" : ""
              }`}
              placeholder="Enter new password"
              required
            />
            <button
              className={`btn `}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-medium">
            Confirm New Password
          </label>
          <div className="input-group has-validation">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                // Clear error for this field when user types
                if (errors.confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
              }}
              className={`form-control ${styles["form-control"] || ""} ${
                errors.confirmPassword ? "border-danger" : ""
              }`}
              placeholder="Confirm new password"
              required
            />
            <button
              className={`btn`}
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
            </button>
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
        </div>
        {/* Display general API error if it's set and not related to specific fields already shown */}
        <div className="w-100 d-flex justify-content-center mt-4">
          <button
            type="submit"
            className={`btn btn-primary ${styles["btn-custom"] || ""}`}
            disabled={isLoading}
            style={{
              backgroundColor: "#006175",
              borderColor: "#006175",
              width: "fit-content",
              minWidth: "180px", // Give button a decent minimum width
              paddingBlock: "10px",
              paddingInline: "25px",
            }}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Main page component that wraps the form in Suspense
const ResetPasswordPage = () => {
  return (
    // You might want a wrapper with some padding and max-width for the whole page
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <section className={styles["login_register"]}>
        {" "}
        {/* Your existing class */}
        <Suspense
          fallback={<div className="text-center py-5">Loading page...</div>}
        >
          <ResetPasswordForm />
        </Suspense>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
