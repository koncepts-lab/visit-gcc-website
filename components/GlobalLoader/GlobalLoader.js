// In: components/GlobalLoader/GlobalLoader.js

import React from "react";
import style from "./style.module.css";

const GlobalLoader = () => {
  return (
    <div className={style.loaderOverlay}>
      <div className={style.loaderContainer}>
        <img
          src="/images/logo.svg"
          alt="Visit GCC Logo"
          className={style.loaderLogo}
        />
        <div className={style.loaderSpinner}></div>
        <p className={style.loaderText}>Loading, please wait...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
