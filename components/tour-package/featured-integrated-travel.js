import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousal from "../carousel/Carousal";
import axios from "axios";

// 1. We create a configuration map. This is our "source of truth".
// It makes the code cleaner, easier to read, and scalable.
const experienceConfig = {
  attractions: {
    apiPath: "attractions/get-featured-attractions",
    carouselType: "attraction-FeaturedTravel",
    errorName: "attractions",
  },
  packages: {
    apiPath: "packages/get-featured-packages",
    carouselType: "tour-FeaturedTravel",
    errorName: "packages",
  },
};

// 2. We set a default prop value. If the 'type' prop is not provided,
// it will default to "packages". This prevents errors.
function FeaturedIntegratedTravel({ type = "packages" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [experiences, setExperiences] = useState([]);

  // 3. We determine the correct configuration. If an invalid 'type' is passed,
  // it defaults to the 'packages' configuration. This makes the component robust.
  const config = experienceConfig[type] || experienceConfig.packages;

  useEffect(() => {
    const fetchExperience = async () => {
      setIsLoading(true);
      setError(null);
      setExperiences([]);

      // 4. The API URL is now built dynamically from our config object. No more if/else!
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${config.apiPath}`;

      try {
        const response = await axios.get(apiUrl);
        const featuredItems = response.data.data || response.data || [];
        setExperiences(featuredItems);
      } catch (err) {
        setError(`Failed to fetch featured ${config.errorName}. Please try again.`);
        console.error(`Error fetching featured ${config.errorName}:`, err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExperience();
    // The effect re-runs whenever the 'config' object changes (which happens when 'type' prop changes)
  }, [config]); 

  if (isLoading) {
    return <p className="text-center py-4">Loading featured items...</p>;
  }

  if (error) {
    return <p className="text-center text-danger py-4">Error: {error}</p>;
  }

  if (!experiences || experiences.length === 0) {
    return null; // Don't render anything if no experiences
  }

  return (
    <div className="row">
      <div className="col-md-12 p-0">
        <section className={style["countries-explore-container"]}>
          <div className={style["countries-explore"]}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 pb-3 text-center">
                  <h3>Featured Travel</h3>
                </div>
              </div>
            </div>

            <div className={style["country-explore2"]}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center mt-4">
                    <Carousal
                      featuredTravel={experiences}
                      count={4}
                      type={config.carouselType}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FeaturedIntegratedTravel;