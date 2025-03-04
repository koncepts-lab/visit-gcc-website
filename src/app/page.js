import React from 'react';
import Link from 'next/link';
import style from './style.module.css';
import Banner from '../../components/banner/banner';
import Countries from '../../components/countries/countries';
import Carousal from '../../components/carousel/Carousal';

function Home() {  
  const packagesData = [
    { id: 1, heading: '4 day itinerary Qatar', link: '4-day-itinerary-qatar',  description: 'Discover the heritage of Muscat, Doha, Riyadh, and Manama on this 9-day luxury journey. ', image: "/images/package/01.jpg" },
    { id: 2, heading: '7-day itinerary for UAE, Oman, Qatar', link: '7-day-itinerary-for-uae-oman-qatar',  description: '7-day itinerary for UAE, Oman, Qatar', image: "/images/package/02.jpg" },
    { id: 3, heading: '7-Day Itinerary Saudi Arabia, Bahrain, Qatar', link: '7-day-itinerary-saudi-arabia-bahrain-qatar',  description: '7-Day Itinerary Saudi Arabia, Bahrain, Qatar', image: "/images/package/03.jpg" },
    { id: 4, heading: '9-day heritage itinerary', link: '9-day-heritage-itinerary',  description: 'Discover the heritage of Muscat, Doha, Riyadh, and Manama on this 9-day luxury journey. ', image: "/images/package/01.jpg" },
    { id: 5, heading: '7-Day Itinerary Saudi Arabia, Bahrain, Qatar', link: '7-day-itinerary-saudi-arabia-bahrain-qatar',  description: '7-Day Itinerary Saudi Arabia, Bahrain, Qatar', image: "/images/package/02.jpg" },
    { id: 6, heading: '4-day itinerary UAE', link: '4-day-itinerary-uae',  description: '4-day itinerary UAE', image: "/images/package/03.jpg" },
    { id: 7, heading: '9-day itinerary', link: '9-day-itinerary',  description: 'Experience a luxurious 9-day journey through Dubai, Abu Dhabi, Riyadh, and Manama. ', image: "/images/package/03.jpg" },
    { id: 8, heading: '10 days itinerary luxury Umrah package with AlUla, Saudi Arabia', link: '10-days-itinerary-luxury-umrah-package-with-alula-saudi-arabia',  description: '10 days itinerary luxury Umrah package with AlUla, Saudi Arabia', image: "/images/package/03.jpg" },
    { id: 9, heading: '12 Day Itinerary Uae Qatar Saudi Arabia Bahrain Kuwait', link: '12-day-itinerary-uae-qatar-saudi-arabia-bahrain-kuwait',  description: '12 Day Itinerary Uae Qatar Saudi Arabia Bahrain Kuwait', image: "/images/package/03.jpg" },
    // { id: 10, heading: 'Package', link: 'qatar',  description: 'Description', image: "/images/package/03.jpg" },
  ];
 
  const eventsData = [
    { id: 1, heading: 'Event 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/events/01.jpg", date: 'March 8' },
    { id: 2, heading: 'Event 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/events/02.jpg", date: 'April 9' },
    { id: 3, heading: 'Event 3', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', image: "/images/events/03.jpg", date: 'April 13' },
  ];

  const experienceData = [
    { id: 1, heading: 'Experience 1', image: "/images/experience/01.jpg", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 2, heading: 'Experience 2', image: "/images/experience/02.jpg", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 3, heading: 'Experience 3', image: "/images/experience/03.jpg", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { id: 4, heading: 'Experience 4', image: "/images/experience/04.jpg", description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

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
              <h3>GCC Packages</h3>
            </div>
            <Carousal packages={packagesData} count={3} type="home-package" />
          </div>
        </div>
      </div>
      {/* home-packages end */}

      <div className={`container ${style['home-add-banner']}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img src="/images/banner-02.jpg" className='lap-view' alt="Banner" />
            <img src="/images/banner-03.jpg" className='mobile-view' alt="Banner" />
          </div>
        </div>
      </div>

      {/* home-event */} 
      <div className={style['home-event']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>Upcoming events in April</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/events" className='float-right'>View All</Link>
            </div>
            <Carousal events={eventsData} count={3} type="home-event" />
          </div>
        </div>
      </div>
      {/* home-event end */}

      {/* home-experience */}
      <div className={style['home-experience']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>What to experience</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 text-right">
              <Link href="tour-package" className='float-right'>View All</Link>
            </div>
            <Carousal experiences={experienceData} count={4} type="home-experience" />
          </div>
        </div>
      </div>
      {/* home-experience end */}

      <div className={`container ${style['home-add-banner']}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img src="/images/banner-02.jpg" className='lap-view' alt="Banner" />
            <img src="/images/banner-03.jpg" className='mobile-view' alt="Banner" />
          </div>
        </div>
      </div>

      {/* home-blog */}
      <div className={style['home-blog']}>
        <div className='container'>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>Latest Blog Posts</h3>
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
