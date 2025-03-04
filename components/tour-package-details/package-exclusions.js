import React, { useState } from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";

const PackageExclusions = ({ exclusion }) => {
  const [key, setKey] = useState("airport-transfers");

  return (
    <Container>
      <Tabs
        id="package-inclusions-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className={`${style["package-inclusions-tabs"]}`}
      >
        {exclusion.map((exclusions, index) => (
          <Tab
            key={index}
            eventKey={exclusions.name.toLowerCase().replace(/\s+/g, "-")}
            title={exclusions.name}
            className={style["box-container"]}
          >
            <Row>
              <Col>
                <p className="text-justify">{exclusions.description}</p>
              </Col>
            </Row>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default PackageExclusions;
