import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import style from './style.module.css';

function Header() {
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


              <li className={'nav-item dropdown'}>
                <a className={'nav-link dropdown-toggle'} href="#" role="button" data-bs-toggle="dropdown">Dropdown</a>
                <ul className={'dropdown-menu'}>
                  <li><a className={'dropdown-item'} href="#">Link</a></li>
                  <li><a className={'dropdown-item'} href="#">Another link</a></li>
                  <li><a className={'dropdown-item'} href="#">A third link</a></li>
                </ul>
              </li>



            </ul>
          </div>
        </div>
      </nav>
    </>

  )
}

export default Header
