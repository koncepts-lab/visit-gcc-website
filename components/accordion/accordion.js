"use client";
import React, { useState } from "react";
import styles from "./accordion.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  title,
  items,
  isOpenInitially = false,
  onItemClick,
  selectedItems = [], // This will now correctly receive an array of IDs, e.g., [1, 2]
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (!Array.isArray(items)) {
    console.error("Accordion received non-array items for title:", title);
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
            {items.map((item) => {
              // This check will now work correctly because `selectedItems` is an array of IDs
              // and `item.id` is the ID we are checking against.
              const isActive = selectedItems.includes(item.id);

              return (
                <li
                  key={item.id}
                  className={`${styles.listItem} ${
                    isActive ? styles.selected : ""
                  }`}
                  // This correctly passes the item's ID up to the parent component's handler.
                  onClick={() => onItemClick && onItemClick(item.id)}
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Accordion;
