// In: components/GlobalLoader/GlobalLoader.js

import React from "react";
import style from "./style.module.css";

const GlobalLoader = () => {
  return (
    <div className={style.loaderOverlay}>
      <div className={style.loaderContainer}>    
         <video src="/images/loader.webm" autoPlay loop muted style={{height: '250px', width: '250px'}}/>   
      </div>
    </div>
  );
};

export default GlobalLoader;
