'use client';

import React, { useState } from 'react';
import styles from './style.module.css';
import { Facebook, Twitter, Mail } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import Link from 'next/link';

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
    password: '',
    password_confirmation: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isloading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const SocialLoginButtons = () => (
    <div className="mt-4">
      <div className={`${styles['social-buttons']} mt-3`}>
        <button className="btn-facebook">
          <Facebook size={18} className="me-2" />
          Facebook
        </button>
        <button className="btn-twitter">
          <Twitter size={18} className="me-2" />
          Twitter
        </button>
        <button className="btn-google">
          <Mail size={18} className="me-2" />
          Google
        </button>
      </div>
    </div>
  );

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
    if (!registerFormData.password) {
      errors.password = 'Password is required';
    } else if (registerFormData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (registerFormData.password !== registerFormData.password_confirmation) {
      errors.password_confirmation = 'Passwords do not match';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/app/register', registerFormData);

      if (response.status === 200 || response.status === 201) {
        // Assuming a successful response returns a 200 or 201 status
        console.log('Registration successful:', response.data);
        setRegistrationSuccess(true);
        setRegistrationError('');
        // Optionally, reset the form after successful registration
        setRegisterFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          date_of_birth: '',
          gender: '',
          user_type: '',
          password: '',
          password_confirmation: '',
        });
        setFormErrors({});
      } else {
        console.error('Registration failed:', response.data);
        setRegistrationError('Registration failed. Please try again.');
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationError('An error occurred. Please check your connection and try again.');
      setRegistrationSuccess(false);

      if (error.response && error.response.data) {
        // If the API returns validation errors, display them
        setFormErrors(error.response.data.errors || {});
        setRegistrationError(error.response.data.message || 'Registration failed.');
      }
    } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className={`${styles.container} mx-auto`}>
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Welcome!</h2>
        <p className="text-muted">Sign in or create a new account</p>
      </div>

      {/* Tab Buttons */}
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

      {/* Login Form */}
      {activeTab === 'login' && (
        <form>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">Email Address</label>
            <input
              type="email"
              id="login-email"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">Password</label>
            <input
              type="password"
              id="login-password"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember-me" />
              <label className="form-check-label" htmlFor="remember-me">Remember me</label>
            </div>
            <button className="btn btn-link p-0 text-decoration-none">Forgot password?</button>
          </div>

          <button type="submit" className={`btn btn-success w-100 ${styles['btn-custom']}`}>
            Sign In
          </button>
          <SocialLoginButtons />
        </form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <form onSubmit={handleSubmit}>
          {registrationSuccess && (
            <div className="alert alert-success" role="alert">
              Registration successful!
            </div>
          )}
          {registrationError && (
            <div className="alert alert-danger" role="alert">
              {registrationError}
            </div>
          )}
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
              className={`form-select ${styles['form-control']}`}
              value={registerFormData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formErrors.gender && <div className="text-danger">{formErrors.gender}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="register-user-type" className="form-label">User Type</label>
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

          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="register-password"
              className={`form-control ${styles['form-control']}`}
              placeholder="Create a password"
              value={registerFormData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <div className="text-danger">{formErrors.password}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="password_confirmation"
              className={`form-control ${styles['form-control']}`}
              placeholder="Confirm your password"
              value={registerFormData.password_confirmation}
              onChange={handleInputChange}
            />
            {formErrors.password_confirmation && <div className="text-danger">{formErrors.password_confirmation}</div>}
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label terms" htmlFor="terms">
              I agree to the <a href="#">Terms and Conditions</a>
            </label>
          </div>
        <button type="submit"  className={`btn btn-success w-100 ${styles['btn-custom']}`} disabled={isloading}>
            {isloading? 'Creating...': 'Create Account'}
          </button>
          <SocialLoginButtons />
        </form>
      )}
    </div>
  );
};

export default LoginRegisterTabs;
