import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Carousal from "@components/carousel/Carousal";
import axios from "axios";
import EnhancedDatePicker from "./date";
import EnquiryForm from "@components/enquiry-form";

export default function Top_container({ packageId }) {
  const [packageDetails, setPackageDetails] = useState(null);
  const [packageRatings, setPackageRatings] = useState(null);
  const [packageThemes, setPackageThemes] = useState([]);
  const [packageInclusions, setPackageInclusions] = useState([]);
  const [isDatePickerPopupOpen, setIsDatePickerPopupOpen] = useState(false);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vendorName, setVendorName] = useState("");

  useEffect(() => {
    const fetchPackageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const packageDetailsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}`
        );
        console.log(
          "🚀 ~ fetchPackageData ~ packageDetailsResponse:",
          packageDetailsResponse
        );
        setPackageDetails(packageDetailsResponse.data);

        const ratingsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}package-review/${packageId}/ratings`
        );
        setPackageRatings(ratingsResponse.data.data);

        const themesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}themes/package/get-by-package?package_id=${packageId}`
        );
        setPackageThemes(themesResponse.data);

        const inclusionsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}inclusions/package/get-by-package?package_id=${packageId}`
        );
        setPackageInclusions(inclusionsResponse.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch package details. Please try again.");
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackageData();
    }
  }, [packageId]);

  const handleBookNowClick = () => {
    setIsDatePickerPopupOpen(true);
  };

  const handleCloseDatePickerPopup = () => {
    setIsDatePickerPopupOpen(false);
  };

  const openEnquiryForm = () => {
    setIsEnquiryFormOpen(true);
  };

  const closeEnquiryForm = () => {
    setIsEnquiryFormOpen(false);
  };

  if (loading) {
    return <div>Loading package details...</div>;
  }

  if (error) {
    return <div>Error loading package details: {error}</div>;
  }

  if (!packageDetails) {
    return <div>Package details not found.</div>;
  }

  const formattedPhotos = packageDetails.photo_urls.map((photo) => ({
    image: photo,
    heading: packageDetails.name,
    description: packageDetails.description,
  }));

  const renderRatingCircles = () => {
    const averageRating = packageRatings?.average_rating
      ? parseFloat(packageRatings.average_rating)
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

  return (
    <div>
      <div className={`container ${style["container-package-details"]}`}>
        <div className="row">
          <div className="col-md-7">
            <h3>
              {packageDetails.number_of_days} DAYS IN {packageDetails.name}
            </h3>
            <p>
              <Link href="#0">{vendorName || ""}</Link>
            </p>
            <div className={style["flex-package-details"]}>
              <span>
                {packageRatings && renderRatingCircles()}
                <p className="pt-2">
                  {packageRatings?.total_ratings || 0} reviews
                </p>
              </span>
              <span>
                <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                Recommended by 99% of travellers{" "}
                {/* <IoMdInformationCircleOutline
                  className={style["IoMdInformationCircleOutline"]}
                /> */}
              </span>
              <span>
                <MdIosShare className={style["MdIosShare"]} />
                {/* <FaRegHeart className={style["FaRegHeart"]} /> */}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            <div className={style["flex-package-details-right"]}>
              {/* <span className={style["min-w"]}>
                <p>Starting From</p>
                <h5>${packageDetails.adult_price} per person</h5>
              </span> */}
              <span>
                <button
                  className={style["btn-one"]}
                  onClick={handleBookNowClick}
                >
                  Book Now
                </button>
              </span>
              <span>
                <button className={style["btn-two"]} onClick={openEnquiryForm}>
                  Contact Seller
                </button>
                <p className="lap-view">
                  You can now directly communicate with the Seller of this
                  package
                </p>
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
                        packageDetailsReview={formattedPhotos}
                        count={1}
                        type="tour-package-details-reviews"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* best picked for you END */}
          </div>

          <div className="col-md-5 align-items">
            <div className={style["mobile-mrb"]}>
              <h3>{packageDetails.name}</h3>
              <p>{packageDetails.description}</p>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className={`col-md-7 ${style["border-right"]}`}>
            <h3 className="pt-2">Inclusions</h3>
            <div className={style["inclusions"]}>
              {packageInclusions.map((inclusion) => (
                <span key={inclusion.id} className="d-flex flex-column">
                  <img
                    src={inclusion.inclusion_icon_url}
                    alt={inclusion.title}
                    className={style["inclusion-icon"]}
                  />
                  <div className="clearfix"></div> {inclusion.title}
                </span>
              ))}
            </div>
          </div>
          <div className="col-md-5">
            <h3 className="pt-2">Themes</h3>
            <div className={style["inclusions"]}>
              {packagehauserThemes.map((theme) => (
                <span key={theme.id} className="d-flex flex-column">
                  <img
                    src={theme.theme_icon_url}
                    alt={theme.title}
                    className={style["theme-icon"]}
                  />
                  <div className="clearfix"></div> {theme.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isDatePickerPopupOpen && (
        <div className={style["popup-overlay"]}>
          <EnhancedDatePicker
            packageId={packageId}
            onClose={handleCloseDatePickerPopup}
          />
        </div>
      )}

      {isEnquiryFormOpen && (
        <EnquiryForm isOpen={isEnquiryFormOpen} onClose={closeEnquiryForm} />
      )}
    </div>
  );
}
