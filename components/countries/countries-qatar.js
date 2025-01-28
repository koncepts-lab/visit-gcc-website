'use client'; // Add this directive to make the component a Client Component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import style from './style.module.css'; // Import CSS module

const countriesData = [
  { id: 6, link: '/country/uae', heading: 'UAE', image: "/images/countries/06.jpg", activeImage: "/images/countries/04.jpg" },
  { id: 5, link: '/country/saudi-arabia', heading: 'Saudi Arabia', image: "/images/countries/05.jpg", activeImage: "/images/countries/04.jpg" },
  { id: 4, link: '/country/qatar', heading: 'Qatar', image: "/images/countries/04.jpg", activeImage: "/images/countries/04-active.jpg" },
  { id: 3, link: '/country/oman', heading: 'Oman', image: "/images/countries/03.jpg", activeImage: "/images/countries/03.jpg" },
  { id: 2, link: '/country/kuwait', heading: 'Kuwait', image: "/images/countries/02.jpg", activeImage: "/images/countries/04.jpg" },
  { id: 1, link: '/country/bahrain', heading: 'Bahrain', image: "/images/countries/01.jpg", activeImage: "/images/countries/05.jpg" },
];

const CountriesBahrain = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className={style['home-countries']}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 style={{ color: 'white' }}>Welcome to GCC Countries</h3>
          </div>
          {countriesData.map((country, index) => (
            <div
              key={country.id}
              className="col-xxl-2 col-xl-2 col-lg-4 col-md-2 col-sm-2 col-6"
            >
              <Link href={country.link}>
                <img
                  src={pathname === country.link ? country.activeImage : country.image} // Dynamically change the image
                  alt={country.heading}
                  className={`${index === 5 ? style['highlighted-image'] : ''}`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountriesBahrain;
