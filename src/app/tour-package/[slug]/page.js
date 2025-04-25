"use client";
import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from "@components/carousel/Carousal";
import { RiBusFill } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { IoIosCar } from "react-icons/io";
import { GiHotMeal } from "react-icons/gi";
import { LiaBinocularsSolid } from "react-icons/lia";
import { PiMountains } from "react-icons/pi";
import { GiMountainClimbing } from "react-icons/gi";
import { IoMdHeart } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import HighlightTab from "@components/tour-package-details/highlight-tab";
import PackageInclusions from "@components/tour-package-details/package-inclusions";
import PackageExclusions from "@components/tour-package-details/package-exclusions";
import { IoIosStar } from "react-icons/io";
import StarRatingBar from "@components/tour-package-details/StarRatingBar";
import EnhancedDatePicker from "./date";
import { IoLocationSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GiCruiser } from "react-icons/gi";
import { FaFerry } from "react-icons/fa6";
import { IoIosAirplane, IoIosCloudyNight } from "react-icons/io";
import { FaTrain } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { TbView360Number } from "react-icons/tb";
import { FaBridge } from "react-icons/fa6";
import { FaToiletsPortable } from "react-icons/fa6";
import { FaBottleWater } from "react-icons/fa6";
import { FaSailboat } from "react-icons/fa6";
import EnquiryForm from "@components/enquiry-form";

import { useParams } from "next/navigation"; // Use next/navigation instead of next/router
function Page() {
  const tourPackageDetailsReviewsImageData = [
    {
      id: 1,
      heading: "Basavaraj B",
      description:
        "Mr.Indrajit is a very good person and guide. He was so polite and helpful throughout the trip. He..",
    },
    {
      id: 2,
      heading: "Basavaraj A",
      description:
        "Mr.Indrajit is a very good person and guide. He was so polite and helpful throughout the trip. He..",
    },
  ];

  const tourPackageDetailsReviewsData = [
    {
      id: 1,
      image: "/images/tour-package-details/01.jpg",
      heading: "Basavaraj B",
      description: "Nithin",
    },
    {
      id: 2,
      image: "/images/tour-package-details/02.jpg",
      heading: "Basavaraj A",
      description: "Nithin",
    },
  ];
  const { slug } = useParams(); // 👈 This gets the slug from the URL

  // Rating information
  const rating = 4.2;
  const maxRating = 5;
  const totalReviews = 3.5;

  const userRatingsCarosul = [
    {
      id: 1,
      headingIcon: "M",
      date: "29 July 2024",
      heading: "Marta C",
      description:
        "Amazing experience in Varanasi! No to be missed. The tour starts in late afternoon, with a both trip on the river, you can enjoy a beautiful...",
    },
    {
      id: 2,
      headingIcon: "M",
      date: "15 July 2024",
      heading: "Michael P",
      description:
        "Amazing experience in Varanasi! No to be missed. The tour starts in late afternoon, with a both trip on the river, you can enjoy a beautiful...",
    },
    {
      id: 3,
      headingIcon: "M",
      date: "18 July 2024",
      heading: "Marta C",
      description:
        "Amazing experience in Varanasi! No to be missed. The tour starts in late afternoon, with a both trip on the river, you can enjoy a beautiful...",
    },
    {
      id: 4,
      headingIcon: "M",
      date: "05 July 2024",
      heading: "Michael P",
      description:
        "Amazing experience in Varanasi! No to be missed. The tour starts in late afternoon, with a both trip on the river, you can enjoy a beautiful...",
    },
    {
      id: 5,
      headingIcon: "M",
      date: "04 July 2024",
      heading: "Marta C",
      description:
        "Amazing experience in Varanasi! No to be missed. The tour starts in late afternoon, with a both trip on the river, you can enjoy a beautiful...",
    },
  ];

  const pakageDetailsOtherPackages = [
    {
      id: 1,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/01.jpg",
    },
    {
      id: 2,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/02.jpg",
    },
    {
      id: 3,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/03.jpg",
    },
    {
      id: 4,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/04.jpg",
    },
    {
      id: 5,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/05.jpg",
    },
    {
      id: 6,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/06.jpg",
    },
  ];
  const packageDetails = [
    {
      id: 1,
      name: "Global Village Dubai",
      provider: "DoJoin",
      providerLink: "",
      rating: 5,
      bookNowLink:
        "https://www.dojoin.com/en/content/12559/global-village-dubai?_src=103&_ref=59",
      photos: [],
      subHeading: "Global village",
      inclusion: [
        {
          name: "Entry Ticket",
          icon: <FaTicketAlt />,
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
      exclusion: [
        {
          name: "Foods and Beverages",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
      overview: `For many centuries, India has been nicknamed the center of all cultures; now Dubai claims the name Global Village. If you want to know about different cultures in the world, the Global Village of Dubai is the right place for you. In this unique center, you have the chance to become familiar with more than 90 different cultures. At Global Village, you have the chance to taste the cuisine of different countries and buy their handicrafts. Since music and shows are integral parts of each culture, at Global Village, you can see the shows of each country and ethnicity. If you choose the right time, you may encounter the street carnivals of the Global Village. However, this is not all; there are numerous activities within the center, from clarinetists to Bollywood flash mobs, where you can watch and even be part of them. The kid shows are one place that helps them boost their creativity and examine their talents. 29th Global Village Dubai opening is October 16, and it is expected to continue until May 11. Global Village Dubai will be open from 4 pm until 12 am on Sunday to Wednesday and until 1 am on Thursday to Saturday. If you want to get the Global Village Dubai ticket online, DoJoin offers this opportunity to all our customers.`,
      highlight: [
        "This offers smooth entry to the region’s largest as well as the ultimate shopping and entertainment attraction.",
        "The open-air multi-cultural entertainment complex has close to 30 pavilions, representing about 80 countries from across the world.",
        "This gives you the unique chance to explore the world in a day.",
        "Discover authentic culture, heritage and culinary flavors of not only UAE but also other international destinations.",
        "With your ticket, you’ll get to watch several cultural shows and concerts by acclaimed artists.",
        "Be in awe at spine-tingling acrobatic performances.",
        "Global Village is a favorite of adults and kids alike, with its attractions like Carnaval (fun fair park), Wheel of the World (Ferris Wheel), Circus! Circus!, and Stunt Show.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14455.595312037123!2d55.308488!3d25.071418!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDA0JzE3LjEiTiA1NcKwMTgnMzAuNiJF!5e0!3m2!1sen!2sus!4v1745494046956!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      id: 2,
      name: "Dubai Miracle Garden",
      provider: "DoJoin",
      providerLink: "https://www.dojoin.com",
      rating: 4,
      bookNowLink:
        "https://www.dojoin.com/en/content/12550/dubai-miracle-garden",
      photos: [
        "/images/miracle-garden/01.jpg",
        "/images/miracle-garden/02.jpg",
        "/images/miracle-garden/03.jpg",
      ],
      subHeading: "Floral Paradise",
      inclusion: [
        {
          name: "Entry Ticket",
          icon: <FaTicketAlt />, // Placeholder for an icon component, e.g., <FaTicketAlt />, to be added if needed
          description:
            "Gain access to the world’s largest natural flower garden with over 150 million blooms.",
        },
      ],
      exclusion: [
        {
          name: "Pick up and Drop Off",
          description:
            "orem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
      overview: `At the Dubai Miracle Garden, which is the biggest natural flower garden in the world, you will find a world of floral wonders waiting for you. The park, which spans 72,000 square meters, features a remarkable collection of well-known buildings and structures that have been totally turned into vibrant floral displays.

Explore the heart-shaped route or meander through the lit nightscapes, full-size residences, and petal-powered castles that are scattered around the area. In addition to the numerous attractions and a vast assortment of peculiar arrangements, you will be able to immerse yourself in the presence of more than 150 million blossoming flowers across the whole area.`,
      highlight: [
        "The largest natural flower garden in the entire world is accessible here.",
        "Enjoy this enormous 72,000 square meter garden's 45 million flower displays.",
        "View a diverse range of plants and flowers arranged in various themes, shapes, and designs.",
        "Wander around beneath a rainbow of umbrellas.",
        "Numerous dining options, shaded areas, and themed areas with pools and fountains are included in the amenities.",
        "A seasonal attraction open only from November to May, offering a distinctive assortment of floral attractions on each visit.",
        "Take advantage of outdoor swimming pools, flower-adorned vintage cars, different-shaped walkways, a path lined with lovely little umbrellas, and truly amazing designs to refresh your mind, body, and soul.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14456.941882266181!2d55.244465!3d25.060007!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDAzJzM2LjAiTiA1NcKwMTQnNDAuMSJF!5e0!3m2!1sen!2sus!4v1745552264180!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      id: 3,
      name: "Dubai Frame",
      provider: "DoJoin",
      providerLink: "https://www.dojoin.com",
      rating: 4,
      bookNowLink: "https://www.dojoin.com/en/content/12695/dubai-frame",
      photos: [
        "/images/dubai-frame/01.jpg",
        "/images/dubai-frame/02.jpg",
        "/images/dubai-frame/03.jpg",
      ],
      subHeading: "Architectural Brilliance",
      inclusion: [
        {
          name: "Admission Entry",
          icon: <FaTicketAlt />,
          description: "Access to the Dubai Frame for a panoramic journey.",
        },
        {
          name: "Dubai Past Gallery",
          icon: <RiGalleryFill />,
          description: "Access to the Dubai Frame for a panoramic journey.",
        },
        {
          name: "360 degree views",
          icon: <TbView360Number />,
          description: "Access to the Dubai Frame for a panoramic journey.",
        },
        {
          name: "Glass Bridge",
          icon: <FaBridge />,
          description: "Access to the Dubai Frame for a panoramic journey.",
        },
      ],
      exclusion: [
        {
          name: "Pick Up and Drop Off",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          name: "Food",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          name: "Drinks",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
      overview:
        "The Dubai Frame is a popular tourist and local attraction. The building's unique location in Zabeel Park offers city vistas like the Burj Khalifa and Burj Al Arab.Dubai Frame is remarkable in its 150m height, 93m width, and bridge-connected buildings. From the north, Dubai's old area looks like a picture frame, while the south offers stunning views of the modern cityscape.From the ground to the sky, guests may experience the history, present, and future beyond the spectacular vistas. The city's history is portrayed utilizing the newest technologies, including animations, holograms, traditional music, and fragrant smells.Sky Deck's 50m opaque glass bridge is transparent. The floor is made of liquid crystal with a sensor-activated coating that clears when walked on. Feel like you're walking on air while looking down.",
      highlight: [
        "Visitors can take a thrilling elevator ride to the top of the frame and enjoy breathtaking panoramic views of the city's skyline, including landmarks such as the Burj Khalifa and Emirates Towers.",
        "The Dubai Frame also houses a state-of-the-art museum that takes visitors on a journey through the history and culture of Dubai, providing a fascinating insight into the emirate's rich heritage and modern-day transformation.",
        "With its impressive architecture, stunning views, and immersive museum, the Dubai Frame is a must-visit destination that offers an unparalleled glimpse into the soul of this vibrant city.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14436.164712321824!2d55.300363!3d25.235538!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE0JzA3LjkiTiA1NcKwMTgnMDEuMyJF!5e0!3m2!1sen!2sus!4v1745553987036!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      id: 4,
      name: "2 Hours Sightseeing Yacht Tour",
      provider: "DoJoin",
      providerLink: "https://www.dojoin.com",
      rating: 4,
      bookNowLink:
        "https://www.dojoin.com/en/content/12815/2-hours-sightseeing-yacht-tour",
      photos: [
        "/images/yacht-tour/01.jpg",
        "/images/yacht-tour/02.jpg",
        "/images/yacht-tour/03.jpg",
      ],
      subHeading: "Luxury Marina Experience",
      inclusion: [
        {
          name: "2 Hour Tour",
          icon: <FaTicketAlt />,
          description:
            "Access to a 2-hour sightseeing yacht tour departing from Dubai Marina.",
        },
        {
          name: "Washroom Facility",
          icon: <FaToiletsPortable />,
          description:
            "Access to a 2-hour sightseeing yacht tour departing from Dubai Marina.",
        },
        {
          name: "Water",
          icon: <FaBottleWater />,
          description:
            "Access to a 2-hour sightseeing yacht tour departing from Dubai Marina.",
        },
        {
          name: "66ft yacht",
          icon: <FaSailboat />,
          description:
            "Access to a 2-hour sightseeing yacht tour departing from Dubai Marina.",
        },
      ],
      exclusion: [
        {
          name: "Pick Up and Drop Off",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
      overview:
        "If you want a Two-Hour Sightseeing Yacht Tour at Dubai Marina, you can experience it on our luxurious yacht. Over the years, we have created successful Gulf tours, and each one has luxurious options for tourists. On this tour, you can all participate in a beyond-imagination experience in which all fun is available with the best choices. On this adventure, you can have a great meal, an example of something that has never been seen before. Besides the meal, you can always have a great time sailing in the Gulf and watch Dubai Marina from a new perspective.",
      highlight: [
        "A picnic on the water, whether for sightseeing or an unforgettable or unhurried meal.",
        "Experience unrivaled luxury and relaxation while sailing because we only represent top-tier yachts and sailing vessels.",
        "A fantastic cruise opportunity to experience Dubai's breathtaking sights up close and personal.",
        "Enjoy a 2-hour luxurious cruise on a sleek yacht with incredible amenities that epitomize elegance and style at their best.",
        "A luxury yacht rental in Dubai is the ideal way to start sailing, and there are few better ways to spend your time in Dubai than by relaxing on the water.",
        "Enjoy a fantastic sailing adventure.",
        "We offer our customers incredible services so they can have an awesome sailing experience.",
        "Renting a yacht in Dubai allows you to take advantage of both the surrounding beauty and a voyage on the water.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14453.131981655617!2d55.141716!3d25.09228!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDA1JzMyLjIiTiA1NcKwMDgnMzAuMiJF!5e0!3m2!1sen!2sus!4v1745555717393!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      id: 5,
      name: "Sky Views Observatory",
      provider: "DoJoin",
      providerLink: "https://www.dojoin.com",
      rating: 4,
      bookNowLink:
        "https://www.dojoin.com/en/content/12685/sky-views-observatory",
      photos: [
        "/images/sky-views-observatory/01.jpg",
        "/images/sky-views-observatory/02.jpg",
        "/images/sky-views-observatory/03.jpg",
      ],
      subHeading: "Panoramic City Vistas",
      inclusion: [
        {
          name: "Entry Ticket",
          icon: null,
          description:
            "Access to the Sky Views Observatory at 219.5 meters above Downtown Dubai.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Across from Burj Khalifa in Downtown Dubai, you'll find the futuristic-looking Sky Views podium. It connects the top of The Address Sky View, a pair of 50-story elliptical dual towers (237.45 and 260.85 meters in height, respectively), which rise from a curved plinth. The Sky Views observatory, perched 219.5 meters above Dubai, boasts a breathtaking 25-meter-long glass floor at the cantilevered level, offering breathtaking views of the city and the Burj Khalifa. Guests may also take in the views from a panoramic elevator that is encased in glass on three sides, as well as the Panorama 52 restaurant. An outdoor glass slide, contained in a clear tube, propels guests from level 53, at 219.5 m, to level 52, at 215.5 m, providing an adrenaline-inducing experience that is unique to Sky Views and the region.",
      highlight: [
        "Discover a thrilling new attraction in the heart of Downtown Dubai",
        "Slide down from the 53rd floor of a high-rise building within a glass capsule",
        "Look down (if you dare) as you slide through a suspended transparent tube",
        "Take in the breathtaking views from the stunning 25-meter long glass floor",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d14440.31614327333!2d55.270368000000005!3d25.200557!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDEyJzAyLjAiTiA1NcKwMTYnMTMuMyJF!5e0!3m2!1sen!2sus!4v1745583933667!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      id: 6,
      name: "IMG Worlds of Adventure + AYA Universe Combo",
      provider: "DoJoin",
      providerLink: "https://www.dojoin.com",
      rating: 4,
      bookNowLink:
        "http://dojoin.com/en/combo/42/img-worlds-of-adventure-aya-universe",
      photos: [
        "/images/img-aya-combo/01.jpg",
        "/images/img-aya-combo/02.jpg",
        "/images/img-aya-combo/03.jpg",
      ],
      subHeading: "Thrills and Futuristic Wonders",
      inclusion: [
        {
          name: "Combo Ticket",
          icon: null,
          description:
            "Access to IMG Worlds of Adventure and AYA Universe on the same or different days, depending on ticket validity.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Dubai is the city where imaginations end and become reality, especially for kids. IMG Worlds of Adventure, which is located at Sheikh Mohammed Bin Zayed Road, near Arabian Ranches, next to Global Village, is a theme park that every kid dreams of. At this amusement park, which has six zones, visitors have the chance to see their beloved Marvel superheroes come to life. Since this place is on a land area bigger than 28 football fields, we highly recommend that you wear suitable shoes. It doesn't matter which cartoon you are interested in; having all kinds of themes helps your kids have fun with different options. For example, at Lost Valley Zone, activities related to Jurassic Park are available, and you have the chance to live your dream theme with your kids. Whether you are in love with Iron Man or you want to have some pictures at the Avengers: Battle of Ultron theme, at this park, everything is prepared for you.",
      highlight: [
        "Explore IMG Worlds of Adventure, the world’s largest indoor theme park, with 22 rides across six zones like Marvel, Cartoon Network, and Lost Valley.",
        "Ride the Velociraptor rollercoaster at IMG, reaching 100 km/h in just 2.5 seconds.",
        "Meet your favorite Marvel superheroes and Cartoon Network characters with live shows and meet-and-greets.",
        "Immerse yourself in AYA Universe’s 12 interactive zones, featuring bioluminescent gardens in Flora and a robotic light show in Harmonia.",
        "Experience cutting-edge technology at AYA Universe with virtual reality and multisensory exhibits across 40,000 square feet.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.987654321098!2d55.3323!3d25.1205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c4a2b9e9e1d%3A0x2e3c3e3c3e3c3e3c!2sIMG%20Worlds%20of%20Adventure!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: "0", width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
  ];
  const packageDetail = packageDetails.find((pkg) => pkg.id === Number(slug));

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBookNowClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <Banner />
      <section className={style["tour-package-details"]}>
        <div className={`container ${style["container-package-details"]}`}>
          <div className="row">
            <div className="col-md-7">
              <h3>{packageDetail.name}</h3>
              <p>
                <Link href="#0">{packageDetail.provider}</Link>
              </p>
              <div className={style["flex-package-details"]}>
                <span>
                  {[...Array(packageDetail.rating)].map((_, index) => (
                    <FaCircle
                      key={index}
                      color="#04ac6a"
                      className={style["circle-icon"]}
                    />
                  ))}

                  <p className="pt-2">2,471 reviews</p>
                </span>
                <span>
                  <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                  Recommended by 99% of travellers{" "}
                  <IoMdInformationCircleOutline
                    className={style["IoMdInformationCircleOutline"]}
                  />
                </span>
                <span>
                  <MdIosShare className={style["MdIosShare"]} />
                  <FaRegHeart className={style["FaRegHeart"]} />
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className={style["flex-package-details-right"]}>
                <span>
                  {/* <button
                    className={style["btn-one"]}
                    onClick={handleBookNowClick}
                  >
                    Book Now
                  </button> */}
                  <Link href={packageDetail.bookNowLink} target="_blank">
                    <button className={style["btn-one"]}>Book Now</button>
                  </Link>
                </span>
                <span>
                  <button
                    className={style["btn-two"]}
                    onClick={() => setIsFormOpen(true)}
                  >
                    Buy Tickets
                  </button>
                  <p className="lap-view">
                    You can now directly communicate with the Seller of this
                    package
                  </p>
                </span>
                <EnquiryForm
                  isOpen={isFormOpen}
                  onClose={() => setIsFormOpen(false)}
                />{" "}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-7">
              {/* best picked for you */}
              <section className={style["package-best-picked"]}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className={style["review-img-container"]}>
                        <Carousal
                          packageDetailsReviewImage={
                            tourPackageDetailsReviewsImageData
                          }
                          packageDetailsReview={tourPackageDetailsReviewsData}
                          count={1}
                          type="tour-package-details-reviews"
                        />
                      </div>

                      {/* <div className={style['review-text-container']}>
                                                <Carousal
                                                    packageDetailsReviewImage={tourPackageDetailsReviewsImageData} 
                                                    packageDetailsReview={tourPackageDetailsReviewsData} 
                                                    count={1}
                                                    type='tour-package-details-reviews-img'
                                                />
                                            </div>*/}
                    </div>
                  </div>
                </div>
              </section>
              {/* best picked for you END*/}
            </div>

            <div className="col-md-5 align-items">
              <div className={style["mobile-mrb"]}>
                <h3>{packageDetail.subHeading}</h3>
                <p>{packageDetail.overview}</p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className={`col-md-7 ${style["border-right"]}`}>
              <h3 className="pt-2">Inclusions</h3>
              <div className={style["inclusions"]}>
                {packageDetail.inclusion.map((item, index) => (
                  <span key={index}>
                    {item.icon}
                    <div className="clearfix"></div>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-md-5">
              <h3 className="pt-2">Themes</h3>
              <div className={style["inclusions"]}>
                <span>
                  <PiMountains />
                  <div className="clearfix"></div> Hill Station
                </span>
                <span>
                  <GiMountainClimbing />
                  <div className="clearfix"></div>Adventure
                </span>
                <span>
                  <IoMdHeart />
                  <div className="clearfix"></div>Honeymoon
                </span>
                <span>
                  <MdFamilyRestroom />
                  <div className="clearfix"></div>Family
                </span>
                <span>
                  <LiaBinocularsSolid />
                  <div className="clearfix"></div>Sightseeing
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`container ${style["time"]}`}>
          <div className="row">
            <div className="col-md-12">
              <HighlightTab highlight={packageDetail.highlight} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className={`col-md-12 ${style["pdb-3"]}`}>
              <h3 className={`container ${style["p-color"]}`}>
                Package Inclusions
              </h3>
              <PackageInclusions inclusion={packageDetail.inclusion} />
            </div>
            <div className={`col-md-12 pt-4 ${style["pdb-3"]}`}>
              <h3 className={`container ${style["p-color"]}`}>
                Package Exclusions
              </h3>
              <PackageExclusions exclusion={packageDetail.exclusion} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h3>Note</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={`row ${style["ptb-30"]}`}>
            <div className="col-md-12">
              <h3>Trip Map & Itinerary</h3>
            </div>
          </div>

          <div className={`row ${style["Legend-ul"]}`}>
            {/* <div className="col-md-8">
              <img src="../images/map.jpg" alt="Bahrain" />
            </div>
            <div className="col-md-4">
              <h4>Legend</h4>
              <ul>
                <li>
                  <p>
                    <IoLocationSharp />
                    Start Location
                  </p>
                </li>
                <li>
                  <p>
                    <IoLocationSharp />
                    End Location
                  </p>
                </li>
                <li>
                  <p>
                    <IoIosCloudyNight />
                    Over Night
                  </p>
                </li>
                <li>
                  <p>
                    <GoDotFill />
                    Visited Location
                  </p>
                </li>
                <li>
                  <p>
                    <GiCruiser />
                    Cruise
                  </p>
                </li>
                <li>
                  <p>
                    <FaFerry />
                    Ferry
                  </p>
                </li>
                <li>
                  <p>
                    <IoIosAirplane />
                    Plane
                  </p>
                </li>
                <li>
                  <p>
                    <FaTrain />
                    Train
                  </p>
                </li>
              </ul>
            </div> */}
            <div className="col-md-12">{packageDetail.location}</div>{" "}
          </div>
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h4>User ratings</h4>
              <p className="mb-0">
                <IoIosStar color="#FDCC0D" /> 4.2. Very good (13 reviews){" "}
                <Link href="#0">See all reviews</Link>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <StarRatingBar
                rating={rating}
                maxRating={maxRating}
                totalReviews={totalReviews}
              />
            </div>
            <div className="col-md-4">
              <StarRatingBar
                rating={rating}
                maxRating={maxRating}
                totalReviews={totalReviews}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <StarRatingBar
                rating={rating}
                maxRating={maxRating}
                totalReviews={totalReviews}
              />
            </div>
            <div className="col-md-4">
              <StarRatingBar
                rating={rating}
                maxRating={maxRating}
                totalReviews={totalReviews}
              />
            </div>
          </div>
          {/* <div className="row pt-5">
            <div className="col-md-4 col-8">
              <h4>What guests loved most</h4>
            </div>
            <div className="col-md-4 col-4">
              <Link className="float-right" href="#0">
                See all reviews
              </Link>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-8">
              <Carousal
                userRatingsCarosul={userRatingsCarosul}
                count={2}
                type="user-ratings-carosul"
              />
            </div>
          </div> */}
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h3>Other Packages</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={pakageDetailsOtherPackages}
                count={5}
                type="pakage-details-other-packages"
              />
            </div>
            <div className="col-md-12">
              <button className={style["btn-three"]}>FULL PROJECTS</button>
            </div>
          </div>
        </div>

        <div className={`container-fluid ${style["ask-your-questions"]}`}>
          <div className="col-md-12">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <h3>Ask Your Questions</h3>
                  <p>
                    If your question has not been answered, you can submit your
                    own by using the form below. Alternatively, feel free to{" "}
                    <Link href="#0">
                      <b>
                        <u>Contact Us</u>
                      </b>
                    </Link>{" "}
                    and one of our staff will be happy to assist you.
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <input type="text" placeholder="Your Name"></input>
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder="Your Email"></input>
                </div>
                <div className="col-md-12">
                  <textarea placeholder="Question"></textarea>
                </div>
                <div className="col-md-12">
                  <button>ASK QUESTION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isPopupOpen && (
        <div className={style["popup-overlay"]}>
          <EnhancedDatePicker onClose={handleClosePopup} />
        </div>
      )}
    </>
  );
}

export default Page;
