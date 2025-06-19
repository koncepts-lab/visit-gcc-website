"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import { BeatLoader } from "react-spinners";
import style from "./style.module.css";
import {
  IoChatbubbleOutline,
  IoTicketOutline,
  IoBusOutline,
} from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import {
  MdOutlineDinnerDining,
  MdOutlineEmojiPeople,
  MdDownhillSkiing,
} from "react-icons/md";
import { GiSailboat } from "react-icons/gi";
import axios from "axios";

const TourPackageTab = ({
  packages,
  tour_category,
  breakPoints,
  type = "packages",
}) => {
  const [activeTab, setActiveTab] = useState("default");
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [iconsData, setIconsData] = useState({});
  const [ratingsData, setRatingsData] = useState({});
  const [vendorData, setVendorData] = useState({});
  const [masonryLoading, setMasonryLoading] = useState(false);

  const [isParentFiltered, setIsParentFiltered] = useState(false);

  const allTab = { title: "All Default", uuid_id: "default" };
  const allTabs = [allTab, ...tour_category];
  // Declare authToken outside the useEffect to avoid redeclaration on each render
  const authToken =
    localStorage.getItem("auth_token_login") ||
    localStorage.getItem("auth_token_register");

  useEffect(() => {
    if (packages && packages.length > 0) {
      setIsParentFiltered(true);
      setFilteredPackages(packages);
    }
  }, [packages]);

  useEffect(() => {
    if (activeTab === "default") {
      setFilteredPackages(packages);
    } else {
      const fetchFilteredPackages = async () => {
        setIsLoading(true);
        setMasonryLoading(true);
        setError(null);

        try {
          if (!authToken) {
            setError("Authentication token not found");
            setIsLoading(false);
            setMasonryLoading(false);
            return;
          }

          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}tour-categories/category/get-by-category?tour_category_id=${activeTab}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          const categoryPackages = response.data.data || response.data || [];

          if (isParentFiltered && packages.length > 0) {
            const parentPackageIds = new Set(packages.map((pkg) => pkg.id));
            const combinedPackages = categoryPackages.filter((pkg) =>
              parentPackageIds.has(pkg.id)
            );
            setFilteredPackages(combinedPackages);
          } else {
            setFilteredPackages(categoryPackages);
          }

          setIsLoading(false);
          setMasonryLoading(false);
        } catch (err) {
          setIsLoading(false);
          setMasonryLoading(false);
          setError("Failed to fetch filtered packages. Please try again.");
          console.error("Error fetching filtered packages:", err);
        }
      };
      fetchFilteredPackages();
    }
  }, [activeTab, packages, isParentFiltered]);

  useEffect(() => {
    const fetchIcons = async (packageId) => {
      try {
        if (!authToken) {
          console.error("Authentication token not found for icons");
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}icon/${packageId}/get-by-package`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setIconsData((prevIconsData) => ({
          ...prevIconsData,
          [packageId]: response.data || [],
        }));
      } catch (err) {
        console.error(`Error fetching icons for package ${packageId}:`, err);
      }
    };

    const fetchRatings = async (packageId) => {
      try {
        if (!authToken) {
          console.error("Authentication token not found for ratings");
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}package-review/${packageId}/ratings`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setRatingsData((prevRatingsData) => ({
          ...prevRatingsData,
          [packageId]: response.data.data || {},
        }));
      } catch (err) {
        console.error(`Error fetching ratings for package ${packageId}:`, err);
      }
    };

    const fetchVendorInfo = async (packageId, vendorId) => {
      if (!vendorId) {
        console.error(`No vendor ID found for package ${packageId}`);
        return;
      }

      try {
        if (!authToken) {
          console.error("Authentication token not found for vendor info");
          return;
        }

        // Step 1: Fetch vendor details using vendor_id
        const vendorResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}vendors/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const vendorData = vendorResponse.data;
        const userId = vendorData.user_id;

        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}app/get-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const userData = userResponse.data;

        const vendorName = `${userData.first_name} ${userData.last_name}`;

        setVendorData((prevVendorData) => ({
          ...prevVendorData,
          [packageId]: vendorName,
        }));
      } catch (err) {
        console.error(
          `Error fetching vendor info for package ${packageId}:`,
          err
        );
      }
    };

    filteredPackages.forEach((pkg) => {
      if (!iconsData[pkg.id]) {
        fetchIcons(pkg.id);
      }
      if (!ratingsData[pkg.id]) {
        fetchRatings(pkg.id);
      }
      if (!vendorData[pkg.id] && pkg.vendor_id) {
        fetchVendorInfo(pkg.id, pkg.vendor_id);
      }
    });
  }, [filteredPackages, authToken]);
  if (isLoading) {
    return <div className="text-center py-4">Loading packages...</div>;
  }

  if (error) {
    return <p className="text-center text-danger py-4">Error: {error}</p>;
  }

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
                      >
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>

                {masonryLoading ? (
                  <div className="text-center py-5">
                    <BeatLoader
                      color={"#0000FF"}
                      loading={masonryLoading}
                      size={15}
                    />
                  </div>
                ) : filteredPackages.length === 0 ? (
                  <div className="text-center py-5">
                    <p>
                      No packages match the selected filters. Try changing your
                      selection.
                    </p>
                  </div>
                ) : (
                  <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
                    <Masonry>
                      {filteredPackages.map((pkg) => (
                        <div key={pkg.id} className="masonry-item">
                          <img
                            src={
                              pkg.photo_urls && pkg.photo_urls.length > 0
                                ? pkg.photo_urls[0]
                                : "/images/placeholder.jpg"
                            }
                            style={{ width: "100%", display: "block" }}
                            alt={pkg.name}
                          />
                          <div className="tour-pakage-masonry-item-content">
                            <h5>{pkg.name}</h5>
                            <div className={style["provider-date"]}>
                              {/* <p>{vendorData[pkg.id] || "Loading vendor..."}</p>{" "}
                              &nbsp; | &nbsp; */}
                              <p>
                                {new Date(pkg.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            {/* <div className={style["star-section"]}>
                              <div className={style["star"]}>
                                <Rating
                                  count={5}
                                  value={
                                    ratingsData[pkg.id]?.average_rating || 0
                                  }
                                  size={24}
                                  activeColor="#ffd700"
                                  edit={false}
                                />
                              </div>
                              <div>
                                <IoChatbubbleOutline />
                              </div>
                              <div>
                                <FaRegLightbulb />
                              </div>
                            </div> */}

                            <ul className={style["pakages-ul"]}>
                              {iconsData[pkg.id]?.map((icon) => (
                                <li className="d-flex pe-2" key={icon.uuid_id}>
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
                                <span className="fw-bold">
                                  AED {pkg.adult_price}
                                </span>
                                /person
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                )}
              </div>
            </div>
          </div>
        </div>

        {filteredPackages.length > 0 && (
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
