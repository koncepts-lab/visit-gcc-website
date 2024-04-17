"use client";
import React from 'react'
import $ from "jquery"; // Import jQuer                    y
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './package-category.css'
import SinglePackageCategory from './SinglePackageCategory' ;

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });
  
  const Responsive = {
    0: { 
      items: 1,
      margin: 5
    },
    768: {
      items: 2,
      margin: 10 
    },
    1024: {
      items: 4,
      margin: 15
    }
  }
  export default function PackageCategory() {
    const packagesData = [
      { id: 1, heading: 'Dinner Cruise', image :"../images/packages-categories/01.jpg"},
      { id: 2, heading: 'Parks', image : "../images/packages-categories/02.jpg"},
      { id: 3, heading: 'Sky Adventures', image : "../images/packages-categories/03.jpg"},
      { id: 4, heading: 'Food', image :"../images/packages-categories/04.jpg"},
      { id: 5, heading: 'Safari', image : "../images/packages-categories/05.jpg"},
      { id: 5, heading: 'Events', image : "../images/packages-categories/06.jpg"},
    ];
  
    if (typeof window !== "undefined" && !window.$) {
      window.$ = window.jQuery = $; 
    }
  
    return (
  
  
  
      <div className='home-event'>
          <div className='container'>
            <div className="row">
            <div className="col-md-6 pb-3">
              <h3>Categories</h3>
            </div>
            <div className="col-md-6 pb-3 text-right">
              <a href="/" className='float-right'>View All</a>
            </div>
  
              <OwlCarousel
        responsive={Responsive}
        autoplay={true} 
        autoplayTimeout={5000}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
        loop={true} // Enable carousel loop
        slidespeed={500} // Adjust slide speed (milliseconds)
              smartspeed={1000} // Adjust smart speed (milliseconds)
      >
  
  {packagesData.map((props,index) => (
              <SinglePackageCategory key={index} image={props.image} heading={props.heading} />
            ))}

      </OwlCarousel>
  
              
            </div>
          </div>
        </div>
  
    );
  }
  
