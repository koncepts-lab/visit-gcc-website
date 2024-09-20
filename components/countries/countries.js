import React from 'react';
import style from './style.module.css';
import SingleCountry from './single-countries';

const countriesData = [
  { id: 6, link: '/country/uae', heading: 'UAE', image: "/images/countries/06.jpg" },
  { id: 5, link: '/country/saudi-arabia', heading: 'Saudi Arabia', image: "/images/countries/05.jpg" },
  { id: 4, link: '/country/qatar', heading: 'Qatar', image: "/images/countries/04.jpg" },
  { id: 3, link: '/country/oman', heading: 'Oman', image: "/images/countries/03.jpg" },
  { id: 2, link: '/country/kuwait', heading: 'Kuwait', image: "/images/countries/02.jpg" },
  { id: 1, link: '/country/bahrain', heading: 'Bahrain', image: "/images/countries/01.jpg" },
  
  
];

const Countries = () => {
  return (
    <div className={style['home-countries']}> 
      <div className='container'>
        <div className="row">
          <div className="col-md-12">
            <h3>Welcome to GCC Countries</h3>
          </div>
          {countriesData.map((props) => (
            <SingleCountry key={props.id} image={props.image} heading={props.heading} link={props.link} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Countries;
