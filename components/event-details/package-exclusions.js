import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.module.css';

const PackageExclusions = () => {
    const [key, setKey] = useState('airport-transfers');

    return (
        <Container>
            <Tabs
                id="package-inclusions-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className={`${style['package-inclusions-tabs']}`}
            >
                <Tab eventKey="International Flights" title="International Flights" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Personal Expenses" title="Personal Expenses" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Visa Assistance" title="Visa Assistance" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Alcoholic Beverages" title="Alcoholic Beverages" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="entrance-fees" title="Entrance Fees" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="transfers" title="Transfers" className={style['box-container']}>
                    <Row>
                        <Col>
                            <p className='text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
};

export default PackageExclusions;
