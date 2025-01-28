"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItinerarySaudiArabiaBahrainQatar() { 
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
            name: 'Day 1  ( Arrival in Riyadh, Saudi Arabia )',
            content: (
                <>
                    <p> 
                    Arrive at King Khalid International Airport<br/>
                    Private transfer to Four Seasons Hotel Riyadh (or similar 5-star hotel)<br/>
                    Afternoon : Visit the National Museum of Saudi Arabia (private tour)<br/>
                    Evening : Enjoy a traditional Saudi dinner at Najd Village Restaurant
                    </p>
                </>
            ),
        },
        {
            name: 'Day 2 (Riyadh)',
            content: (
                <>
                    <p>
                      Morning    : Visit the Masmak Fortress (private tour)<br/>
                      Afternoon : Explore the Kingdom Centre Tower and Sky Bridge<br/>
                      Evening     : Enjoy a sunset cocktail at the Four Seasons Hotel Riyadh's rooftop lounge      
                    </p>
                </>
            ),
        },
        {
            name: "Day 3 (Riyadh to Bahrain)",
            content: (
                <>
                    <p>
                     Fly to Bahrain (approximately 1 hour)<br/>
Private transfer to Four Seasons Hotel Bahrain Bay (or    similar 5-star hotel)<br/>
	Afternoon : Visit the Al Fateh Grand Mosque (private tour)<br/>
	Evening    :  Enjoy a traditional Bahraini dinner at Al Farrago 
                           Restaurant 

                    </p>
                </>
            ),
        },
        {
            name: 'Day 4 (Bahrain)',
            content: (
                <>
                    <p>
                      Morning   :  Visit the Bahrain National Museum (private tour)<br/>
	Afternoon :  Explore the Manama Souk and Bab Al Bahrain<br/>
	Evening    :  Enjoy a sunset cruise along the Bahrain coastline

                    </p>
                </>
            ),
        },



        {
            name: 'Day 5 ( Bahrain to Doha, Qatar)',
            content: (
                <>
                    <p>
                     Fly to Doha, Qatar (approximately 1 hour)<br/>
Private transfer to The St. Regis Doha (or similar 5-star hotel)<br/>
          Afternoon :Visit the Museum of Islamic Art (private tour)<br/>
	Evening    : Enjoy a traditional Qatari dinner at Damasca One


                    </p>
                </>
            ),
        },

        {
            name: 'Day 6 (Doha)',
            content: (
                <>
                    <p>
                     Morning    : Explore the Souq Waqif and Falcon Souk<br/>
	Afternoon : Visit the Katara Cultural Village<br/>
	Evening    : Enjoy a sunset cocktail at the Nobu Doha


                    </p>
                </>
            ),
        },

        {
            name: 'Day 7 Departure from Doha',
            content: (
                <>
                    <p>
                      Morning : Visit the Aspire Park and Villaggio Mall<br/>
Depart from Hamad International Airport

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





export default ItinerarySaudiArabiaBahrainQatar;
