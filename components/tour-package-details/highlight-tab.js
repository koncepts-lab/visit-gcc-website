"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.css"; // Your existing styles
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import axios from "axios";
import PackageInclusionsAndExclusions from "@components/tour-package-details/package-inclusions"; // For packages

// --- Content Sub-Components ---
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
            {/* Assuming point can be a string or an object with a 'description' property */}
            {typeof point === "object" && point.description
              ? point.description
              : typeof point === "string"
              ? point
              : "Highlight point not available"}
          </p>
        </div>
      ))}
    </>
  );
};

const ItineraryContent = ({ itineraryItems, itemType }) => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) =>
    setActiveAccordion(activeAccordion === index ? null : index);

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
      <div>
        {itineraryItems.map((item, index) => (
          <div
            key={item.id || `itinerary-${index}`}
            className={style.accordion}
          >
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
                  <p>Details not available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

// This component will now be used for attractions for the "InclusionsExclusions" tab
const AttractionFeaturesRestrictionsContent = ({
  features,
  restrictions,
  itemType,
}) => (
  <div>
    {features && features.length > 0 && (
      <div className="mb-4">
        <h3 className="fw-bold mb-3" style={{ color: "#0d7a8b" }}>
          What's Included (Features)
        </h3>
        {features.map((item, index) => (
          <div
            key={`feature-${item.id || index}`}
            className={`mb-3 p-3 border rounded shadow-sm ${style.inclusionItem}`}
          >
            <button
              className={`btn text-white fw-bold mb-2 ${style.featureTag}`}
              style={{
                backgroundColor: "#15a3ac",
                borderRadius: "5px",
                fontSize: "0.9rem",
                padding: "0.3rem 0.75rem",
                cursor: "default",
              }}
            >
              {item.title || item.name || "Feature"}
            </button>
            {(item.description || item.content) && (
              <p
                className="ms-1 text-muted small mb-0"
                style={{ fontSize: "0.875rem" }}
              >
                {item.description || item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    )}

    {restrictions && restrictions.length > 0 && (
      <div className="mt-4">
        <h3 className="fw-bold mb-3" style={{ color: "#0d7a8b" }}>
          What's Not Included (Restrictions)
        </h3>
        {restrictions.map((item, index) => (
          <div
            key={`restriction-${item.id || index}`}
            className={`mb-3 p-3 border rounded shadow-sm ${style.exclusionItem}`}
          >
            <button
              className={`btn text-secondary fw-bold mb-2 ${style.exclusionTag}`}
              style={{
                backgroundColor: "#e9ecef",
                color: "#495057",
                borderRadius: "5px",
                fontSize: "0.9rem",
                padding: "0.3rem 0.75rem",
                cursor: "default",
              }}
            >
              {item.title || item.name || "Restriction"}
            </button>
            {(item.description || item.content) && (
              <p
                className="ms-1 text-muted small mb-0"
                style={{ fontSize: "0.875rem" }}
              >
                {item.description || item.content}
              </p>
            )}
          </div>
        ))}
      </div>
    )}
    {(!features || features.length === 0) &&
      (!restrictions || restrictions.length === 0) && (
        <p className="p-3 text-muted">
          No specific features or restrictions listed for this attraction.
        </p>
      )}
  </div>
);

const NoteContent = ({ notes, itemType }) => {
  // Assuming `notes` is a single string from itemDetails.note
  if (!notes || typeof notes !== "string" || notes.trim() === "") {
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
      {/* If notes is expected to be an array of objects, map it here */}
      <div className="fw-light" dangerouslySetInnerHTML={{ __html: notes }} />
    </>
  );
};

export default function HighlightTab({ itemId, itemType = "packages" }) {
  const [activeTab, setActiveTab] = useState("Highlight");
  const [highlightData, setHighlightData] = useState([]);
  const [itineraryData, setItineraryData] = useState([]);
  // State specifically for attraction features and restrictions for the "InclusionsExclusions" tab
  const [attractionFeatures, setAttractionFeatures] = useState([]);
  const [attractionRestrictions, setAttractionRestrictions] = useState([]);
  const [noteData, setNoteData] = useState(null); // Can be a string
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

      try {
        // Fetch main details for Highlight and Note first
        if (tabName === "Highlight" || tabName === "Note") {
          const endpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}attractions/${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}packages/${itemId}`;
          const response = await axios.get(endpoint);
          const details = response.data.data || response.data;

          if (tabName === "Highlight") {
            const highlights = details?.highlight; // Ensure 'highlight' field exists in API response
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
          }
          if (tabName === "Note") {
            setNoteData(details?.note || null); // Assuming 'note' is a field in API response
          }
        } else if (tabName === "Itinerary") {
          const endpoint =
            itemType === "attractions"
              ? `${process.env.NEXT_PUBLIC_API_URL}att-itineraries/attraction/get-by-attraction?attraction_id=${itemId}`
              : `${process.env.NEXT_PUBLIC_API_URL}itineraries/package/get-by-package?package_id=${itemId}`;
          const response = await axios.get(endpoint); // Added headers
          setItineraryData(
            (response.data.data || response.data || []).map((it) => ({
              ...it,
              title: it.title || `Day ${it.day}`,
            }))
          );
        } else if (
          tabName === "InclusionsExclusions" &&
          itemType === "attractions"
        ) {
          // Fetch features and restrictions only for attractions in this tab
          const featuresEndpoint = `${process.env.NEXT_PUBLIC_API_URL}att-inclusions/attraction/get-by-attraction?attraction_id=${itemId}`;
          const restrictionsEndpoint = `${process.env.NEXT_PUBLIC_API_URL}att-exclusions/attraction/get-by-attraction?attraction_id=${itemId}`;

          const [featuresResponse, restrictionsResponse] = await Promise.all([
            axios.get(featuresEndpoint).catch((err) => {
              console.warn(
                `No features for attraction ${itemId}: ${err.message}`
              );
              return { data: { data: [] } };
            }),
            axios.get(restrictionsEndpoint).catch((err) => {
              console.warn(
                `No restrictions for attraction ${itemId}: ${err.message}`
              );
              return { data: { data: [] } };
            }),
          ]);

          setAttractionFeatures(
            featuresResponse.data.data || featuresResponse.data || []
          );
          setAttractionRestrictions(
            restrictionsResponse.data.data || restrictionsResponse.data || []
          );
        }
        // For packages, PackageInclusionsAndExclusions handles its own fetching, so no direct fetch here for that tab
      } catch (err) {
        console.error(
          `Error fetching ${tabName} for ${itemType} ID ${itemId}:`,
          err.response?.data || err.message
        );
        setError(`Failed to load ${tabName.toLowerCase()} data.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForTab(activeTab);
  }, [itemId, itemType, activeTab]);

  const tabs = [
    { name: "Highlight", label: "Highlight" },
    { name: "Itinerary", label: "Itinerary" },
    {
      name: "InclusionsExclusions",
      label: "Package Inclusions & Exclusions",
    },
    { name: "Note", label: "Note" },
  ];

  const renderTabContent = () => {
    // Handle loading/error specifically for tabs that fetch data in this parent component
    if (
      isLoading &&
      (activeTab === "Highlight" ||
        activeTab === "Itinerary" ||
        activeTab === "Note" ||
        (activeTab === "InclusionsExclusions" && itemType === "attractions"))
    ) {
      return (
        <div className="text-center p-4">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }
    if (
      error &&
      (activeTab === "Highlight" ||
        activeTab === "Itinerary" ||
        activeTab === "Note" ||
        (activeTab === "InclusionsExclusions" && itemType === "attractions"))
    ) {
      return <div className="alert alert-warning text-center p-4">{error}</div>;
    }

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
        if (itemType === "packages") {
          // This component fetches its own data based on packageId
          return <PackageInclusionsAndExclusions packageId={itemId} />;
        } else if (itemType === "attractions") {
          // Pass fetched features and restrictions to the dynamic content component
          return (
            <AttractionFeaturesRestrictionsContent
              features={attractionFeatures}
              restrictions={attractionRestrictions}
              itemType={itemType}
            />
          );
        }
        return (
          <div className="p-4">Content not available for this item type.</div>
        );
      case "Note":
        return <NoteContent notes={noteData} itemType={itemType} />;
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
            // isLoading state managed by parent now more granularly
            // disabled={isLoading}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`${style.tabContent} mt-3`}>{renderTabContent()}</div>
    </div>
  );
}
