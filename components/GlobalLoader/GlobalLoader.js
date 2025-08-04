// In: components/GlobalLoader/GlobalLoader.js

import React from "react";
import style from "./style.module.css";

const GlobalLoader = () => {
  return (
    <div className={style.loaderOverlay}>
      <div className={style.loaderContainer}>    
         <img src="/images/loader.svg" style={{height: '50px', width: '50px'}}/>   
      </div>
    </div>
  );
};

export default GlobalLoader;
