import React, { useState, useEffect } from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";
import axios from "axios";

const PackageInclusionsAndExclusions = ({ packageId }) => {
  const [keyInclusions, setKeyInclusions] = useState(null);
  const [inclusions, setInclusions] = useState([]);
  const [keyExclusions, setKeyExclusions] = useState(null);
  const [exclusions, setExclusions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      setIsLoading(true);
      setError("");

      // Simplified token retrieval
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");

      // We don't use authToken in the GET request, but keeping it in case it's needed for future protected routes.
      // If your API doesn't require it, you can remove the token logic.
      if (authToken) {
        console.log("Auth token found.");
      }

      try {
        // Fetch both in parallel for better performance
        const [inclusionsResponse, exclusionsResponse] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}/inclusions`
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}/exclusions`
          ),
        ]);

        const fetchedInclusions =
          inclusionsResponse.data.data || inclusionsResponse.data || [];
        setInclusions(fetchedInclusions);
        if (fetchedInclusions.length > 0) {
          setKeyInclusions(fetchedInclusions[0].title);
        }

        const fetchedExclusions =
          exclusionsResponse.data.data || exclusionsResponse.data || [];
        setExclusions(fetchedExclusions);
        if (fetchedExclusions.length > 0) {
          setKeyExclusions(fetchedExclusions[0].title);
        }
      } catch (err) {
        setError("Failed to fetch package details. Please try again.");
        console.error("Error fetching package details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (packageId) {
      fetchPackageDetails();
    }
  }, [packageId]);

  // A clear message for when there is no data at all.
  const noDataAvailable =
    !isLoading && !error && inclusions.length === 0 && exclusions.length === 0;

  return (
    <Container>
      {isLoading ? (
        <div className="text-center p-4">Loading...</div>
      ) : error ? (
        <div className="text-danger text-center p-4">{error}</div>
      ) : noDataAvailable ? (
        <div className={style.noDataMessage}>
          No inclusion or exclusion information is available for this package.
        </div>
      ) : (
        <>
          {/* Inclusions Section: Renders only if there are inclusions */}
          {inclusions.length > 0 && (
            <div>
              <h3 className={` ${style["p-color"]}`}>Package Inclusions</h3>
              <Tabs
                id="package-inclusions-tabs"
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
                        <p className="text-justify">{inclusion.description}</p>
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
              <h3 className={` ${style["p-color"]}`}>Package Exclusions</h3>
              <Tabs
                id="package-exclusions-tabs"
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
                        <p className="text-justify">{exclusion.description}</p>
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
