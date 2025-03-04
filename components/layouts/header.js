import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import style from "./style.module.css";
// import ReactFlagsSelect from "react-flags-select";
import { CgProfile } from "react-icons/cg";

function Header() {
  const [selected, setSelected] = useState("US");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    // Initialize Bootstrap JS
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollPos > lastScrollPos && currentScrollPos > 100) {
        // Scrolling down
        setHideOnScroll(true);
      } else {
        // Scrolling up
        setHideOnScroll(false);
      }

      setLastScrollPos(currentScrollPos);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPos]);

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);

    if (newState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <div
      className={`${style.headerWrapper} ${hideOnScroll ? style.hidden : ""}`}
    >
      <nav
        className={`navbar navbar-expand-sm navbar-light ${style.navbar} ${
          scrolled ? style.scrolled : ""
        }`}
        id="navbar"
      >
        <div className="container position-relative">
          {/*only mobile stiky */}
          <div className={style["navbar_sticky_mobile_container"]}>
            <div className={`nav-item ${style["navbar_sticky_mobile"]}`}>
              <Link className="nav-link active" href="/country">
                <img
                  src="../images/01.png"
                  className={style["img-top-logo"]}
                  alt=""
                />
                Explore
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]}`}>
              <Link className="nav-link active" href="/">
                <img
                  src="../images/02.png"
                  className={style["img-top-logo"]}
                  alt=""
                />
                Plan
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]}`}>
              <Link className="nav-link active" href="/">
                <img
                  src="../images/03.png"
                  className={style["img-top-logo"]}
                  alt=""
                />
                Book
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]}`}>
              <Link className="nav-link active" href="/">
                <img
                  src="../images/04.png"
                  className={style["img-top-logo"]}
                  alt=""
                />
                Experience
              </Link>
            </div>
          </div>
          {/*only mobile stiky */}

          <Link className={`navbar-brand ${style["navbar_logo"]}`} href="/">
            <img src="/images/logo.svg" alt="" />
          </Link>

          <button
            className={`navbar-toggler ${style["toggle-btn"]}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <span className={style["close-icon"]}>×</span> // Close icon
            ) : (
              <span className="navbar-toggler-icon"></span> // Default icon
            )}
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${
              style["stiky_time"]
            } ${menuOpen ? "show" : ""}`}
            id="collapsibleNavbar"
          >
            <ul
              className={`navbar-nav ${style["navbar-nav-c"]} position-absolute top-0 start-0 bg-white vh-100 w-100 p-0 d-sm-none`}
              style={{
                alignItems: "initial",
                justifyContent: "start",
                marginTop: "-8px",
              }}
            >
              {/* Header Section */}
              <li
                className="py-4 px-2 d-flex align-items-center justify-content-between text-white w-100"
                style={{ backgroundColor: "#169496" }}
              >
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <img
                    src="/images/icons/placeholder.jpg"
                    alt="User"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <div className="fw-bold">Login/Sign-up now</div>
                    <div className="small">Login for best deals & offers</div>
                  </div>
                </div>
                <button
                  className="btn text-white p-0"
                  style={{ fontSize: "2rem" }}
                  onClick={toggleMenu}
                >
                  ×
                </button>
              </li>

              {/* Settings Header */}
              <li className="mb-0 px-2 pt-2 border-bottom">
                <h6
                  className="mb-0  pb-2 fw-bold"
                  style={{
                    display: "inline-block",
                    borderBottom: "3px solid #169496",
                  }}
                >
                  Settings
                </h6>
              </li>

              {/* Menu Items */}
              {["Country", "Contact Support", "Help Center"].map(
                (item, index) => (
                  <li key={index} className="mb-0 px-2 py-3 border-bottom">
                    <a
                      href="#"
                      className="d-flex justify-content-between text-dark text-decoration-none"
                    >
                      {item}
                      <span>&gt;</span>
                    </a>
                  </li>
                )
              )}
              <li className="mb-0 px-2  py-3 border-bottom">
                <img src="/images/Partner.png" alt="Partner with us" />
              </li>
              {/* Social Footer */}
              <li className="mb-0 px-2  py-3 d-flex justify-content-between border-bottom">
                <div className="mb-2">Show us love & Follow</div>
                <div className="d-flex gap-2">
                  {["linkedin", "facebook", "apple", "google", "x"].map(
                    (icon, i) => (
                      <a href="#" key={i}>
                        <img
                          src={`/images/icons/${icon}.png`}
                          alt={icon}
                          style={{ width: "28px", height: "28px" }}
                          className="rounded-circle border p-1"
                        />
                      </a>
                    )
                  )}
                </div>
              </li>
            </ul>
            <ul className={`navbar-nav ${style["navbar-nav-c"]}`}>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/country">
                  <img
                    src="../images/01.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                  Explore
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/02.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                  Plan
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/03.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                  Book
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/04.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                  Experience
                </Link>
              </li>

              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link className="nav-link active" href="invest-in-gcc">
                  <img
                    src="/images/inv-gcc.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link className="nav-link" href="/">
                  <img
                    src="/images/GCC-one-visa.png"
                    className={style["img-top-logo"]}
                    alt=""
                  />
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link className="nav-link" href="/partner-with-us">
                  <img
                    src="/images/Partner.png"
                    alt=""
                    className={style["img-top-logo"]}
                  />
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link
                  className={`nav-link ${style["login-link"]}`}
                  href="/login"
                >
                  Login/Signup
                </Link>
              </li>

              {/* <li
    className={`nav-item dropdown ${style["dropdown-right"]} ${style["view-pc"]} ${style["navbar_sticky_hide"]}`}
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
  </li> */}
            </ul>
          </div>

          <div className={`nav-item ${style["navbar_sticky"]}`}>
            <Link
              className={`nav-link ${style["login_profile"]}`}
              href="/login"
            >
              <CgProfile /> <span>Leonardo DiCaprio</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* <div
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
      </div> */}
    </div>
  );
}

export default Header;
