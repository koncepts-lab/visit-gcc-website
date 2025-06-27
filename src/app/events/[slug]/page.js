"use client";

import React, { useState, useEffect, use } from "react";
import { useParams } from "next/navigation"; 
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
import { useRouter } from "next/navigation"; // MODIFIED: Import useRouter for redirection

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const [event, setEvent] = useState(null); // State to store the fetched event data
  const [eventRatings, setEventRatings] = useState(null); // State for event ratings
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

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

        // Fetch event ratings
        const ratingsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}event-review/${slug}/ratings`
        );
        setEventRatings(ratingsResponse.data.data);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError("Failed to fetch event details. Please try again.");
        setIsLoading(false);
      }
    };

    if (slug) {
        fetchEvent();
    }
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
    if (slug) {
        fetchEvent();
    }
  }, [slug]);

  const handleBookNowClick = () => {
    const loginToken = localStorage.getItem("auth_token_login");

    if (loginToken) {
      setIsPopupOpen(true);
    } else {
      // Assuming enqueueSnackbar is globally available or imported elsewhere
      enqueueSnackbar("Please log in to Book.", { variant: "warning" });
      router.push("/login");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleShareClick = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // Assuming enqueueSnackbar is globally available or imported elsewhere
        // enqueueSnackbar("Link copied to clipboard!", {
        //   variant: "success",
        //   autoHideDuration: 2000,
        // });
        alert("Link copied to clipboard!"); // Fallback alert
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  // Helper function to render rating circles dynamically
  const renderRatingCircles = () => {
    const averageRating = eventRatings?.average_rating
      ? parseFloat(eventRatings.average_rating)
      : 0;
    const filledCircles = Math.round(averageRating);
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <FaCircle
          key={i}
          color={i < filledCircles ? "#04ac6a" : "#ccc"}
          className={style["circle-icon"]}
        />
      );
    }
    return circles;
  };

  if (isLoading) {
    // You might want a better loading indicator
    return <p>Loading...</p>;
  }

  if (!event) {
    return (
      <div className="container">
        <p>Event not found.</p>
      </div>
    );
  }

  const formattedPhotos = (event.event_photo_urls || []).map((photo) => ({
    image: photo || "/images/placeholder.jpg",
  }));

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
                  {event.provider ? `By ${event.provider}` : ""}
                </Link>
              </p>
              <div className={style["flex-package-details"]}>
                <span>
                  {/* --- DYNAMIC RATING START --- */}
                  {renderRatingCircles()}
                  <p className="mrg_left">
                    <a href="#0" className="text_underline">
                      {eventRatings?.total_ratings || 0} reviews
                    </a>
                  </p>
                  {/* --- DYNAMIC RATING END --- */}
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
                    <div className="col-md-12 ps-md-3">
                      <div className={style["review-img-container"]}>
                            {formattedPhotos.length > 0 ? (
                        <Carousal
                          packageDetailsReview={formattedPhotos}
                          count={1}
                          type="tour-package-details-reviews"
                        />
                      ) : (
                        <img src="/images/placeholder.jpg" className="col-6" alt="placeholder"/>
                      )}
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
          <EnhancedDatePicker onClose={handleClosePopup} eventId={slug} />
        </div>
      )}
    </>
  );
}

export default Page;