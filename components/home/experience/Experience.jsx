"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './experience.css'
import SingleExperience from "./SingleExperience";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Responsive = {
  0: { 
    items: 1,
    margin: 5
  },
  768: {
    items: 4,
    margin: 10 
  },
  1024: {
    items: 4,
    margin: 20
  }
}
export default function Events() {
  const packagesData = [
    { id: 1, heading: 'Lorem Ipsum is simply dummy text',  image :"../images/experience/01.jpg",},
    { id: 2, heading: 'Lorem Ipsum is simply dummy text', image : "../images/experience/02.jpg",},
    { id: 3, heading: 'Lorem Ipsum is simply dummy text', image : "../images/experience/03.jpg",},
    { id: 4, heading: 'Lorem Ipsum is simply dummy text', image : "../images/experience/04.jpg",},
  ];

  if (typeof window !== "undefined" && !window.$) {
    console.log("window");
    // Client-side code
    window.$ = window.jQuery = $; 
  }

  return (



    <div className='home-experience'>
        <div className='container'>
          <div className="row">
          <div className="col-md-6 pb-3">
          <h3>What to experience</h3>
          </div>
          <div className="col-md-6 pb-3 text-right">
            <a href="/" className='float-right'>View All</a>
          </div>

            <OwlCarousel
      responsive={Responsive}
      autoplay={true} 
      autoplayTimeout={2500}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
      loop={true} // Enable carousel loop
      slideSpeed={500} // Adjust slide speed (milliseconds)
            smartSpeed={1000} // Adjust smart speed (milliseconds)
    >

{packagesData.map((props) => (
            <SingleExperience key={props.id} image={props.image} date={props.date} heading={props.heading} description={props.description} />
          ))}


      
      
      
    </OwlCarousel>

            
          </div>
        </div>
      </div>

  );
}
