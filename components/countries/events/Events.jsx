"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './events.css'
import SingleEvents from "./SingleEvents";
import { useState } from "react";

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
  const[content,setContent]=useState(1)

  const handleDataFromChild = (data) => {
    setContent(data);
 
  };

 
  const packagesData = [
    { id: 1, heading: 'Event 1',  image: "../images/events.jpg", content:"content1" ,description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis perferendis ex repellendus.",description2:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis perferendis "},
    { id: 2, heading: 'Event 2',  image: "../images/event2.jpg" ,content:"content2",description:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis perferendis ex repellendus.",description2:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis perferendis ex "},
    { id: 3, heading: 'Event 3',  image: "../images/event3.jpg" ,content:"content3",description:" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis perferendis ex repellendus.",description2:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae aut deserunt hic, assumenda deleniti velit nam nihil dolor sit itaque voluptates! Laudantium praesentium perspiciatis facere numquam facilis"},

  ];

  // if (typeof window !== "undefined" && !window.$) {
  //   console.log("window");
  //   // Client-side code
  //   window.$ = window.jQuery = $; 
  // }

  return (



    <div className='home-packages'>
        <div className='container'>
          <div className="row">
            <div className="col-md-12 pb-3">
              <h3>Explore Events</h3>
            </div>

            <OwlCarousel
      responsive={Responsive}
      autoplay={true} 
      autoplayTimeout={3000}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
      loop={true} // Enable carousel loop
      slideSpeed={500} // Adjust slide speed (milliseconds)
            smartSpeed={1000} // Adjust smart speed (milliseconds)
    >

{packagesData.map((props) => (
    <SingleEvents
     sendDataToParent={handleDataFromChild}
      key={props.id}
      id={props.id}
      image={props.image}
      heading={props.heading}
      description={props.description}
    />
  ))}
      
      
      
    </OwlCarousel>

            
          </div>
          
        </div>

        <div className="Event-des">

            <div className="container">
              
              <div className="row">

                <div className="col-md-6">

                   
                      <img src={packagesData[content-1].image}/>

                </div>

                <div className="col-md-6"> 

                    <h3>{packagesData[content-1].heading}</h3>
                    <p>{packagesData[content-1].description}</p>
                    <p>{packagesData[content-1].description2}</p>
                   
                </div>

              </div>

            </div>

        </div>
        
      </div>

  );
}
