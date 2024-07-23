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
import SingleBestPicked from '../tour-package/best-picked';
import Singlewonders from '../tour-package/wonders';
import SinglePackageContainerReview from '../tour-package-details/package-container-review';

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

function Carousal({ packages, events, country, experiences, blog, countryExplore, count, type, bestPicked, wonders, packageDetailsReview }) {
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
        { id: 1, link: 'https://www.google.com/', heading: 'Lorem Ipsum is simply dummy text', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ', image: "/images/blog/01.jpg" },
        { id: 2, link: 'https://www.google.com/', heading: 'Lorem Ipsum is simply dummy text', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ', image: "/images/blog/02.jpg" },
        { id: 3, link: 'https://www.google.com/', heading: 'Lorem Ipsum is simply dummy text', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ', image: "/images/blog/03.jpg" },
        { id: 4, link: 'https://www.google.com/', heading: 'Lorem Ipsum is simply dummy text', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ', image: "/images/blog/04.jpg" },
        { id: 5, link: 'https://www.google.com/', heading: 'Lorem Ipsum is simply dummy text', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ', image: "/images/blog/01.jpg" },
    ];

    return (
        <OwlCarousel
            responsive={Responsive}
            autoplay={true}
            autoplayTimeout={3000}
            loop={true}
            slideSpeed={500}
            smartSpeed={1000}
            nav={false} // Enable navigation
            dots={type === 'tour-bestPicked' || type === 'tour-wonders'}
        >
            {type === 'home-package' && (
                packages.map((pkg) => (
                    <SingleHomePackage
                        key={pkg.id}
                        image={pkg.image}
                        heading={pkg.heading}
                        description={pkg.description}
                        location={pkg.location}
                        price={pkg.price}
                        priceOld={pkg.priceOld}
                        currency={pkg.currency}
                        link={pkg.link}
                    />
                ))
            )}
            {type === 'home-experience' && (
                experiences.map((experience) => (
                    <SingleHomeExperience
                        key={experience.id}
                        image={experience.image}
                        heading={experience.heading}
                        description={experience.description}
                        link={experience.link}
                    />
                ))
            )}
            {type === 'home-blog' && (
                blog.map((b) => (
                    <SingleHomeBlog
                        key={b.id}
                        image={b.image}
                        heading={b.heading}
                        description={b.description}
                        link={b.link}
                    />
                ))
            )}
            {type === 'home-event' && (
                events.map((event) => (
                    <SingleHomeEvents
                        key={event.id}
                        image={event.image}
                        heading={event.heading}
                        description={event.description}
                        link={event.link}
                    />
                ))
            )}
            {type === 'country-tab-slider' && (
                country.map((country) => (
                    <TabSlider
                        key={country.id}
                        image={country.image}
                        heading={country.heading}
                        description={country.description}
                        link={country.link}
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
                        link={experiance.link}
                    />
                ))
            )}
            {type === 'country-explore' && (
                countryExplore.map((countryExplore) => (
                    <CountryExplore
                        key={countryExplore.id}
                        image={countryExplore.image}
                        heading={countryExplore.heading}
                        description={countryExplore.description}
                        link={countryExplore.link}
                    />
                ))
            )}
            {type === 'tour-bestPicked' && (
                bestPicked.map((bestPicked) => (
                    <SingleBestPicked
                        key={bestPicked.id}
                        image={bestPicked.image}
                        heading={bestPicked.heading}
                        description={bestPicked.description}
                        link={bestPicked.link}
                    />
                ))
            )}
            {type === 'tour-wonders' && (
                wonders.map((wonders) => (
                    <Singlewonders
                        key={wonders.id}
                        image={wonders.image}
                        heading={wonders.heading}
                        description={wonders.description}
                        link={wonders.link}
                    />
                ))
            )}
            {type === 'tour-package-details-reviews' && (
                packageDetailsReview.map((packageDetailsReview) => (
                    <SinglePackageContainerReview
                        key={packageDetailsReview.id}
                        image={packageDetailsReview.image}
                    />
                ))
            )}
        </OwlCarousel>
    );
}

export default Carousal;
