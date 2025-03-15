'use client';

import React, { useState } from 'react';
import styles from './style.module.css';
import { Facebook, Twitter, Mail } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

const LoginRegisterTabs = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [registerFormData, setRegisterFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    user_type: '',
    pan_number: '', 
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginEmail, setloginEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginFormError, setLoginFormError] = useState('');
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

  const validateForm = () => {
    let errors = {};
    if (!registerFormData.first_name) {
      errors.first_name = 'First Name is required';
    }
    if (!registerFormData.last_name) {
      errors.last_name = 'Last Name is required';
    }
    if (!registerFormData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!registerFormData.phone) {
      errors.phone = 'Phone is required';
    }
    if (!registerFormData.date_of_birth) {
      errors.date_of_birth = 'Date of Birth is required';
    }
    if (!registerFormData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!registerFormData.user_type) {
      errors.user_type = 'User Type is required';
    }

    if (registerFormData.user_type === 'vendor' && !registerFormData.pan_number) {
      errors.pan_number = 'PAN number is required for vendors';
    } else if (registerFormData.user_type === 'vendor' && !validatePanNumber(registerFormData.pan_number)) {
      errors.pan_number = 'PAN number is invalid';
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
      setLoginFormError(''); 
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}app/login`, {
        email: loginEmail,
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Login successful', response.data);
        setloginEmail('');
        enqueueSnackbar("Login Successfull!", { variant: 'success' });

      } else {
        console.error('Login failed', response.data);
        enqueueSnackbar("Login Failed!", { variant: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      enqueueSnackbar("Login Failed!", { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      return;
    }
    if (registerFormData.user_type === 'vendor' && registerFormData.pan_number) {
      localStorage.setItem('vendor_pan_number', registerFormData.pan_number);
      console.log('PAN number saved to localStorage:', registerFormData.pan_number);  
    }

    try {
      const { pan_number, ...registrationData } = registerFormData; 

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}app/register`, registrationData);
      console.log('PAN number saved to localStorage:', registerFormData.pan_number); 

      if (response.status === 200 || response.status === 201) {
        console.log('Registration successful:', response.data);
        enqueueSnackbar("Registration Successful!", { variant: 'success' });
        setRegisterFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          date_of_birth: '',
          gender: '',
          user_type: '',
          pan_number: '',
        });

        setFormErrors({});
      } else {
        console.error('Registration failed:', response.data);
        enqueueSnackbar("Registration Failed!", { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar("Registration Failed!", { variant: 'error' });

      if (error.response && error.response.data) {
        setFormErrors(error.response.data.errors || {});
        console.log(error.response.data.message || 'Registration failed.');
        enqueueSnackbar("Registration Failed!", { variant: 'error' });
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

      <div className={`${styles['tab-buttons']} d-flex mb-4`}>
        <button
          className={`flex-fill py-2 ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`flex-fill py-2 ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">Email Address</label>
            <input
              type="email"
              id="login-email"
              value={loginEmail}
              onChange={(e) => setloginEmail(e.target.value)}
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your email"
              required
            />
            {loginFormError && <div className="text-danger">{loginFormError}</div>}
          </div>
          <button type="submit" className={`btn btn-success w-100 rounded-pill ${styles['btn-custom']}`} disabled={isloading}>
            {isloading ? 'Logging in...' : 'Sign In'}
          </button>
          {/* <SocialLoginButtons /> */}
        </form>
      )}

      {activeTab === 'register' && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="register-firstname" className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              id="register-firstname"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your first name"
              value={registerFormData.first_name}
              onChange={handleInputChange}
            />
            {formErrors.first_name && <div className="text-danger">{formErrors.first_name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-lastname" className="form-label">Last Name</label>
            <input
              type="text"
              id="register-lastname"
              name="last_name"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your last name"
              value={registerFormData.last_name}
              onChange={handleInputChange}
            />
            {formErrors.last_name && <div className="text-danger">{formErrors.last_name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">Email Address</label>
            <input
              type="email"
              id="register-email"
              name="email"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your email"
              value={registerFormData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-phone" className="form-label">Phone</label>
            <input
              type="tel"
              id="register-phone"
              name="phone"
              className={`form-control ${styles['form-control']}`}
              placeholder="Phone number"
              value={registerFormData.phone}
              onChange={handleInputChange}
            />
            {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="register-dob"
              name="date_of_birth"
              className={`form-control ${styles['form-control']}`}
              value={registerFormData.date_of_birth}
              onChange={handleInputChange}
            />
            {formErrors.date_of_birth && <div className="text-danger">{formErrors.date_of_birth}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-gender" className="form-label">Gender</label>
            <select
              id="register-gender"
              name="gender"
              className={`form-control ${styles['form-control']}`}
              value={registerFormData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formErrors.gender && <div className="text-danger">{formErrors.gender}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-user_type" className="form-label">User Type</label>
           <select
              id="register-user-type"
              name="user_type"
              className={`form-select ${styles['form-control']}`}
              value={registerFormData.user_type}
              onChange={handleInputChange}
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
            {formErrors.user_type && <div className="text-danger">{formErrors.user_type}</div>}
          </div>

          {registerFormData.user_type === 'vendor' && (
            <div className="mb-3">
              <label htmlFor="register-pan_number" className="form-label">PAN Number</label>
              <input
                type="text"
                id="register-pan_number"
                name="pan_number"
                className={`form-control ${styles['form-control']}`}
                placeholder="Enter PAN Number"
                value={registerFormData.pan_number}
                onChange={handleInputChange}
              />
              {formErrors.pan_number && <div className="text-danger">{formErrors.pan_number}</div>}
            </div>
          )}

          <button type="submit" className={`btn btn-success w-100 rounded-pill ${styles['btn-custom']}`} disabled={isloading}>
            {isloading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegisterTabs;
