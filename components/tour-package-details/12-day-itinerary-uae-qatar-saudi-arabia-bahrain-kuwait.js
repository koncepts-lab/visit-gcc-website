"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItineraryUaeQatarSaudiArabiaBahrainKuwait() { 
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
            name: 'Day 1-2 : Dubai , UAE',
            content: (
                <>
                    <p> 
                    Arrive at Dubai International Airport<br />

Private transfer to Burj Al Arab (or similar 5-star hotel)<br />

Explore Dubai Mall, Dubai Fountain Show and Dubai Marina<br />

Private helicopter tour over Dubai's iconic landmarks<br />

Dhow cruise with dinner at Dubai Creek

                    </p>
                </>
            ),
        },
        {
            name: 'Day 3-4 : Abu Dhabi ,UAE',
            content: (
                <>
                    <p>
                    Private transfer to Abu Dhabi (approximately 1.5 hours)<br />

Check-in at Emirates Palace (or similar 5-star hotel)<br />

Visit Sheikh Zayed Grand Mosque (private tour)<br />

Explore Louvre Abu Dhabi Museum (private tour)<br />

Yas Marina Circuit and Ferrari World
 
                    </p>
                </>
            ),
        },
        {
            name: "Day 5-6 : Doha, Qatar",
            content: (
                <>
                    <p>

                   Fly to Doha (approximately 1 hour)<br />

Private transfer to The St. Regis Doha (or similar 5-star hotel)<br />

Visit Museum of Islamic Art (private tour)<br />

Explore Souq Waqif and Falcon Souk<br />

Katara Cultural Village

                   
                    </p>
                </>
            ),
        },
        {
            name: 'Day 7-8 : Riyadh, Saudi Arabia',
            content: (
                <>
                    <p>

                   Fly to Riyadh (approximately 1.5 hours)<br />

Private transfer to Four Seasons Hotel Riyadh

(or similar 5-star hotel)<br />

Visit National Museum of Saudi Arabia (private tour)<br />

Explore Masmak Fortress (private tour)<br />

Kingdom Centre Tower and Sky Bridge


                    </p>
                </>
            ),
        },



        {
            name: 'Day 9-10 : Manama, Bahrain',
            content: (
                <>
                    <p>

                    Fly to Manama (approximately 1 hour)<br/>

Private transfer to Four Seasons Hotel Bahrain Bay

(or similar 5-star hotel)<br/>

Visit Al Fateh Grand Mosque (private tour)<br/>

Explore Bahrain National Museum (private tour)<br/>

Manama Souk and Bab Al Bahrain



                    </p>
                </>
            ),
        },

        {
            name: 'Day 11-12 : Kuwait City, Kuwait',
            content: (
                <>
                    <p>

                   Fly to Kuwait City (approximately 1 hour)<br/>

Private transfer to The Ritz-Carlton, Kuwait

(or similar 5-star hotel)<br/>

Visit Kuwait Towers and Liberation Tower<br/>

Explore National Museum of Kuwait (private tour)<br/>

Souk Al-Mubarakia



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





export default ItineraryUaeQatarSaudiArabiaBahrainKuwait;
