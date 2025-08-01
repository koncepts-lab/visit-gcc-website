"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import axios from "axios";
import Carousal from "@components/carousel/Carousal";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import HighlightTab from "@components/tour-package-details/highlight-tab";
import PackageInclusionsAndExclusions from "@components/tour-package-details/package-inclusions";
import RatingCarousel from "@components/tour-package-details/RatingCarousel";
import Top_container from "./top_container";
import { useParams } from "next/navigation";
import Map from "@components/map/Map";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const [slugpackage, setSlugPackage] = useState(null); // Initialize as null
  const [allPackage, setAllPackage] = useState([]);
  const [error, setError] = useState(null);
  const [relatedAttractions, setRelatedAttractions] = useState([]);

  // 2. USE THE LOADER HOOK
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (!slug) return;

    const fetchPageData = async () => {
      setIsLoading(true); // 3. SHOW THE LOADER
      setError(null);

      try {
        // Fetch the main attraction details first
        const attractionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/${slug}`
        );
        const singlePackageData =
          attractionResponse.data.data || attractionResponse.data || null;

        if (!singlePackageData) {
          throw new Error("Attraction not found.");
        }

        setSlugPackage(singlePackageData);

        // Now fetch all related data concurrently
        await Promise.all([
          // Fetch "all attractions" for other carousels/uses if needed
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}attractions`)
            .then((res) => {
              setAllPackage(res.data.data || res.data || []);
            }),
          // Fetch related attractions based on the ID of the current attraction
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}attractions/related/${singlePackageData.id}`
            )
            .then((res) => {
              setRelatedAttractions(res.data || []);
            }),
        ]);
      } catch (err) {
        console.error("Error fetching attraction page data:", err);
        setError("Failed to load attraction details. Please try again.");
      } finally {
        setIsLoading(false); // 4. HIDE THE LOADER
      }
    };

    fetchPageData();
  }, [slug, setIsLoading]);

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  // The loader will cover the screen, so we can return null or a minimal skeleton
  // while the initial data is being fetched.
  if (!slugpackage) {
    return null;
  }

  return (
    <>
      <Banner />
      <section className={style["tour-package-details"]}>
        <div>
          <Top_container packageId={slug} type="attractions" />
        </div>

        <div className={`container ${style["time"]}`}>
          <div className="row">
            <div className="col-md-12">
              {slugpackage.id && (
                <HighlightTab itemId={slug} itemType="attractions" />
              )}
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className="row pt-5">
            <div key={slugpackage.id} className="col-md-12">
              <h3>Note</h3>
              <p>{slugpackage.note}</p>
            </div>
          </div>
        </div> */}

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
              <RatingCarousel packageId={slugpackage.id} type="attraction" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row pt-5">
            <div className="col-md-12">
              <h3>
                {relatedAttractions.length > 0 ? "Related Attractions" : ""}
              </h3>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row pt-2">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={relatedAttractions}
                count={5}
                type="attraction-details-other-packages"
              />
            </div>
          <Link href="/attractions">
              <button className={style["btn-three"]}>View All</button>
              </Link>
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
