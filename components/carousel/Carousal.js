"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import SingleHomePackage from '../home/packages/packages';
import SingleHomeEvents from '../home/events/events';
import SingleHomeExperience from '../home/experience/experience';
import SingleHomeBlog from '../home/blog/blog';
import TabSlider from '../countries/tab-slider';
import CountryExperiance from '../countries/country-experiance';
import SingleBestPicked from '../tour-package/best-picked';
import Singlewonders from '../tour-package/wonders';
import SinglePackageContainerReview from '../tour-package-details/package-container-review';
import SinglePackageContainerReviewImage from '../tour-package-details/package-details-review';
import RatingCarousel from '../tour-package-details/RatingCarousel';
import PakageDetailsOtherPackages from '../tour-package-details/pakage-details-other-packages';
import CountryInspiration from '../countries/country-inspiration';
// Import Slick Carousel and styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeaturedTravel from '../tour-package/featured-travel';

const SlickCarousel = dynamic(() => import('react-slick'), {
    ssr: false
});

function Carousal({
    packages,
    events,
    country,
    experiences,
    blog,
    userRatingsCarosul,
    pakageDetailsOtherPackages,
    count,
    type,
    bestPicked,
    featuredTravel,
    wonders,
    packageDetailsReview,
    packageDetailsReviewImage  
}) {
    const Responsive = {
        dots: type !== 'home-package' && type !== 'home-event' && type !== 'home-experience' && type !== 'home-blog',
        infinite: true,
        speed: 500,
        slidesToShow: count,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: type !== 'home-package' && type !== 'home-event' && type !== 'home-experience' && type !== 'home-blog'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            }
        ]
    };
   
    const countryExperiance = [
        {
            id: 1,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is dummy text',
            description:
                'Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
        {
            id: 2,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is dummy text',
            description:
                'Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
        {
            id: 3,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is dummy text',
            description:
                'Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
        {
            id: 4,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is dummy text',
            description:
                'Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
        {
            id: 5,
            link: 'https://www.google.com/',
            heading: 'Lorem Ipsum is dummy text',
            description:
                'Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ',
            image: '/images/blog/01.jpg'
        },
    ];

    return (
        // <SlickCarousel {...Responsive}>
        <SlickCarousel {...Responsive} className={type === 'country-tab' ? 'custom-country-tab-class' : ''}>
            {type === 'home-package' &&
                packages.map((pkg) => (
                    <div key={pkg.id} className="home-package-item">
                        <SingleHomePackage
                            image={pkg.image}
                            heading={pkg.heading}
                            description={pkg.description}
                            location={pkg.location}
                            price={pkg.price}
                            priceOld={pkg.priceOld}
                            currency={pkg.currency}
                            link={pkg.link}
                        />
                    </div>
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
                        date={event.date}
                        description={event.description}
                        link={event.link}
                    />
                ))}
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

            {type === 'country-tab-slider' &&
                country.map((country) => (
                    <CountryInspiration
                        key={country.id}
                        image={country.image}
                        heading={country.heading}
                        description={country.description}
                        link={country.link}
                    />
                ))}
            {type === 'country-Experiance' &&
                countryExperiance.map((experiance) => (
                    <CountryExperiance
                        key={experiance.id}
                        image={experiance.image}
                        heading={experiance.heading}
                        description={experiance.description}
                        link={experiance.link}
                    />
                ))
            }

            {type === 'tour-FeaturedTravel' &&
                featuredTravel.map((featuredTravel) => (
                    <FeaturedTravel
                        key={featuredTravel.id}
                        image={featuredTravel.image}
                        heading={featuredTravel.heading}
                        description={featuredTravel.description}
                        link={featuredTravel.link}
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
                        heading={review.heading}
                        description={review.description}
                    />
                ))}
            {type === 'tour-package-details-reviews-img' &&
                packageDetailsReviewImage.map((reviewImage) => (
                    <SinglePackageContainerReviewImage
                        key={reviewImage.id}
                        image={reviewImage.image}
                        heading={reviewImage.heading}
                        description={reviewImage.description}
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
        </SlickCarousel>
    );
}

export default Carousal;