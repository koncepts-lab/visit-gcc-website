"use client";
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import Banner from '../../../../components/banner/banner';
import Countries from '../../../../components/countries/countries';
import Carousal from '../../../../components/carousel/Carousal';
import DocumentationTabs from '../../../../components/countries/documentation-tab';
import GettingAroundTab from '../../../../components/countries/getting-around-tab';
import CountryTabSectionTop from '../../../../components/countries/tab-bahrain';
import { useParams } from 'next/navigation';
import axios from 'axios';

function Country() {
    const { slug } = useParams();
    const [countryData, setCountryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allPackages, setAllPackages] = useState([]);
    const [hailings, setHailings] = useState([]);
    const [destinations, setDestinations] = useState([]);

    const fetchWithAuth = async (url) => {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
            authToken = loginToken;
        } else if (registerToken) {
            authToken = registerToken;
        }

        if (!authToken) {
            throw new Error("Authentication token not found");
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchHailings = async () => {
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}hailings`);
                setHailings(data);
            } catch (err) {
                console.error("Error fetching hailings:", err);
            }
        };

        const fetchDestinations = async () => {
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}destinations`);
                setDestinations(data);
            } catch (err) {
                console.error("Error fetching destinations:", err);
            }
        };

        fetchHailings();
        fetchDestinations();
    }, []);

    useEffect(() => {
        const fetchAllPackages = async () => {
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}packages`);
                const fetchedPackages = data.data || data || [];
                setAllPackages(fetchedPackages);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError("Failed to fetch packages. Please try again.");
            }
        };
        fetchAllPackages();
    }, []);

    useEffect(() => {
        const fetchCountryData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}countries/${slug}`);
                console.log(data);
                if (data) {
                    setCountryData(data);
                } else {
                    setError("Failed to fetch country data - invalid response");
                }
            } catch (err) {
                setError(`Failed to fetch country data for ${slug}. Please try again.`);
                console.error("Error fetching country data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchCountryData();
        }
    }, [slug]);

    if (isLoading) {
        return <div>Loading country information...</div>;
    }

    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    if (!countryData) {
        return <div>Country information not found.</div>;
    }

    return (
        <div>
            <Banner />
            <Countries />
            <div className={style['section-normal']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3>{countryData.main_heading}</h3>
                            <p>{countryData.description1}</p>
                        </div>
                    </div>
                </div>
            </div>
            <CountryTabSectionTop countryId={countryData.uuid_id}/>

            <section className={style['countries-explore-container']}>
                <div className={style['countries-explore']}>
                    <div className='container'>
                        <div className="row">
                            <div className='col-md-12 pb-3'>
                                <h3>{countryData.sub_heading1}</h3>
                            </div>
                        </div>
                    </div>

                    {/* CountryExplore */}
                    <div className={style['country-explore']}>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Carousal
                                        country={allPackages}
                                        count={5}
                                        type='country-tab-slider'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* CountryExplore */}
                </div>
            </section>

            <div className={style['section-normal']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 pb-3'>
                            <h3 className='mb-0'>{countryData.sub_heading2}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 pb-3'>
                            <label>Where am I from?</label>
                            <select className='form-control'>
                                <option>Select</option>
                                {hailings.map(hailing => (
                                    <option key={hailing.uuid_id} value={hailing.place}>{hailing.place}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-md-4 pb-3'>
                            <label>Where am I going?</label>
                            <select className='form-control'>
                                <option>Select</option>
                                {destinations.map(destination => (
                                    <option key={destination.uuid_id} value={destination.place}>{destination.place}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-md-4 pb-3 d-flex align-items-end'>
                            <button className={`${style['btn-two']} w-100`} >Get Visa Eligibility</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style['section-documentation']}>
                <div className={style['section-normal']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>{countryData.sub_heading3}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentationTabs  countryId={countryData.uuid_id} />
            </div>

            {/* <div className={style['section-documentation']}>
                <div className={style['section-normal']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>Getting Around</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <GettingAroundTab />
            </div> */}

            <section className={style['countries-explore-container']}>
                <div className={style['countries-explore']}>
                    <div className='container'>
                        <div className="row">
                            <div className="col-md-12 pb-3">
                                <h3>{countryData.sub_heading4 || 'Experience'}</h3>
                                <p>{countryData.description2}</p>
                            </div>
                        </div>
                    </div>

                    {/* countryExperiance */}
                    <div className={style['country-experiance']}>
                        <div className='container'>
                            <div className='row'>
                                <div className="col-md-12 pb-3">
                                    <Carousal
                                        countryExperiance={allPackages}
                                        count={4}
                                        countTab={1}
                                        type="country-Experiance"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Country;