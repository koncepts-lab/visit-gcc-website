"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import { BeatLoader } from "react-spinners";
import style from "./style.module.css";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import axios from "axios";

const TourPackageTab = ({
  packages,
  tour_category,
  breakPoints,
  type = "packages",
}) => {
  const [activeTab, setActiveTab] = useState("default");
  const [filteredPackages, setFilteredPackages] = useState(packages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for secondary data (icons, ratings, vendors)
  const [iconsData, setIconsData] = useState({});
  const [ratingsData, setRatingsData] = useState({});
  const [vendorData, setVendorData] = useState({});

  // Prepare tabs, ensuring "All Default" is always first
  const allTab = { title: "All Default", uuid_id: "default" };
  const allTabs = [allTab, ...(tour_category || [])];

  // This is the main effect for handling filtering logic
  useEffect(() => {
    if (activeTab === "default") {
      setFilteredPackages(packages || []);
    }
  }, [packages, activeTab]);

  // This effect handles fetching data when a new tab is selected
  useEffect(() => {
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");

    if (activeTab === "default") {
      setFilteredPackages(packages || []);
      return;
    }

    const fetchFilteredPackages = async () => {
      setIsLoading(true);
      setError(null);
      setFilteredPackages([]);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages?tour_category_id[]=${activeTab}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const categoryPackages = response.data.data || response.data || [];
        setFilteredPackages(categoryPackages);
      } catch (err) {
        setError("Failed to fetch packages. Please try again.");
        console.error("Error fetching filtered packages:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredPackages();
  }, [activeTab]);

  // This effect fetches secondary details and is now fully protected against loops
  useEffect(() => {
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");

    const fetchIcons = async (packageId) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}icons/${packageId}/get-by-package`
        );
        setIconsData((prev) => ({ ...prev, [packageId]: response.data || [] }));
      } catch (err) {
        console.error(`Error fetching icons for package ${packageId}:`, err);
        // **FIX**: Mark as attempted (with null) to prevent re-fetching on error
        setIconsData((prev) => ({ ...prev, [packageId]: null }));
      }
    };

    const fetchRatings = async (packageId) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}package-review/${packageId}/ratings`
        );
        setRatingsData((prev) => ({
          ...prev,
          [packageId]: response.data.data || {},
        }));
      } catch (err) {
        console.error(`Error fetching ratings for package ${packageId}:`, err);
        // **FIX**: Mark as attempted (with null) to prevent re-fetching on error
        setRatingsData((prev) => ({ ...prev, [packageId]: null }));
      }
    };

    const fetchVendorInfo = async (packageId, vendorId) => {
      if (!vendorId || !authToken) {
        setVendorData((prev) => ({ ...prev, [packageId]: null })); // Mark as done if no vendorId
        return;
      }

      try {
        const vendorResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}vendors/${vendorId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const userId = vendorResponse.data?.user_id;

        if (!userId) {
          // **FIX**: Mark as attempted even if no user_id is found
          setVendorData((prev) => ({ ...prev, [packageId]: null }));
          return;
        }

        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}app/get-user/${userId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const userData = userResponse.data;
        const vendorName = `${userData.first_name} ${userData.last_name}`;

        setVendorData((prev) => ({ ...prev, [packageId]: vendorName }));
      } catch (err) {
        console.error(
          `Error fetching vendor info for package ${packageId}:`,
          err
        );
        // **FIX**: Mark as attempted (with null) to prevent re-fetching on error
        setVendorData((prev) => ({ ...prev, [packageId]: null }));
      }
    };

    if (filteredPackages && filteredPackages.length > 0) {
      filteredPackages.forEach((pkg) => {
        // **FIX**: The check and the function's catch block work together to prevent loops.
        // This logic is now applied to all three data types.
        if (iconsData[pkg.id] === undefined) fetchIcons(pkg.id);
        if (ratingsData[pkg.id] === undefined) fetchRatings(pkg.id);
        if (vendorData[pkg.id] === undefined && pkg.vendor_id)
          fetchVendorInfo(pkg.id, pkg.vendor_id);
      });
    }
  }, [filteredPackages]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-5">
          <BeatLoader color={"#0000FF"} loading={isLoading} size={15} />
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-danger py-4">{error}</p>;
    }

    if (!filteredPackages || filteredPackages.length === 0) {
      return (
        <div className="text-center py-5">
          <p>No packages found. Try selecting a different category.</p>
        </div>
      );
    }

    return (
      <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
        <Masonry>
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="masonry-item">
              <img
                src={pkg?.photo_urls?.[0] || "/images/placeholder.jpg"}
                style={{ width: "100%", minHeight: "268px", display: "block" }}
                alt={pkg.name}
              />
              <div
                className="tour-pakage-masonry-item-content"
                style={{
                  height: "100%",
                  position: "absolute",
                  bottom: "0px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                  gap: "8px",
                }}
              >
                <h5>{pkg.name}</h5>
                <div className={style["provider-date"]}>
                  {new Date(pkg.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                </div>
                {/* Render ratings only if data exists (is not null or undefined) */}
                {ratingsData[pkg.id] && (
                  <Rating
                    count={5}
                    value={ratingsData[pkg.id]?.average_rating || 0}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                )}
                {/* Render icons only if data exists and is an array with items */}
                {iconsData[pkg.id] && iconsData[pkg.id].length > 0 && (
                  <ul className={style["pakages-ul"]}>
                    {iconsData[pkg.id].map((icon) => (
                      <li className="d-flex flex-column gap-1" key={icon.uuid_id}>
                        <img
                          src={icon.icon_image_url}
                          alt={icon.icon_title}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "5px",
                          }}
                        />
                        {icon.icon_title}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <Link
                    href={
                      type === "attractions"
                        ? `/attractions/${pkg.id}`
                        : `/tour-package/${pkg.id}`
                    }
                    className={`${style["r-button"]} mx-0`}
                  >
                    Read More
                  </Link>
                  <div style={{ width: "fit-content" }}>
                    <span className="fw-bold">AED {pkg.adult_price}</span>
                    /person
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    );
  };

  return (
    <section className={style.innerpage}>
      <div className={`container-fluid ${style["pr-0"]}`}>
        <div className="row pb-2">
          <div className="col-md-12">
            <div className={`pr-0 ${style["country-container-box"]}`}>
              <div className={style["country-container"]}>
                <ul
                  className={`nav nav-tabs border-0 ${style["country-nav-tabs"]}`}
                  id="tourPackageTab"
                  role="tablist"
                >
                  {allTabs.map((tab) => (
                    <li
                      key={tab.uuid_id}
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${
                          style["country-nav-link"]
                        } ${activeTab === tab.uuid_id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.uuid_id)}
                        type="button"
                        role="tab"
                        disabled={isLoading}
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>

        {!isLoading && filteredPackages && filteredPackages.length > 0 && (
          <div className="row">
            <div className="col-md-12 text-center mt-4 mb-5">
              <button className={style["btn-one"]}>Show Me More</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TourPackageTab;
