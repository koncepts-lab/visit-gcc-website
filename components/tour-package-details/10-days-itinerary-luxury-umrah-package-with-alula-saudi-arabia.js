"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function ItineraryLuxuryUmrahPackage() { 
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
            name: 'Day 1-2',
            content: (
                <>
                    <p> 
                    Arrival in Jeddah and Performance of Umrah<br />
Arrive at King Abdulaziz International Airport in Jeddah<br />
Transfer to The Ritz-Carlton , Jeddah (or similar 5-star hotel)<br />
Perform Umrah rituals<br />
Visit the Holy City of Mecca and pray at the Grand Mosque

                    </p>
                </>
            ),
        },
        {
            name: 'Day 3-4 (Mecca)',
            content: (
                <>
                    <p>
                     Spend two days in Mecca<br />
Performing prayers and exploring the city<br />
Visit the Jabal Nur Mountain and the Cave of Hira<br />	
Enjoy a private lecture on Islamic history and significance of Umrah
 
                    </p>
                </>
            ),
        },
        {
            name: "Day 5-6 ( Medina)",
            content: (
                <>
                    <p>

                    Fly to Medina (approximately 1 hour)<br/>
Transfer to The Oberoi, Medina (or similar 5-star hotel)<br/>
Visit the Prophet's Mosque and Al-Baqi Cemetery<br/>
Explore the city's historic sites and markets


                   
                    </p>
                </>
            ),
        },
        {
            name: 'Day 7-9: (AlUla)',
            content: (
                <>
                    <p>

                    Fly to AlUla (approximately 1.5 hours)<br/>
Transfer to Maraya Concert Hall and luxury camp (or similar)<br/>
 Explore the ancient city of Mada'in Saleh<br/>
Visit the Tombs of the Nabataeans and the AlUla Canyon<br/>
Enjoy stargazing and cultural events in the evening


                    </p>
                </>
            ),
        },



        {
            name: 'Day 10',
            content: (
                <>
                    <p>
                    Departure from Jeddah<br/>
Return to Jeddah (approximately 1.5 hours)<br/>
Depart from King Abdulaziz International Airport

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





export default ItineraryLuxuryUmrahPackage;
