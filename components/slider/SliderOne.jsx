"use client";
import React from "react";
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import SingleCategories from "../packages/categories/SingleCategories";
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
    margin: 15
  }
}
function SliderOne({ values, speed }) {
  return (
    <>

<OwlCarousel
  responsive={Responsive}
  autoplay={true}
  autoplayTimeout={speed}
  loop={true}
  slidespeed={6000} // Correct prop name: slideSpeed
  smartspeed={2000} 
>
  {values.map((value, index) => (
    <SingleCategories key={value.id} value={value} />
  ))}
</OwlCarousel>
    </>
  )
}

export default SliderOne
