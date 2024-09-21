"use client"; // Ensure this component is a Client Component

import React, { useState } from 'react';
import style from './style.module.css'; // Ensure correct path for styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
function HighlightTab() {
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
            name: 'Day 1 - Arrival in Salalah',
            content: (
                <>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </>
            ),
        },
        {
            name: 'Day 2 - Salalah City Tour Discover the Cultural Delights of Salalah',
            content: (
                <>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </>
            ),
        },
        {
            name: "Day 3 - East Salalah Tour Discover Nature's Wonders and Ancient Treasures",
            content: (
                <>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </>
            ),
        },
        {
            name: 'Day 4 - Farewell Salalah',
            content: (
                <>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
            <h3>Highlight</h3>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
            </p>
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





export default HighlightTab;
