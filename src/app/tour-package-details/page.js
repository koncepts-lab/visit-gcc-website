"use client"; // Add this if you need hooks or client-side functionalities here

import React, { useState } from "react";
import Link from "next/link";
import style from "./style.module.css"; // Ensure correct path for styles
import Banner from "../../../components/banner/banner"; // Ensure correct path
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from "../../../components/carousel/Carousal"; // Ensure correct path
import { RiBusFill } from "react-icons/ri";
import { FaBed } from "react-icons/fa";
import { IoIosCar } from "react-icons/io";
import { GiHotMeal } from "react-icons/gi";
import { LiaBinocularsSolid } from "react-icons/lia";
import { PiMountains } from "react-icons/pi";
import { GiMountainClimbing } from "react-icons/gi";
import { IoMdHeart } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import HighlightTab from "../../../components/tour-package-details/highlight-tab"; // Ensure correct path
import PackageInclusions from "../../../components/tour-package-details/package-inclusions";
import PackageExclusions from "../../../components/tour-package-details/package-exclusions";
import { IoIosStar } from "react-icons/io";
import StarRatingBar from "../../../components/tour-package-details/StarRatingBar";
import EnhancedDatePicker from "./date";
import { IoLocationSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GiCruiser } from "react-icons/gi";
import { FaFerry } from "react-icons/fa6";
import { IoIosAirplane, IoIosCloudyNight } from "react-icons/io";
import { FaTrain } from "react-icons/fa";
import EnquiryForm from "../../../components/enquiry-form";

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
              <h3>4 DAYS IN SALALAH</h3>
              <p>
                <Link href="#0">By Easytours24h-Hanoi Day Tours</Link>
              </p>
              <div className={style["flex-package-details"]}>
                <span>
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
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
                  <button
                    className={style["btn-one"]}
                    onClick={handleBookNowClick}
                  >
                    Book Now
                  </button>
                </span>
                <span>
                  <button
                    className={style["btn-two"]}
                    onClick={() => setIsFormOpen(true)}
                  >
                    Contact Seller
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
                <h3>Enchanting Salalah</h3>
                <p>
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className={`col-md-7 ${style["border-right"]}`}>
              <h3 className="pt-2">Inclusions</h3>
              <div className={style["inclusions"]}>
                <span>
                  <RiBusFill />
                  <div className="clearfix"></div> Volvo
                </span>
                <span>
                  <FaBed />
                  <div className="clearfix"></div>3 stars
                </span>
                <span>
                  <IoIosCar />
                  <div className="clearfix"></div>Transfer
                </span>
                <span>
                  <GiHotMeal />
                  <div className="clearfix"></div>Meals
                </span>
                <span>
                  <LiaBinocularsSolid />
                  <div className="clearfix"></div>Sightseeing
                </span>
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
              <HighlightTab />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className={`col-md-12 ${style["pdb-3"]}`}>
              <h3 className={`container ${style["p-color"]}`}>
                Package Inclusions
              </h3>
              <PackageInclusions />
            </div>
            <div className={`col-md-12 pt-4 ${style["pdb-3"]}`}>
              <h3 className={`container ${style["p-color"]}`}>
                Package Exclusions
              </h3>
              <PackageExclusions />
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
            <div className="col-md-8">
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
          <div className="row pt-5">
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
          </div>
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
