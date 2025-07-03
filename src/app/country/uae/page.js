"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import CountriesUae from "@components/countries/countries-uae";
import Tabs from "@components/countries/tabs";
import Carousal from "@components/carousel/Carousal";
import DocumentationTabs from "@components/countries/documentation-tab";
import GettingAroundTab from "@components/countries/getting-around-tab";

function Country() {
  const [allEvents, setAllEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events`
        );
        const fetchedEvents = response.data.data || response.data || [];
        setAllEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog`
        );
        const allBlogs = response.data.data || response.data || [];
        //console.log("🚀 ~ fetchBlogs ~ allBlogs:", allBlogs);

        setBlogs(allBlogs);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchBlogs();
  }, []);
  const countryExperiance = [];

  return (
    <div>
      <Banner />
      <CountriesUae />
      <div className={style["section-normal"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>A Blend of Ancient Traditions and Modern Wonders</h3>
              <p>
                Funding freemium technology focus equity bootstrapping user
                niche market. Seed round agile growth hacking return investment
                alpha investor advisor marketing pitch.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs />
      <section className={style["countries-explore-container"]}>
        <div className={style["countries-explore"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 pb-3">
                <h3>Explore your Destinations, Inspiration, Events</h3>
              </div>
            </div>
          </div>

          {/* CountryExplore */}
          <div className={style["country-explore"]}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Carousal
                    country={allEvents}
                    count={5}
                    type="country-tab-slider"
                  />
                </div>
              </div>
              <div className="row">
                <Link className="col-md-12 text-center mt-4" href="/events">
                  <button className={style["btn-one"]}>Full List</button>
                </Link>
              </div>
            </div>
          </div>
          {/* CountryExplore */}
        </div>
      </section>

      {/* <div className={style["section-normal"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pb-3">
              <h3 className="mb-0">Plan</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 pb-3">
              <label>Where am I from?</label>
              <select className="form-control">
                <option>Select</option>
                <option>Place</option>
                <option>Place</option>
              </select>
            </div>
            <div className="col-md-4 pb-3">
              <label>Where am I going?</label>
              <select className="form-control">
                <option>Select</option>
                <option>Place</option>
                <option>Place</option>
              </select>
            </div>
            <div className="col-md-4 pb-3 d-flex align-items-end">
              <button className={`${style["btn-two"]} w-100`}>
                Get Visa Eligibility
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className={style["section-documentation"]}>
        <div className={style["section-normal"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Important Information</h3>
              </div>
            </div>
          </div>
        </div>
        <DocumentationTabs />
      </div>

      {/* <div className={style["section-documentation"]}>
        <div className={style["section-normal"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3>Getting Around</h3>
              </div>
            </div>
          </div>
        </div>
        <GettingAroundTab />
      </div> */}

      <section className={style["countries-explore-container"]}>
        <div className={style["countries-explore"]}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 pb-3">
                <h3>Experience</h3>
                <p>
                  Funding freemium technology focus equity bootstrapping usernce
                  niche market. Seed round agile growth hacking retur investment
                  alpha investor advisor marketing pitch.
                </p>
              </div>
            </div>
          </div>

          {/* countryExperiance */}
          <div className={style["country-experiance"]}>
            <div className="container">
              <div className="row">
                <div className="col-md-12 pb-3">
                  {/* <Carousal countryExperiance={countryExperiance} count={3} type="country-experiance" /> */}

                  <Carousal
                    countryExperiance={blogs}
                    count={4}
                    countTab={1}
                    type="country-Experiance"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Country;
