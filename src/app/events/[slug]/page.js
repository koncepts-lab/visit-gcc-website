"use client"; // Add this if you need hooks or client-side functionalities here

import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css"; // Ensure correct path for styles
import Banner from "@components/banner/banner";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from "@components/carousel/Carousal"; // Ensure correct path
import { IoIosStar } from "react-icons/io";
import StarRatingBar from "@components/tour-package-details/StarRatingBar";
import EventHighlightTab from "@components/event-details/highlight-tab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EnhancedDatePicker from "./date";
import EnquiryForm from "@components/enquiry-form";
import { useParams } from "next/navigation"; // Use next/navigation instead of next/router

function Page() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBookNowClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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

  // Rating information
  const rating = 4.2;
  const maxRating = 5;
  const totalReviews = 3.5;
  const { slug } = useParams(); // 👈 This gets the slug from the URL

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
  const eventDetails = [
    {
      id: 1,
      name: "Travis Scott | Circus Maximus Tour",
      provider: "Discover Qatar",
      providerLink: "https://www.discoverqatar.qa",
      rating: 4,
      bookNowLink:
        "https://www.discoverqatar.qa/travis-scott-circus-maximus-tour/",
      photos: [
        "/images/travis-scott-tour/01.jpg",
        "/images/travis-scott-tour/02.jpg",
        "/images/travis-scott-tour/03.jpg",
      ],
      subHeading: "High-Energy Concert Experience",
      inclusion: [
        {
          name: "Concert Ticket",
          icon: null,
          description:
            "Access to the Travis Scott Circus Maximus Tour concert at Ahmad Bin Ali Stadium.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Prepare for an electrifying night, Doha! On May 16th, 2025, the Ahmad Bin Ali Stadium will transform as Travis Scott brings his sold-out Circus Maximus Tour to Qatar. Immerse yourself in a high-octane performance where the boundaries between concert and spectacle blur. Known for his innovative stage designs, powerful energy, and chart-topping hits, Travis Scott delivers a live show unlike any other. Expect a night of pure adrenaline, with booming bass, mesmerizing visuals, and the raw energy that has made him a global phenomenon.",
      highlight: [],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.345678901234!2d51.4256!3d25.2387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d9b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sAhmad%20Bin%20Ali%20Stadium!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
      name: "Formula 1 Qatar Airways Qatar Grand Prix 2025",
      provider: "Discover Qatar",
      providerLink: "https://www.discoverqatar.qa",
      rating: 4,
      bookNowLink: "https://www.discoverqatar.qa/formula1andmotogp/",
      photos: [
        "/images/formula1-qatar/01.jpg",
        "/images/formula1-qatar/02.jpg",
        "/images/formula1-qatar/03.jpg",
      ],
      subHeading: "Thrilling Night Race",
      inclusion: [
        {
          name: "Grand Prix Ticket",
          icon: null,
          description:
            "Access to the Formula 1 Qatar Airways Qatar Grand Prix 2025 at Lusail International Circuit.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Experience the thrill of the FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025, taking place from November 28 to 30, 2025, at the state-of-the-art Lusail International Circuit. Witness high-octane racing under the floodlights as top drivers like Verstappen chase a third win, Hamilton pursues an eighth championship, and McLaren defends its constructor’s title. Earlier this year, the 2025 MotoGP Grand Prix of Qatar also electrified the same circuit, with Marc Marquez of Ducati Lenovo Team taking first place, followed by Francesco Bagnaia and Franco Morbidelli. Book your tickets through Discover Qatar to enjoy world-class motorsport and Qatar’s renowned hospitality.",
      highlight: [],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.567890123456!2d51.4547!3d25.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d7b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sLusail%20International%20Circuit!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
      name: "Formula 1 Qatar Airways Qatar Grand Prix 2025",
      provider: "Discover Qatar",
      providerLink: "https://www.discoverqatar.qa",
      rating: 4,
      bookNowLink: "https://www.discoverqatar.qa/formula1andmotogp/",
      photos: [
        "/images/formula1-qatar/01.jpg",
        "/images/formula1-qatar/02.jpg",
        "/images/formula1-qatar/03.jpg",
      ],
      subHeading: "Thrilling Night Race",
      inclusion: [
        {
          name: "Grand Prix Ticket",
          icon: null,
          description:
            "Access to the Formula 1 Qatar Airways Qatar Grand Prix 2025 at Lusail International Circuit.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Experience the thrill of the FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025, taking place from November 28 to 30, 2025, at the state-of-the-art Lusail International Circuit. Witness high-octane racing under the floodlights as top drivers like Verstappen chase a third win, Hamilton pursues an eighth championship, and McLaren defends its constructor’s title. Earlier this year, the 2025 MotoGP Grand Prix of Qatar also electrified the same circuit, with Marc Marquez of Ducati Lenovo Team taking first place, followed by Francesco Bagnaia and Franco Morbidelli. Book your tickets through Discover Qatar to enjoy world-class motorsport and Qatar’s renowned hospitality.",
      highlight: [],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.567890123456!2d51.4547!3d25.4900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d7b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sLusail%20International%20Circuit!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
      name: "Qatar TotalEnergies Open",
      provider: "Qatar Tennis Federation",
      providerLink: "https://www.qatartennis.org",
      rating: 4,
      bookNowLink:
        "https://www.qatartennis.org/competitions/qatar-totalenergies-open",
      photos: [
        "/images/qatar-totalenergies-open/01.jpg",
        "/images/qatar-totalenergies-open/02.jpg",
        "/images/qatar-totalenergies-open/03.jpg",
      ],
      subHeading: "Elite Women’s Tennis",
      inclusion: [
        {
          name: "Tournament Ticket",
          icon: null,
          description:
            "Access to matches at the Khalifa International Tennis Complex from February 9–15, 2025.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "The Qatar TotalEnergies Open, a prestigious WTA 1000 tournament, returns from February 9 to 15, 2025, at the Khalifa International Tennis Complex in Doha, Qatar. Featuring a prize money of $597,000, this outdoor hard-court event showcases the world’s top female tennis stars, continuing a legacy that began in 2001. Known for hosting legendary champions like Iga Swiatek, Maria Sharapova, and Victoria Azarenka, the tournament promises thrilling matches and a vibrant atmosphere for up to 7,000 spectators.",
      highlight: [
        "Witness world-class women’s tennis with a prize money of $597,000 at the WTA 1000 level.",
        "Enjoy matches on outdoor hard courts at the iconic Khalifa International Tennis Complex.",
        "Experience the legacy of champions like Iga Swiatek, who has won multiple titles here.",
        "See top players compete, with a capacity for 7,000 spectators creating an electric atmosphere.",
      ],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.567890123456!2d51.4256!3d25.2387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d7b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sKhalifa%20International%20Tennis%20and%20Squash%20Complex!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
      name: "Qatar ExxonMobil Open 2025",
      provider: "Qatar Tennis Federation",
      providerLink: "https://www.qatartennis.org",
      rating: 4,
      bookNowLink:
        "https://www.qatartennis.org/competitions/qatar-exxonmobil-open",
      photos: [
        "/images/qatar-exxonmobil-open/01.jpg",
        "/images/qatar-exxonmobil-open/02.jpg",
        "/images/qatar-exxonmobil-open/03.jpg",
      ],
      subHeading: "Premier Men’s Tennis",
      inclusion: [
        {
          name: "Tournament Ticket",
          icon: null,
          description:
            "Access to matches at the Khalifa International Tennis Complex from February 17–22, 2025.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "The Qatar ExxonMobil Open 2025, an ATP 250 tournament, takes place from February 17 to 22, 2025, at the Khalifa International Tennis Complex in Doha, Qatar. With a prize money of $1,000,000, this outdoor hard-court event attracts top male tennis players, continuing a tradition since 1993. Known for its world-class facilities and competitive matches, the tournament has previously crowned champions like Andy Murray, Rafael Nadal, and Daniil Medvedev.",
      highlight: [],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.567890123456!2d51.4256!3d25.2387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d7b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sKhalifa%20International%20Tennis%20and%20Squash%20Complex!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
      name: "Al Shaqab Equestrian Centre",
      provider: "Qatar Foundation",
      providerLink: "https://alshaqab.com",
      rating: 4,
      bookNowLink: "https://alshaqab.com/en",
      photos: [
        "/images/al-shaqab/01.jpg",
        "/images/al-shaqab/02.jpg",
        "/images/al-shaqab/03.jpg",
      ],
      subHeading: "Heritage and Equestrian Excellence",
      inclusion: [
        {
          name: "Guided Tour Ticket",
          icon: null,
          description:
            "Access to a guided tour of Al Shaqab, including stables and training facilities.",
        },
      ],
      exclusion: [
        {
          name: "Food and Beverages",
          description: "",
        },
      ],
      overview:
        "Al Shaqab Equestrian Centre, established in 1992 and part of Qatar Foundation, is a premier destination in Education City, Doha, dedicated to preserving the Arabian horse heritage. Spanning 980,000 square meters, it offers guided tours where visitors can witness the beauty of over 700 Arabian horses, explore state-of-the-art facilities, and learn about the center’s breeding and training programs. Mark your calendar for the 12th CHI Al Shaqab, a world-class equestrian event, scheduled for February 20–22, 2025, at the Longines Arena.",
      highlight: [],
      location: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.567890123456!2d51.4256!3d25.2387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d7b9c9c9c9c9%3A0x2e3c3e3c3e3c3e3c!2sAl%20Shaqab!5e0!3m2!1sen!2sus!4v1745659740!5m2!1sen!2sus"
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
  const eventDetail = eventDetails.find((event) => event.id === Number(slug));

  return (
    <>
      <Banner />
      <section className={`${style["tour-package-details"]} `}>
        <div className={`container ${style["container-package-details"]}`}>
          <div className="row">
            <div className="col-md-7">
              <h3>{eventDetail.name}</h3>
              <p>
                <Link href="#0">{eventDetail.provider}</Link>
              </p>
              <div
                className={`${style["flex-package-details"]}  d-flex flex-column flex-lg-row`}
              >
                <span>
                  {[...Array(eventDetail.rating)].map((_, index) => (
                    <FaCircle
                      key={index}
                      color="#04ac6a"
                      className={style["circle-icon"]}
                    />
                  ))}
                  <p className="mrg_left">
                    <a href="#0" className="text_underline">
                      2,471 reviews
                    </a>
                  </p>
                </span>
                <span>
                  <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                  Recommended by 99% of travellers{" "}
                  <IoMdInformationCircleOutline
                    className={style["IoMdInformationCircleOutline"]}
                  />
                </span>
                <span className="my-2 my-lg-0">
                  <MdIosShare className={style["MdIosShare"]} />
                  <FaRegHeart className={style["FaRegHeart"]} />
                </span>
              </div>
            </div>
            <div className="col-md-5">
              <div className={style["flex-package-details-right"]}>
                <span>
                  {/* <button
                    className={style["btn-one"]}
                    onClick={handleBookNowClick}
                  >
                    Book Now
                  </button> */}
                  <Link href={eventDetail.bookNowLink} target="_blank">
                    <button className={style["btn-one"]}>Book Now</button>
                  </Link>
                </span>
                <span>
                  <button
                    className={style["btn-two"]}
                    onClick={() => setIsFormOpen(true)}
                  >
                    Book Tickets
                  </button>
                  <p className="lap-view">
                    You can now directly communicate with the Seller of this
                    package
                  </p>
                  <EnquiryForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7">
              {/* best picked for you */}
              <section className={style["package-best-picked"]}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
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
                    </div>
                  </div>
                </div>
              </section>
              {/* best picked for you END*/}
            </div>

            <div className="col-lg-5 align-items">
              <div className={style["mobile-mrb"]}>
                <h3>{eventDetail.subHeading}</h3>
                <p>{eventDetail.overview}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`container ${style["time"]}`}>
          <div className="row">
            <div className="col-md-12">
              <EventHighlightTab />
            </div>
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
