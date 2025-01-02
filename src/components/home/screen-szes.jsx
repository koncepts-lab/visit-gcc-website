"use client";
import React, { useState } from 'react';
import styles from "./style.module.css";
import Link from "next/link";
import Image from 'next/image';

function ScreenSizes() {
  const screenSizes = [
    { size: "583\"", dimensions: "12.9 x 7.3 m", resolution: "8K", pixelPitch: "P1.6" },
    { size: "500\"", dimensions: "11.0 x 6.2 m", resolution: "8K", pixelPitch: "P1.4" },
    { size: "450\"", dimensions: "9.9 x 5.6 m", resolution: "4K", pixelPitch: "P1.2" },
    { size: "400\"", dimensions: "8.8 x 5.0 m", resolution: "4K", pixelPitch: "P1.0" },
    { size: "350\"", dimensions: "7.7 x 4.3 m", resolution: "4K", pixelPitch: "P0.9" },
    { size: "300\"", dimensions: "6.6 x 3.7 m", resolution: "4K", pixelPitch: "P0.8" },
  ];

  const [activeScreen, setActiveScreen] = useState(0);

  const handleNextSize = () => {
    setActiveScreen((prev) => (prev + 1) % screenSizes.length);
  };

  return (
    <>
      <section className={styles['products-screen-size-container']}>
        <div className={styles['products-screen-size']}>
          <div className="container-fluid">
            <h4>Products</h4>
            <h3>Screen Sizes</h3>
            <div className={`text-white d-flex justify-content-between ${styles['screen-number']}`}>
              <div><h3>{screenSizes[activeScreen].size}</h3></div>
              <div><h3>{screenSizes[activeScreen].dimensions}</h3></div>
              <div><h3>{screenSizes[activeScreen].resolution}</h3></div>
              <div><h3>{screenSizes[activeScreen].pixelPitch}</h3></div>
            </div>
            <div className={styles['screen-div']}>
              <div className={styles['screen-div-inner']}>
                {screenSizes.map((_, index) => (
                  <div key={index} className={activeScreen === index ? styles['active-screen'] : ''}>
                    {index === activeScreen && (
                      <>
                        {/* Any additional screen size details */}
                      </>
                    )}
                  </div>
                ))}
                <button onClick={handleNextSize} className={styles['screen-btn']}>
                  Next Size <br /> <Image src="/assets/images/arrow.svg" className={styles['next-img']} alt="Next" width={24} height={24} />
                </button>
                <Image src="/assets/images/men.png" className={styles['men-img']} alt="Men" width={200} height={300} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ScreenSizes;