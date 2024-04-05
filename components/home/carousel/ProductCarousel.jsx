"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Responsive = {
  0: { 
    items: 1.5,
    margin: 5
  },
  768: {
    items: 2.5,
    margin: 10
  },
  1024: {
    items: 3.5,
    margin: 20
  }
}

export default function ProductCarousel() {
  if (typeof window !== "undefined" && !window.$) {
    console.log("window");
    // Client-side code
    window.$ = window.jQuery = $; 
  }

  return (
    <OwlCarousel
      responsive={Responsive}
      autoplay={true} 
      autoplayTimeout={3000}  // Change autoplay timeout to 3000 milliseconds (3 seconds)
      loop={true} // Enable carousel loop
    >
      <div className="item">
        <h4>1</h4>
      </div>
      <div className="item">
        <h4>2</h4>
      </div>
      <div className="item">
        <h4>3</h4>
      </div>
      <div className="item">
        <h4>4</h4>
      </div>
      <div className="item">
        <h4>5</h4>
      </div>
      <div className="item">
        <h4>6</h4>
      </div>
      
    </OwlCarousel>
  );
}
