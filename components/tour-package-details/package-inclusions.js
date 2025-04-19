import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.module.css';
import axios from 'axios';

const PackageInclusionsAndExclusions = ({ packageId }) => {
    const [keyInclusions, setKeyInclusions] = useState(null);
    const [inclusions, setInclusions] = useState([]);
    const [keyExclusions, setKeyExclusions] = useState(null);
    const [exclusions, setExclusions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            setIsLoading(true);
            setError('');
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
          
            try {
                const inclusionsResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}inclusions/package/get-by-package?package_id=${packageId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const fetchedInclusions = inclusionsResponse.data.data || inclusionsResponse.data || [];
                setInclusions(fetchedInclusions);
                if (fetchedInclusions.length > 0) {
                    setKeyInclusions(fetchedInclusions[0].title);
                }

                const exclusionsResponse = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}exclusions/package/get-by-package?package_id=${packageId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const fetchedExclusions = exclusionsResponse.data.data || exclusionsResponse.data || [];
                setExclusions(fetchedExclusions);
                if (fetchedExclusions.length > 0) {
                    setKeyExclusions(fetchedExclusions[0].title);
                }

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                setError("Failed to fetch package details. Please try again.");
                console.error("Error fetching package details:", err);
            }
        };

        if (packageId) {
            fetchPackageDetails();
        }
        // Removed packageId from the dependency array as it's now a prop.
        // The component will re-render when the prop changes, triggering the useEffect.
    }, [packageId]);

    return (
        <Container>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-danger text-center">{error}</div>
            ) : (
                <>
                    {/* Inclusions Tab */}
                    <h3 className={` ${style['p-color']}`}>Package Inclusions</h3>
                    <Tabs
                        id="package-inclusions-tabs"
                        activeKey={keyInclusions}
                        onSelect={(k) => setKeyInclusions(k)}
                        className={`${style['package-inclusions-tabs']}`}
                    >
                        {inclusions.map((inclusion) => (
                            <Tab key={inclusion.id} eventKey={inclusion.title} title={inclusion.title} className={style['box-container']}>
                                <Row>
                                    <Col>
                                        <p className="text-justify">{inclusion.description}</p>
                                    </Col>
                                </Row>
                            </Tab>
                        ))}
                    </Tabs>

                    {/* Exclusions Tab */}
                    <h3 className={` ${style['p-color']} pt-4`}>Package Exclusions</h3>
                    <Tabs
                        id="package-exclusions-tabs"
                        activeKey={keyExclusions}
                        onSelect={(k) => setKeyExclusions(k)}
                        className={`${style['package-inclusions-tabs']}`}
                    >
                        {exclusions.map((exclusion) => (
                            <Tab key={exclusion.id} eventKey={exclusion.title} title={exclusion.title} className={style['box-container']}>
                                <Row>
                                    <Col>
                                        <p className="text-justify">{exclusion.description}</p>
                                    </Col>
                                </Row>
                            </Tab>
                        ))}
                    </Tabs>
                </>
            )}
        </Container>
    );
};

export default PackageInclusionsAndExclusions;