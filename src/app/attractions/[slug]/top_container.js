"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { MdIosShare } from "react-icons/md";
import Carousal from "@components/carousel/Carousal";
import axios from "axios";
import EnhancedDatePicker from "./date";
import EnquiryForm from "@components/enquiry-form";
import { useSnackbar } from "notistack"; // Import useSnackbar

// This component is specifically for displaying Attraction details
export default function AttractionTopContainer({ attractionId }) {
  const [attractionDetails, setAttractionDetails] = useState(null);
  const [attractionRatings, setAttractionRatings] = useState(null);
  const [attractionCategories, setAttractionCategories] = useState([]);
  const [attractionFeatures, setAttractionFeatures] = useState([]);

  const [isDatePickerPopupOpen, setIsDatePickerPopupOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { enqueueSnackbar } = useSnackbar(); // Initialize snackbar

  useEffect(() => {
    // ... your existing fetchData logic ...
    console.log("Received attractionId:", attractionId);

    const fetchData = async () => {
      if (!attractionId) {
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
        let authToken =
          localStorage.getItem("auth_token_login") ||
          localStorage.getItem("auth_token_register");
        const headers = authToken
          ? { Authorization: `Bearer ${authToken}` }
          : {};

        const detailsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}attractions/${attractionId}`;
        const detailsResponse = await axios.get(detailsEndpoint, { headers });
        const fetchedDetails =
          detailsResponse.data.data || detailsResponse.data;
        if (!fetchedDetails) throw new Error("No attraction details found.");
        setAttractionDetails(fetchedDetails);

        const ratingsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}attraction-review/${attractionId}/ratings`;
        try {
          const ratingsResponse = await axios.get(ratingsEndpoint, { headers });
          setAttractionRatings(
            ratingsResponse.data.data || ratingsResponse.data || null
          );
        } catch (ratingErr) {
          console.warn(
            `No ratings for attraction ID ${attractionId}:`,
            ratingErr.response?.data || ratingErr.message
          );
          setItemRatings(null); // Corrected: setAttractionRatings
        }

        const categoriesPromise = axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attraction-categories/attraction/get-by-attraction?attraction_id=${attractionId}`,
          { headers }
        );
        const featuresPromise = axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attraction-features/attraction/get-by-attraction?attraction_id=${attractionId}`,
          { headers }
        );

        const [categoriesResponse, featuresResponse] = await Promise.all([
          categoriesPromise,
          featuresPromise,
        ]);

        setAttractionCategories(
          categoriesResponse.data.data || categoriesResponse.data || []
        );
        setAttractionFeatures(
          featuresResponse.data.data || featuresResponse.data || []
        );

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch attraction details. Please try again.");
        console.error(
          `Error fetching attraction data for ID ${attractionId}:`,
          err.response?.data || err.message,
          err
        );
        setAttractionDetails(null);
        setLoading(false);
      }
    };

    if (attractionId) {
      fetchData();
    } else {
      setError("Attraction ID is required to fetch details.");
      setLoading(false);
    }
  }, [attractionId]);

  const handleBookNowClick = () => setIsDatePickerPopupOpen(true);
  const handleCloseDatePickerPopup = () => setIsDatePickerPopupOpen(false);
  const openEnquiryForm = () => setIsEnquiryFormOpen(true);
  const closeEnquiryForm = () => setIsEnquiryFormOpen(false);

  // --- Share Functionality ---
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      const currentUrl = window.location.href;
      try {
        await navigator.clipboard.writeText(currentUrl);
        enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
      } catch (err) {
        console.error("Failed to copy URL: ", err);
        enqueueSnackbar("Failed to copy link.", { variant: "error" });
      }
    } else {
      // Fallback for older browsers or non-secure contexts (though less common now)
      enqueueSnackbar("Sharing not supported on this browser.", {
        variant: "warning",
      });
    }
  };
  // --- End of Share Functionality ---

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

  const photos =
    attractionDetails.photo_urls ||
    attractionDetails.photos ||
    attractionDetails.images ||
    [];
  const formattedPhotos = photos.map((photo, index) => ({
    image: typeof photo === "string" ? photo : photo.url,
    heading: attractionDetails.name || "Attraction Image",
    description:
      attractionDetails.short_description ||
      attractionDetails.caption ||
      attractionDetails.name ||
      "Detail image",
    id: `carousel-photo-${index}`,
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
              <span className="d-flex align-items-center mb-2">
                {/* --- Updated Share Button --- */}
                <button
                  className="btn btn-light btn-sm p-1 border-0"
                  title="Share this page"
                  onClick={handleShare} // Attach the handler
                >
                  <MdIosShare size={20} className="text-secondary" />
                </button>
                {/* --- End of Updated Share Button --- */}
              </span>
            </div>
          </div>
          {/* ... rest of your JSX ... */}
          <div className="col-lg-5 col-md-12">
            <div
              className={`${style["flex-package-details-right"]} mt-3 mt-lg-0`}
            >
              {(attractionDetails.entry_fee || attractionDetails.price) && (
                <span
                  className={`${style["min-w"]} text-end mb-2 mb-md-0 me-md-3`}
                >
                  <p className="text-muted small mb-0">Entry Fee</p>
                  <h5 className="fw-bold" style={{ color: "#007bff" }}>
                    $
                    {parseFloat(
                      attractionDetails.entry_fee || attractionDetails.price
                    ).toFixed(2)}
                  </h5>
                </span>
              )}
              <span className="mb-2 mb-md-0 me-md-2">
                <button
                  className={`${style["btn-one"]} btn btn-primary w-100`}
                  onClick={handleBookNowClick}
                >
                  Get Tickets
                </button>
              </span>
              <span>
                <button
                  className={`${style["btn-two"]} btn btn-outline-secondary w-100`}
                  onClick={openEnquiryForm}
                >
                  Enquire Now
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
                    items={formattedPhotos}
                    count={1}
                    type="item-details-gallery"
                    showHeadings={false}
                  />
                ) : (
                  <div className="text-center p-5 border rounded bg-light">
                    <p className="mb-0 text-muted">No images available.</p>
                  </div>
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
              <Link
                href={`/attractions/${attractionId}/details`} // Corrected to attractionId
                className="text-primary text-decoration-none"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-4 pt-3 border-top">
          <div className={`col-md-7 ${style["border-right"]}`}>
            <h3
              className="pt-2 mb-3 fw-semibold"
              style={{ fontSize: "1.25rem" }}
            >
              Key Features
            </h3>
            {attractionFeatures.length > 0 ? (
              <div className={`${style["inclusions"]} d-flex flex-wrap`}>
                {attractionFeatures.map((feature) => (
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
                      }
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
                ))}
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
                {attractionCategories.map((category) => (
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
                      }
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
                ))}
              </div>
            ) : (
              <p className="text-muted">No specific categories listed.</p>
            )}
          </div>
        </div>
      </div>

      {isDatePickerPopupOpen && (
        <div className={style["popup-overlay"]}>
          <EnhancedDatePicker
            itemId={attractionId}
            itemType="attractions"
            itemName={itemName}
            onClose={handleCloseDatePickerPopup}
          />
        </div>
      )}
      {isEnquiryFormOpen && (
        <EnquiryForm
          isOpen={isEnquiryFormOpen}
          onClose={closeEnquiryForm}
          itemId={attractionId}
          itemType="attractions"
          itemName={itemName}
        />
      )}
    </div>
  );
}
