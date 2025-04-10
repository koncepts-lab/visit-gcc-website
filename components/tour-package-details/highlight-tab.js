"use client";

import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import axios from 'axios';

function HighlightTab({ packageId }) {
    const [activeTab, setActiveTab] = useState('Highlight');
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [highlightData, setHighlightData] = useState([]);
    const [itineraryData, setItineraryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHighlights = async () => {
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
          
                setIsLoading(true);
                setError('');
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}package-highlights/${packageId}/get-highlights`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                console.log("highlights:", response.data);
        
                const formattedData = response.data.map(item => ({
                    name: `${item.day}`, 
                    content: item.description,
                }));
                setHighlightData(formattedData);
        
            } catch (err) {
                console.error("Error fetching highlights:", err);
                setError("Failed to fetch highlights.");
            } finally {
                setIsLoading(false); // This line is missing in your original code
            }
        };
        const fetchItinerary = async () => {
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
          
                setIsLoading(true);
                setError('');
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}itineraries/package/get-by-package?package_id=${packageId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                console.log("itenearary:", response.data);

                const formattedData = response.data.map(item => ({
                    name: `${item.day} - ${item.title}`,
                    content: item.description,
                }));
                setItineraryData(formattedData);
            } catch (err) {
                console.error("Error fetching itinerary:", err);
                setError("Failed to fetch itinerary.");
            } finally {
                setIsLoading(false);
            }
        };

        if (packageId) {
            setIsLoading(true); // Set loading at the start of tab change
            setError('');
            if (activeTab === 'Highlight') {
                fetchHighlights();
            } else if (activeTab === 'Itinerary') {
                fetchItinerary();
            }
        }
    }, [packageId, activeTab]);

    const tabs = [
        {
            name: 'Highlight',
            label: 'Highlight',
        },
        {
            name: 'Itinerary',
            label: 'Itinerary',
        },
    ];

    const renderTabContent = () => {
        if (isLoading) {
            return <div className="text-center">Loading...</div>;
        }

        if (error) {
            return <div className="text-danger text-center">{error}</div>;
        }

        let currentTabData;
        let heading;

        if (activeTab === 'Highlight') {
            currentTabData = highlightData;
            heading = 'Highlight';
        } else if (activeTab === 'Itinerary') {
            currentTabData = itineraryData;
            heading = 'Itinerary';
        }

        return (
            <>
                <h3>{heading}</h3>
                <div>
                    {currentTabData && currentTabData.length > 0 ? ( // Ensure data exists before mapping
                        currentTabData.map((tab, index) => (
                            <div key={index} className={style.accordion}>
                                <div
                                    className={`${style.accordionTab} ${activeAccordion === index ? style.activeAccordion : ''}`}
                                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                                >
                                    <h4><HiOutlineArrowLongRight /> {tab.name}</h4>
                                    <span className={style.accordionIcon}>
                                        {activeAccordion === index ? '-' : '+'}
                                    </span>
                                </div>
                                {activeAccordion === index && (
                                    <div className={style.accordionContent}>
                                        <p>{tab.content}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>No data available for this tab.</div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className={style.tabContainer}>
            <div className={style.tabButtons}>
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`${style.tabButton} ${activeTab === tab.name ? style.active : ''}`}
                        onClick={() => {
                            setActiveTab(tab.name);
                            setActiveAccordion(null);
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={style.tabContent}>
                {renderTabContent()}
            </div>
        </div>
    );
}

export default HighlightTab;