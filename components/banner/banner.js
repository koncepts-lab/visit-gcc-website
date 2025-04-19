"use client";  
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Search from '../search/search';
import axios from 'axios';

const Banner = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [banners, setBanners] = useState([]);


  const handleScroll = () => {
    window.scrollBy({
      top: 250, 
      behavior: 'smooth' 
    });
  };

 
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

     if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      }
      else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      } 

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

        console.log("fetched-header-banner",response.data)
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


  return (
    <section className={`${style['banner']}`}  style={{
      backgroundImage: `url(${
       banners.find(banner => banner?.name === 'header-banner')?.url ||
       '' 
      })`,
     }}>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12">
            <div className={style['banner-container']}>

              <div className={style['only-stiky']}>
              <Link className="navbar-brand" href='/'><img src="/images/logo.svg"  className={style['banner-box-logo']} alt="" /></Link>
              </div>


              <div className={style['banner-box']}>
              <div onClick={handleScroll} style={{ cursor: 'pointer' }}>
                <img src="../images/01.png" alt="Explore Bahrain" />
                <h4>Explore</h4>
              </div>
                <div>
                <Link href="/tour-package">
                  <img src="../images/02.png" alt="Plan Bahrain" />
                  <h4>Plan</h4>
                  </Link>
                </div>
                <div>
                  <img src="../images/03.png" alt="Book Bahrain" />
                  <h4>Book</h4>
                </div>
                <div>
                  <img src="../images/04.png" alt="Experience Bahrain" />
                  <h4>Experience</h4>
                </div>
              </div>


              <div className={style['only-stiky']}>
              <div className='d-flex'>
              <img src="../images/05.png" alt="Explore Bahrain"  className={style['profile-icon']} />Johnny Depp 
              </div>
              
              </div>

            </div>

            <span className={style['serch-div']}><Search /></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
