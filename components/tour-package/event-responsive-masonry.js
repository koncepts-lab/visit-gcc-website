import React, { useState } from "react";
import Link from "next/link";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import style from "./style.module.css"; // Adjust the import according to your style file location
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdDownhillSkiing } from "react-icons/md";
import { IoBusOutline } from "react-icons/io5";
import { GiSailboat } from "react-icons/gi";

const events = [
  {
    src: "/events/demo/01.jpg",
    title: "Travis Scott | CIRCUS MAXIMUS TOUR ",
    provider: "Discover Qatar",
    description:
      "Prepare for an electrifying night, Doha! On May 16th, 2025, the Ahmad Bin Ali Stadium will transform as Travis Scott brings his sold-out Circus Maximus Tour to Qatar.",
    startDate: "08",
    endDate: "08",
    date: "14 May, 2025",
    rating: 4,
    link: "/1",
  },
  {
    src: "/images/demo/02.jpg",
    title: "FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025",
    provider: "Discover Qatar",
    description:
      "Experience the thrill of the FORMULA 1 QATAR AIRWAYS QATAR GRAND PRIX 2025, taking place in Doha.",
    startDate: "28",
    endDate: "30",
    date: "28 November, 2025",
    rating: 5,
    link: "/2",
  },
  {
    src: "/images/demo/03.jpg",
    title: "FIFA Arab Cup 2025",
    provider: "Discover Qatar",
    description:
      "A celebration of football and Arab unity returns to Qatar as it welcomes the region's top national teams for the FIFA Arab Cup 2025.",
    startDate: "01",
    endDate: "18",
    date: "1 December 2025",
    rating: 3,
    link: "/3",
  },
  {
    src: "/images/demo/04.jpg",
    title: "Qatar TotalEnergies Open 2026",
    provider: "Discover Qatar",
    description:
      "Qatar TotalEnergies Open - a WTA 1000 event, is an unforgettable tennis experience – where world-class players compete.",
    startDate: "08",
    endDate: "14",
    date: "8 February 2026",
    rating: 4,
    link: "/4",
  },
  {
    src: "/images/demo/05.jpg",
    title: "Qatar ExxonMobil Open 2026",
    provider: "Discover Qatar",
    description:
      "Experience the most exhilarating ATP 500 men's professional tennis tournaments being hosted in Qatar with world’s best players competing.",
    startDate: "16",
    endDate: "21",
    date: "16 February 2026",
    rating: 4,
    link: "/5",
  },
  {
    src: "/images/demo/06.jpg",
    title: "Equestrian Tours Qatar 2026",
    provider: "Discover Qatar",
    description:
      "The annual equestrian events include the Doha International Equestrian Tour 2026, CHI Al Shaqab, and the Longines Global Champions Tour.",
    startDate: "01",
    endDate: "05",
    date: "01 January 2026",
    rating: 4,
    link: "/6",
  },
  //   {
  //     src: "/images/demo/04.jpg",
  //     title: "Dubai Miracle Garden",
  //     provider: "John Smith",
  //     description:
  //       "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
  //     startDate: "08",
  //     endDate: "08",
  //     date: "04 July 2024",
  //     rating: 4,
  //   },
  //   {
  //     src: "/images/demo/03.jpg",
  //     title: "Dubai Mall",
  //     provider: "John Smith",
  //     description:
  //       "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
  //     startDate: "08",
  //     endDate: "08",
  //     date: "04 July 2024",
  //     rating: 5,
  //   },
  //   {
  //     src: "/images/demo/06.jpg",
  //     title: "Dubai Aquarium & Underwater Zoo",
  //     provider: "John Smith",
  //     description:
  //       "A month-long shopping extravaganza featuring discounts, promotions, and entertainment at Dubai's top malls and outdoor markets.",
  //     date: "04 July 2024",
  //     startDate: "08",
  //     endDate: "08",
  //     rating: 3,
  //   },
];

const ExploreEventsContainer = ({ events }) => {
  const [expandedItems, setExpandedItems] = useState([]); // To track which items are expanded

  // Toggle function for expanding/collapsing the ul
  const toggleExpand = (index) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter((item) => item !== index)
        : [...prevExpandedItems, index]
    );
  };

  return (
    <ResponsiveMasonry>
      <Masonry>
        {events.map((event, i) => (
          <div key={i} className="masonry-item">
            <img
              src={event.event_photo_urls[0]}
              style={{ width: "100%", display: "block" }}
              alt={event.title}
            />
            <div className="event-masonry-item-content">
              <h5>{event.name}</h5>
              <div className={style["provider-date"]}>
                {event.provider && ( // Conditionally render provider and separator
                  <>
                    <p className="mb-0">{event.provider}</p>
                    <span className="mx-2">|</span>
                  </>
                )}{" "}
                <p>{event.date}</p>
              </div>
              {/* <div className={style["star-section"]}>
                <div className={style["star"]}>
                  <Rating
                    count={5}
                    value={event.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </div>
                <div>
                  <IoChatbubbleOutline />
                </div>
                <div>
                  <FaRegLightbulb />
                </div>
              </div> */}

              <ul className={style["pakages-ul"]}>
                <li>
                  <p className="text-start">{event.description}</p>
                </li>
              </ul>

              {/* Toggleable UL */}
              <ul className={style["plus-ul"]} style={{ paddingRight: "2px" }}>
                {expandedItems.includes(i) &&
                  (() => {
                    // Parse event.date (e.g., "14 May, 2025")
                    const [startYear, startMonth, startDay] =
                      event.start_date.split("-");
                    const monthIndex = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];
                    const monthStartName = monthIndex[startMonth - 1];

                    const [endYear, endMonth, endDay] =
                      event.end_date.split("-");
                    // Assume endDate is in the same month and year (e.g., "08 May, 2025")
                    const endDate = new Date(
                      endYear,
                      monthIndex,
                      parseInt(endDay, 10)
                    );
                    const monthEndName = monthIndex[endMonth - 1];

                    return (
                      <>
                        <li style={{ paddingInline: "5px" }}>
                          <b>{monthStartName}</b>
                          <br />
                          <b>{startDay}</b>
                        </li>
                        <li>to</li>
                        <li>
                          {" "}
                          <b>{monthEndName}</b>
                          <br />
                          <b>{endDay}</b>
                        </li>
                      </>
                    );
                  })()}
              </ul>
              <p className="mb-3">
                <span className="fw-bold">AED {event.adult_price}</span> /
                person
              </p>

              <Link
                href={`/events/${event.id}`}
                className={`${style["event-detail-button"]} text-start`}
              >
                {event.category}
              </Link>

              <button
                className={style["btn-plus"]}
                onClick={() => toggleExpand(i)}
              >
                <FiPlus />
              </button>
            </div>
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ExploreEventsContainer;
