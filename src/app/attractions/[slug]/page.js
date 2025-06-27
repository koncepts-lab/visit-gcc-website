"use client"; // Add this if you need hooks or client-side functionalities here

import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css"; // Ensure correct path for styles
import Banner from "@components/banner/banner"; // Ensure correct path
import axios from "axios";
import Carousal from "@components/carousel/Carousal"; // Ensure correct path
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import HighlightTab from "@components/tour-package-details/highlight-tab"; // Ensure correct path
import PackageInclusionsAndExclusions from "@components/tour-package-details/package-inclusions";
import RatingCarousel from "@components/tour-package-details/RatingCarousel";
import Top_container from "./top_container";
import { useParams } from "next/navigation";
import Map from "@components/map/Map";

function Page() {
  const params = useParams();
  const slug = params?.slug;
  const [slugpackage, setSlugPackage] = useState([]);
  const [allPackage, setAllPackage] = useState([]);
  // const [legends, setLegends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedAttractions, setRelatedAttractions] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/${slug}`
        );

        const singlePackageData = response.data.data || response.data || [];
        console.log("packages Data:", singlePackageData);
        setSlugPackage(singlePackageData);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchPackageData();
  }, [slug]);

  useEffect(() => {
    const fetchAllPackage = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions`
        );

        const AllPackage = response.data.data || response.data || [];
        console.log("packages Data:", AllPackage);
        setAllPackage(AllPackage);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchAllPackage();
  }, []);

  // useEffect(() => {
  //   const fetchLegends = async () => {
  //     if (!slug) return;

  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}legends/package/${slug}/get-by-package`
  //       );

  //       const legendsData = response.data.legends || [];
  //       setLegends(legendsData);
  //     } catch (err) {
  //       console.error("Error fetching legends:", err);
  //     }
  //   };

  //   fetchLegends();
  // }, [slug]);
  useEffect(() => {
    const fetchRelatedAttractions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/related/${slugpackage.id}`
        );
        setRelatedAttractions(response.data);
      } catch (err) {
        console.error("Error fetching related attractions:", err);
      }
    };
    fetchRelatedAttractions();
  }, [slug]);
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
          <div className={`col-md-12 ${style["pdb-3"]}`}>
            <PackageInclusionsAndExclusions packageId={slug} />
          </div>
        </div> */}

        <div className="container">
          <div className="row pt-5">
            <div key={slugpackage.id} className="col-md-12">
              <h3>Note</h3>
              <p>{slugpackage.note}</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={`row ${style["ptb-30"]}`}>
            <div className="col-md-12">
              <h3>Location</h3>
            </div>
          </div>

          {/* <div className={`row ${style["Legend-ul"]}`}>
            <div className="col-md-8">
              <img src={slugpackage.map_url} alt="Bahrain" />
            </div>
            <div className="col-md-4">
              <h4>Legend</h4>
              <ul>
                {legends.map((legend) => (
                  <li key={legend.uuid_id}>
                    <img
                      src={legend.legend_icon_url}
                      alt={legend.title}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                      }}
                    />
                    <span>{legend.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
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
