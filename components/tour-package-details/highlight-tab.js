"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css"; // Your existing styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import axios from "axios";
import PackageInclusionsAndExclusions from "@components/tour-package-details/package-inclusions";
// Sub-components for rendering tab content
// These will receive data appropriate for either a package or an attraction

const HighlightContent = ({ highlightPoints, itemType }) => {
  if (!highlightPoints || highlightPoints.length === 0) {
    return (
      <p className="p-3 text-muted">
        No highlights available for this{" "}
        {itemType === "packages" ? "package" : "attraction"}.
      </p>
    );
  }
  return (
    <>
      <h3 className="fw-bold mb-3">Highlight</h3>
      {highlightPoints.map((point, index) => (
        <div key={index} className="d-flex align-items-start mb-2">
          <HiOutlineArrowLongRight
            className="me-2 mt-1 text-primary"
            size={20}
          />
          <p className="mb-0 fw-light">
            {typeof point === "object" ? point.description : point}
          </p>{" "}
          {/* Handle if highlight is an object */}
        </div>
      ))}
    </>
  );
};

const ItineraryContent = ({ itineraryItems, itemType }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  if (!itineraryItems || itineraryItems.length === 0) {
    return (
      <p className="p-3 text-muted">
        No itinerary available for this{" "}
        {itemType === "packages" ? "package" : "attraction"}.
      </p>
    );
  }

  return (
    <>
      <h3 className="fw-bold mb-3">Itinerary</h3>
      {/* Optional: General itinerary description if available for the itemType */}
      {/* <p>Overall description for {itemType} itinerary...</p> */}
      <div>
        {itineraryItems.map((item, index) => (
          <div key={item.id || index} className={style.accordion}>
            <div
              className={`${style.accordionTab} ${
                activeAccordion === index ? style.activeAccordion : ""
              }`}
              onClick={() => toggleAccordion(index)}
            >
              <h4 className="mb-0 d-flex align-items-center">
                <HiOutlineArrowLongRight
                  className="me-2 text-primary d-none d-md-inline"
                  size={20}
                />
                {/* Packages might have 'day' and 'title', attractions might just have 'title' or 'step_title' */}
                {item.day
                  ? `${item.day} - ${item.title}`
                  : item.title || "Itinerary Step"}
              </h4>
              <span className={style.accordionIcon}>
                {activeAccordion === index ? "−" : "+"}
              </span>
            </div>
            {activeAccordion === index && (
              <div className={style.accordionContent}>
                {item.description ? (
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                ) : (
                  <p>Details for this step are not available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const InclusionsExclusionsContent = ({ inclusions, exclusions, itemType }) => (
  <div>
    {inclusions && inclusions.length > 0 && (
      <div className="mb-4">
        <h3 className="fw-bold mb-3" style={{ color: "#0d7a8b" }}>
          {itemType === "packages" ? "Package Inclusions" : "What's Included"}
        </h3>
        {inclusions.map((item, index) => (
          <div
            key={`inclusion-${item.id || index}`}
            className={`mb-3 p-2 border-bottom ${style.inclusionItem}`}
          >
            <button
              className={`btn text-white fw-bold mb-2 ${style.featureTag}`}
              style={{
                backgroundColor: "#15a3ac",
                borderRadius: "5px",
                fontSize: "0.9rem",
                padding: "0.3rem 0.75rem",
              }}
            >
              {item.title || item.name} {/* Use title or name */}
            </button>
            {/* Check for description or content property */}
            {(item.description || item.content) && (
              <p className="ms-1 text-muted small mb-0">
                {item.description || item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    {exclusions && exclusions.length > 0 && (
      <div>
        <h3 className="fw-bold mb-3" style={{ color: "#0d7a8b" }}>
          {itemType === "packages"
            ? "Package Exclusions"
            : "What's Not Included"}
        </h3>
        {exclusions.map((item, index) => (
          <div
            key={`exclusion-${item.id || index}`}
            className={`mb-3 p-2 border-bottom ${style.exclusionItem}`}
          >
            <button
              className={`btn text-secondary fw-bold mb-2 ${style.exclusionTag}`}
              style={{
                backgroundColor: "#e9ecef",
                color: "#495057",
                borderRadius: "5px",
                fontSize: "0.9rem",
                padding: "0.3rem 0.75rem",
              }}
            >
              {item.title || item.name}
            </button>
            {(item.description || item.content) && (
              <p className="ms-1 text-muted small mb-0">
                {item.description || item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    {(!inclusions || inclusions.length === 0) &&
      (!exclusions || exclusions.length === 0) && (
        <p className="p-3 text-muted">
          No specific inclusions or exclusions listed for this{" "}
          {itemType === "packages" ? "package" : "attraction"}.
        </p>
      )}
  </div>
);

const NoteContent = ({ notes, itemType }) => {
  if (!notes || notes.length === 0) {
    return (
      <p className="p-3 text-muted">
        No important notes for this{" "}
        {itemType === "packages" ? "package" : "attraction"}.
      </p>
    );
  }
  return (
    <>
      <h3 className="fw-bold mb-3">Important Note</h3>
      {notes.map((note, index) => (
        <div>{details.note}</div>
      ))}
    </>
  );
};

// Main Component: Reusing the structure of your static HighlightTab
export default function HighlightTab({ itemId, itemType = "packages" }) {
  const [activeTab, setActiveTab] = useState("Highlight");

  // States for fetched data
  const [highlightData, setHighlightData] = useState([]);
  const [itineraryData, setItineraryData] = useState([]);
  const [inclusionsData, setInclusionsData] = useState([]);
  const [exclusionsData, setExclusionsData] = useState([]); // Assuming you might fetch this
  const [noteData, setNoteData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDataForTab = async (tabName) => {
      if (!itemId) {
        setError(
          `${itemType === "packages" ? "Package" : "Attraction"} ID is missing.`
        );
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      let authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      try {
        if (tabName === "Highlight") {
          const endpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}attractions/${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}packages/${itemId}`;
          const response = await axios.get(endpoint, { headers });
          const details = response.data.data || response.data;
          // **ADJUST**: How is 'highlight' structured in your package AND attraction details?
          // This assumes 'highlight' is a field that could be an array or a newline-separated string.
          const highlights = details?.highlight;
          if (highlights) {
            setHighlightData(
              Array.isArray(highlights)
                ? highlights
                : typeof highlights === "string"
                ? highlights
                    .split("\n")
                    .map((h) => h.trim())
                    .filter((h) => h)
                : []
            );
          } else {
            setHighlightData([]);
          }
        } else if (tabName === "Itinerary") {
          const endpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}itineraries/attraction/get-by-attraction?attraction_id=${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}itineraries/package/get-by-package?package_id=${itemId}`; // Assuming this endpoint exists
          const response = await axios.get(endpoint, { headers });
          setItineraryData(
            (response.data.data || response.data || []).map((it) => ({
              ...it,
              title: it.title || `Day ${it.day}`,
            }))
          );
        } else if (tabName === "InclusionsExclusions") {
          const inclusionsEndpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}attraction-features/attraction/get-by-attraction?attraction_id=${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}inclusions/package/get-by-package?package_id=${itemId}`;

          const inclusionsResponse = await axios.get(inclusionsEndpoint, {
            headers,
          });
          setInclusionsData(
            inclusionsResponse.data.data || inclusionsResponse.data || []
          );

          // Fetch Exclusions (if your API has a separate endpoint or field)
          // For now, setting static or empty exclusions.
          // const exclusionsEndpoint = itemType === "attractions" ? ... : ...;
          // const exclusionsResponse = await axios.get(exclusionsEndpoint, { headers });
          // setExclusionsData(exclusionsResponse.data.data || exclusionsResponse.data || []);
          setExclusionsData([]); // Example: no exclusions fetched or static
        } else if (tabName === "Note") {
          const endpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}attractions/${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}packages/${itemId}`;
          const response = await axios.get(endpoint, { headers });
          const details = response.data.data || response.data;
          // **ADJUST**: How is 'highlight' structured in your package AND attraction details?
          // This assumes 'highlight' is a field that could be an array or a newline-separated string.
          const note = details?.note;
          setNoteData(note);
        }
      } catch (err) {
        console.error(
          `Error fetching ${tabName} for ${itemType} ID ${itemId}:`,
          err.response?.data || err.message
        );
        setError(
          `Failed to load ${tabName.toLowerCase()} data. Please check the console for more details.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForTab(activeTab);
  }, [itemId, itemType, activeTab]); // Re-fetch if ID, type, or activeTab changes

  const tabs = [
    { name: "Highlight", label: "Highlight" },
    { name: "Itinerary", label: "Itinerary" },
    {
      name: "InclusionsExclusions",
      label: " Inclusions & Exclusions",
    },
    { name: "Note", label: "Note" },
  ];

  const renderTabContent = () => {
    if (isLoading)
      return (
        <div className="text-center p-4">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    if (error)
      return <div className="alert alert-warning text-center p-4">{error}</div>;

    switch (activeTab) {
      case "Highlight":
        return (
          <HighlightContent
            highlightPoints={highlightData}
            itemType={itemType}
          />
        );
      case "Itinerary":
        return (
          <ItineraryContent
            itineraryItems={itineraryData}
            itemType={itemType}
          />
        );
      case "InclusionsExclusions":
        return <PackageInclusionsAndExclusions packageId={itemId} />;
      case "Note":
        return <div>{noteData}</div>;
      default:
        return <div className="p-4">Select a tab to view details.</div>;
    }
  };

  return (
    <div className={style.tabContainer}>
      <div className={style.tabButtons}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${style.tabButton} ${
              activeTab === tab.name ? style.active : ""
            }`}
            onClick={() => setActiveTab(tab.name)}
            disabled={isLoading} // Disable tabs while loading new content
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`${style.tabContent} mt-3`}>{renderTabContent()}</div>{" "}
      {/* Added mt-3 for spacing */}
    </div>
  );
}
