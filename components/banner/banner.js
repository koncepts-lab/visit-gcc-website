"use client";  // Add this directive at the top

import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Search from '../search/search';

const Banner = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bannerHeight = document.querySelector(`.${style['banner']}`).offsetHeight;
      setIsSticky(window.scrollY > bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`${style['banner']} ${isSticky ? style['sticky'] : ''}`}>
      <div className='container'>
        <div className='row'>
          <div className="col-md-12">
            <div className={style['banner-container']}>

              <div className={style['only-stiky']}>
                888</div>


              <div className={style['banner-box']}>
                <div>
                  <img src="../images/01.png" alt="Explore Bahrain" />
                  <h4>Explore</h4>
                </div>
                <div>
                  <img src="../images/02.png" alt="Plan Bahrain" />
                  <h4>Plan</h4>
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


              <div className={style['only-stiky']}>d88dd </div>

            </div>

            <span className={style['serch-div']}><Search /></span>


          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
