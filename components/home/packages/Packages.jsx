"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './packages.css'
import SinglePackage from "./SinglePackage";

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
    items: 3,
    margin: 15
  }
}
export default function Packages() {

  const packagesData = [
    { id: 1, heading: 'Package 1', description: 'Description of package 1', image: "../images/package.jpg" },
    { id: 2, heading: 'Package 2', description: 'Description of package 2', image: "../images/package-2.jpg" },
    { id: 3, heading: 'Package 3', description: 'Description of package 3', image: "../images/package-3.jpg" },
  ];

  if (typeof window !== "undefined" && !window.$) {
    console.log("window");
    // Client-side code
    window.$ = window.jQuery = $; 
  }

  return (



    <div className='home-packages'>
        <div className='container'>
          <div className="row">
            <div className="col-md-12 pb-3">
              <h3>GCC Packages</h3>
            </div>

            <OwlCarousel
      responsive={Responsive}
      // autoplay={true} 
      autoplayTimeout={3000}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
      loop={true} // Enable carousel loop
      slideSpeed={500} // Adjust slide speed (milliseconds)
            smartSpeed={1000} // Adjust smart speed (milliseconds)
    >

{packagesData.map((props) => (
              <SinglePackage key={props.id} image={props.image} heading={props.heading} description={props.description} />
            ))}


      
      
      
    </OwlCarousel>

            
          </div>
        </div>
      </div>

  );
}
