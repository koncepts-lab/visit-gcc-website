"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import './blog.css'
import SingleBlog from "./SingleBlog";

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
    { id: 1, heading: 'Catch live horse-powered action', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "../images/blog/01.JPG", },
    { id: 2, heading: 'Taste delicacies at Karamas hidden gems', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "../images/blog/02.JPG", },
    { id: 3, heading: 'Dine at magnificent Ramadan tents', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "../images/blog/03.JPG", },
    { id: 4, heading: 'Explore top cultural spots in the city', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "../images/blog/04.JPG", },
  ];

  if (typeof window !== "undefined" && !window.$) {
    console.log("window");
    // Client-side code
    window.$ = window.jQuery = $;
  }

  return (



    <div className='home-blog'>
      <div className='container'>
        <div className="row">
          <div className="col-md-6 pb-3">
            <h3>Blog Sphere</h3>
          </div>
          <div className="col-md-6 pb-3 text-right">
            <a href="/" className='float-right'>View All</a>
          </div>

          <OwlCarousel
            responsive={Responsive}
            autoplay={true}
            autoplayTimeout={2500}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
            loop={true} // Enable carousel loop
            slideSpeed={5000} // Adjust slide speed (milliseconds)
            smartSpeed={1000} // Adjust smart speed (milliseconds)
          >

            {packagesData.map((value,index) => (
              <SingleBlog key={index} value={value} />
            ))}
            

          </OwlCarousel>


        </div>
      </div>
    </div>

  );
}
