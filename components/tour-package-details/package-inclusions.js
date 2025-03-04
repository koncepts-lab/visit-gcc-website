import React, { useState } from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you import Bootstrap CSS
import style from "./style.module.css"; // Ensure correct path for styles

const PackageInclusions = ({ inclusion }) => {
  const [key, setKey] = useState("airport-transfers");

  return (
    <Container>
      <Tabs
        id="package-inclusions-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className={`${style["package-inclusions-tabs"]}`}
      >
        {inclusion.map((inclusions, index) => (
          <Tab
            key={index}
            eventKey={inclusions.name.toLowerCase().replace(/\s+/g, "-")}
            title={inclusions.name}
            className={style["box-container"]}
          >
            <Row>
              <Col>
                <p className="text-justify">{inclusions.description}</p>
              </Col>
            </Row>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default PackageInclusions;
