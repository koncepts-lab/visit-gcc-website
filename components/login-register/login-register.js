"use client";

import React, { useState } from "react";
import styles from "./style.module.css";
import { Facebook, Twitter, Mail } from "lucide-react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"; // For eye icons

import { useRouter } from "next/navigation";

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Link from "next/link";
import { useSnackbar } from "notistack";

const LoginRegisterTabs = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("login");
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginEmail, setloginEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginFormError, setLoginFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // const SocialLoginButtons = () => (
  //   <div className="mt-4">
  //     <div className={`${styles['social-buttons']} mt-3`}>
  //       <button className="btn-facebook">
  //         <FaFacebook size={18} className="me-2" />
  //         Facebook
  //       </button>
  //       <button className="btn-twitter">
  //         <FaTwitter size={18} className="me-2" />
  //         Twitter
  //       </button>
  //       <button className="btn-google text-black" style={{ border: '1px black solid' }}>
  //         <FcGoogle size={18} className="me-2" />
  //         Google
  //       </button>
  //     </div>
  //   </div>
  // );

  const validatePanNumber = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validatePasswords = () => {
    const errors = { ...formErrors };

    if (!registerFormData.password) {
      errors.password = "Password is required";
    } else if (registerFormData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else {
      delete errors.password;
    }

    if (!registerFormData.password_confirmation) {
      errors.password_confirmation = "Please confirm your password";
    } else if (
      registerFormData.password !== registerFormData.password_confirmation
    ) {
      errors.password_confirmation = "Passwords do not match";
    } else {
      delete errors.password_confirmation;
    }

    setFormErrors(errors);
    return !errors.password && !errors.password_confirmation;
  };

  const validateForm = () => {
    let errors = {};
    if (!registerFormData.first_name) {
      errors.first_name = "First Name is required";
    }
    if (!registerFormData.last_name) {
      errors.last_name = "Last Name is required";
    }
    if (!registerFormData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!registerFormData.password) {
      errors.password = "Password is required";
    } else if (registerFormData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!registerFormData.password_confirmation) {
      errors.password_confirmation = "Please confirm your password";
    } else if (
      registerFormData.password !== registerFormData.password_confirmation
    ) {
      errors.password_confirmation = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isEmailValid = /\S+@\S+\.\S+/.test(loginEmail);

    if (!isEmailValid) {
      setLoginFormError("Please enter a valid email address");
      setIsLoading(false);
      return;
    } else {
      setLoginFormError("");
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/login`,
        {
          email: loginEmail,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setloginEmail("");
        // enqueueSnackbar("Login Successfull!", { variant: "success" });
      } else {
        console.error("Login failed", response.data);
        enqueueSnackbar("Login Failed!", { variant: "error" });
      }
      router.push(`/verify-code?email=${encodeURIComponent(loginEmail)}`);
    } catch (error) {
      console.error("Login error:", error);
      enqueueSnackbar("Login Failed!", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}app/register`,
        registerFormData
      );

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("Registration Successful!", { variant: "success" });

         localStorage.setItem("first_name", registerFormData.first_name);
         localStorage.setItem("last_name", registerFormData.last_name);

        setRegisterFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        router.push(
          `/verify-code?tab=register&email=${encodeURIComponent(
            registerFormData.email
          )}`
        );
        setFormErrors({});
      } else {
        console.error("Registration failed:", response.data);
        enqueueSnackbar("Registration Failed!", { variant: "error" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      enqueueSnackbar("Registration Failed!", { variant: "error" });

      if (error.response && error.response.data) {
        setFormErrors(error.response.data.errors || {});
        enqueueSnackbar("Registration Failed!", { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.container} mx-auto`}>
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome!</h2>
        <p className="text-muted">Sign in or create a new account</p>
      </div>

      <div className={`${styles["tab-buttons"]} d-flex mb-4`}>
        <button
          className={`flex-fill py-2 ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-fill py-2 ${
            activeTab === "register" ? "active" : ""
          }`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {activeTab === "login" && (
        <form onSubmit={handleLoginSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setloginEmail(e.target.value)}
              className={`form-control ${styles["form-control"]}`}
              placeholder="Enter your email"
              required
            />
            {loginFormError && (
              <div className="text-danger">{loginFormError}</div>
            )}
          </div>
          <button
            type="submit"
            className={`btn btn-success ${styles["btn-custom"]}`}
            disabled={isloading}
            style={{
              backgroundColor: " #006175",
              width: "fit-content",
              paddingBlock: "8px",
              paddingInline: "20px",
              marginInline: "auto",
              marginTop: "16px",
            }}
          >
            {isloading ? "Please wait..." : "Proceed"}
          </button>
          {/* <SocialLoginButtons /> */}
        </form>
      )}

      {activeTab === "register" && (
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="register-firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              id="register-firstname"
              className={`form-control ${styles["form-control"]}`}
              placeholder="Enter your first name"
              value={registerFormData.first_name}
              onChange={handleInputChange}
            />
            {formErrors.first_name && (
              <div className="text-danger">{formErrors.first_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="register-lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="register-lastname"
              name="last_name"
              className={`form-control ${styles["form-control"]}`}
              placeholder="Enter your last name"
              value={registerFormData.last_name}
              onChange={handleInputChange}
            />
            {formErrors.last_name && (
              <div className="text-danger">{formErrors.last_name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="register-email"
              name="email"
              className={`form-control ${styles["form-control"]}`}
              placeholder="Enter your email"
              value={registerFormData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                name="password"
                className={`form-control ${styles["form-control"]} `}
                placeholder="Password"
                value={registerFormData.password}
                onChange={handleInputChange}
                onInput={validatePasswords}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  border: "none",
                  background: "none",
                  zIndex: 10,
                  color: "black",
                }}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
            {formErrors.password && (
              <div className="text-danger">{formErrors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="register-confirm-password" className="form-label">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="register-confirm-password"
                name="password_confirmation"
                className={`form-control ${styles["form-control"]}`}
                placeholder="Confirm Password"
                value={registerFormData.password_confirmation}
                onChange={handleInputChange}
                onInput={validatePasswords}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  border: "none",
                  background: "none",
                  zIndex: 10,
                  color: "black",
                }}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>
            {formErrors.password_confirmation && (
              <div className="text-danger">
                {formErrors.password_confirmation}
              </div>
            )}
          </div>

          {registerFormData.user_type === "vendor" && (
            <div className="mb-3">
              <label htmlFor="register-pan_number" className="form-label">
                PAN Number
              </label>
              <input
                type="text"
                id="register-pan_number"
                name="pan_number"
                className={`form-control ${styles["form-control"]}`}
                placeholder="Enter PAN Number"
                value={registerFormData.pan_number}
                onChange={handleInputChange}
              />
              {formErrors.pan_number && (
                <div className="text-danger">{formErrors.pan_number}</div>
              )}
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-success ${styles["btn-custom"]}`}
            disabled={isloading}
            style={{
              backgroundColor: " #006175",
              width: "fit-content",
              paddingBlock: "8px",
              paddingInline: "20px",
              marginInline: "auto",
              marginTop: "16px",
            }}
          >
            {isloading ? "Registering..." : "Register"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegisterTabs;
