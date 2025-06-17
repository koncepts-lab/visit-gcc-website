"use client";
import React, { useState } from "react";
import styles from "./accordion.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Accordion = ({
  title,
  items,
  isOpenInitially = false,
  onItemClick,
  selectedItems = [],
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  console.log("titile,", title);
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
            {items.map((item) => {
              // Check if the current item's ID is in the array of selected items
              const isActive = selectedItems.includes(item.id);

              return (
                <li
                  key={item.id} // Use item.id as the key
                  className={`${styles.listItem} ${
                    isActive ? styles.selected : ""
                  }`}
                  onClick={() => onItemClick && onItemClick(item.id)} // Pass item.id to onItemClick
                >
                  {item.title}{" "}
                  {/* Render item.title instead of the whole object */}
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
