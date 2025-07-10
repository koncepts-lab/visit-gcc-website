"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "../../components/banner/banner";
import Countries from "../../components/countries/countries";
import Carousal from "../../components/carousel/Carousal";
import axios from "axios";
import { useLoading } from "../../components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

function Home() {
  // State for packages, events, blogs, and attractions
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);

  // 2. USE THE LOADER HOOK
  const { setIsLoading } = useLoading();

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true); // 3. SHOW THE LOADER
      setError(null);

      try {
        // Use Promise.all to fetch all data concurrently for better performance
        const [
          packagesResponse,
          eventsResponse,
          blogsResponse,
          attractionsResponse,
        ] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}events`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}attractions`),
        ]);

        // Set state for each data type
        setPackages(packagesResponse.data.data || packagesResponse.data || []);
        setEvents(eventsResponse.data.data || []);
        setBlogs(blogsResponse.data.data || blogsResponse.data || []);
        setAttractions(attractionsResponse.data.data || []);
      } catch (err) {
        console.error("Failed to fetch homepage data:", err);
        setError("Could not load content. Please try refreshing the page.");
      } finally {
        setIsLoading(false); // 4. HIDE THE LOADER after all fetches are done
      }
    };

    fetchAllData();
  }, [setIsLoading]); // Dependency array ensures this runs once on component mount

  // If there was an error, you might want to display a message
  if (error) {
    return (
      <div className="container text-center py-5">
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  // The global loader will cover the screen, so no need for a local loading return
  return (
    <>
      <Banner />
      <Countries />

      {/* home-packages */}
      <div className={style["home-packages"]} style={{ paddingBottom: "0px" }}>
        <div className="container">
          <div className="row" style={{ paddingBlock: "36px" }}>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>GCC Packages</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link
                href="/tour-package"
                className="float-right"
                style={{ fontSize: "17px" }}
              >
                View All
              </Link>
            </div>
            <Carousal packages={packages} count={3} type="home-package" />
          </div>
        </div>
      </div>
      {/* home-packages end */}

      <div className={`container ${style["home-add-banner"]}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img
              src="/images/banner-02.jpg"
              className="lap-view"
              alt="Banner"
            />
            <img
              src="/images/banner-03.jpg"
              className="mobile-view"
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* home-event */}
      <div className={style["home-event"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>Upcoming events</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link
                href="/events"
                className="float-right"
                style={{ fontSize: "17px" }}
              >
                View All
              </Link>
            </div>
            <Carousal events={events} count={3} type="home-event" />
          </div>
        </div>
      </div>
      {/* home-event end */}

      {/* home-experience */}
      <div className={style["home-experience"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3 className="mb-4">Attractions</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 text-right">
              <Link
                href="/attractions"
                className="float-right"
                style={{ fontSize: "17px" }}
              >
                View All
              </Link>
            </div>
            <Carousal
              packages={attractions}
              count={4}
              type="home-attractions"
            />
          </div>
        </div>
      </div>
      {/* home-experience end */}

      <div className={`container ${style["home-add-banner"]}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img
              src="/images/banner-02.jpg"
              className="lap-view"
              alt="Banner"
            />
            <img
              src="/images/banner-03.jpg"
              className="mobile-view"
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* home-blog */}
      <div className={style["home-blog"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>What's On GCC</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link
                href="/blogs"
                className="float-right"
                style={{ fontSize: "17px" }}
              >
                View All
              </Link>
            </div>
            <Carousal blog={blogs} count={4} type="home-blog" />
          </div>
        </div>
      </div>
      {/* home-blog end */}
    </>
  );
}

export default Home;
