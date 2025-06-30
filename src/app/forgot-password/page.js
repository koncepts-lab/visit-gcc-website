"use client";

import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { CheckCircle2 } from "lucide-react"; // Using CheckCircle2 for a nice checkmark
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useSearchParams } from "next/navigation";

// It's a good practice to name React components with a starting uppercase letter
const ForgotPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(""); // For email input validation error
  const [apiError, setApiError] = useState(""); // For general API errors displayed on page

  // State to control UI transformation
  const [showSuccessView, setShowSuccessView] = useState(false);
  // State to store the email for the success message
  const [submittedEmail, setSubmittedEmail] = useState("");

  // State to track if we're checking authentication
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check for auth token in localStorage
      const authToken =
        localStorage.getItem("auth_token_register") ||
        localStorage.getItem("auth_token_login");

      if (authToken) {
        // Redirect to change-password page if user is logged in
        router.push("/change-password");
        return; // Don't set isCheckingAuth to false if redirecting
      }

      setIsCheckingAuth(false);
    };

    checkAuthStatus();
  }, [router]);

  // Show loading while checking auth status
  if (isCheckingAuth) {
    return (
      <section className={styles["login_register"]}>
        <div className={`${styles.container} mx-auto text-center py-5`}>
          <div>Loading...</div>
        </div>
      </section>
    );
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError(""); // Clear previous email validation errors
    setApiError(""); // Clear previous API errors

    const isEmailValid = /\S+@\S+\.\S+/.test(email);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // IMPORTANT: Replace with your actual "forgot password" API endpoint
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/forgot-password`, // EXAMPLE ENDPOINT
        {
          email: email,
        }
      );

      if (response.status === 200 || response.status === 201) {
        router.push(
          `/verify-code?tab=reset_password&email=${encodeURIComponent(email)}`
        );
        setSubmittedEmail(email); // Store the email for the success message
        setShowSuccessView(true); // Trigger UI transformation
        enqueueSnackbar(
          response.data.message || "Password reset link sent successfully!",
          { variant: "success" }
        );
        // setEmail(""); // Optionally clear the email input, though the form will be hidden
      } else {
        // Handle non-2xx success responses that are not errors per se but indicate failure
        const message =
          response.data?.message || "Failed to send password reset link.";
        console.error(
          "Password reset link request failed (non-2xx success):",
          response.data
        );
        enqueueSnackbar(message, { variant: "error" });
        console, log(response.data);
        setApiError(message);
      }
    } catch (error) {
      console.error("Error requesting password reset link:", error);
      let message = "An error occurred. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      enqueueSnackbar(message, { variant: "error" });
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  //   if (showSuccessView) {
  //     return (
  //       <section className={styles["login_register"]}>
  //         <div className={`${styles.container} mx-auto text-center py-5`}>
  //           <TiTick size={72} className="mb-4 text-success" strokeWidth={1.5} />
  //           {/* The text "OTP" and "Password" from your image seems like context from a tabbed interface,
  //               which is not part of this component's snippet. Adding a general success title. */}
  //           {/* <div className="d-flex justify-content-between mb-3" style={{color: '#ddd', fontSize: '1.2rem'}}>
  //             <span>OTP</span>
  //             <span>Password</span>
  //           </div> */}
  //           <h2 className="fw-bold mb-3">Link Sent!</h2>
  //           <p className="text-muted fs-5 mb-4">
  //             We have sent a reset link to your email id <br />
  //             <strong>{submittedEmail}</strong>
  //           </p>
  //           <Link
  //             href="/login"
  //             style={{ color: "#006175", textDecoration: "underline" }}
  //           >
  //             Back to Login
  //           </Link>
  //         </div>
  //       </section>
  //     );
  //   }

  return (
    <section className={styles["login_register"]}>
      <div className={`${styles.container} mx-auto`}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Forgot Password</h2>
        </div>

        <form onSubmit={handleForgotSubmit}>
          <div className="mb-3">
            <label htmlFor="forgot-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="forgot-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${styles["form-control"]} ${
                emailError ? "is-invalid" : ""
              }`}
              placeholder="Enter your email"
              required
            />
            {emailError && (
              <div className="invalid-feedback d-block">{emailError}</div>
            )}
          </div>

          {apiError && (
            <div className="alert alert-danger text-center" role="alert">
              {apiError}
            </div>
          )}

          <div className="w-100 d-flex">
            <button
              type="submit"
              className={`btn btn-success ${styles["btn-custom"]}`}
              disabled={isLoading}
              style={{
                backgroundColor: "#006175",
                borderColor: "#006175", // Added border color for consistency
                width: "fit-content",
                paddingBlock: "8px",
                paddingInline: "20px",
                marginInline: "auto",
                marginTop: "16px",
              }}
            >
              {isLoading ? "Sending OTP..." : "Send Reset OTP to mail"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
