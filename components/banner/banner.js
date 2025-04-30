"use client"; // Add this directive at the top
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import Search from "../search/search";

const Banner = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: 250,
      behavior: "smooth",
    });
  };

  // State to track which menu item is being hovered
  const [hoveredItem, setHoveredItem] = useState(null);

  // Menu items data
  const menuItems = [
    {
      id: 1,
      title: "Events",
      image: "../images/Event.svg",
      hoverImage: "../images/Event Mouse Over.svg", // Assumed hover image path
      onClick: handleScroll,
      isLink: false,
      link: "",
    },
    {
      id: 2,
      title: "Plan",
      image: "../images/Plan.svg",
      hoverImage: "../images/Plan Mouse Over.svg", // Assumed hover image path
      onClick: null,
      isLink: true,
      link: "/tour-package",
    },
    {
      id: 3,
      title: "Book",
      image: "../images/Book.svg",
      hoverImage: "../images/Book Mouse Over.svg", // Assumed hover image path
      onClick: null,
      isLink: false,
      link: "",
    },
    {
      id: 4,
      title: "Experience",
      image: "../images/Experiance.svg",
      hoverImage: "../images/Experiance  Mouse Over.svg", // Assumed hover image path
      onClick: null,
      isLink: false,
      link: "",
    },
  ];

  return (
    <section className={`${style["banner"]}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={style["banner-container"]}>
              <div className={style["only-stiky"]}>
                <Link className="navbar-brand" href="/">
                  <img
                    src="/images/logo.svg"
                    className={style["banner-box-logo"]}
                    alt="Company Logo"
                  />
                </Link>
              </div>

              <div className={style["banner-box"]}>
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={style["menu-item"]}
                  >
                    {item.isLink ? (
                      <Link href={item.link}>
                        <img
                          src={
                            hoveredItem === item.id
                              ? item.hoverImage
                              : item.image
                          }
                          alt={`${item.title} icon`}
                        />
                        <h4>{item.title}</h4>
                      </Link>
                    ) : (
                      <div
                        onClick={item.onClick}
                        style={{ cursor: item.onClick ? "pointer" : "default" }}
                      >
                        <img
                          src={
                            hoveredItem === item.id
                              ? item.hoverImage
                              : item.image
                          }
                          alt={`${item.title} icon`}
                        />
                        <h4>{item.title}</h4>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={style["only-stiky"]}>
                <div className={style["user-profile"]}>
                  <img
                    src="../images/05.png"
                    alt="User Profile"
                    className={style["profile-icon"]}
                  />
                  <span>Johnny Depp</span>
                </div>
              </div>
            </div>

            <span className={style["serch-div"]}>
              <Search />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
