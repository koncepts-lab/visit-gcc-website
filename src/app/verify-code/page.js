"use client";
import { useState } from "react";
import axios from "axios";
import style from "./style.module.css";
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';

const VerifyOtp = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const isRegister = tab === 'register';

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    setEmailError("");
    setOtpError("");
  
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isOtpValid = /^\d{6}$/.test(otp);
  
    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    if (!isOtpValid) {
      setOtpError("OTP should be exactly 6 digits.");
      return;
    }
  
    setLoading(true);
    enqueueSnackbar("Verifying OTP...", { variant: 'info' });
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}app/verify-otp-register`, {
        email: email,
        otp: otp,
      });
  
      if (response.data.success) {
        enqueueSnackbar("OTP Verified Successfully!", { variant: 'success' });
        setEmail("");
        setOtp("");

        const { token, user } = response.data;
        const authToken = token.token; 
        const userId = user.id;  
        
        localStorage.setItem("auth_token_register", authToken);

        const panNumber = localStorage.getItem('vendor_pan_number');
        
        if (panNumber) {
          const vendorResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}vendors`,
            {
              user_id: userId,
              pan_number: panNumber
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`, 
              }
            }
          );
  
          if (vendorResponse.data.success) {
            enqueueSnackbar("Vendor created successfully!", { variant: 'success' });
            localStorage.removeItem('vendor_pan_number');

          } else {
            enqueueSnackbar(vendorResponse.data.message, { variant: 'error' });
          }
        } else {
          enqueueSnackbar("PAN number not found in localStorage.", { variant: 'error' });
        }
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      if (error.response) {
        console.error("Validation Errors:", error.response.data.errors);
        enqueueSnackbar("Validation error: " + JSON.stringify(error.response.data.errors), { variant: 'error' });
      } else if (error.request) {
        console.error("Request Error: No response from server", error.request);
        enqueueSnackbar("No response from server. Please try again.", { variant: 'error' });
      } else {
        console.error("Error:", error.message);
        enqueueSnackbar("An error occurred. Please try again.", { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setOtpError("");

    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isOtpValid = /^\d{6}$/.test(otp);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isOtpValid) {
      setOtpError("OTP should be exactly 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/verify-otp-login`,
        {
          email: email,
          otp: otp,
        }
      );
      console.log("Registration Response:", response.data);


      if (response.data.success) {
        enqueueSnackbar("Logged in Successfully!", { variant: 'success' });
        setEmail("");
        setOtp("");
        localStorage.setItem("auth_token_login", response.data.token.token);
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      if (error.response) {
        console.error("Validation Errors:", error.response.data.errors);
        enqueueSnackbar("Validation error: " + JSON.stringify(error.response.data.errors), { variant: 'error' });
      } else if (error.request) {
        console.error("Request Error: No response from server", error.request);
        enqueueSnackbar("No response from server. Please try again.", { variant: 'error' });
      } else {
        console.error("Error:", error.message);
        enqueueSnackbar("An error occurred. Please try again.", { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style["otp-main"]}>
      <div className={style["otp-container"]}>
        {isRegister ? (
          <>
            <h2 className="">Verify OTP</h2>
            <form onSubmit={handleRegisterSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              {emailError && <div className={style["error-message"]}>{emailError}</div>}

              <label htmlFor="otp">Enter Registration OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                maxLength="6"
              />
              {otpError && <div className={style["error-message"]}>{otpError}</div>}

              <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              {emailError && <div className={style["error-message"]}>{emailError}</div>}

              <label htmlFor="otp">Enter Login OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
                maxLength="6"
              />
              {otpError && <div className={style["error-message"]}>{otpError}</div>}

              <button type="submit" className="btn btn-success w-100" disabled={loading}>
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
