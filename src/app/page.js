"use client";

import React , {useState, useEffect } from 'react';
import Link from 'next/link';
import style from './style.module.css';
import Banner from '../../components/banner/banner';
import Countries from '../../components/countries/countries';
import Carousal from '../../components/carousel/Carousal';
import axios from 'axios';


function Home() {  
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [banners, setBanners] = useState([]);
  const [experiences, setExperiences] = useState([]);



  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const authToken = localStorage.getItem("auth_token_register");
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
  
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }); 
        const allPackages = response.data.data || response.data || []; 
  
        console.log("All Packages:", allPackages); 
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
    const fetchExperience = async () => {
      try {
        const authToken = localStorage.getItem("auth_token_register");
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
  
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages/get-top-packages`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }); 
        const featuredPackages = response.data.data || response.data || []; 
  
        console.log("Featured Packages:", featuredPackages); 
        setExperiences(featuredPackages);
        setIsLoading(false);
  
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch packages. Please try again.");
        console.error("Error fetching packages:", err);
      }
    };
  
    fetchExperience();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get the token from localStorage (or wherever it is stored)
          const authToken = localStorage.getItem("auth_token_register");

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}events`, {
          headers: {
            Authorization: `Bearer ${authToken}`, 
          }
        });

        console.log(response.data)
        setEvents(response.data); 
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
    const fetchHeadings = async () => {
      try {
          const authToken = localStorage.getItem("auth_token_register");

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home-page-heading`, {
          headers: {
            Authorization: `Bearer ${authToken}`, 
          }
        });

        console.log(response.data)
        setHeadings(response.data); 
        setIsLoading(false); 
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch Headings. Please try again.");
        console.error("Error fetching Headings:", err); 
      }
    };

    fetchHeadings();
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
          const authToken = localStorage.getItem("auth_token_register");

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home-page-photo`, {
          headers: {
            Authorization: `Bearer ${authToken}`, 
          }
        });

        console.log(response.data)
        setBanners(response.data); 
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch Headings. Please try again.");
        console.error("Error fetching Headings:", err); 
      }
    };

    fetchBanners();
  }, []);
 

  const blogData = [
    { id: 1, heading: 'Blog Post 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/01.jpg" },
    { id: 2, heading: 'Blog Post 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/02.jpg" },
    { id: 3, heading: 'Blog Post 3', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/03.jpg" },
    { id: 4, heading: 'Blog Post 4', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/01.jpg" },
    { id: 5, heading: 'Blog Post 5', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/02.jpg" },
    { id: 6, heading: 'Blog Post 6', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/blog/03.jpg" },
  ];

  return (
    <>
      <Banner />
      <Countries />

      {/* home-packages */}
      <div className={style['home-packages']}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
            <h3>{headings[1]?.heading_content || "Loading..."}</h3>
            </div>
            {isLoading ? <p>Loading...</p> : <Carousal packages={packages} count={3} type="home-package" />}
            </div>
        </div>
      </div>
      {/* home-packages end */}

      <div className={`container ${style['home-add-banner']}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
          <img src={banners[0]?.url } className='lap-view' alt="Banner" />
          <img src={banners[1]?.url}className='mobile-view' alt="Banner" />
          </div>
        </div>
      </div>

      {/* home-event */} 
      <div className={style['home-event']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
            <h3>{headings[2]?.heading_content || "Loading..."}</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/events" className='float-right'>View All</Link>
            </div>
            <Carousal events={events} count={3} type="home-event" />
          </div>
        </div>
      </div>
      {/* home-event end */}

      {/* home-experience */}
      <div className={style['home-experience']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
            <h3>{headings[3]?.heading_content || "Loading..."}</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 text-right">
              <Link href="tour-package" className='float-right'>View All</Link>
            </div>
            <Carousal experiences={experiences} count={4} type="home-experience" />
          </div>
        </div>
      </div>
      {/* home-experience end */}

      <div className={`container ${style['home-add-banner']}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img src={banners[2]?.url } className='lap-view' alt="Banner" />
            <img src={banners[3]?.url}className='mobile-view' alt="Banner" />
          </div>
        </div>
      </div>

      {/* home-blog */}
      <div className={style['home-blog']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
            <h3>{headings[4]?.heading_content || "Loading..."}</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="#0" className='float-right'>View All</Link>
            </div>
            <Carousal blog={blogData} count={4} type="home-blog" />
          </div>
        </div>
      </div>
      {/* home-blog end */}
    </>
  );
}

export default Home;
