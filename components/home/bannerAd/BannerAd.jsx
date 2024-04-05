import React from 'react';
 
const BannerAd = () => {

  const bannerAdData = [
    { id: 1, image :"../images/banner-02.jpg" },
    { id: 2, image :"../images/countries/01.jpg" },
  ];

  return (
      <div className='container'>
        <div className="row">
          <div className="col-md-12 pb-3">
            <img src="../images/banner-02.jpg" className='w-100' alt="" />
          </div>
        </div>
      </div>
  );
}

export default BannerAd;
