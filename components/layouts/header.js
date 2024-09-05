import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import style from './style.module.css';
import ReactFlagsSelect from 'react-flags-select';

// Ensure that Bootstrap's JS is included
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header() {
  const [selected, setSelected] = useState("US");

  // This ensures that the Bootstrap JavaScript is loaded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light" id="navbar">
        <div className="container">
          <Link className="navbar-brand" href='/'><img src="/images/logo.svg" alt="" /></Link>

          <button className={`navbar-toggler ${style['toggle-btn']}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">

            <ul className={`navbar-nav ${style['navbar-nav-c']}`}>
              <li className="nav-item">
                <Link className={`nav-link active ${style['invest-link']}`} href='/'>INVEST IN <span>GCC</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href='/packages'><img src="/images/GCC-one-visa.png" className={style['img-top-logo']} alt="" /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href='/packages'><img src="/images/Partner.png" alt="" className={style['img-top-logo']} /></Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style['login-link']}`} href='/about'>Login/Signup</Link>
              </li>

              <li className={`nav-item dropdown ${style['dropdown-right']}`}>
                <ReactFlagsSelect
                  countries={["US", "GB", "FR", "DE", "IT"]}
                  customLabels={{ US: "", GB: "", FR: "", DE: "", IT: "" }} // Empty labels to show only flags
                  selected={selected}
                  onSelect={code => setSelected(code)}
                  placeholder="US"
                  showSelectedLabel={false} // Hide selected label
                  showOptionLabel={false} // Hide option labels
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
