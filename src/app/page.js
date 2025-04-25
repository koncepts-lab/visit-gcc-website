import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "../../components/banner/banner";
import Countries from "../../components/countries/countries";
import Carousal from "../../components/carousel/Carousal";

function Home() {
  const packagesData = [
    {
      id: 1,
      name: "Global Village Dubai",
      link: "4-day-itinerary-qatar",
      description: "Season 29!",
      image: "/images/package/01.jpg",
    },
    {
      id: 2,
      name: "Dubai Miracle Garden",
      link: "7-day-itinerary-for-uae-oman-qatar",
      description: "The world's largest natural flower garden",
      image: "/images/package/02.jpg",
    },
    {
      id: 3,
      name: "Dubai Frame",
      link: "7-day-itinerary-saudi-arabia-bahrain-qatar",
      description:
        "Dubai Frame is remarkable in its 150m height, 93m width, and bridge-connected buildings.",
      image: "/images/package/03.jpg",
    },
    {
      id: 4,
      name: "2 Hours Sightseeing Yacht Tour",
      link: "9-day-heritage-itinerary",
      description: "Dubai Marina Tour",
      image: "/images/package/01.jpg",
    },
  ];

  const eventsData = [
    {
      id: 1,
      heading: "Travis Scott | CIRCUS MAXIMUS TOUR",
      description: "Ahmad Bin Ali Stadium",
      image: "/images/events/01.webp",
      date: "16 May, 2025",
      link: "/1",
    },
    {
      id: 2,
      heading: "FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025",
      description: "Lusail International Circuit",
      image: "/images/events/02.webp",
      date: "28 November, 2025",
      link: "/2",
    },
    {
      id: 3,
      heading: "FIFA Arab Cup 2025",
      description: "Across different stadiums in Qatar",
      image: "/images/events/03.webp",
      date: "1 December, 2025",
      link: "/3",
    },
  ];

  const experienceData = [
    {
      id: 1,
      heading: "Experience 1",
      image: "/images/experience/01.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      heading: "Experience 2",
      image: "/images/experience/02.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 3,
      heading: "Experience 3",
      image: "/images/experience/03.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 4,
      heading: "Experience 4",
      image: "/images/experience/04.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  const blogData = [
    {
      id: 1,
      heading: "Blog Post 1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/01.jpg",
    },
    {
      id: 2,
      heading: "Blog Post 2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/02.jpg",
    },
    {
      id: 3,
      heading: "Blog Post 3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/03.jpg",
    },
    {
      id: 4,
      heading: "Blog Post 4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/01.jpg",
    },
    {
      id: 5,
      heading: "Blog Post 5",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/02.jpg",
    },
    {
      id: 6,
      heading: "Blog Post 6",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "/images/blog/03.jpg",
    },
  ];

  return (
    <>
      <Banner />
      <Countries />

      {/* home-packages */}
      <div className={style["home-packages"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>GCC Packages</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/tour-package" className="float-right">
                View All
              </Link>
            </div>
            {console.log("Packages Data:", packagesData)} {/* Debug log */}
            <Carousal packages={packagesData} count={3} type="home-package" />
          </div>
        </div>
      </div>
      {/* home-packages end */}

      <div className={`container ${style["home-add-banner"]}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img
              src="/images/banner-02.jpg"
              className="lap-view"
              alt="Banner"
            />
            <img
              src="/images/banner-03.jpg"
              className="mobile-view"
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* home-event */}
      <div className={style["home-event"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>Upcoming events in April</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="/events" className="float-right">
                View All
              </Link>
            </div>
            <Carousal events={eventsData} count={3} type="home-event" />
          </div>
        </div>
      </div>
      {/* home-event end */}

      {/* home-experience */}
      <div className={style["home-experience"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>What to experience</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 text-right">
              <Link href="tour-package" className="float-right">
                View All
              </Link>
            </div>
            <Carousal packages={packagesData} count={3} type="home-package" />
          </div>
        </div>
      </div>
      {/* home-experience end */}

      <div className={`container ${style["home-add-banner"]}`}>
        <div className="row">
          <div className="col-md-12 pdb-3">
            <img
              src="/images/banner-02.jpg"
              className="lap-view"
              alt="Banner"
            />
            <img
              src="/images/banner-03.jpg"
              className="mobile-view"
              alt="Banner"
            />
          </div>
        </div>
      </div>

      {/* home-blog */}
      <div className={style["home-blog"]}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-9 col-9 pdb-3">
              <h3>Latest Blog Posts</h3>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-4 col-sm-3 col-3 pdb-3 text-right">
              <Link href="#0" className="float-right">
                View All
              </Link>
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
