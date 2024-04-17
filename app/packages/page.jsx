import React from 'react';
import InnerPageBanner from '@/components/layouts/InnerPageBanner';
import './packages.css';
import PackageCategory from '@/components/home/package/PackageCategory';
import SliderOne from '@/components/slider/SliderOne';
function Page() {
  // gcc packages
  const packagesData = [
    { id: 1, heading: 'Dubai Miracle Garden', price: '85.00', ratings: '4.7/5 (685)', image: "../images/blog/01.jpg",slug:"Dubai-Miracle-Garden" },
    { id: 2, heading: 'Dubai Big Bus City Tour', price: '202.00', ratings: '4.7/5 (685)', image: "../images/blog/02.jpg",slug:"Dubai-Big-Bus-City-Tour" },
    { id: 3, heading: 'Ultimate Desert Safari', price: '250.20', ratings: '4.7/5 (685)', image: "../images/blog/03.jpg",slug:"Ultimate-Desert-Safari" },
    { id: 4, heading: 'Global Village Dubai', price: '105.20', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"Global-Village-Dubai" },
    { id: 5, heading: '3D World Selfie Museum', price: '99.22', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"3D-World-Selfie-Museum" },
    { id: 5, heading: 'Burj Al Arab', price: '99.22', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"Burj-Al-Arab" },
    { id: 5, heading: 'Ski Dubai', price: '99.22', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"Ski-Dubai" },
    { id: 5, heading: 'Dinner in the Sky', price: '99.22', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"Dinner-in-the-Sky" },
    { id: 5, heading: 'Motiongate Park', price: '99.22', ratings: '4.7/5 (685)', image: "../images/blog/04.jpg",slug:"Motiongate-Park" },
  ];

  return (
    <>
      <InnerPageBanner />
      <section className='inner-page-container'>
        <div className='container'>
          <div className="row">
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/01.jpg" alt="Bahrain" />
                <h4 className='text-center'>Bahrain</h4>
              </a>
            </div>
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/02.jpg" alt="Bahrain" />
                <h4 className='text-center'>Kuwait</h4>
              </a>
            </div>
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/03.jpg" alt="Bahrain" />
                <h4 className='text-center'>Oman</h4>
              </a>
            </div>
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/04.jpg" alt="Bahrain" />
                <h4 className='text-center'>Qatar</h4>
              </a>
            </div>
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/05.jpg" alt="Bahrain" />
                <h4 className='text-center'>Saudi Arabia</h4>
              </a>
            </div>
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/06.jpg" alt="Bahrain" />
                <h4 className='text-center'>UAE</h4>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <Packages /> */}

      <section className='package-category-01'>
        <div className='home-blog'>
          <div className='container'>
            <div className="row">
              <div className="col-md-6 pb-3">
                <h3>GCC Packages</h3>
              </div>
              <div className="col-md-6 pb-3 text-right">
                <a href="/" className='float-right'>View All</a>
              </div>
              <SliderOne values={packagesData} speed={10000} />
            </div>
          </div>
        </div>
      </section>

      <section className='package-category'>

        <PackageCategory />
      </section>
      <section className='package-category-01'>
        <div className='home-blog'>
          <div className='container'>
            <div className="row">
              <div className="col-md-6 pb-3">
                <h3>Trending</h3>
              </div>
              <div className="col-md-6 pb-3 text-right">
                <a href="/" className='float-right'>View All</a>
              </div>
              <SliderOne values={packagesData} speed={5000} />
            </div>
          </div>
        </div>
      </section>
      <section className='package-category-01'>
      <div className='home-blog'>
          <div className='container'>
            <div className="row">
              <div className="col-md-6 pb-3">
                <h3>New Things This Month</h3>
              </div>
              <div className="col-md-6 pb-3 text-right">
                <a href="/" className='float-right'>View All</a>
              </div>
              <SliderOne values={packagesData} speed={7000} />
            </div>
          </div>
        </div>
      </section>
      <section className='package-category-01'>
      <div className='home-blog'>
          <div className='container'>
            <div className="row">
              <div className="col-md-6 pb-3">
                <h3>Find your adventure easily</h3>
              </div>
              <div className="col-md-6 pb-3 text-right">
                <a href="/" className='float-right'>View All</a>
              </div>
              <SliderOne values={packagesData} speed={3000} />
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export default Page;
