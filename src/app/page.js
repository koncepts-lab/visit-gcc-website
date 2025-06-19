"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "../../components/banner/banner";
import Countries from "../../components/countries/countries";
import Carousal from "../../components/carousel/Carousal";
import axios from "axios";

function Home() {
  // State for packages and events
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static data for experiences and blogs
  const experienceData = [
    {
      id: 1,
      heading: "Experience 1",
      image: "/images/experience/01.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      heading: "Experience 2",
      image: "/images/experience/02.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      heading: "Experience 3",
      image: "/images/experience/03.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 4,
      heading: "Experience 4",
      image: "/images/experience/04.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const blogResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog`
        );

        const Blogdata = blogResponse.data.data || blogResponse.data || [];
        setBlogs(Blogdata);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch All Blogs. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchAllBlog();
  }, []);
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages`
        );
        const allPackages = response.data.data || response.data || [];
        setPackages(allPackages);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch packages. Please try again.");
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events`
        );

        setEvents(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch packages. Please try again.");
        console.error("Error fetching packages:", err);
      }
    };

    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions`
        );
        setAttractions(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch attractions. Please try again.");
        console.error("Error fetching attractions:", err);
      }
    };
    fetchAttractions();
  }, []);

  return (
    <>
      <Banner />
      <Countries />

      {/* home-packages */}
      <div className={style["home-packages"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>GCC Packages</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/tour-package" className="float-right">
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
              <Link href="/events" className="float-right">
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
              <h3>Attractions</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 text-right">
              <Link href="tour-package" className="float-right">
                View All
              </Link>
            </div>
            <Carousal packages={attractions} count={3} type="home-package" />
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
              <h3>Latest Blog Posts</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/blogs" className="float-right">
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
