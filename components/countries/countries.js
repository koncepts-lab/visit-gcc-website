"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import style from "./style.module.css";

const countriesData = [
  {
    id: 6,
    link: "/country/uae",
    heading: "UAE",
    image: "/images/countries/UAE.svg",
    hoverImage: "/images/countries/UAE Mouse Over.svg",
  },
  {
    id: 5,
    link: "/country/saudi-arabia",
    heading: "Saudi Arabia",
    image: "/images/countries/Saudi.svg",
    hoverImage: "/images/countries/Saudi Mouse Over.svg",
  },
  {
    id: 4,
    link: "/country/qatar",
    heading: "Qatar",
    image: "/images/countries/Qatar.svg",
    hoverImage: "/images/countries/Qatar Mouse Over.svg",
  },
  {
    id: 3,
    link: "/country/oman",
    heading: "Oman",
    image: "/images/countries/Oman.svg",
    hoverImage: "/images/countries/Oman Mouse Over.svg",
  },
  {
    id: 2,
    link: "/country/kuwait",
    heading: "Kuwait",
    image: "/images/countries/Kuwait.svg",
    hoverImage: "/images/countries/Kuwait Mouse Over.svg",
  },
  {
    id: 1,
    link: "/country/bahrain",
    heading: "Bahrain",
    image: "/images/countries/Bahrain.svg",
    hoverImage: "/images/countries/Bahrain Mouse Over.svg",
  },
];

const Countries = () => {
  // Keep track of which country is being hovered
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div className={style["home-countries"]}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Welcome to GCC Countries</h3>
          </div>
          {countriesData.map((country) => (
            <div
              key={country.id}
              className="col-xxl-2 col-xl-2 col-lg-4 col-md-2 col-sm-2 col-6"
            >
              <Link href={country.link}>
                <div
                  className={style["country-image-container"]}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <img
                    src={
                      hoveredCountry === country.id
                        ? country.hoverImage
                        : country.image
                    }
                    alt={country.heading}
                    className={style["country-image"]}
                  />
                  <div className={style["country-name"]}>{country.heading}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
