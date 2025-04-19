import React, { useState, useEffect } from 'react';
import styles from './Accordion.module.css';

const Accordion = ({ title, items, isOpenInitially, onItemClick, selectedItems = [] }) => {
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
                        {items.map((item) => (
                            <li key={item.id} className={styles.listItem}>
                                <input
                                    type='checkbox'
                                    id={`checkbox-${title}-${item.id}`}
                                    className={styles.checkbox}
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => onItemClick(item.id)}
                                />
                                <label htmlFor={`checkbox-${title}-${item.id}`} className={styles.label}>
                                    {item.title}
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