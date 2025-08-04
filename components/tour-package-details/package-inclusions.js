import React, { useState, useEffect } from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import axios from "axios";

const PackageInclusionsAndExclusions = ({ packageId, type = "package" }) => {
  const [keyInclusions, setKeyInclusions] = useState(null);
  const [inclusions, setInclusions] = useState([]);
  const [keyExclusions, setKeyExclusions] = useState(null);
  const [exclusions, setExclusions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!packageId) {
        setError("Item ID is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      let inclusionsUrl;
      let exclusionsUrl;

      // Conditionally set the API endpoints based on the 'type' prop
      if (type === "attraction") {
        inclusionsUrl = `${process.env.NEXT_PUBLIC_API_URL}att-inclusions/attraction/get-by-attraction?attraction_id=${packageId}`;
        exclusionsUrl = `${process.env.NEXT_PUBLIC_API_URL}att-exclusions/attraction/get-by-attraction?attraction_id=${packageId}`;
      } else { // Default to 'package'
        inclusionsUrl = `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}/inclusions`;
        exclusionsUrl = `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}/exclusions`;
      }

      try {
        // Fetch both in parallel using the dynamically set URLs
        const [inclusionsResponse, exclusionsResponse] = await Promise.all([
          axios.get(inclusionsUrl),
          axios.get(exclusionsUrl),
        ]);

        let fetchedInclusions =
          inclusionsResponse.data.data || inclusionsResponse.data || [];
        // Sort inclusions to show the newest first (assuming higher ID is newer)
        fetchedInclusions.sort((a, b) => b.id - a.id);
        setInclusions(fetchedInclusions);
        if (fetchedInclusions.length > 0) {
          setKeyInclusions(fetchedInclusions[0].title);
        }

        let fetchedExclusions =
          exclusionsResponse.data.data || exclusionsResponse.data || [];
        // Sort exclusions to show the newest first (assuming higher ID is newer)
        fetchedExclusions.sort((a, b) => b.id - a.id);
        setExclusions(fetchedExclusions);
        if (fetchedExclusions.length > 0) {
          setKeyExclusions(fetchedExclusions[0].title);
        }
      } catch (err) {
        setError(`Failed to fetch details for this ${type}. Please try again.`);
        console.error(`Error fetching ${type} details:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [packageId, type]);

  const noDataAvailable =
    !isLoading && !error && inclusions.length === 0 && exclusions.length === 0;

  // Dynamic labels for UI elements
  const typeLabel = type === 'attraction' ? 'Attraction' : 'Package';
  const inclusionTitle = type === 'attraction' ? ' Inclusions' : 'Package Inclusions';
  const exclusionTitle = type === 'attraction' ? ' Exclusions' : 'Package Exclusions';


  return (
    <Container>
      {isLoading ? (
        <div className="text-center p-4">
           <img src="/images/loader.svg"style={{height: '50px', width: '50px'}}/>   
        </div>
      ) : error ? (
        <div className="alert alert-warning text-center p-4">{error}</div>
      ) : noDataAvailable ? (
        <div className={style.noDataMessage}>
          No inclusion or exclusion information is available for this {type}.
        </div>
      ) : (
        <>
          {/* Inclusions Section: Renders only if there are inclusions */}
          {inclusions.length > 0 && (
            <div>
              <h3 className={` ${style["p-color"]}`}>{inclusionTitle}</h3>
              <Tabs
                id="inclusions-tabs"
                activeKey={keyInclusions}
                onSelect={(k) => setKeyInclusions(k)}
                className={`${style["package-inclusions-tabs"]}`}
              >
                {inclusions.map((inclusion) => (
                  <Tab
                    key={inclusion.id}
                    eventKey={inclusion.title}
                    title={inclusion.title}
                    className={style["box-container"]}
                  >
                    <Row>
                      <Col>
                        <p className="text-justify text-black">{inclusion.description}</p>
                      </Col>
                    </Row>
                  </Tab>
                ))}
              </Tabs>
            </div>
          )}

          {/* Exclusions Section: Renders only if there are exclusions */}
          {exclusions.length > 0 && (
            <div className="pt-4">
              <h3 className={` ${style["p-color"]}`}>{exclusionTitle}</h3>
              <Tabs
                id="exclusions-tabs"
                activeKey={keyExclusions}
                onSelect={(k) => setKeyExclusions(k)}
                className={`${style["package-inclusions-tabs"]}`}
              >
                {exclusions.map((exclusion) => (
                  <Tab
                    key={exclusion.id}
                    eventKey={exclusion.title}
                    title={exclusion.title}
                    className={style["box-container"]}
                  >
                    <Row>
                      <Col>
                        <p className="text-justify text-black">{exclusion.description}</p>
                      </Col>
                    </Row>
                  </Tab>
                ))}
              </Tabs>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default PackageInclusionsAndExclusions;