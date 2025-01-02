import React from "react";
import style from "./style.module.css";
import Link from "next/link";

function BannerVideo() {
  return (
    <>
      <section className={style["nav-banner-container"]}>
        <div className={style["banner"]}>
          <div className="container-fluid">
            <div className="col-md-12">
              <video
                autoPlay
                loop
                muted
                playsInline
                className={style["banner-video"]}
              >
                <source src="/assets/videos/banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={style["banner-content"]}>
              <h1>Bigscreen Beyond</h1>
              <h2>Your display partner</h2>
            </div>

           

            <button className={style["talk-btn"]}>Talk to Expert</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default BannerVideo;
