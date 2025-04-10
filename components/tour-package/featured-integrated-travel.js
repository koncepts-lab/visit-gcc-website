import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousal from '../carousel/Carousal';
import axios from 'axios'; // Import axios

function FeaturedIntegratedTravel() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const registerToken = localStorage.getItem("auth_token_register");
              const loginToken = localStorage.getItem("auth_token_login");
              let authToken = null;
        
             if (loginToken) {
                authToken = loginToken;
                console.log("Using login token for fetching packages.");
              }
              else if (registerToken) {
                authToken = registerToken;
                console.log("Using register token for fetching packages.");
              } 
        
              if (!authToken) {
                setError("Authentication token not found");
                setIsLoading(false);
                return;
              }        
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}packages/get-featured-packages`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const featuredPackages = response.data.data || response.data || [];

                console.log("Featured Packages:", featuredPackages);
                setExperiences(featuredPackages);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError("Failed to fetch packages. Please try again.");
                console.error("Error fetching packages:", err);
            }
        };

        fetchExperience();
    }, []);

    if (isLoading) {
        return <p className="text-center py-4">Loading featured travel...</p>; // Or your loading component
    }

    if (error) {
        return <p className="text-center text-danger py-4">Error: {error}</p>;
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-12 p-0'>
                    <section className={style['countries-explore-container']}>
                        <div className={style['countries-explore']}>
                            <div className='container-fluid'>
                                <div className="row">
                                    <div className="col-md-12 pb-3 text-center">
                                        <h3>Featured Travel</h3>
                                    </div>
                                </div>
                            </div>

                            {/* CountryExplore */}
                            <div className={style['country-explore2']}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12 text-center mt-4'>
                                            <Carousal featuredTravel={experiences} count={4} type="tour-FeaturedTravel" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default FeaturedIntegratedTravel;