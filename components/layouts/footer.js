import React from 'react'
import Link from 'next/link';
import { FaFacebookF, FaWhatsapp, } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-2"><Link className="navbar-brand" href='/'><img src="/images/logo.svg" alt="" /></Link></div>

            <div className="col-md-8 footer-links">
              <ul className='mb-3'>
                <li><Link href="#0">About Us</Link></li>
                <li><Link href="#0">Careers</Link></li>
                <li><Link href="#0">FAQs</Link></li>
                <li><Link href="#0">Support</Link></li>
                <li><Link href="#0">Organize Your Trip</Link></li>
                <li><Link href="#0">Your Visa Guide</Link></li>
                <li><Link href="#0">GCC Event Schedule</Link></li>
              </ul>
              <ul>
                <li>© 2024 Visit GCC.</li>
                <li><Link href="#0">Privacy</Link></li>
                <li><Link href="#0">Security</Link></li>
                <li><Link href="#0">Terms of Use</Link></li>
              </ul>
            </div>

            <div className="col-md-2">
              <ul className='social-media'>
                <li><Link href="#0"><FaFacebookF /></Link></li>
                <li><Link href="#0"><FaWhatsapp /></Link></li>
                <li><Link href="#0"><FaInstagram /></Link></li>
                <li><Link href="#0"><RiTwitterXFill /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className='mobile-footer'>
      <div className='mobile-footer-container'>
          <div>
          <img src="../images/02.png" alt="Plan Bahrain" />
        </div>
        <div>
        <img src="../images/06.png" className='rotating-image' alt="Explore Bahrain" />
        </div>
        <div>
          <img src="../images/03.png" alt="Book Bahrain" />
          
        </div>
        
        </div>
      </div>



    </>
  )
}

export default Footer
