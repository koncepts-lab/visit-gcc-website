import React from "react";
import Link from "next/link";

function SingleHomePackage({ link, photo_url, name }) {
  const imageUrl = photo_url || "/images/placeholder.jpg"; // Fallback image

  return (
    // 1. OUTER WRAPPER: This is what the carousel sees. The padding creates
    // the 95% width effect on desktop by adding space on the sides.
    <div style={{ padding: "0 8px", height: "260px" }}>
      {/* 2. INNER LINK (THE CARD): This is your actual card. It fills 100%
          of the padded space inside the wrapper. */}
      <Link
        href={link || "#"}
        style={{
          display: "block",
          position: "relative",
          textDecoration: "none",
          color: "inherit",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          width: "100%", // Fills the wrapper
          height: "100%", // Fills the wrapper
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <img
          src={imageUrl}
          alt={name || "Experience"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Fills the container without stretching
          }}
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(240, 242, 245, 0.9)", // Solid background with slight transparency
            padding: "12px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: "500",
              color: "#333", // Darker text for better readability
            }}
          >
            {name}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default SingleHomePackage;
