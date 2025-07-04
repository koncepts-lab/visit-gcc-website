"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import Carousal from "@components/carousel/Carousal";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import HighlightTab from "@components/tour-package-details/highlight-tab";
import PackageInclusionsAndExclusions from "@components/tour-package-details/package-inclusions";
import RatingCarousel from "@components/tour-package-details/RatingCarousel";
import Top_container from "./top_container";
import Map from "@components/map/Map";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const { setIsLoading } = useLoading(); // 2. USE THE LOADER HOOK

  // All your original state declarations are preserved
  const [slugpackage, setSlugPackage] = useState(null); // Initialize as null
  const [allPackage, setAllPackage] = useState([]);
  const [legends, setLegends] = useState([]);
  const [error, setError] = useState(null);

  // 3. CONSOLIDATED USEEFFECT FOR ALL INITIAL PAGE DATA
  useEffect(() => {
    if (!slug) return;

    const fetchAllPageData = async () => {
      setIsLoading(true); // SHOW LOADER
      setError(null);

      try {
        // Wait for all essential data to be fetched
        const [packageResponse, allPackageResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages/${slug}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`),
          // You can add back the legends fetch here if needed
          // axios.get(`${process.env.NEXT_PUBLIC_API_URL}legends/package/${slug}/get-by-package`)
        ]);

        const singlePackageData =
          packageResponse.data.data || packageResponse.data || null;
        if (!singlePackageData) {
          throw new Error("Package not found.");
        }

        setSlugPackage(singlePackageData);
        setAllPackage(
          allPackageResponse.data.data || allPackageResponse.data || []
        );
        // setLegends(legendsResponse.data.legends || []);
      } catch (err) {
        console.error("Error fetching page data:", err);
        setError("Failed to fetch package details. Please try again.");
      } finally {
        setIsLoading(false); // HIDE LOADER
      }
    };

    fetchAllPageData();
  }, [slug, setIsLoading]);

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  // While the global loader is active, this component will return null
  if (!slugpackage) {
    return null;
  }

  return (
    <>
      <Banner />
      <section className={style["tour-package-details"]}>
        <div>
          <Top_container packageId={slug} type="packages" />
        </div>

        <div className={`container`}>
          <div className="row">
            <div className="col-md-12">
              {slugpackage.id && (
                <HighlightTab itemId={slugpackage.id} itemType="packages" />
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className={`row ${style["ptb-30"]}`}>
            <div className="col-md-12">
              <h3>Location</h3>
            </div>
          </div>
          <Map
            latitude={slugpackage.latitude}
            longitude={slugpackage.longitude}
          />
        </div>

        <div className="container">
          <div className="row pt-3">
            <div className="col-md-8">
              <RatingCarousel packageId={slug} type="package" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h3>Other Packages</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={allPackage}
                count={5}
                type="pakage-details-other-packages"
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
    </>
  );
}

export default Page;
