"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import style from "./style.module.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  // --- THIS IS THE KEY CHANGE (Part 1) ---
  // State to hold the dynamic max-height for the dropdown
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState("400px");

  // Effect to handle clicks outside the search component to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query]);

  // --- THIS IS THE KEY CHANGE (Part 2) ---
  // Effect to set dropdown height based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) {
        setDropdownMaxHeight("200px");
      } else {
        setDropdownMaxHeight("400px");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }search/general?q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      const data = await response.json();
      setResults(data?.results || data || []);
      setIsDropdownVisible(true);
    } catch (err) {
      setError(err.message);
      setResults([]);
      setIsDropdownVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleResultClick = (result) => {
    setQuery(result.name || result.heading || "");
    setIsDropdownVisible(false);

    let url;
    if (result.type === "package") {
      url = `/tour-package/${result.id}`;
    } else if (result.type === "attraction") {
      url = `/attractions/${result.id}`;
    } else if (result.type === "event") {
      url = `/events/${result.id}`;
    } else if (result.type === "blog") {
      url = `/blogs/${result.uuid_id}`;
    }
    if (url) window.location.href = url;
  };

  const handleClearFilter = () => {
    setQuery("");
    setResults([]);
    setError(null);
    setIsDropdownVisible(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (newValue.trim()) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const handleInputFocus = () => {
    if (query.trim() && (results.length > 0 || error)) {
      setIsDropdownVisible(true);
    }
  };

  return (
    <div ref={searchContainerRef} style={{ position: "relative" }}>
      <div
        className={`input-group mb-3 ${style["banner-search"]} ${
          isDropdownVisible ? style["search-focused"] : ""
        }`}
      >
        <button
          className="btn btn-primary"
          style={{ zIndex: 10 }}
          type="button"
          onClick={handleSearch}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm"></span>
          ) : (
            <Search size={28} />
          )}
        </button>
        <input
          ref={inputRef}
          type="text"
          className="form-control fw-3"
          aria-label="Enter text to search"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          disabled={isLoading}
          autoComplete="off"
        />
        {query && (
          <button
            className="btn btn-outline-secondary no-hover-effect"
            type="button"
            onClick={handleClearFilter}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isDropdownVisible && results.length > 0 && !isLoading && (
        <ul
          className="list-group position-absolute w-100"
          style={{
            zIndex: 1000,
            // --- THIS IS THE KEY CHANGE (Part 3) ---
            // Use the state variable for dynamic height
            maxHeight: dropdownMaxHeight,
            overflowY: "auto",
            top: "100%",
            left: 0,
          }}
        >
          {results.map((result, index) => (
            <li
              key={result.id || index}
              className="list-group-item list-group-item-action"
              onClick={() => handleResultClick(result)}
              onMouseDown={(e) => e.preventDefault()}
              tabIndex={-1}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-bold">
                    {result.name || result.heading || "Untitled Result"}
                  </h6>
                  {result.description && (
                    <p className="mb-1 text-muted small">
                      {result.description}
                    </p>
                  )}
                </div>
                <small className="text-muted">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isDropdownVisible &&
        !isLoading &&
        !error &&
        results.length === 0 &&
        query.trim() && (
          <div
            className="alert alert-light position-absolute w-100"
            style={{
              zIndex: 1000,
              top: "100%",
              left: 0,
            }}
          >
            <div className="text-center">
              <Search size={24} className="text-muted mb-2" />
              <p className="mb-1">
                <strong>No results found</strong>
              </p>
              <small className="text-muted">
                Try adjusting your search terms
              </small>
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchComponent;