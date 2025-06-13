// src/components/accordion/accordion.js (or wherever it is located)

"use client";
import React, { useState } from "react";
import styles from "./accordion.module.css"; // Ensure this path is correct
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  title,
  items,
  isOpenInitially = false,
  onItemClick,
  selectedItems = [], // This prop receives the list of active items from the parent
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!Array.isArray(items)) {
    return null; // Safety check
  }

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader} onClick={handleToggle}>
        <h5>{title}</h5>
        <span className={styles.icon}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>
      {isOpen && (
        <div className={styles.accordionContent}>
          <ul>
            {/* THIS IS THE UPDATED PART */}
            {items.map((item, index) => {
              // Check if the current item is in the array of selected items
              const isActive = selectedItems.includes(item);

              return (
                <li
                  // It's better to use a unique item string as a key if possible
                  key={item + index}
                  // Apply a 'selected' class if isActive is true
                  className={`${styles.listItem} ${
                    isActive ? styles.selected : ""
                  }`}
                  // The whole list item is now clickable
                  onClick={() => onItemClick && onItemClick(item)}
                >
                  {item}
                </li>
              );
            })}
            {/* END OF UPDATED PART */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
