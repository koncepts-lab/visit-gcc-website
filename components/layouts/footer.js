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
                <li><a href="/">About Us</a></li>
                <li><a href="/">Careers</a></li>
                <li><a href="/">FAQs</a></li>
                <li><a href="/">Support</a></li>
                <li><a href="/">Organize Your Trip</a></li>
                <li><a href="/">Your Visa Guide</a></li>
                <li><a href="/">GCC Event Schedule</a></li>
              </ul>
              <ul>
                <li>© 2024 Visit GCC.</li>
                <li><a href="/">Privacy</a></li>
                <li><a href="/">Security</a></li>
                <li><a href="/">Terms of Use</a></li>
              </ul>
            </div>

            <div className="col-md-2">
              <ul className='social-media'>
                <li><a href="/"><FaFacebookF /></a></li>
                <li><a href="/"><FaWhatsapp /></a></li>
                <li><a href="/"><FaInstagram /></a></li>
                <li><a href="/"><RiTwitterXFill /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
