"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Using lucide-react for clean icons
import style from "./style.module.css"; // We'll use a CSS module for cleaner styling

const Footer = () => {
  // Data for the links to make the code cleaner
  const quickLinks = [
    { href: "/country/uae", text: "UAE" },
    { href: "/country/saudi-arabia", text: "Saudi Arabia" },
    { href: "/country/qatar", text: "Qatar" },
    { href: "/country/oman", text: "Oman" },
    { href: "/country/kuwait", text: "Kuwait" },
    { href: "/country/bahrain", text: "Bahrain" },
    { href: "/one-visa", text: "One visa" },
    { href: "/events", text: "Events" },
    { href: "/attractions", text: "Attractions" },
  ];

  const visitGccLinks = [
    { href: "/about-us", text: "About Us" },
    { href: "/support", text: "Support" },
    { href: "/partner-with-us", text: "Partner with us" },
    { href: "/terms-of-use", text: "Terms of Use" },
    { href: "/privacy-policy", text: "Privacy" },
    { href: "/security", text: "Security" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <Facebook size={20} /> },
    { href: "https://instagram.com", icon: <Instagram size={20} /> },
    { href: "https://twitter.com", icon: <Twitter size={20} /> },
  ];

  return (
    <>
      <footer className={style.footer}>
        <div className={`container ${style.footerContainer}`}>
          {/* Column 1: Logo */}
          <div className={style.logoColumn}>
            <Link href="/">
              <img
                src="/images/logo.svg"
                alt="Visit GCC Logo"
                className={style.footerLogo}
              />
            </Link>
          </div>

          {/* Column 2: Links */}
          <div className={style.linksColumn}>
            <div className={style.linkGroup}>
              <h6 className={style.linkHeader}>Quick links</h6>
              <div className={style.linkList}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className={style.footerLink}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className={`${style.linkGroup} ${style.marginTopMobile}`}>
              <h6 className={style.linkHeader}>Visitgcc</h6>
              <div className={style.linkList}>
                {visitGccLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className={style.footerLink}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div className={style.socialColumn}>
            <div className={style.socialIcons}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={style.socialIconLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className="mobile-footer">
        <div className="mobile-footer-container">
          <Link href={"/invest-in-gcc"}>
            <img src="../images/inv-gcc.svg" height={40} alt="Plan Bahrain" />
          </Link>
          <Link href="/one-visa">
            <img
              src="../images/one-visa.svg"
              height={40}
              className="rotating-image"
              max-width={"50px"}
              alt="Explore Bahrain"
            />
          </Link>
          <Link href={"/"}>
            <img src="../images/gcc-stays.svg" height={40} alt="Book Bahrain" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
