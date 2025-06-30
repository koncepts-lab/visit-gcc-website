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
  const [legends, setLegends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/${slug}`
        );

        const singlePackageData = response.data.data || response.data || [];
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
          `${process.env.NEXT_PUBLIC_API_URL}packages`
        );

        const AllPackage = response.data.data || response.data || [];
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

        {/* <div className="container">
          <div className={`col-md-12 ${style["pdb-3"]}`}>
            <PackageInclusionsAndExclusions packageId={slugpackage.id} />
          </div>
        </div> */}

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
