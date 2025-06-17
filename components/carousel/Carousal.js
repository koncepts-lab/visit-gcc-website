"use client";
import React from "react";
import dynamic from "next/dynamic";
import SingleHomePackage from "../home/packages/packages";
import SingleHomeEvents from "../home/events/events";
import SingleHomeExperience from "../home/experience/experience";
import SingleHomeBlog from "../home/blog/blog";
import TabSlider from "../countries/tab-slider";
import CountryExperiance from "../countries/country-experiance";
import SingleBestPicked from "../tour-package/best-picked";
import UpcomingEvents from "../tour-package/upcoming-events";
import Singlewonders from "../tour-package/wonders";
import SinglePackageContainerReview from "../tour-package-details/package-container-review";
import SinglePackageContainerReviewImage from "../tour-package-details/package-details-review";
import RatingCarousel from "../tour-package-details/RatingCarousel";
import PakageDetailsOtherPackages from "../tour-package-details/pakage-details-other-packages";
import CountryInspiration from "../countries/country-inspiration";
// Import Slick Carousel and styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeaturedTravel from "../tour-package/featured-travel";
import EventScroll from "../events/event-scroll";
import EventDetailsOtherEvents from "@components/tour-package-details/event-details-other-events";

const SlickCarousel = dynamic(() => import("react-slick"), {
  ssr: false,
});

function Carousal({
  packages,
  events,
  eventScroll,
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
  packageDetailsReviewImage,
  countryExperiance,
}) {
  const Responsive = {
    dots:
      type !== "home-package" &&
      type !== "home-event" &&
      type !== "home-experience" &&
      type !== "home-blog" &&
      type !== "upcoming-events",
    infinite: true,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:
      type !== "media-page-full-carosul" &&
      type !== "event-page-scroll" &&
      type !== "upcoming-events" &&
      type !== "pakage-details-other-packages",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots:
            type !== "home-package" &&
            type !== "home-event" &&
            type !== "home-experience" &&
            type !== "home-blog" &&
            type !== "tour-bestPicked",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show one full item
          centerMode: type === "home-experience", // Enable center mode for 'home-experience'
          centerPadding: "50px", // Show half of the second item (adjust as needed)
          slidesToScroll: 1,
          infinite: true,
          dots: false, // You can keep dots off for mobile if needed
        },
      },
    ],
  };

  // const countryExperiance = [
  //   {
  //     id: 1,
  //     link: "https://www.google.com/",
  //     heading: "Lorem Ipsum is dummy text",
  //     description:
  //       "Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ",
  //     image: "/images/blog/01.jpg",
  //   },
  //   {
  //     id: 2,
  //     link: "https://www.google.com/",
  //     heading: "Lorem Ipsum is dummy text",
  //     description:
  //       "Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ",
  //     image: "/images/blog/01.jpg",
  //   },
  //   {
  //     id: 3,
  //     link: "https://www.google.com/",
  //     heading: "Lorem Ipsum is dummy text",
  //     description:
  //       "Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ",
  //     image: "/images/blog/01.jpg",
  //   },
  //   {
  //     id: 4,
  //     link: "https://www.google.com/",
  //     heading: "Lorem Ipsum is dummy text",
  //     description:
  //       "Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ",
  //     image: "/images/blog/01.jpg",
  //   },
  //   {
  //     id: 5,
  //     link: "https://www.google.com/",
  //     heading: "Lorem Ipsum is dummy text",
  //     description:
  //       "Lorem Ipsum is dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s... ",
  //     image: "/images/blog/01.jpg",
  //   },
  // ];

  return (
    // <SlickCarousel {...Responsive}>
    <SlickCarousel
      {...Responsive}
      className={type === "country-tab" ? "custom-country-tab-class" : ""}
    >
      {type === "home-package" &&
        packages.map((pkg) => (
          <div key={pkg.id} className="home-package-item">
            <SingleHomePackage
              photo_url={pkg?.photo_urls?.[0] || ""}
              name={pkg.name}
              description={pkg.description}
              link={pkg.id.toString()}
            />
          </div>
        ))}

      {type === "home-experience" &&
        experiences.map((experience) => (
          <SingleHomeExperience
            key={experience.id}
            photo_urls={experience?.photo_urls?.[0] || ""}
            name={experience.name}
            description={experience.description}
            link={experience.id.toString()}
          />
        ))}
      {type === "home-blog" &&
        blog.map((b) => (
          <SingleHomeBlog
            key={b.uuid_id}
            image={b.main_image_url}
            heading={b.heading}
            description={b.description1}
            link={b.uuid_id}
          />
        ))}

      {type === "home-event" &&
        events.map((event) => (
          <SingleHomeEvents
            key={event.id}
            event_photo_urls={event?.event_photo_urls?.[0] || ""}
            name={event.name}
            date={event.date}
            description={event.description}
            link={event.id.toString()}
          />
        ))}
      {type === "country-tab" &&
        country.map((pkg) => (
          <TabSlider
            key={pkg.id}
            image={pkg.image}
            heading={pkg.heading}
            description={pkg.description}
            subHeading={pkg.subHeading}
          />
        ))}

      {type === "country-tab-slider" &&
        country.map((country) => (
          <CountryInspiration
            key={country.id}
            image={country.event_photo_urls[0]}
            heading={country.name}
            description={country.description}
            link={country.link}
          />
        ))}
      {type === "country-Experiance" &&
        countryExperiance.map((experiance) => (
          <CountryExperiance blogs={experiance} />
        ))}

      {type === "tour-FeaturedTravel" &&
        featuredTravel.map((featuredTravel) => (
          <FeaturedTravel
            key={featuredTravel.id}
            image={featuredTravel.photo_urls[0]}
            heading={featuredTravel.name}
            description={featuredTravel.description}
            id={featuredTravel.id}
          />
        ))}

      {type === "tour-bestPicked" &&
        bestPicked.map((bestPicked) => (
          <SingleBestPicked packages={bestPicked} key={bestPicked.id} />
        ))}

      {type === "tour-wonders" &&
        wonders.map((wonders) => (
          <Singlewonders
            key={wonders.id}
            image={wonders.photo_urls[0]}
            heading={wonders.name}
            description={wonders.description}
            link={wonders.link}
          />
        ))}
      {type === "tour-package-details-reviews" &&
        packageDetailsReview.map((review) => (
          <SinglePackageContainerReview image={review} />
        ))}
      {type === "tour-package-details-reviews-img" &&
        packageDetailsReviewImage.map((reviewImage) => (
          <SinglePackageContainerReviewImage
            key={reviewImage.id}
            image={reviewImage.image}
            heading={reviewImage.heading}
            description={reviewImage.description}
          />
        ))}

      {type === "user-ratings-carosul" &&
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

      {type === "pakage-details-other-packages" &&
        pakageDetailsOtherPackages?.map((pakageDetailsOtherPackages) => (
          <PakageDetailsOtherPackages packages={pakageDetailsOtherPackages} />
        ))}
      {type === "event-details-other-events" &&
        pakageDetailsOtherPackages?.map((pakageDetailsOtherPackages) => (
          <EventDetailsOtherEvents events={pakageDetailsOtherPackages} />
        ))}

      {type === "event-page-scroll" &&
        eventScroll.map((eventScrollData) => (
          <EventScroll
            key={eventScrollData.id}
            id={eventScrollData.id}
            image={eventScrollData.event_photo_urls[0]}
            heading={eventScrollData.name}
            description={eventScrollData.description}
          />
        ))}

      {/* {type === "upcoming-events" &&
          bestPicked.map((bestPicked) => (
            <UpcomingEvents
              key={bestPicked.id}
              image={bestPicked.image}
              heading={bestPicked.heading}
              description={bestPicked.description}
              link={bestPicked.link}
              provider = {bestPicked.provider}
              date = {bestPicked.date}
              type = {bestPicked.type}
              startDate={bestPicked.startDate} 
              startMonth={bestPicked.startMonth}
              endDate={bestPicked.endDate} 
              endMonth={bestPicked.endMonth} 
            />
          ))} */}

      {type === "past-events" &&
        wonders.map((wonders) => (
          <Singlewonders
            key={wonders.id}
            image={wonders.event_photo_urls[0]}
            heading={wonders.name}
            description={wonders.description}
            link={wonders.link}
            id={wonders.id}
          />
        ))}

      {type === "media-page-full-carosul" &&
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
