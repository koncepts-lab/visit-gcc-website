"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItineraryHighlightTab() {
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
            name: 'Day 1 -Arrival in Dubai',
            content: (
                <>
                    <p> 
                    Arrive at Dubai International Airport<br/>

                    Private transfer to Burj Al Arab (or similar 5-star hotel)<br/>
                    
                    Afternoon : Explore Dubai Mall and Dubai Fountain Show<br/>
                    
                    Evening : Dhow cruise with dinner at Dubai Creek
                    </p>
                </>
            ),
        },
        {
            name: 'Day 2 ( Dubai)',
            content: (
                <>
                    <p>
                       Morning : Private helicopter tour over Dubai's iconic landmarks<br/>

Afternoon : Visit the Louvre Abu Dhabi Museum (private tour)<br/>

Evening : Enjoy a sunset cocktail at the Atmosphere, Burj Khalifa
                    </p>
                </>
            ),
        },
        {
            name: "Day 3 Dubai to Abu Dhabi",
            content: (
                <>
                    <p>
                       Private transfer to Abu Dhabi (approximately 1.5 hours)<br/>

Check-in at Emirates Palace (or similar 5-star hotel)<br/>

Afternoon : Visit the Sheikh Zayed Grand Mosque (private tour)<br/>

Evening : Enjoy Arabic cuisine at Al Tannour Restaurant
                    </p>
                </>
            ),
        },
        {
            name: 'Day 4 ( Abu Dhabi)',
            content: (
                <>
                    <p>
                        Morning : Visit the Louvre Abu Dhabi Museum (private tour)<br/>

Afternoon : Explore the Yas Marina Circuit and Ferrari World<br/>

Evening : Enjoy a sunset cocktail at the Observation Deck,

Etihad Towers
                    </p>
                </>
            ),
        },
        {
            name: 'Day 5 Abu Dhabi to Riyadh',
            content: (
                <>
                    <p>
                       Fly to Riyadh (approximately 1.5 hours)<br/>

Private transfer to Four Seasons Hotel Riyadh (or similar 5-star hotel)<br/>

Afternoon : Visit the National Museum of Saudi Arabia (private tour)<br/>

Evening : Enjoy Saudi cuisine at Najd Village Restaurant
                    </p>
                </>
            ),
        },
        {
            name: 'Day 6 (Riyadh)',
            content: (
                <>
                    <p>
                        Morning : Visit the Louvre Abu Dhabi Museum (private tour)<br/>

Afternoon : Explore the Yas Marina Circuit and Ferrari World<br/>

Evening : Enjoy a sunset cocktail at the Observation Deck,

Etihad Towers
                    </p>
                </>
            ),
        },
        {
            name: 'Day 7 Riyadh to Manama',
            content: (
                <>
                    <p>
                       Fly to Manama (approximately 1 hour)<br/>

Private transfer to Four Seasons Hotel Bahrain Bay

(or similar 5-star hotel)<br/>

Afternoon : Visit the Al Fateh Grand Mosque (private tour)<br/>

Evening : Enjoy Bahraini cuisine at Al Farrago Restaurant
                    </p>
                </>
            ),
        },
        {
            name: 'Day 8 (Manama)',
            content: (
                <>
                    <p>
                       Morning : Visit the Bahrain National Museum (private tour)<br/>

Afternoon: Explore the Manama Souk and Bab Al Bahrain<br/>

Evening : Enjoy a sunset cruise along the Bahrain coastline
                    </p>
                </>
            ),
        },
        {
            name: 'Day 9 Departure from Manama ',
            content: (
                <>
                    <p>
                        Morning : Visit the Al Jasra Handicraft Centre<br/>

Depart from Bahrain International Airport
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





export default ItineraryHighlightTab;
