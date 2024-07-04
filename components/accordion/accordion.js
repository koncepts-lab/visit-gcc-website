// Accordion.js
import React, { useState } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, items, isOpenInitially }) => {
    const [isOpen, setIsOpen] = useState(isOpenInitially);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.accordion}>
            <div className={styles.accordionHeader} onClick={toggleAccordion}>
                <h4 className={styles.title}>{title}</h4>
                <span className={styles.sign}>{isOpen ? '▼' : '▲'}</span>
            </div>
            {isOpen && (
                <div className={styles.accordionContent}>
                    <ul>
                        {items.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                <input
                                    type='checkbox'
                                    id={`checkbox-${title}-${index}`}
                                    className={styles.checkbox}
                                />
                                <label htmlFor={`checkbox-${title}-${index}`} className={styles.label}>
                                    {item}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Accordion;
