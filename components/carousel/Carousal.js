"use client";
import React from 'react';
import $ from "jquery"; // Import jQuery
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import SingleHomePackage from '../home/packages/packages';
import SingleHomeEvents from '../home/events/events';
import SingleHomeExperience from '../home/experience/experience';
import SingleHomeBlog from '../home/blog/blog';
import TabSlider from '../countries/tab-slider';
import CountryExperiance from '../countries/country-experiance';
import CountryExplore from '../countries/countries-explore';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

function Carousal({ packages, events, country, experiences, blog, countryExplore, count, type }) {
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
            items: count,
            margin: 15
        }
    };

    if (typeof window !== "undefined" && !window.$) {
        window.$ = window.jQuery = $;
    }

    const countryExperiance = [
        { id: 1, heading: 'Desitination Heading5555', description: 'Luxury', image: "/images/blog/01.jpg" },
        { id: 2, heading: 'Desitination Heading', description: 'Culture', image: "/images/blog/02.jpg" },
        { id: 3, heading: 'Desitination Heading', description: 'Coastal Esscapes', image: "/images/blog/03.jpg" },
        { id: 4, heading: 'Desitination Heading', description: 'History', image: "/images/blog/04.jpg" },
        { id: 5, heading: 'Desitination Heading', description: 'Events', image: "/images/blog/01.jpg" },
    ];

    return (
        <OwlCarousel
            responsive={Responsive}
            autoplay={true}
            autoplayTimeout={3000}
            loop={true}
            slideSpeed={500}
            smartSpeed={1000}
            nav={true}
        >
            {type === 'home-package' && (
                packages.map((pkg) => (
                    <SingleHomePackage
                        key={pkg.id}
                        image={pkg.image}
                        heading={pkg.heading}
                        description={pkg.description}
                    />
                ))
            )}

            {type === 'home-event' && (
                events.map((evt) => (
                    <SingleHomeEvents
                        key={evt.id}
                        image={evt.image}
                        heading={evt.heading}
                        description={evt.description}
                        date={evt.date}
                    />
                ))
            )}

            {type === 'home-experience' && (
                experiences.map((exp) => (
                    <SingleHomeExperience
                        key={exp.id}
                        image={exp.image}
                        heading={exp.heading}
                        description={exp.description}
                    />
                ))
            )}

            {type === 'home-blog' && (
                blog.map((post) => (
                    <SingleHomeBlog
                        key={post.id}
                        image={post.image}
                        heading={post.heading}
                        description={post.description}
                    />
                ))
            )}

            {type === 'country-tab' && (
                country.map((pkg) => (
                    <TabSlider
                        key={pkg.id}
                        image={pkg.image}
                        heading={pkg.heading}
                        description={pkg.description}
                        subHeading={pkg.subHeading}
                    />
                ))
            )}



            {type === 'country-explore' && (
                countryExplore.map((explore) => (
                    <CountryExplore
                        key={explore.id}
                        image={explore.image}
                        heading={explore.heading}
                        description={explore.description}
                        subHeading={explore.subHeading}
                    />
                ))
            )}
            {type === 'country-experiance' && (
                countryExperiance.map((experiance) => (
                    <CountryExperiance
                        key={experiance.id}
                        image={experiance.image}
                        heading={experiance.heading}
                        description={experiance.description}
                        subHeading={experiance.subHeading}
                    />
                ))
            )}

        </OwlCarousel>
    );
}

export default Carousal;
