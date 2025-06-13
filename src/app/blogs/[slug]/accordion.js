import React from "react";
import { BsArrowRight } from "react-icons/bs"; // Bootstrap Arrow Icon

const AccordionItem = ({ title, description, isOpen, onToggle }) => {
  return (
    <div className="py-2">
      {/* Accordion Header */}
      <div
        className="d-flex align-items-center gap-2 text-secondary fw-medium mb-2"
        onClick={onToggle} // Use the passed down toggle function
        style={{ cursor: "pointer" }}
      >
        <BsArrowRight
          className="me-4 text-primary"
          size={20}
          style={{
            fontSize: "1rem",
            transition: "transform 0.3s",
            transform: isOpen ? "rotate(-90deg)" : "rotate(0deg)",
          }}
        />
        {title}
      </div>

      {isOpen && <p className="text-secondary ps-4 mb-2 ms-5">{description}</p>}
    </div>
  );
};

export default AccordionItem;
