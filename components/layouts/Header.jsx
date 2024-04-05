import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

function Header() {
  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light"  id="navbar">
  <div className="container">
        <Link className="navbar-brand" href='/'><img src="/logo.svg" alt="" /></Link>
        
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link active" href='/about'>Visit GCC</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" href='/about'>Organize Your Trip</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" href='/about'>Your Visa Guide</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" href='/about'>GCC Event Schedule</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" href='/about'>Updates</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link top-btn" href='/about'>Account</Link>
        </li>
        

        
      </ul>
    </div>
  </div>
</nav>
    </>
    
  )
}

export default Header
