"use client";

import React from 'react';
import $ from 'jquery'; // Import jQuery
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
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
import SinglePackageContainerReviewImage from '../tour-package-details/package-details-review'; // Import the component
import RatingCarousel from '../tour-package-details/RatingCarousel';
import PakageDetailsOtherPackages from '../tour-package-details/pakage-details-other-packages';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false
});

function Carousal({
    packages,
    events,
    country,
    experiences,
    blog,
    countryExplore,
    userRatingsCarosul,
    pakageDetailsOtherPackages,
    count,
    type,
    bestPicked,
    wonders,
    packageDetailsReview,
    packageDetailsReviewImage
}) {
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

    if (typeof window !== 'undefined' && !window.$) {
        window.$ = window.jQuery = $;
    }

    const countryExperiance = [
        {
            id: 1,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is simply dummy text',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
        // More data...
    ];

    return (
        <OwlCarousel
            responsive={Responsive}
            autoplay={true}
            autoplayTimeout={3000}
            loop={true}
            slideSpeed={500}
            smartSpeed={1000}
            nav={false}
            dots={type === 'tour-bestPicked' || type === 'tour-wonders'}
        >
            {type === 'home-package' &&
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
                ))}
            {type === 'home-experience' &&
                experiences.map((experience) => (
                    <SingleHomeExperience
                        key={experience.id}
                        image={experience.image}
                        heading={experience.heading}
                        description={experience.description}
                        link={experience.link}
                    />
                ))}
            {type === 'home-blog' &&
                blog.map((b) => (
                    <SingleHomeBlog key={b.id} image={b.image} heading={b.heading} description={b.description} link={b.link} />
                ))}
            {type === 'home-event' &&
                events.map((event) => (
                    <SingleHomeEvents
                        key={event.id}
                        image={event.image}
                        heading={event.heading}
                        description={event.description}
                        link={event.link}
                    />
                ))}
            {type === 'country-tab-slider' &&
                country.map((country) => (
                    <TabSlider
                        key={country.id}
                        image={country.image}
                        heading={country.heading}
                        description={country.description}
                        link={country.link}
                    />
                ))}
            {type === 'country-experiance' &&
                countryExperiance.map((experiance) => (
                    <CountryExperiance
                        key={experiance.id}
                        image={experiance.image}
                        heading={experiance.heading}
                        description={experiance.description}
                        link={experiance.link}
                    />
                ))}
            {type === 'country-explore' &&
                countryExplore.map((countryExplore) => (
                    <CountryExplore
                        key={countryExplore.id}
                        image={countryExplore.image}
                        heading={countryExplore.heading}
                        description={countryExplore.description}
                        link={countryExplore.link}
                    />
                ))}
            {type === 'tour-bestPicked' &&
                bestPicked.map((bestPicked) => (
                    <SingleBestPicked
                        key={bestPicked.id}
                        image={bestPicked.image}
                        heading={bestPicked.heading}
                        description={bestPicked.description}
                        link={bestPicked.link}
                    />
                ))}
            {type === 'tour-wonders' &&
                wonders.map((wonders) => (
                    <Singlewonders
                        key={wonders.id}
                        image={wonders.image}
                        heading={wonders.heading}
                        description={wonders.description}
                        link={wonders.link}
                    />
                ))}
            {type === 'tour-package-details-reviews' &&
                packageDetailsReview.map((review) => (
                    <SinglePackageContainerReview
                        key={review.id}
                        image={review.image}
                        heading={review.heading} // Add missing props
                        description={review.description} // Add missing props
                    />
                ))}
            {type === 'tour-package-details-reviews-img' &&
                packageDetailsReviewImage.map((reviewImage) => (
                    <SinglePackageContainerReviewImage
                        key={reviewImage.id}
                        image={reviewImage.image} // Correct image prop
                        heading={reviewImage.heading} // Add heading prop
                        description={reviewImage.description} // Add description prop
                    />
                ))}

            {type === 'user-ratings-carosul' &&
                userRatingsCarosul.map((userRatingsCarosul) => (
                    <RatingCarousel
                        key={userRatingsCarosul.id}
                        image={userRatingsCarosul.image}
                        headingIcon={userRatingsCarosul.headingIcon}
                        heading={userRatingsCarosul.heading}
                        date={userRatingsCarosul.date}
                        description={userRatingsCarosul.description}
                        link={userRatingsCarosul.link}
                    />
                ))}

            {type === 'pakage-details-other-packages' &&
                pakageDetailsOtherPackages.map((pakageDetailsOtherPackages) => (
                    <PakageDetailsOtherPackages
                        key={pakageDetailsOtherPackages.id}
                        image={pakageDetailsOtherPackages.image}
                        headingIcon={pakageDetailsOtherPackages.headingIcon}
                        heading={pakageDetailsOtherPackages.heading}
                        date={pakageDetailsOtherPackages.date}
                        description={pakageDetailsOtherPackages.description}
                        link={pakageDetailsOtherPackages.link}
                    />
                ))}




        </OwlCarousel>
    );
}

export default Carousal;