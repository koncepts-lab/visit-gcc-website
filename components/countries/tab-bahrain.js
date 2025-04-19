"use client";
import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import Carousal from '../carousel/Carousal';
import { useParams } from 'next/navigation';
import axios from 'axios';

const CountryTabSectionTop = ({ countryId }) => {
    const { countrySlug } = useParams();
    const currentCountryId = countryId || countrySlug;
    const [tabData, setTabData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const authToken = localStorage.getItem("auth_token_login") || localStorage.getItem("auth_token_register");

    useEffect(() => {
        const fetchTabData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                if (!authToken) {
                    setError("Authentication token not found");
                    setIsLoading(false);
                    return;
                }

                const featuresResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}country-features/country/${currentCountryId}/get-by-country`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                if (featuresResponse.data && Array.isArray(featuresResponse.data.features)) {
                    const features = featuresResponse.data.features;
                    const tabs = [];

                    for (const feature of features) {
                        try {
                            const detailsResponse = await axios.get(
                                `${process.env.NEXT_PUBLIC_API_URL}feature-details/feature/${feature.uuid_id}/get-by-feature`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${authToken}`,
                                    },
                                }
                            );

                            if (detailsResponse.data && Array.isArray(detailsResponse.data.details)) {
                                const carousalItems = detailsResponse.data.details.map(detail => ({
                                    id: detail.uuid_id,
                                    heading: detail.heading,
                                    description: detail.description,
                                    image: detail.feature_photo_url 
                                }));

                                tabs.push({
                                    uuid_id: feature.uuid_id,
                                    tab_title: feature.title,
                                    tab_content: carousalItems,
                                });
                            } else {
                                console.warn(`No details found for feature: ${feature.title} (${feature.uuid_id})`);
                                tabs.push({
                                    uuid_id: feature.uuid_id,
                                    tab_title: feature.title,
                                    tab_content: [],
                                });
                            }
                        } catch (detailsError) {
                            console.error(`Error fetching details for feature ${feature.title} (${feature.uuid_id}):`, detailsError);
                            tabs.push({
                                uuid_id: feature.uuid_id,
                                tab_title: feature.title,
                                tab_content: [], 
                            });
                        }
                    }
                    setTabData(tabs);
                } else {
                    setTabData([]);
                    console.warn("No features found for this country.");
                }
            } catch (featuresError) {
                setError(`Failed to fetch features for country ${currentCountryId}. Please try again.`);
                console.error("Error fetching features:", featuresError);
                setTabData([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (currentCountryId) {
            fetchTabData();
        }
    }, [currentCountryId, authToken]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    if (isLoading) {
        return <section className={style.innerpage}><div className={`container ${style['light-bg']}`}>Loading tabs...</div></section>;
    }

    if (error) {
        return <section className={style.innerpage}><div className={`container ${style['light-bg']} text-danger`}>Error: {error}</div></section>;
    }

    return (
        <section className={style.innerpage}>
            <div className={`container ${style['light-bg']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <div className={style['ul-container']}>
                                    <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                        {tabData.map((tab, index) => (
                                            <li className={`nav-item ${style['country-nav-item']}`} key={tab.uuid_id} role="presentation">
                                                <button
                                                    className={`nav-link border-0 ${style['country-nav-link']} ${index === 0 ? style['active-tab'] + ' active' : ''}`}
                                                    id={`${tab.tab_title.replace(/\s+/g, '-').toLowerCase()}-tab`}
                                                    data-bs-toggle="tab"
                                                    data-bs-target={`#${tab.tab_title.replace(/\s+/g, '-').toLowerCase()}`}
                                                    type="button"
                                                    role="tab"
                                                    aria-controls={tab.tab_title.replace(/\s+/g, '-').toLowerCase()}
                                                    aria-selected={index === 0 ? 'true' : 'false'}
                                                >
                                                    {tab.tab_title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    {tabData.map((tab, index) => (
                                        <div
                                            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
                                            id={tab.tab_title.replace(/\s+/g, '-').toLowerCase()}
                                            role="tabpanel"
                                            aria-labelledby={`${tab.tab_title.replace(/\s+/g, '-').toLowerCase()}-tab`}
                                            key={tab.uuid_id}
                                        >
                                            <div className={style['country-tab']}>
                                                <div className='container'>
                                                    <div className='row'>
                                                        {tab.tab_content && tab.tab_content.length > 0 ? (
                                                            <Carousal country={tab.tab_content} count={1} type="country-tab" />
                                                        ) : (
                                                            <div className="col-md-12">
                                                                <p>No content available for this tab.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <h1 >{tab.tab_content.heading}</h1>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CountryTabSectionTop;