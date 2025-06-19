import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import style from "./style.module.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a ref for the main search container
  const searchContainerRef = useRef(null);

  // --- Close dropdown on click outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = `http://127.0.0.1/api/search/general?q=${encodeURIComponent(
        query
      )}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      console.log("🚀 ~ handleSearch ~ data:", data);

      // Handle different response formats
      if (Array.isArray(data)) {
        setResults(data);
      } else if (data && Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        // Mock data for demonstration
        const mockResults = [
          {
            id: 1,
            name: "React Package Manager",
            url: "/packages/react",
            description: "A comprehensive React package",
          },
          {
            id: 2,
            name: "Vue.js Components",
            url: "/packages/vue",
            description: "Vue.js component library",
          },
          {
            id: 3,
            name: "Angular Utilities",
            url: "/packages/angular",
            description: "Angular utility functions",
          },
          {
            id: 4,
            name: "Node.js Tools",
            url: "/packages/nodejs",
            description: "Server-side JavaScript tools",
          },
          {
            id: 5,
            name: "TypeScript Definitions",
            url: "/packages/typescript",
            description: "Type definitions for TypeScript",
          },
        ].filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(mockResults);
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // When a user selects a result from the dropdown
  const handleResultClick = (result) => {
    console.log("🚀 ~ handleResultClick ~ result:", result);
    // Set the input field to the selected result's text
    setQuery(result.name || result.heading || "");
    // Close the dropdown
    setResults([]);

    // Redirect to the page
    if (result.url) {
      // For client-side routing (React Router)
      // navigate(result.url);
      // For simple page redirect
      // window.location.href = result.url;
    } else {
      // Fallback: construct URL from result data
      let url;
      if (result.type === "package") {
        url = `/tour-package/${encodeURIComponent(result.id)}`;
      } else if (result.type === "attraction") {
        url = `/attractions/${encodeURIComponent(result.id)}`;
      } else if (result.type === "event") {
        url = `/events/${encodeURIComponent(result.id)}`;
      } else if (result.type === "blog") {
        url = `/blogs/${encodeURIComponent(result.uuid_id)}`;
      }
      console.log("🚀 ~ handleResultClick ~ url:", url);

      window.location.href = url;
    }
  };

  // Clear all filters and reset search
  const handleClearFilter = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  return (
    <div ref={searchContainerRef} style={{ position: "relative" }}>
      <div className={`input-group mb-3 ${style["banner-search"]}`}>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <Search size={16} />
          )}
        </button>
        <input
          type="text"
          className="form-control"
          aria-label="Enter text to search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          autoComplete="off"
        />
        {/* Clear Filter Button */}
        {query && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleClearFilter}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* --- Dropdown Results --- */}
      {results.length > 0 && !isLoading && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000, maxHeight: "400px", overflowY: "auto" }}
        >
          {results.map((result, index) => (
            <li
              key={result.id || index}
              className="list-group-item list-group-item-action"
              onClick={() => handleResultClick(result)}
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
                  {result.url && (
                    <small className="text-primary">{result.url}</small>
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

      {/* Show error message */}
      {error && (
        <div
          className="alert alert-danger position-absolute w-100"
          style={{ zIndex: 1000 }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* No results message */}
      {!isLoading && !error && results.length === 0 && query.trim() && (
        <div
          className="alert alert-info position-absolute w-100"
          style={{ zIndex: 1000 }}
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
