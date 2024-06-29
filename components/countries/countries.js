import React from 'react';
import style from './style.module.css';
import SingleCountry from './single-countries';

const countriesData = [
  { id: 1, heading: 'Bahrain', image: "/images/countries/01.jpg" },
  { id: 2, heading: 'Kuwait', image: "/images/countries/02.jpg" },
  { id: 3, heading: 'Oman', image: "/images/countries/03.jpg" },
  { id: 4, heading: 'Qatar', image: "/images/countries/04.jpg" },
  { id: 5, heading: 'Saudi Arabia', image: "/images/countries/05.jpg" },
  { id: 6, heading: 'UAE', image: "/images/countries/06.jpg" },
];

const Countries = () => {
  return (
    <div className={style['home-countries']}>
      <div className='container'>
        <div className="row">
          <div className="col-md-12">
            <h3>GCC Countries</h3>
          </div>
          {countriesData.map((props) => (
            <SingleCountry key={props.id} image={props.image} heading={props.heading} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Countries;
