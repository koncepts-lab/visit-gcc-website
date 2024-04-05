"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './events.css'
import SingleEvents from "./SingleEvents";

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
    margin: 20
  }
}
export default function Events() {
  const packagesData = [
    { id: 1, heading: 'Package 1',  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image :"../images/events/01.JPG", date: 'March 8' },
    { id: 2, heading: 'Package 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' ,image : "../images/events/02.JPG", date: '09 April'},
    { id: 3, heading: 'Package 3', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image : "../images/events/03.JPG", date: '13 April' },
  ];

  if (typeof window !== "undefined" && !window.$) {
    console.log("window");
    // Client-side code
    window.$ = window.jQuery = $; 
  }

  return (



    <div className='home-event'>
        <div className='container'>
          <div className="row">
          <div className="col-md-6 pb-3">
            <h3>Upcoming events in April</h3>
          </div>
          <div className="col-md-6 pb-3 text-right">
            <a href="/" className='float-right'>View All</a>
          </div>

            <OwlCarousel
      responsive={Responsive}
      autoplay={true} 
      autoplayTimeout={5000}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
      loop={true} // Enable carousel loop
      slideSpeed={500} // Adjust slide speed (milliseconds)
            smartSpeed={1000} // Adjust smart speed (milliseconds)
    >

{packagesData.map((props) => (
            <SingleEvents key={props.id} image={props.image} date={props.date} heading={props.heading} description={props.description} />
          ))}


      
      
      
    </OwlCarousel>

            
          </div>
        </div>
      </div>

  );
}
