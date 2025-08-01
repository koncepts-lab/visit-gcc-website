"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { MdIosShare } from "react-icons/md";
import Carousal from "@components/carousel/Carousal";
import RatingCarousel from "@components/tour-package-details/RatingCarousel";
import EventHighlightTab from "@components/event-details/highlight-tab";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import EnhancedDatePicker from "./date";
import { useRouter } from "next/navigation";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK
import { enqueueSnackbar } from "notistack"; // Assuming this is needed for Book Now click

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const { setIsLoading } = useLoading(); // 2. USE THE LOADER HOOK

  // All original state is preserved
  const [event, setEvent] = useState(null);
  const [eventRatings, setEventRatings] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();

  // 3. CONSOLIDATED USEEFFECT FOR ALL INITIAL PAGE DATA
  useEffect(() => {
    if (!slug) return;

    const fetchPageData = async () => {
      setIsLoading(true); // SHOW LOADER
      setError(null);

      try {
        // Fetch all essential data concurrently
        const [eventResponse, ratingsResponse, relatedEventsResponse] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}events/${slug}`),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}event-review/${slug}/ratings`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}events/related/${slug}`
            ),
          ]);

        const eventData = eventResponse.data.data || eventResponse.data || null;
        if (!eventData) {
          throw new Error("No event data found");
        }

        setEvent(eventData);
        setEventRatings(ratingsResponse.data.data);
        setRelatedEvents(relatedEventsResponse.data || []);
      } catch (err) {
        console.error("Error fetching event page data:", err);
        setError("Failed to fetch event details. Please try again.");
      } finally {
        setIsLoading(false); // HIDE LOADER
      }
    };

    fetchPageData();
  }, [slug, setIsLoading]);

  const handleBookNowClick = () => {
    const loginToken = localStorage.getItem("auth_token_login");
    if (loginToken) {
      setIsPopupOpen(true);
    } else {
      enqueueSnackbar("Please log in to Book.", { variant: "warning" });
      router.push("/login");
    }
  };

  const handleClosePopup = () => setIsPopupOpen(false);

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

  const renderRatingCircles = () => {
    const averageRating = eventRatings?.average_rating
      ? parseFloat(eventRatings.average_rating)
      : 0;
    const filledCircles = Math.round(averageRating);
    return Array.from({ length: 5 }, (_, i) => (
      <FaCircle
        key={i}
        color={i < filledCircles ? "#04ac6a" : "#ccc"}
        className={style["circle-icon"]}
      />
    ));
  };

  // If there was an error during fetch
  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  // While the global loader is active, this component will return null,
  // preventing any attempt to render with incomplete data.
  if (!event) {
    return null;
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
              <div
                className={`${style["flex-package-details"]} d-flex flex-column flex-lg-row`}
              >
                <span>
                  {renderRatingCircles()}
                  <p className="mrg_left">
                    <a href="#0" className="text_underline">
                      {eventRatings?.total_ratings || 0} reviews
                    </a>
                  </p>
                </span>
                <div className="d-flex align-items-start gap-2 mb-3">
                  <span>
                    <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                    Recommended by 
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
                          <img
                            src="/images/placeholder.jpg"
                            className="col-6"
                            alt="placeholder"
                          />
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
              <h3>
                {relatedEvents.length > 0
                  ? "Related Events or Recommendations"
                  : ""}
              </h3>
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
