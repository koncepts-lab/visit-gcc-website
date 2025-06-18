// components/GoogleMap.js
"use client"; // only if you're using this inside an app directory

import React from "react";
import PropTypes from "prop-types";

const GoogleMap = ({ latitude, longitude, zoom = 14 }) => {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  return (
    <div className="container my-4">
      <div className="ratio ratio-16x9 border rounded shadow">
        <iframe
          src={mapUrl}
          allowFullScreen
          loading="lazy"
          title="Google Map"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
