"use client";

import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation"; // To extract the ID from the URL
import Link from "next/link";
import axios from "axios"; // Import Axios
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from "@components/carousel/Carousal";
import { IoIosStar } from "react-icons/io";
import StarRatingBar from "@components/tour-package-details/StarRatingBar";
import EventHighlightTab from "@components/event-details/highlight-tab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import EnhancedDatePicker from "./date";
import RatingCarousel from "@components/tour-package-details/RatingCarousel";

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const [event, setEvent] = useState(null); // State to store the fetched event data
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch event data when the component mounts or the ID changes
  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/${slug}`
        );
        const eventData = response.data.data || response.data || null;
        if (!eventData) {
          throw new Error("No event data found");
        }

        setEvent(eventData);
        console.log("Fetched event:", eventData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event details. Please try again.");
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/related/${slug}`
        );
        setRelatedEvents(response.data);
        console.log("Related Events:", response);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event details. Please try again.");
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);
  const handleBookNowClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Static data for other components (unchanged)
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

  // if (isLoading) {
  //   return (
  //     <div className="container">
  //       <p>Loading event details...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="container">
  //       <p className="text-danger">{error}</p>
  //     </div>
  //   );
  // }

  if (!event) {
    return (
      <div className="container">
        <p>Event not found.</p>
      </div>
    );
  }
  const handleShareClick = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        enqueueSnackbar("Link copied to clipboard!", {
          variant: "success",
          autoHideDuration: 2000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <Banner />
      <section className={style["tour-package-details"]}>
        <div className={`container ${style["container-package-details"]}`}>
          <div className="row">
            <div className="col-md-7">
              <h3>{event.name || "Event Name Not Available"}</h3>
              <p>
                <Link href="#0" className="text_underline">
                  {event.organizer ? `By ${event.provider}` : ""}
                </Link>
              </p>
              <div className={style["flex-package-details"]}>
                <span>
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <FaCircle color="#04ac6a" className={style["circle-icon"]} />
                  <p className="mrg_left">
                    <a href="#0" className="text_underline">
                      {event.reviewCount || 2471} reviews
                    </a>
                  </p>
                </span>
                <span>
                  <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                  Recommended by {event.recommendationPercentage || 99}% of
                  travellers{" "}
                </span>
                <span>
                  <button
                    onClick={handleShareClick}
                    style={{ border: "none", background: "none" }}
                  >
                    <MdIosShare className={style["MdIosShare"]} />
                  </button>
                </span>
              </div>
            </div>
            <div className="col-md-5">
              <div className={style["flex-package-details-right"]}>
                <span className={style["min-w"]}>
                  <p>Starting From</p>
                  <h5>AED {event.adult_price} per person</h5>
                </span>
                <span>
                  <button
                    className={style["btn-one"]}
                    onClick={handleBookNowClick}
                  >
                    Book Now
                  </button>
                </span>
                {/* <span>
                  <button className={style["btn-two"]}>Contact Seller</button>
                  <p className="lap-view">
                    You can now directly communicate with the Seller of this
                    package
                  </p>
                </span> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <section className={style["package-best-picked"]}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className={style["review-img-container"]}>
                        <Carousal
                          packageDetailsReview={event.event_photo_urls}
                          count={1}
                          type="tour-package-details-reviews"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-md-5 align-items">
              <div className={style["mobile-mrb"]}>
                <h3>About The Event</h3>
                <p>
                  {event.description ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`container`}>
          <div className="row">
            <div className="col-md-12">
              <EventHighlightTab
                highlight={event.highlight}
                photo={event.event_photo_urls}
                faq={event.faq}
                ticket={event.ticket_information}
                sponsor={event.sponsers_and_partners}
                venue={event.venue_information}
                latitude={event.latitude}
                longitude={event.longitude}
              />
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h4>User ratings</h4>
              <p className="mb-0">
                <IoIosStar color="#FDCC0D" /> {event.rating || 4.2}. Very good (
                {event.totalReviews || 13} reviews){" "}
                <Link href="#0">See all reviews</Link>
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <StarRatingBar
                rating={event.rating || rating}
                maxRating={maxRating}
                totalReviews={event.totalReviews || totalReviews}
              />
            </div>
            <div className="col-md-4">
              <StarRatingBar
                rating={event.rating || rating}
                maxRating={maxRating}
                totalReviews={event.totalReviews || totalReviews}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <StarRatingBar
                rating={event.rating || rating}
                maxRating={maxRating}
                totalReviews={event.totalReviews || totalReviews}
              />
            </div>
            <div className="col-md-4">
              <StarRatingBar
                rating={event.rating || rating}
                maxRating={maxRating}
                totalReviews={event.totalReviews || totalReviews}
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
        </div> */}
        <div className="container">
          <div className="row pt-3">
            <div className="col-md-8">
              <RatingCarousel packageId={slug} type="event" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h3>Related Events or Recommendations</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={relatedEvents}
                count={5}
                type="event-details-other-events"
              />
            </div>
            <div className="col-md-12">
              <button className={style["btn-three"]}>FULL PROJECTS</button>
            </div>
          </div>
        </div>
        <div>
          <Ask_ur_questions />
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
