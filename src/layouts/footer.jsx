import React from 'react';
import style from "./style.module.css";

const NAV_ITEMS = [
  { label: 'Rent products', href: '/rent-products' },
  { label: 'Sale', href: '/sale' },
  { label: 'About IM Vision', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Error reporting', href: '/error-reporting' },
  { label: 'Rental conditions', href: '/rental-conditions' },
  { label: '​Work with us', href: '/​work-with-us' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' }
];

const PHONE_OPTIONS = [
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' },
  { value: 'Options', label: 'Options' }
];

const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <footer className={style['footer-container']}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 mb-4">
            <img 
              src="/assets/images/footer-logo.png"
              alt="Company Logo" 
              className={style.logo}
            />
          </div>

          {/* Contact Form Section */}
          <div className="col-md-8 mb-4">
          <h2>Get in touch today</h2>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="name"
                      className={`form-control ${style.inputField}`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className={style.inputLabel}
                    >
                      Name
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="email"
                      id="email"
                      className={`form-control ${style.inputField}`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className={style.inputLabel}
                    >
                    Email Address*
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <select
                      id="phone"
                      className={`form-control ${style.inputField}`}
                      defaultValue=""
                    >
                      <option value="" disabled>What can we help you with?</option>
                      {PHONE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="phone"
                      className={style.inputLabel}
                    >
                    What can we help you with?
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className={style.formControl}>
                    <input
                      type="text"
                      id="Company Name"
                      className={`form-control ${style.inputField}`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="Company Name"
                      className={style.inputLabel}
                    >
                      Company Name
                    </label>
                  </div>
                </div>
              </div>

              <div className={style.formControl}>
                <textarea
                  id="message"
                  rows="4"
                  className={`form-control ${style.inputField} ${style.textareaField}`}
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className={`${style.inputLabel} ${style.textareaLabel}`}
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                className={`btn ${style.submitButton}`}
              >
                <span>Lets Talk</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="col-12 mb-4">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {NAV_ITEMS.map(item => (
                  <li key={item.label} className="list-inline-item mx-3">
                    <a 
                      href={item.href}
                      className={style.navLink}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Logo */}
          <div className="col-12 text-center mb-4">
            <img
              src="/assets/images/logo-footer.png"
              alt="Footer Logo"
              className={style.footerLogo}
            />
          </div>

          {/* Legal Links */}
          <div className="col-12">
            <nav className="text-center">
              <ul className="list-inline mb-0">
                {LEGAL_LINKS.map(item => (
                  <li key={item.label} className="list-inline-item mx-3">
                    <a 
                      href={item.href}
                      className={style.legalLink}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;