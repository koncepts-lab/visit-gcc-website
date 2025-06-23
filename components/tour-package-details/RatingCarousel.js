"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import dynamic from "next/dynamic";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation"; // MODIFIED: Import useRouter

const SlickCarousel = dynamic(() => import("react-slick"), {
  ssr: false,
});

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RatingCarousel({ packageId, type }) {
  // Normalize type to handle case sensitivity
  const normalizedType = typeof type === "string" ? type.toLowerCase() : type;

  // Validate the type prop
  if (!["package", "event", "attraction"].includes(normalizedType)) {
    console.error(
      `Invalid type prop: ${type}. Must be "package", "event", or "attraction".`
    );
    return <div className="text-danger">Invalid component type</div>;
  }

  const maxRating = 5;
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [userRatings, setUserRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter(); // MODIFIED: Initialize the router

  // Determine the API endpoint based on type
  const getApiEndpoint = () => {
    if (normalizedType === "package") return "package-review";
    if (normalizedType === "event") return "event-review";
    if (normalizedType === "attraction") return "attraction-review";
    return "package-review"; // Fallback (shouldn't reach here due to validation)
  };

  useEffect(() => {
    if (packageId) {
      fetchRatings();
    }
  }, [packageId, normalizedType]);

  const fetchRatings = async () => {
    try {
      setIsLoading(true);
      setError("");
      const endpoint = getApiEndpoint();

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${packageId}/ratings`
      );

      if (response.data.success) {
        const apiData = response.data.data || {};
        setOverallRating(parseFloat(apiData.average_rating) || 0);
        setTotalReviews(apiData.total_ratings || 0);

        const formattedRatings = (apiData.ratings || []).map((item) => ({
          id: item.id || `${normalizedType}-${Date.now()}-${Math.random()}`,
          headingIcon: item.user?.first_name?.charAt(0) || "U",
          date: new Date(item.created_at || Date.now()).toLocaleDateString(
            "en-IN",
            {
              timeZone: "Asia/Kolkata",
            }
          ),
          heading: item.user?.first_name || "User",
          description: item.review || "No review provided",
          rating: item.rating || 0,
        }));

        setUserRatings(formattedRatings);
      } else {
        setError(
          `Failed to fetch ${normalizedType} ratings: ${
            response.data.message || "Unknown error"
          }`
        );
      }
    } catch (err) {
      console.error(`Error fetching ${normalizedType} ratings:`, err);
      setError(`Failed to fetch ${normalizedType} ratings.`);
    } finally {
      setIsLoading(false);
    }
  };

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setRatingText(ratingLabels[selectedRating] || "");
  };

  // MODIFIED: This function now checks for authentication before showing the review form
  const handleAddReviewClick = () => {
    const loginToken = localStorage.getItem("auth_token_login");
    const authToken = loginToken;

    if (authToken) {
      setShowRatingInput(true);
    } else {
      enqueueSnackbar("Please log in to add a review.", { variant: "warning" });
      router.push("/login");
    }
  };

  const handleSendReview = async () => {
    if (rating > 0 && reviewText) {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      const authToken = loginToken || registerToken;

      if (!authToken) {
        enqueueSnackbar("Authentication error. Please log in again.", {
          variant: "error",
        });
        router.push("/login");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const endpoint = getApiEndpoint();
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}/${packageId}/rate`,
          {
            rating: rating,
            review: reviewText,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.data.success) {
          enqueueSnackbar("Thank you for your review!", { variant: "success" });
          fetchRatings();
          setRating(0);
          setRatingText("");
          setReviewText("");
          setShowRatingInput(false);
        } else if (response.status === 401) {
          enqueueSnackbar("Please login to submit your review", {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`Failed to submit ${normalizedType} review.`, {
            variant: "error",
          });
        }
      } catch (err) {
        console.error(`Error submitting ${normalizedType} review:`, err);
        enqueueSnackbar(`Failed to submit ${normalizedType} review.`, {
          variant: "error",
        });
        setError(`Failed to submit ${normalizedType} review.`);
      } finally {
        setIsLoading(false);
      }
    } else {
      enqueueSnackbar("Please select a rating and enter your review.", {
        variant: "warning",
      });
    }
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Very good";
    if (rating >= 2.5) return "Average";
    if (rating >= 1.5) return "Fair";
    return "Poor";
  };

  const filledWidth = (overallRating / maxRating) * 100;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ cursor: "pointer" }}
        >
          {i <= rating ? (
            <IoIosStar size={35} style={{ color: "yellow" }} />
          ) : (
            <IoIosStarOutline size={35} />
          )}
        </span>
      );
    }
    return stars;
  };

  const settings = {
    dots: true,
    infinite: userRatings.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: userRatings.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: userRatings.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: userRatings.length > 1,
        },
      },
    ],
  };

  if (isLoading && !showRatingInput && userRatings.length === 0) {
    return (
      <div className="text-center py-5">
        Loading {normalizedType} ratings...
      </div>
    );
  }

  return (
    <>
      <div className="row pt-5">
        <div className="col-md-12">
          <h4>
            {normalizedType === "package"
              ? "User ratings"
              : `${
                  normalizedType.charAt(0).toUpperCase() +
                  normalizedType.slice(1)
                } ratings`}
          </h4>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">
              <IoIosStar color="#FDCC0D" /> {overallRating.toFixed(1)}
               · {getRatingText(overallRating)} · ({totalReviews} reviews)
            </p>
            <button
              className={`${style["tabButton"]}`}
              onClick={handleAddReviewClick}
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className={style["rating-bar-container"]}>
          <div className={style["star-rating"]}>
            <IoIosStar className={style["star-icon"]} />
            <span>{overallRating.toFixed(1)}</span>
          </div>
          <div className={style["progress-bar"]}>
            <div
              className={style["progress"]}
              style={{ width: `${filledWidth}%` }}
            >
              <span className={style["progress-text"]}>
                {overallRating.toFixed(1)} / {maxRating}
              </span>
            </div>
          </div>
          <div className={style["review-count"]}>{totalReviews}</div>
        </div>
      </div>

      {showRatingInput && (
        <div className="d-flex flex-column pt-4">
          <div className="d-flex align-items-center flex-column py-2">
            <div>{renderStars()}</div>
            {ratingText && <span className="ml-2 pt-2">{ratingText}</span>}
          </div>
          <div className="d-flex">
            <textarea
              className={`${style["promo_input"]} col-11`}
              placeholder="Your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              className={`${style["tabButton"]} ms-2`}
              onClick={handleSendReview}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
          {error && showRatingInput && (
            <p className="text-danger mt-2">{error}</p>
          )}
        </div>
      )}

      {error && !showRatingInput && <div className="text-danger">{error}</div>}

      <div className="row pt-5">
        <div className="col-md-8 col-8">
          <h4>
            {normalizedType === "package"
              ? "What guests loved most"
              : `What ${
                  normalizedType === "event" ? "attendees" : "visitors"
                } loved most`}
          </h4>
        </div>
      </div>

      {userRatings.length > 0 ? (
        <SlickCarousel {...settings}>
          {userRatings.map((item) => (
            <div key={item.id} className={`item ${style["item-padding"]}`}>
              <div className={style["country-explore-item"]}>
                <div className={style["country-explore-text"]}>
                  <div className={style["RatingCarousel-top"]}>
                    <h6>{item.headingIcon}</h6>
                    <h4>{item.heading}</h4>
                  </div>
                  <p>{item.description}</p>
                  <div className="clearfix"></div>
                  <div className={style["RatingCarousel-top"]}>
                    Posted: <p>{item.date}</p>
                  </div>
                  <div>
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <IoIosStar
                          key={i}
                          color={i < item.rating ? "#FDCC0D" : "#ccc"}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SlickCarousel>
      ) : (
        <div className="text-center py-4">
          No reviews yet. Be the first to add one!
        </div>
      )}
    </>
  );
}

export default RatingCarousel;
