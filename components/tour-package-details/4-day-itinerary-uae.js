"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItineraryUAE() { 
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
            name: 'Day 1 ( Dubai)',
            content: (
                <>
                    <p> 
                    Morning : Private helicopter tour over Dubai's iconic landmarks

(Burj Khalifa, Palm Jumeirah, etc.)<br/>

Afternoon : Visit the Dubai Mall and explore its luxury stores and attractions<br/>

Evening : Enjoy a sunset dinner cruise at Dubai Marina
                    </p>
                </>
            ),
        },
        {
            name: 'Day 2 (Dubai)',
            content: (
                <>
                    <p>
                     Morning : Desert safari with luxury camp setup

(dune bashing, camel riding, etc.)<br/>

Afternoon : Visit the Dubai Miracle Garden and Global Village<br/>

Evening : Enjoy a private dinner at Atmosphere, Burj Khalifa     
                    </p>
                </>
            ),
        },
        {
            name: "Day 3 (Abu Dhabi)",
            content: (
                <>
                    <p>
                     Morning : Private transfer to Abu Dhabi

(approximately 1.5 hours)

Visit the Sheikh Zayed Grand Mosque (private tour)<br/>

Afternoon : Explore the Louvre Abu Dhabi Museum (private tour)<br/>

Evening : Enjoy a sunset cocktail at the Observation Deck,

Etihad Towers
                    </p>
                </>
            ),
        },
        {
            name: 'Day 4 (Abu Dhabi)',
            content: (
                <>
                    <p>
                     Morning : Visit the Yas Marina Circuit and Ferrari World<br/>

Afternoon : Relax at the Emirates Palace beach<br/>

Evening : Depart from Abu Dhabi International Airport

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





export default ItineraryUAE;
