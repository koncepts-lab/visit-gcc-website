import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import './countries.css';
import SingleCountry from './SingleCountry';
 
const Countries = () => {

  const countriesData = [
    { id: 1, heading: 'Bahrain', image :"../images/countries/01.jpg" },
    { id: 2, heading: 'Kuwait', image : "../images/countries/02.jpg"},
    { id: 3, heading: 'Oman', image : "../images/countries/03.jpg" },
    { id: 4, heading: 'Qatar', image : "../images/countries/04.jpg" },
    { id: 5, heading: 'Saudi Arabia', image : "../images/countries/05.jpg" },
    { id: 6, heading: 'UAE', image : "../images/countries/06.jpg" },
  ];

  return (
    <div className='home-countries'>
      <div className='container'>
        <div className="row">
          <div className="col-md-12 pb-3">
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
