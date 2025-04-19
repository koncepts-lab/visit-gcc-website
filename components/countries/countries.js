"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next/link
import { FaArrowRightLong } from "react-icons/fa6"; // Import arrow icon
import style from './style.module.css'; // Import CSS module
import axios from 'axios';

const Countries = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headings, setHeadings] = useState([]);
    const authToken = localStorage.getItem("auth_token_login") || localStorage.getItem("auth_token_register");

    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!authToken) {
                    setError("Authentication token not found");
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}countries`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                if (response.data && Array.isArray(response.data.data)) {
                    setCountriesData(response.data.data);
                } else if (response.data && Array.isArray(response.data)) {
                    setCountriesData(response.data);
                } else {
                    setError("Failed to fetch countries - invalid data format");
                }
            } catch (err) {
                setError("Failed to fetch countries. Please try again.");
                console.error("Error fetching countries:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, [authToken]);

    useEffect(() => {
      const fetchHeadings = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home-page-heading`, {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            }
          });
  
          console.log(response.data)
          setHeadings(response.data); 
          setIsLoading(false); 
        } catch (err) {
          setIsLoading(false);
          setError("Failed to fetch Headings. Please try again.");
          console.error("Error fetching Headings:", err); 
        }
      };
  
      fetchHeadings();
    }, []);
  

    if (isLoading) {
        return <div className={style['home-countries']}><div className='container'><p>Loading countries...</p></div></div>;
    }

    if (error) {
        return <div className={style['home-countries']}><div className='container'><p className="text-danger">Error: {error}</p></div></div>;
    }

    return (
        <div className={style['home-countries']}>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                    <h3>{headings[0]?.heading_content || "Loading..."}</h3>
                    </div>
                    {countriesData.map((country) => (
                        <div
                            key={country.uuid_id}
                            className="col-xxl-2 col-xl-2 col-lg-4 col-md-2 col-sm-2 col-6"
                        >
                            <Link href={`/country/${country.uuid_id || country.name?.toLowerCase().replace(/ /g, '-')}`}>
                                <img src={country.country_icon_url || "/images/placeholder.jpg"} alt={country.name} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Countries;