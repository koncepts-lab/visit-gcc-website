import React, { useState } from 'react';
import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.module.css';

const PackageExclusions = () => {
    const [key, setKey] = useState('International Flights');

    const exclusions = [
        {
            eventKey: 'International Flights',
            title: 'International Flights',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
        {
            eventKey: 'Personal Expenses',
            title: 'Personal Expenses',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
        {
            eventKey: 'Visa Assistance',
            title: 'Visa Assistance',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
        {
            eventKey: 'Alcoholic Beverages',
            title: 'Alcoholic Beverages',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
        {
            eventKey: 'entrance-fees',
            title: 'Entrance Fees',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
        {
            eventKey: 'transfers',
            title: 'Transfers',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        },
    ];

    return (
        <Container>
            <Tabs
                id="package-inclusions-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className={`${style['package-inclusions-tabs']}`}
            >
                {exclusions.map((exclusion) => (
                    <Tab key={exclusion.eventKey} eventKey={exclusion.eventKey} title={exclusion.title} className={style['box-container']}>
                        <Row>
                            <Col>
                                <p className='text-justify'>{exclusion.description}</p>
                            </Col>
                        </Row>
                    </Tab>
                ))}
            </Tabs>
        </Container>
    );
};

export default PackageExclusions;