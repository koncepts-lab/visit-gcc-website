"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItineraryQatar() {
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('Highlight');
 
    // Tab names 
    const tabs = [
        { name: 'Highlight', label: 'Highlight' },
        { name: 'Itinerary', label: 'Itinerary' },
        { name: 'InclusionsExclusions', label: 'Package Inclusions & Exclusions' },
        { name: 'Note', label: 'Note' }
    ];

    // Render tab content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Highlight':
                return <HighlightContent />;
            case 'Itinerary':
                return <ItineraryContent />;
            case 'InclusionsExclusions':
                return <InclusionsExclusionsContent />;
            case 'Note':
                return <NoteContent />;
            default:
                return null;
        }
    };

    return (
        <div className={style.tabContainer}>
            <div className={style.tabButtons}>
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`${style.tabButton} ${activeTab === tab.name ? style.active : ''}`}
                        onClick={() => setActiveTab(tab.name)}
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

// Accordion content component
const HighlightContent = () => {
    // State to manage which accordion panel is open
    const [activeAccordion, setActiveAccordion] = useState(null);

    // List of accordion tabs and their content
    const accordionTabs = [
        {
            name: 'Day 1 Arrival and Desert Adventure',
            content: (
                <>
                    <p> 
                    Morning : Arrive at Hamad International Airport

Private transfer to The St. Regis Doha (or similar 5-star hotel)<br/>

Afternoon: Desert safari with luxury camp setup

(dune bashing , camel riding, etc.)<br/>

Evening : Enjoy a sunset dinner at the camp, followed by star gazing
                    </p>
                </>
            ),
        },
        {
            name: 'Day 2 Cultural Experiences',
            content: (
                <>
                    <p>
                       Morning : Visit the Museum of Islamic Art (private tour)<br/>

Afternoon : Explore the Souq Waqif and Falcon Souk<br/>

Evening : Enjoy a traditional Qatari dinner and cultural performance at

Damasca One
                    </p>
                </>
            ),
        },
        {
            name: "Day 3 Water Activities and Relaxation",
            content: (
                <>
                    <p>
                      Morning : Private yacht cruise around the Doha coastline<br/>

Afternoon : Relax at the Katara Beach or The Ritz-Carlton, Doha’s

private beach<br/>

Evening : Enjoy a seafood dinner at The Pearl-Qatar
                    </p>
                </>
            ),
        },
        {
            name: 'Day 4 Adventure and Departure',
            content: (
                <>
                    <p>
                       Morning : Visit the Aspire Park and Villaggio Mall<br/>

Afternoon : Skydiving or indoor skydiving experience at the

Aspire Park<br/>

Evening : Depart from Hamad International Airport
                    </p>
                </>
            ),
        },
        



    ];

    // Toggle the active accordion panel
    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <>
           
            <div>
                {accordionTabs.map((tab, index) => (
                    <div key={index} className={style.accordion}>
                        <div
                            className={`${style.accordionTab} ${activeAccordion === index ? style.activeAccordion : ''
                                }`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <h4><HiOutlineArrowLongRight /> {tab.name}</h4>
                            <span className={style.accordionIcon}>
                                {activeAccordion === index ? '-' : '+'}
                            </span>
                        </div>
                        {activeAccordion === index && (
                            <div className={style.accordionContent}>
                                {tab.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

const ItineraryContent = () => (
    <div>
        <h4>Itinerary</h4>
    </div>
);

const InclusionsExclusionsContent = () => (
    <div>
        <h4>Package Inclusions & Exclusions</h4>
    </div>
);

const NoteContent = () => (
    <div>
        <h4>Important Note</h4>
    </div>
);





export default ItineraryQatar;
