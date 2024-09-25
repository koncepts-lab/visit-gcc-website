import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "../../../components/banner/banner";
import Carousal from "../../../components/carousel/Carousal";

const pakageDetailsOtherPackages = [
  {
    id: 1,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/01.jpg",
  },
  {
    id: 2,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/02.jpg",
  },
  {
    id: 3,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/03.jpg",
  },
  {
    id: 4,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/04.jpg",
  },
  {
    id: 5,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/05.jpg",
  },
  {
    id: 6,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/06.jpg",
  },
];

function page() {
  return (
    <>
      <Banner />
      <section className={style["events-full-container"]}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/events/04.jpg"
                className={style["banner-box-logo"]}
                alt=""
              />
            </div>
            <div className={`col-md-6 ${style["d-flex"]}`}>
              <div className={style["events-top-text"]}>
                <h3>Top Picks</h3>
                <p className="mb-2">
                  Don't miss out on these unmissable events!
                </p>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Carousal
                pakageDetailsOtherPackages={pakageDetailsOtherPackages}
                count={5}
                type="pakage-details-other-packages"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
