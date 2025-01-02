import React from "react";
import Image from "next/image";
import style from "./style.module.css";
import Link from "next/link";

function HomeExperience() {
  const experienceData = [
    {
      title: "Energy Efficiency",
      description: "Low power consumption compared to other display technologies."
    },
    {
      title: "Durability and Reliability",
      description: "Built to withstand different environmental conditions, including extreme temperatures."
    },
    {
      title: "Wide Viewing Angles",
      description: "Consistent image quality and color accuracy even when viewed from off-center angles."
    },
    {
      title: "Fast Refresh Rate",
      description: "High refresh rates provide smooth motion, making them ideal for video playback "
    },
    {
      title: "Thin and Lightweight",
      description: "Slim profiles and lightweight panels are easier to install and integrate into various settings."
    },
    {
      title: "Scalability",
      description: "Can be scaled to create large displays by combining multiple panels."
    }
  ];

  return (
    <section className={style['home-experience']}>
      <div className={style['home-experience-container']}>
        <div className="container-fluid">
          <div className="col-md-12 d-flex justify-content-center gap-3">
            <div className="text-right">
              <h3 className="text-3xl font-bold">Experience</h3>
            </div>
            <div>
              <Image
                src="/assets/images/logo.png"
                alt="Company Logo"
                width={100}
                height={100}
                priority
              />
            </div>
          </div>

          <div className={style['experience-box-container']}>
            {experienceData.map((item, index) => (
              <div 
                className={style['experience-box']}
                key={index}
              >
                <Image
                  src={`/assets/images/icons/0${index + 1}.svg`}
                  alt={`${item.title} Icon`}
                  width={50}
                  height={50}
                  priority={index < 3}
                />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeExperience;