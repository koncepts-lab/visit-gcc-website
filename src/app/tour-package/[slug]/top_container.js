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
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation"; // MODIFIED: Import useRouter for redirection

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
  const router = useRouter();

  useEffect(() => {
    const fetchPackageData = async () => {
      setLoading(true);
      setError(null);

      try {
        const packageDetailsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}`
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
          `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}/inclusions`
        );
        // //console.log("inclusin", inclusionsResponse.data);
        // --- FIX START ---
        // The API returns an object with a 'data' property which is the array.
        // We need to access response.data.data to get the array.
        setPackageInclusions(inclusionsResponse.data.data || []);
        // --- FIX END ---

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
    const loginToken = localStorage.getItem("auth_token_login");

    if (loginToken) {
      setIsDatePickerPopupOpen(true);
    } else {
      enqueueSnackbar("Please log in to Book.", { variant: "warning" });
      router.push("/login");
    }
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
        <div className="row" style={{ marginLeft: "16px" }}>
          <div className="col-md-7" style={{ padding: "0px" }}>
            <h3>
              {packageDetails.number_of_days} DAYS IN {packageDetails.name}
            </h3>
            <p>
              <Link href="#0">{vendorName || ""}</Link>
            </p>
            <div
              className={`${style["flex-package-details"]} flex-column flex-lg-row`}
            >
              <span className="d-flex flex-row flex-lg-column align-items-start gap-2">
                <div>{packageRatings && renderRatingCircles()}</div>
                <p className="pt-0">
                  {packageRatings?.total_ratings || 0} reviews
                </p>
              </span>
              <span className="mb-2 mb-lg-0 fs-8 fs-lg-7 d-flex align-items-start gap-2">
                <PiSealCheckFill className={style["PiSealCheckFill"]} />{" "}
                Recommended by 99% of travellers{" "}
                <span>
                  <button
                    onClick={handleShareClick}
                    style={{ border: "none", background: "none" }}
                  >
                    <MdIosShare className={style["MdIosShare"]} />
                  </button>
                </span>
              </span>
            </div>
          </div>
          <div className="col-md-6 col-lg-5">
            <div className={style["flex-package-details-right"]}>
              <span className={style["min-w"]}>
                <p>Starting From</p>
                <h5>AED {packageDetails.adult_price} per person</h5>
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
                <button className={style["btn-two"]} onClick={openEnquiryForm}>
                  Contact Seller
                </button>
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
            {/* best picked for you */}
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
            {Array.isArray(packageInclusions) &&
              packageInclusions.length > 0 && (
                <>
                  <h3 className="pt-2">Inclusions</h3>
                  <div className={style["inclusions"]}>
                    {packageInclusions.map((inclusion) => (
                      <span
                        key={inclusion.id}
                        className="d-flex flex-column justify-content-center"
                      >
                        <img
                          src={
                            inclusion.inclusion_icon_url ||
                            "/images/placeholder.jpg"
                          }
                          alt={inclusion.title}
                          className={`mx-auto`}
                          style={{ height: "30px", width: "30px" }}
                        />
                        <div className="clearfix"></div> {inclusion.title}
                      </span>
                    ))}
                  </div>
                </>
              )}
          </div>
          <div className="col-md-5">
            {Array.isArray(packageThemes) && packageThemes.length > 0 && (
              <>
                <h3 className="pt-2">Themes</h3>
                <div className={style["inclusions"]}>
                  {packageThemes.map((theme) => (
                    <span
                      key={theme.id}
                      className="d-flex flex-column justify-content-center"
                    >
                      <img
                        src={theme.theme_icon_url || "/images/placeholder.jpg"}
                        alt={theme.title}
                        className={` mx-auto`}
                        style={{ height: "30px", width: "30px" }}
                      />
                      <div className="clearfix"></div> {theme.title}
                    </span>
                  ))}
                </div>
              </>
            )}
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
