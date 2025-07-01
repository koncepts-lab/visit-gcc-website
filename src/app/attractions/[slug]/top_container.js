"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css"; // Your existing style module
import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { MdIosShare } from "react-icons/md";
import Carousal from "@components/carousel/Carousal"; // Reusing your Carousel
import axios from "axios";
import EnhancedDatePicker from "./date"; // Reusing your DatePicker
import EnquiryForm from "@components/enquiry-form"; // Reusing your EnquiryForm
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation"; // MODIFIED: Import useRouter for redirection

// This component is now specifically for displaying Attraction details
export default function AttractionTopContainer({ packageId }) {
  // Renamed prop for clarity
  const [attractionDetails, setAttractionDetails] = useState(null);
  const [attractionRatings, setAttractionRatings] = useState(null);
  // These will hold attraction-specific associated data like categories and features
  const [attractionCategories, setAttractionCategories] = useState([]);
  const [attractionFeatures, setAttractionFeatures] = useState([]);

  const [isDatePickerPopupOpen, setIsDatePickerPopupOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // MODIFIED: Instantiate the router

  useEffect(() => {
    //console.log("Received packageId:", packageId);

    const fetchData = async () => {
      if (!packageId) {
        setError("Attraction ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setAttractionDetails(null);
      setAttractionRatings(null);
      setAttractionCategories([]);
      setAttractionFeatures([]);

      try {
        // 1. Fetch Attraction Details
        const detailsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}attractions/${packageId}`;
        //console.log(`Fetching attraction details from: ${detailsEndpoint}`);
        const detailsResponse = await axios.get(detailsEndpoint); // No token needed as per previous requests
        const fetchedDetails =
          detailsResponse.data.data || detailsResponse.data;
        if (!fetchedDetails) throw new Error("No attraction details found.");
        setAttractionDetails(fetchedDetails);
        //console.log("Attraction details:", fetchedDetails);

        // 2. Fetch Attraction Ratings (if applicable)
        const ratingsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}attraction-review/${packageId}/ratings`;
        try {
          //console.log(`Fetching attraction ratings from: ${ratingsEndpoint}`);
          const ratingsResponse = await axios.get(ratingsEndpoint); // No token needed
          setAttractionRatings(
            ratingsResponse.data.data || ratingsResponse.data || null
          );
        } catch (ratingErr) {
          console.warn(
            `No ratings for attraction ID ${packageId}:`,
            ratingErr.response?.data || ratingErr.message
          );
          setAttractionRatings(null);
        }

        // Other fetches are commented out as per your original code
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attraction details. Please try again.");
        console.error(
          `Error fetching attraction data for ID ${packageId}:`,
          err.response?.data || err.message,
          err
        );
        setAttractionDetails(null);
        setLoading(false);
      }
    };

    if (packageId) {
      fetchData();
    } else {
      setError("Attraction ID is required to fetch details.");
      setLoading(false);
    }
  }, [packageId]);

  const handleBookNowClick = () => {
    const loginToken = localStorage.getItem("auth_token_login");

    if (loginToken) {
      setIsDatePickerPopupOpen(true);
    } else {
      enqueueSnackbar("Please log in to Book.", { variant: "warning" });
      router.push("/login");
    }
  };

  const handleCloseDatePickerPopup = () => setIsDatePickerPopupOpen(false);
  const openEnquiryForm = () => setIsEnquiryFormOpen(true);
  const closeEnquiryForm = () => setIsEnquiryFormOpen(false);

  if (loading)
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="container text-center py-5 alert alert-danger">
        Error: {error}
      </div>
    );
  if (!attractionDetails)
    return (
      <div className="container text-center py-5 text-muted">
        Attraction details not found.
      </div>
    );
  const formattedPhotos = (attractionDetails.photo_urls || []).map((photo) => ({
    image: photo || "/images/placeholder.jpg", // Add placeholder if 'photo' is falsy
    heading: attractionDetails.name,
    description: attractionDetails.description,
  }));

  const renderRatingCircles = () => {
    if (
      !attractionRatings ||
      typeof attractionRatings.average_rating === "undefined"
    )
      return <span className="text-muted small">No ratings yet</span>;
    const averageRating = parseFloat(attractionRatings.average_rating) || 0;
    const filledCircles = Math.round(averageRating);
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        <FaCircle
          key={i}
          color={i < filledCircles ? "#04ac6a" : "#e0e0e0"}
          size={14}
          className="me-1"
        />
      );
    }
    return circles;
  };

  const itemName = attractionDetails.name || "Attraction";
  const itemTitleText =
    attractionDetails.city && attractionDetails.country
      ? `${itemName.toUpperCase()} - ${
          attractionDetails.city.name || attractionDetails.city
        }, ${attractionDetails.country.name || attractionDetails.country}`
      : itemName.toUpperCase();

  const itemDescription =
    attractionDetails.description ||
    attractionDetails.overview ||
    "No detailed description available.";
  const operatorName =
    attractionDetails.operator_name || attractionDetails.venue_name || null;
  const operatorId =
    attractionDetails.operator_id || attractionDetails.venue_id || null;

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
    <div>
      <div className={`container ${style["container-package-details"]}`}>
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <h3 className="fw-bold mb-1" style={{ fontSize: "1.75rem" }}>
              {itemTitleText}
            </h3>
            {operatorName && (
              <p className="mb-2 small text-muted">
                Operated by:
                {operatorId ? (
                  <Link
                    href={`/operators/${operatorId}`}
                    className="text-primary text-decoration-none"
                  >
                    {operatorName}
                  </Link>
                ) : (
                  <span>{operatorName}</span>
                )}
              </p>
            )}
            <div className={`${style["flex-package-details"]} flex-wrap`}>
              <span className="d-flex align-items-center me-3 mb-2">
                {renderRatingCircles()}
                <p className="pt-0 mb-0 ms-2 text-muted small">
                  ({attractionRatings?.total_ratings || 0} reviews)
                </p>
              </span>
              {attractionDetails.recommendation_percentage && (
                <span className="d-flex align-items-center me-3 mb-2 text-muted small">
                  <PiSealCheckFill className="text-success me-1" size={18} />
                  Recommended by {attractionDetails.recommendation_percentage}%
                  of travellers
                </span>
              )}
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
          <div className="col-lg-5 col-md-12">
            <div
              className={`${style["flex-package-details-right"]} mt-3 mt-lg-0`}
            >
              <span className={style["min-w"]}>
                <p>Starting From</p>
                <h5>AED {attractionDetails.adult_price} per person</h5>
              </span>
              <span className="mb-2 mb-md-0 me-md-2">
                <button
                  className={`${style["btn-one"]}`}
                  onClick={handleBookNowClick}
                >
                  Book Now
                </button>
              </span>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-7 col-md-12">
            <section className={style["package-best-picked"]}>
              <div className={style["review-img-container"]}>
                {formattedPhotos.length > 0 ? (
                  <Carousal
                    packageDetailsReview={formattedPhotos}
                    count={1}
                    type="tour-package-details-reviews"
                  />
                ) : (
                  <img src="/images/placeholder.jpg" className="col-6" />
                )}
              </div>
            </section>
          </div>
          <div className="col-lg-5 col-md-12 align-items-start">
            <div className={`${style["mobile-mrb"]} mt-3 mt-lg-0 ps-lg-3`}>
              <h3 className="fw-bold" style={{ fontSize: "1.5rem" }}>
                {itemName}
              </h3>
              <p
                className="text-muted"
                style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
              >
                {itemDescription}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="row mt-4 pt-3 border-top">
          <div className={`col-md-7 ${style["border-right"]}`}>
            <h3
              className="pt-2 mb-3 fw-semibold"
              style={{ fontSize: "1.25rem" }}
            >
              Key Features
            </h3>
            {attractionFeatures.length > 0 ? (
              <div className={`${style["inclusions"]} d-flex flex-wrap`}>
                {" "}
                {attractionFeatures.map(
                  (
                    feature // Changed from inclusion to feature
                  ) => (
                    <span
                      key={feature.id || feature.title}
                      className="d-flex flex-column align-items-center text-center mb-3 me-3 p-2 border rounded"
                      style={{ width: "100px" }}
                    >
                      <img
                        src={
                          feature.feature_icon_url ||
                          feature.icon_url ||
                          "/images/icons/default-feature.png"
                        } // Field name might change
                        alt={feature.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {feature.title}
                      </small>
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-muted">No specific features listed.</p>
            )}
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
            <h3
              className="pt-2 mb-3 fw-semibold"
              style={{ fontSize: "1.25rem" }}
            >
              Categories
            </h3>
            {attractionCategories.length > 0 ? (
              <div className={`${style["inclusions"]} d-flex flex-wrap`}>
                {" "}
                {attractionCategories.map(
                  (
                    category // Changed from theme to category
                  ) => (
                    <span
                      key={category.id || category.title}
                      className="d-flex flex-column align-items-center text-center mb-3 me-3 p-2 border rounded"
                      style={{ width: "100px" }}
                    >
                      <img
                        src={
                          category.category_icon_url ||
                          category.icon_url ||
                          "/images/icons/default-category.png"
                        } // Field name might change
                        alt={category.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {category.title}
                      </small>
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-muted">No specific categories listed.</p>
            )}
          </div>
        </div> */}
      </div>

      {isDatePickerPopupOpen && (
        <div className={style["popup-overlay"]}>
          <EnhancedDatePicker
            // MODIFIED: Prop name changed to reflect it can be any ID
            packageId={packageId}
            type="attraction" // Set type to 'attraction' for the booking API
            onClose={handleCloseDatePickerPopup}
          />
        </div>
      )}
      {isEnquiryFormOpen && (
        <EnquiryForm
          isOpen={isEnquiryFormOpen}
          onClose={closeEnquiryForm}
          itemId={packageId}
          itemType="attractions"
          itemName={itemName}
        />
      )}
    </div>
  );
}

{
  /* <div className="row mt-4 pt-3 border-top">
          <div className={`col-md-7 ${style["border-right"]}`}>
            <h3
              className="pt-2 mb-3 fw-semibold"
              style={{ fontSize: "1.25rem" }}
            >
              Key Features
            </h3>
            {attractionFeatures.length > 0 ? (
              <div className={`${style["inclusions"]} d-flex flex-wrap`}>
                {" "}
                {attractionFeatures.map(
                  (
                    feature // Changed from inclusion to feature
                  ) => (
                    <span
                      key={feature.id || feature.title}
                      className="d-flex flex-column align-items-center text-center mb-3 me-3 p-2 border rounded"
                      style={{ width: "100px" }}
                    >
                      <img
                        src={
                          feature.feature_icon_url ||
                          feature.icon_url ||
                          "/images/icons/default-feature.png"
                        } // Field name might change
                        alt={feature.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {feature.title}
                      </small>
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-muted">No specific features listed.</p>
            )}
          </div>
          <div className="col-md-5 mt-4 mt-md-0">
            <h3
              className="pt-2 mb-3 fw-semibold"
              style={{ fontSize: "1.25rem" }}
            >
              Categories
            </h3>
            {attractionCategories.length > 0 ? (
              <div className={`${style["inclusions"]} d-flex flex-wrap`}>
                {" "}
                {attractionCategories.map(
                  (
                    category // Changed from theme to category
                  ) => (
                    <span
                      key={category.id || category.title}
                      className="d-flex flex-column align-items-center text-center mb-3 me-3 p-2 border rounded"
                      style={{ width: "100px" }}
                    >
                      <img
                        src={
                          category.category_icon_url ||
                          category.icon_url ||
                          "/images/icons/default-category.png"
                        } // Field name might change
                        alt={category.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "contain",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {category.title}
                      </small>
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-muted">No specific categories listed.</p>
            )}
          </div>
        </div> */
}
