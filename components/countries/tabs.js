"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
import Carousal from "../carousel/Carousal";

const 


Tabs = () => {
  const countryData = [
        {
            id: 1,
            heading: 'Explore the UAE\'s Rich Bedouin Legacy',
            subHeading: 'Journey Through Time',
            description: ' Discover the UAE\'s Bedouin heritage by visiting cultural centers and museums that highlight traditional desert life. Experience the nomadic customs, crafts, and social structures that have shaped the nation\'s history. Sites like the Al Ain Palace Museum o er a glimpse into the royal family\'s past and the traditional lifestyle of early Emirati communities.',
            image: "/images/country/01.jpg"
        },
        { 
            id: 2,
            heading: 'Uncover Historic Landmarks Across the Emirates',
            subHeading: 'Journey Through Time',
            description: ' Visit iconic historical sites that tell the story of the UAE\'s transformation. Explore the Al Fahidi Fort in Dubai, a symbol of the city\'s early trade roots, and the Fujairah Fort, which dates back to the 16th century. Each emirate, from Sharjah\'s Islamic Museum to Ajman\'s cultural landmarks, o ers unique insights into the region\'s past.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Experience the Evolution of Modern Dubai',
            subHeading: 'Journey Through Time',
            description: ' Witness the remarkable evolution of Dubai from a modest trading port to a global metropolis. Tour landmarks such as the Burj Khalifa, showcasing Dubai\'s architectural ambition, and the Dubai Creek, reflecting the city\'s historical trade significance. Dubai\'s blend of old and new highlights its status as a modern hub on the world stage.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataTwo = [
        {
            id: 1,
            heading: 'Celebrate at UAE\'s Major Festivals',
            subHeading: 'Journey Through Time',
            description: 'Join in the excitement of the UAE\'s vibrant festivals. Attend the Abu Dhabi Film Festival for a showcase of international and regionalcinema or the Dubai Shopping Festival for a blend of retail therapy and entertainment. These events reflect the UAE\'s dynamic cultural scene and o er aglimpse into its diverse traditions.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Experience Traditional Dance and Music',
            subHeading: 'Journey Through Time',
            description: ' Immerse yourself in the UAE\'s rich musical heritage by watching traditional performances like Al Ayala, characterized by rhythmic drumming and poetry. Explore the traditional music and dance at cultural venues and festivals, which celebrate the UAE\'s artistic expressions and heritage.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: 'Explore Art and Cultural Institutions',
            subHeading: 'Journey Through Time',
            description: 'Visit cultural institutions like the Louvre Abu Dhabi and the Sharjah Art Museum to experience the UAE\'s artistic and cultural achievements. These venues feature extensive collections of contemporary and classical art, highlighting the country\'s commitment to preserving and celebrating its cultural legacy.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataThree = [
        {
            id: 1,
            heading: 'Savor Traditional Emirati Dishes',
            subHeading: 'Journey Through Time',
            description: 'Taste the essence of Emirati cuisine with traditional dishes such as Al Harees, a slow-cooked blend of wheat and meat, and Al Madrooba, a spiced fish dish. Enjoy these local specialties at traditional restaurants and eateries across the UAE, which o er a rich culinary experience steeped in history.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Indulge in Street Food and Global Flavors',
            subHeading: 'Journey Through Time',
            description: 'Explore the diverse food scene with popular street foods like Shawarma and Falafel. The UAE\'s cosmopolitan cities o er a range of international cuisines, reflecting its multicultural population and providing a dynamic dining experience from casual to gourmet.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: '.Experience Fine Dining and Culinary Innovation',
            subHeading: 'Journey Through Time',
            description: 'Discover the UAE\'s high-end dining options at world-class restaurants like Pierchic in Dubai or the Emirates Palace\'s fine dining venues in Abu Dhabi. These establishments o er innovative dishes and luxurious settings, showcasing the UAE\'s culinary creativity and commitment to excellence.',
            image: "/images/country/02.jpg"
        }
    ];

    const countryDataFour = [
        {
            id: 1,
            heading: 'Shop at Iconic Malls in Dubai and Abu Dhabi',
            subHeading: 'Journey Through Time',
            description: ' Indulge in luxury shopping at Dubai Mall, the world\'s largest retail and entertainment destination, featuring a wide range of high-end brands and attractions. In Abu Dhabi, The Galleria provides a sophisticated shopping experience with luxury boutiques and fine dining, reflecting the city\'s elegant style.',
            image: "/images/country/01.jpg"
        },
        {
            id: 2,
            heading: 'Discover Traditional Markets and Souqs',
            subHeading: 'Journey Through Time',
            description: 'Explore traditional markets such as the Gold Souq and Spice Souq in Dubai, where you can find unique treasures and traditional goods. The vibrant souqs o er a sensory experience that connects you to the UAE\'s historical trading heritage and cultural diversity.',
            image: "/images/country/02.jpg"
        },
        {
            id: 3,
            heading: ' Uncover Unique Finds in Boutique Stores',
            subHeading: 'Journey Through Time',
            description: 'Visit boutique stores across the UAE to discover distinctive local art and craftsmanship. From contemporary jewelry to traditional textiles, these boutiques o er a glimpse into the UAE\'s artistic scene and provide unique items that reflect the country\'s cultural richnes',
            image: "/images/country/02.jpg"
        }
    ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <section className={style.innerpage}>
      <div className={`container `}>
        <div className="row pb-2">
          <div className="col-md-12">
            <div className={`pr-0 ${style["country-container-box"]}`}>
              <div className={style["country-container"]}>
                <div className={style["ul-container"]}>
                  <ul
                    className={`nav nav-tabs border-0 ${style["country-nav-tabs"]}`}
                    id="myTab"
                    role="tablist"
                  >
                    <li
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link active border-0 ${style["country-nav-link"]} `}
                        id="History-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#History"
                        type="button"
                        role="tab"
                        aria-controls="History"
                        aria-selected="true"
                      >
                        History and Heritage
                      </button>
                    </li>
                    <li
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${style["country-nav-link"]}`}
                        id="Culture-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Culture"
                        type="button"
                        role="tab"
                        aria-controls="Culture"
                        aria-selected="false"
                      >
                        Culture and Traditions
                      </button>
                    </li>
                    <li
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${style["country-nav-link"]}`}
                        id="Food-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Food"
                        type="button"
                        role="tab"
                        aria-controls="Food"
                        aria-selected="false"
                      >
                        Food and Culinary
                      </button>
                    </li>
                    <li
                      className={`nav-item ${style["country-nav-item"]}`}
                      role="presentation"
                    >
                      <button
                        className={`nav-link border-0 ${style["country-nav-link"]}`}
                        id="Luxury-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Luxury"
                        type="button"
                        role="tab"
                        aria-controls="Luxury"
                        aria-selected="false"
                      >
                        Luxury and Shopping
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="History"
                    role="tabpanel"
                    aria-labelledby="History-tab"
                  >
                    {/* tab-slider */}
                    <div className={style["country-tab"]}>
                      <div className="container">
                        <div className="row">
                          <Carousal
                            country={countryData}
                            count={1}
                            type="country-tab"
                          />
                        </div>
                      </div>
                    </div>
                    {/* tab-slider end */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Culture"
                    role="tabpanel"
                    aria-labelledby="Culture-tab"
                  >
                    {/* tab-slider */}
                    <div className={style["country-tab"]}>
                      <div className="container">
                        <div className="row">
                          <Carousal
                            country={countryDataTwo}
                            count={1}
                            type="country-tab"
                          />
                        </div>
                      </div>
                    </div>
                    {/* tab-slider end */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Food"
                    role="tabpanel"
                    aria-labelledby="Food-tab"
                  >
                    {/* tab-slider */}
                    <div className={style["country-tab"]}>
                      <div className="container">
                        <div className="row">
                          <Carousal
                            country={countryDataThree}
                            count={1}
                            type="country-tab"
                          />
                        </div>
                      </div>
                    </div>
                    {/* tab-slider end */}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Luxury"
                    role="tabpanel"
                    aria-labelledby="Luxury-tab"
                  >
                    {/* tab-slider */}
                    <div className={style["country-tab"]}>
                      <div className="container">
                        <div className="row">
                          <Carousal
                            country={countryDataFour}
                            count={1}
                            type="country-tab"
                          />
                        </div>
                      </div>
                    </div>
                    {/* tab-slider end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tabs;
