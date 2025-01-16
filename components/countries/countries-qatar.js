import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import style from './style.module.css'; // Import CSS module

const countriesData = [
  { id: 6, link: '/country/uae', heading: 'UAE', image: "/images/countries/06.jpg" },
  { id: 5, link: '/country/saudi-arabia', heading: 'Saudi Arabia', image: "/images/countries/05.jpg" },
  { id: 4, link: '/country/qatar', heading: 'Qatar', image: "/images/countries/04.jpg" },
  { id: 3, link: '/country/oman', heading: 'Oman', image: "/images/countries/03.jpg" },
  { id: 2, link: '/country/kuwait', heading: 'Kuwait', image: "/images/countries/02.jpg" },
  { id: 1, link: '/country/bahrain', heading: 'Bahrain', image: "/images/countries/01.jpg" },
];

const CountriesQatar = () => {
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
                  src={country.image}
                  alt={country.heading}
                  className={index === 2 ? style['highlighted-image'] : ''}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountriesQatar;
