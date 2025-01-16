'use client';

import React, { useState } from 'react';
import styles from './style.module.css';
import { Facebook, Twitter, Mail } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginRegisterTabs = () => {
  const [activeTab, setActiveTab] = useState('login');

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
          className={`flex-fill py-2 ${
            activeTab === 'login' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`flex-fill py-2 ${
            activeTab === 'register' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {/* Login Form */}
      {activeTab === 'login' && (
        <form>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
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
              <input
                type="checkbox"
                className="form-check-input"
                id="remember-me"
              />
              <label className="form-check-label" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <button className="btn btn-link p-0 text-decoration-none">
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-100 ${styles['btn-custom']}`}
          >
            Sign In
          </button>
          <SocialLoginButtons />
        </form>
      )}

      {/* Register Form */}
      {activeTab === 'register' && (
        <form>
          <div className="mb-3">
            <label htmlFor="register-name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="register-name"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="register-email"
              className={`form-control ${styles['form-control']}`}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              className={`form-control ${styles['form-control']}`}
              placeholder="Create a password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className={`form-control ${styles['form-control']}`}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="terms"
              required
            />
            <label className="form-check-label terms" htmlFor="terms">
              I agree to the <a href="#">Terms and Conditions</a>
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-success w-100 ${styles['btn-custom']}`}
          >
            Create Account
          </button>
          <SocialLoginButtons />
        </form>
      )}
    </div>
  );
};

export default LoginRegisterTabs;
