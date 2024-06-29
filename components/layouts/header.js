import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import style from './style.module.css';
import ReactFlagsSelect from 'react-flags-select';

function Header() {
  const [selected, setSelected] = useState("US");

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light" id="navbar">
        <div className="container">
          <Link className="navbar-brand" href='/'><img src="/images/logo.svg" alt="" /></Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link active ${style['invest-link']}`} href='/'>INVEST IN <span>GCC</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href='/packages'><img src="/images/GCC-one-visa.png" alt="" /></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href='/packages'><img src="/images/Partner.png" alt="" /></Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${style['login-link']}`} href='/about'>Login/Signup</Link>
              </li>

              <li className="nav-item dropdown">
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
