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

const images = [
  {
    src: "/images/demo/01.jpg",
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

const ExploreEventsContainer = ({}) => {
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
        {images.map((image, i) => (
          <div key={i} className="masonry-item">
            <img
              src={image.src}
              style={{ width: "100%", display: "block" }}
              alt={image.title}
            />
            <div className="event-masonry-item-content">
              <h5>{image.title}</h5>
              <div className={style["provider-date"]}>
                <p>{image.provider}</p> &nbsp; | &nbsp;
                <p>{image.date}</p>
              </div>
              <div className={style["star-section"]}>
                <div className={style["star"]}>
                  <Rating
                    count={5}
                    value={image.rating}
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
              </div>

              <ul className={style["pakages-ul"]}>
                <li>
                  <p className="text-start">{image.description}</p>
                </li>
              </ul>

              {/* Toggleable UL */}
              <ul className={style["plus-ul"]}>
                {expandedItems.includes(i) && (
                  <>
                    <li>
                      <b>{image.startDate}</b>
                      <br />
                      Jan
                    </li>
                    <li>to</li>
                    <li>
                      <b>{image.endDate}</b>
                      <br />
                      Feb
                    </li>
                  </>
                )}
              </ul>

              <Link
                href={`/events/${image.link}`}
                className={`${style["event-detail-button"]} text-start`}
              >
                SHOPPING & RETAIL
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
