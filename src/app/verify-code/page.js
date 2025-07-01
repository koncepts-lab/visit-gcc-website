"use client";
import { useState, useEffect } from "react"; // Added useEffect for initial tab setting
import axios from "axios";
import style from "./style.module.css";
import { useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const VerifyOtp = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("password"); // For login form's internal tabs
  const [currentMode, setCurrentMode] = useState("login"); // 'login', 'register', or 'reset_password'

  const emailFromQuery = searchParams.get("email") || "";
  // OTP and Password states are shared but used in mutually exclusive forms
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState(""); // Used for login password

  // New states for Reset Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Error states
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // For login password error
  const [newPasswordError, setNewPasswordError] = useState(""); // For reset new password error
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(""); // For reset confirm password error

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "register") {
      setCurrentMode("register");
    } else if (tabParam === "reset_password") {
      setCurrentMode("reset_password");
    } else {
      setCurrentMode("login");
      // Set login tab based on any sub-param or default
      const loginTabParam = searchParams.get("login_tab");
      if (loginTabParam === "otp") {
        setActiveTab("otp");
      } else {
        setActiveTab("password");
      }
    }
  }, [searchParams]);

  const commonSubmitButtonStyle = {
    backgroundColor: "#006175",
    width: "fit-content",
    paddingBlock: "8px",
    paddingInline: "20px",
    marginInline: "auto",
    marginTop: "16px",
  };

  const resendButtonStyle = {
    marginTop: "1rem",
    fontSize: "12px",
    textDecoration: "underline",
    color: "#006175",
    border: "none",
    background: "none",
  };

  const createProfile = async (token) => {
    try {
      //console.log("Creating profile with token:", token);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profiles`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error creating profile:", error);
      if (error.response) {
        //console.log("Profile creation error response:", error.response.data);
        enqueueSnackbar(
          error.response.data.message || "Failed to create profile",
          { variant: "warning" }
        );
      } else {
        //console.log("Profile creation network error");
        enqueueSnackbar("Network error while creating profile", {
          variant: "warning",
        });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    const isOtpValid = /^\d{6}$/.test(otp);
    if (!isOtpValid) {
      setOtpError("OTP should be exactly 6 digits.");
      return;
    }
    setLoading(true);
    enqueueSnackbar("Verifying OTP...", { variant: "info" });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/verify-otp-register`,
        { email: emailFromQuery, otp: otp }
      );
      if (response.data.success) {
        enqueueSnackbar("OTP Verified Successfully!", { variant: "success" });
        setOtp("");
        const { token, user } = response.data;
        localStorage.setItem("auth_token_register", token.token);
        localStorage.setItem("userId", user.id);
        window.location.href = "/";
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          error.response.data.message || "Validation error occurred.",
          { variant: "error" }
        );
      } else if (error.request) {
        enqueueSnackbar("No response from server. Please try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred. Please try again.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginResendOtp = async (e) => {
    // Renamed for clarity if you want to fix it later
    e.preventDefault();
    // This is the original "handleResendOtp" for LOGIN
    // If its current logic is to call /app/login, it might be initiating the OTP send
    setLoading(true);
    enqueueSnackbar("Requesting OTP...", { variant: "info" });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/login`, // This endpoint should ideally just send/resend OTP
        { email: emailFromQuery }
      );
      // Assuming success means OTP is sent/resent
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data.success
      ) {
        // If it directly logs in and sends token like in handleLoginSubmit, that's unusual for a resend button.
        // For now, let's assume it correctly resends OTP based on your backend logic.
        enqueueSnackbar(
          response.data.message || "OTP has been sent to your email.",
          { variant: "info" }
        );
      } else {
        enqueueSnackbar(response.data.message || "Failed to send OTP.", {
          variant: "error",
        });
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message || "Failed to send OTP.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred while sending OTP.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    setPasswordError(""); // Clear password error for login

    if (activeTab === "otp" && !/^\d{6}$/.test(otp)) {
      setOtpError("OTP should be exactly 6 digits.");
      return;
    }
    if (activeTab === "password" && !password) {
      setPasswordError("Password is required.");
      return;
    }

    setLoading(true);
    enqueueSnackbar("Logging in...", { variant: "info" });
    try {
      let response;
      if (activeTab === "otp") {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}app/verify-otp-login`,
          { email: emailFromQuery, otp: otp }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}app/verify-password-login`,
          { email: emailFromQuery, password: password }
        );
      }
      if (response.data.success) {
        enqueueSnackbar("Logged in Successfully!", { variant: "success" });
        setOtp("");
        setPassword("");

        // Store the token and user data
        const loginToken = response.data.token.token;
        localStorage.setItem("auth_token_login", loginToken);
        localStorage.setItem("userId", response.data.user.id);

        // Create profile after successful login
        await createProfile(loginToken);

        // Redirect to home page
        window.location.href = "/";
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
        if (
          activeTab === "otp" &&
          response.data.message.toLowerCase().includes("otp")
        ) {
          setOtpError(response.data.message);
        } else if (
          activeTab === "password" &&
          response.data.message.toLowerCase().includes("password")
        ) {
          setPasswordError(response.data.message);
        }
      }
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message || "Login failed.";
        enqueueSnackbar(message, { variant: "error" });
        if (activeTab === "otp" && message.toLowerCase().includes("otp")) {
          setOtpError(message);
        } else if (
          activeTab === "password" &&
          message.toLowerCase().includes("password")
        ) {
          setPasswordError(message);
        }
      } else if (error.request) {
        enqueueSnackbar("No response from server. Please try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred. Please try again.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // --- Reset Password Handlers ---
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");

    let isValid = true;
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("OTP should be exactly 6 digits.");
      isValid = false;
    }
    if (!isValid) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/verify-forgot-otp`, // ADJUST THIS ENDPOINT
        {
          email: emailFromQuery,
          otp: otp,
        }
      );

      if (response.data.success) {
        router.push(
          `/reset-password?email=${encodeURIComponent(emailFromQuery)}`
        );
        // enqueueSnackbar("Password reset successfully! Please login.", {
        //   variant: "success",
        // });
        setOtp("");
      } else {
        enqueueSnackbar(response.data.message || "Failed to reset password.", {
          variant: "error",
        });
        if (response.data.errors) {
          // Example: if backend returns specific field errors
          //console.log(response.data.errors);
          if (response.data.errors.otp)
            setOtpError(response.data.errors.otp[0]);
          if (response.data.errors.password)
            setNewPasswordError(response.data.errors.password[0]);
        } else if (
          response.data.message &&
          response.data.message.toLowerCase().includes("otp")
        ) {
          setOtpError(response.data.message);
        }
      }
    } catch (error) {
      //console.log("error", error);
      enqueueSnackbar("An error occurred. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    enqueueSnackbar("Sending OTP...", { variant: "info" });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/resend-otp-forgot-password`, // ADJUST THIS ENDPOINT
        { email: emailFromQuery }
      );
      if (response.data.success) {
        enqueueSnackbar("New OTP sent to your email!", { variant: "success" });
      } else {
        enqueueSnackbar(response.data.message || "Failed to resend OTP.", {
          variant: "error",
        });
      }
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(error.response.data.message || "Error resending OTP.", {
          variant: "error",
        });
      } else if (error.request) {
        enqueueSnackbar("No response from server. Please try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An error occurred. Please try again.", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style["otp-main"]}>
      <div className={style["otp-container"]}>
        {currentMode === "register" ? (
          <>
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted">Enter OTP sent to {emailFromQuery}</p>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="otp-register">Enter Registration OTP</label>
                <button
                  type="button" // Important to prevent form submission
                  onClick={(e) => {
                    /* Add resend OTP for register logic here if needed */
                    e.preventDefault();
                    enqueueSnackbar(
                      "Resend OTP for register - To be implemented",
                      { variant: "info" }
                    );
                  }}
                  style={resendButtonStyle}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Again"}
                </button>
              </div>
              <input
                type="text"
                id="otp-register"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                maxLength="6"
              />
              {otpError && (
                <div className={style["error-message"]}>{otpError}</div>
              )}
              <button
                type="submit"
                className="btn btn-success submit"
                disabled={loading}
                style={commonSubmitButtonStyle}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        ) : currentMode === "reset_password" ? (
          // --- Reset Password Form ---
          <>
            <div className="text-center mb-4">
              <p className="text-muted">Enter OTP sent to {emailFromQuery}</p>
            </div>
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="otp-reset">Enter OTP</label>
                <button
                  type="button"
                  onClick={handleResendResetOtp}
                  style={resendButtonStyle}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Again"}
                </button>
              </div>
              <input
                type="text"
                id="otp-reset"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                maxLength="6"
              />
              {otpError && (
                <div className={style["error-message"]}>{otpError}</div>
              )}

              <button
                type="submit"
                className="btn btn-success submit"
                style={commonSubmitButtonStyle}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        ) : (
          // --- Login Form ---
          <>
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back!</h2>
              <p className="text-muted">Sign in to your account</p>
            </div>
            <div className={`${style["tab-buttons"]} d-flex mb-4`}>
              <button
                className={`flex-fill py-2 ${
                  activeTab === "password" ? "active" : "" // Use style module for active tab
                }`}
                onClick={() => setActiveTab("password")}
              >
                Password
              </button>
              <button
                className={`flex-fill py-2 ${
                  activeTab === "otp" ? "active" : "" // Use style module for active tab
                }`}
                onClick={() => setActiveTab("otp")}
              >
                OTP
              </button>
            </div>
            <form onSubmit={handleLoginSubmit}>
              {activeTab === "otp" ? (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="otp-login">Enter Login OTP</label>
                    <button
                      type="button" // Important
                      onClick={handleLoginResendOtp} // Using the original resend for login
                      style={resendButtonStyle}
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Again"}
                    </button>
                  </div>
                  <input
                    type="text"
                    id="otp-login"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    maxLength="6"
                    required // OTP is required if this tab is active
                  />
                  {otpError && (
                    <div className={style["error-message"]}>{otpError}</div>
                  )}
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="password-login">Password</label>
                    <a href="/forgot-password" style={resendButtonStyle}>
                      {" "}
                      {/* Pass email to forgot password */}
                      Forgot Password
                    </a>
                  </div>
                  <input
                    type="password"
                    id="password-login"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  {passwordError && (
                    <div className={style["error-message"]}>
                      {passwordError}
                    </div>
                  )}
                </>
              )}
              <button
                type="submit"
                className="btn btn-success submit"
                style={commonSubmitButtonStyle}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
