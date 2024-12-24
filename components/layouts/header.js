import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import style from "./style.module.css";    
import ReactFlagsSelect from "react-flags-select";

function Header() {
  const [selected, setSelected] = useState("US");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Initialize Bootstrap JS
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }

    // Scroll handler
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.headerWrapper}>
      <nav 
        className={`navbar navbar-expand-sm navbar-light ${style.navbar} ${
          scrolled ? style.scrolled : ""
        }`}
        id="navbar"
      >
        <div className="container">
          <Link className="navbar-brand" href="/">
            <img src="/images/logo.svg" alt="" />
          </Link>

          <button
            className={`navbar-toggler ${style["toggle-btn"]}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapsibleNavbar"
          >
            <ul className={`navbar-nav ${style["navbar-nav-c"]}`}>
              <li className="nav-item">
                <Link
                  className={`nav-link active ${style["invest-link"]}`}
                  href="/"
                >
                  INVEST IN <span>GCC</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/packages">
                  <img
                    src="/images/GCC-one-visa.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/packages">
                  <img
                    src="/images/Partner.png"
                    alt=""
                    className={style["img-top-logo"]}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${style["login-link"]}`}
                  href="/about"
                >
                  Login/Signup
                </Link>
              </li>

              <li
                className={`nav-item dropdown ${style["dropdown-right"]} ${style["view-pc"]}`}
              >
                <ReactFlagsSelect
                  countries={["US", "GB", "FR", "DE", "IT"]}
                  customLabels={{ US: "", GB: "", FR: "", DE: "", IT: "" }}
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  placeholder="US"
                  showSelectedLabel={false}
                  showOptionLabel={false}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className={`nav-item dropdown ${style["dropdown-right"]} ${style["view-mobile"]}`}
      >
        <ReactFlagsSelect
          countries={["US", "GB", "FR", "DE", "IT"]}
          customLabels={{ US: "", GB: "", FR: "", DE: "", IT: "" }}
          selected={selected}
          onSelect={(code) => setSelected(code)}
          placeholder="US"
          showSelectedLabel={false}
          showOptionLabel={false}
          className={style["custom-flag-select"]}
        />
      </div>
    </div>
  );
}

export default Header;