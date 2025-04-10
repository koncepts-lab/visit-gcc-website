"use client";
import React, { useEffect, useState } from 'react';
import style from './style.module.css';

const DocumentationTabs = ({ countryId }) => {
    const [insights, setInsights] = useState([]);
    const [insightDetails, setInsightDetails] = useState({});
    const [activeInsightId, setActiveInsightId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    useEffect(() => {
        const fetchInsights = async () => {
            const authToken = localStorage.getItem("auth_token_login") || localStorage.getItem("auth_token_register");
            
            try {
                if (!authToken) {
                    setError("Authentication token not found");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country-insights/country/${countryId}/get-by-country`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.insights && data.insights.length > 0) {
                    setInsights(data.insights);
                    setActiveInsightId(data.insights[0].uuid_id);
                    
                    // Fetch details for the first insight
                    await fetchInsightDetails(data.insights[0].uuid_id, authToken);
                }
            } catch (error) {
                console.error("Error fetching insights:", error);
                setError("Failed to load insights. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (countryId) {
            fetchInsights();
        }
    }, [countryId]);

    const fetchInsightDetails = async (insightId, authTokenParam = null) => {
        // Use provided token or get from localStorage
        const authToken = authTokenParam || localStorage.getItem("auth_token_login") || localStorage.getItem("auth_token_register");
        
        try {
            if (!authToken) {
                setError("Authentication token not found");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country-insight-details/insight/${insightId}/get-by-insight`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.details) {
                setInsightDetails(prevDetails => ({
                    ...prevDetails,
                    [insightId]: data.details
                }));
            }
        } catch (error) {
            console.error(`Error fetching details for insight ${insightId}:`, error);
            setError("Failed to load insight details. Please try again later.");
        }
    };

    const handleTabClick = async (insightId) => {
        setActiveInsightId(insightId);
        
        // Fetch details if they don't exist yet
        if (!insightDetails[insightId]) {
            await fetchInsightDetails(insightId);
        }
    };

    if (loading) {
        return <div className="text-center p-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-5 text-danger">{error}</div>;
    }

    if (insights.length === 0) {
        return <div className="text-center p-5">No insights available for this country.</div>;
    }

    return (
        <section className={style.innerpage}>
            <div className={`container ${style['light-bg']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                    {insights.map((insight, index) => (
                                        <li key={insight.uuid_id} className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['country-nav-link']} ${activeInsightId === insight.uuid_id ? `active ${style['active-tab']}` : ''}`}
                                                id={`tab-${insight.uuid_id}`}
                                                data-bs-toggle="tab"
                                                data-bs-target={`#content-${insight.uuid_id}`}
                                                type="button"
                                                role="tab"
                                                aria-controls={`content-${insight.uuid_id}`}
                                                aria-selected={activeInsightId === insight.uuid_id}
                                                onClick={() => handleTabClick(insight.uuid_id)}
                                            >
                                                {insight.title}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {insights.map((insight) => (
                                        <div
                                            key={insight.uuid_id}
                                            className={`tab-pane fade ${activeInsightId === insight.uuid_id ? 'show active' : ''}`}
                                            id={`content-${insight.uuid_id}`}
                                            role="tabpanel"
                                            aria-labelledby={`tab-${insight.uuid_id}`}
                                        >
                                            <div className={style['documentation-container']}>
                                                <div className='container'>
                                                    <div className='row'>
                                                        <div className='col-md-12'>
                                                            <h4 className='pb-2'>{insight.title}</h4>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        {insightDetails[insight.uuid_id]?.map((detail) => (
                                                            <div key={detail.uuid_id} className='col-md-4'>
                                                                <div className={style['important_numbers']}>
                                                                    <span>
                                                                        <img 
                                                                            src={detail.insight_icon_url} 
                                                                            alt={detail.heading} 
                                                                            className='img-center' style={{height: '50px', width: '50px'}} 
                                                                        />
                                                                    </span>
                                                                    <span>
                                                                        <p>{detail.heading}</p>
                                                                        <p>{detail.description}</p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
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

export default DocumentationTabs;