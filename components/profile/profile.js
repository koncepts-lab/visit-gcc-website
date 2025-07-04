"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Eye, EyeOff, Trash2, User, Lock, Power, Ticket } from "lucide-react";
import { enqueueSnackbar } from "notistack";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  } catch (error) {
    return dateString;
  }
};

// --- MODAL COMPONENT FOR BOOKING DETAILS ---
const BookingDetailsModal = ({ bookingItem, onClose }) => {
  if (!bookingItem) return null;

  const bookingDetails =
    bookingItem.booking.package ||
    bookingItem.booking.event ||
    bookingItem.booking.attraction;
  const travelers = bookingItem.booking.travelers || [];

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1060 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content" style={{ borderRadius: "12px" }}>
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Booking Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <h6 className="fw-bold">{bookingDetails?.name}</h6>
                <p className="mb-1">
                  <strong>Booking ID:</strong> {bookingItem.booking.id}
                </p>
                <p className="mb-1">
                  <strong>Booking Date:</strong>{" "}
                  {formatDate(bookingItem.booking.start_date)}
                </p>
                <p className="mb-1">
                  <strong>Total Amount:</strong>{" "}
                  {bookingDetails?.currency || "AED"}{" "}
                  {bookingItem.booking.total_amount}
                </p>
              </div>
              <hr />
              <h6 className="fw-bold mt-4">Traveler Information</h6>
              {travelers.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>ID Type</th>
                        <th>ID Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {travelers.map((traveler, index) => (
                        <tr key={traveler.id}>
                          <td>{index + 1}</td>
                          <td>
                            {traveler.first_name} {traveler.last_name}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {traveler.gender}
                          </td>
                          <td>{traveler.id_type}</td>
                          <td>{traveler.id_number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">
                  No traveler information was provided for this booking.
                </p>
              )}
              <hr />
              <div className="mt-4">
                <h6 className="fw-bold">Contact & Other Details</h6>
                <p className="mb-1">
                  <strong>Contact Name:</strong>{" "}
                  {bookingItem.booking.contact_name || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Contact Number:</strong>{" "}
                  {bookingItem.booking.contact_number || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {bookingItem.booking.email || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Pick-up Point:</strong>{" "}
                  {bookingItem.booking.pick_up_point || "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Special Request:</strong>{" "}
                  {bookingItem.booking.special_request || "None"}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- MY BOOKINGS SECTION COMPONENT ---
const MyBookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      setIsLoading(true);
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      if (!authToken) {
        enqueueSnackbar("You must be logged in to view your bookings.", {
          variant: "warning",
        });
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}my-bookings`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        const confirmed = (response.data || []).filter(
          (item) => item.booking.status === "confirmed"
        );
        setBookings(confirmed);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err);
        enqueueSnackbar("Could not load your bookings.", { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  if (isLoading) {
    return (
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: "12px", padding: "40px", textAlign: "center" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading your bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: "12px", padding: "40px", textAlign: "center" }}
      >
        <Ticket size={48} className="text-muted mx-auto mb-3" />
        <h4 className="fw-bold">No Confirmed Bookings Found</h4>
        <p className="text-muted">
          You do not have any confirmed bookings yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column gap-3">
        {bookings.map((item) => {
          const bookingDetails =
            item.booking.package ||
            item.booking.event ||
            item.booking.attraction;
          const name = bookingDetails?.name || "Booking Details";
          const imageUrl =
            bookingDetails?.photo_urls?.[0] ||
            bookingDetails?.event_photo_urls?.[0] ||
            "/images/placeholder.jpg";

          return (
            <div
              key={item.booking.id}
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={imageUrl}
                      className="img-fluid"
                      style={{
                        height: "120px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      alt={name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-1">{name}</h5>
                    <p
                      className="text-muted mb-2"
                      style={{ textTransform: "capitalize" }}
                    >
                      Type: {item.type}
                    </p>
                    <p className="mb-0 small">
                      <strong>Booking Date:</strong>{" "}
                      {formatDate(item.booking.start_date)}
                    </p>
                    <p className="mb-0 small">
                      <strong>Booking ID:</strong> {item.booking.id}
                    </p>
                  </div>
                  <div className="col-md-3 text-md-end d-flex flex-column align-items-md-end">
                    <span
                      className={`badge mb-2 status-badge status-${item.booking.status}`}
                    >
                      {item.booking.status}
                    </span>
                    <h6 className="fw-bolder">
                      {bookingDetails?.currency || "AED"}{" "}
                      {item.booking.total_amount}
                    </h6>
                    <button
                      className="btn btn-sm btn-outline-primary mt-2"
                      style={{ fontSize: "12px" }}
                      onClick={() => setSelectedBooking(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedBooking && (
        <BookingDetailsModal
          bookingItem={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </>
  );
};

// --- MAIN PARENT COMPONENT ---
const TravelAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showChangePasswordCard, setShowChangePasswordCard] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [sharedUserData, setSharedUserData] = useState({
    name: "",
    birthday: "",
    gender: "",
    city_of_residence: "",
    email: "",
    isEmailVerified: false,
    mobileNumber: "",
    profile_photo_url: null,
    user: { first_name: "", last_name: "", email: "" },
  });
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchUserData = async () => {
    setIsUserDataLoading(true);
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      setIsUserDataLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}profiles/user`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.data) {
        const profileData = response.data.profile || response.data;
        setSharedUserData({
          user: {
            first_name:
              profileData.user?.first_name || profileData.first_name || "",
            last_name:
              profileData.user?.last_name || profileData.last_name || "",
            email: profileData.user?.email || profileData.email || "",
          },
          name: `${
            profileData.user?.first_name || profileData.first_name || ""
          } ${
            profileData.user?.last_name || profileData.last_name || ""
          }`.trim(),
          birthday: profileData.birthday || "",
          gender: profileData.gender || "",
          city_of_residence: profileData.city_of_residence || "",
          email: profileData.user?.email || profileData.email || "",
          isEmailVerified: profileData.isEmailVerified || false,
          mobileNumber: profileData.mobileNumber || "",
          profile_photo_url: profileData.photo_url || null,
        });
      }
    } catch (err) {
      console.error(
        "Profile: Error fetching user info",
        err.response?.data || err.message
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("auth_token_login");
        localStorage.removeItem("auth_token_register");
        localStorage.removeItem("userId");
      }
    } finally {
      setIsUserDataLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token_login");
    localStorage.removeItem("userId");
    localStorage.removeItem("auth_token_register");
    window.location.href = "/";
    enqueueSnackbar("You have been logged out successfully.", {
      variant: "info",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      enqueueSnackbar("You must be logged in to upload an image.", {
        variant: "error",
      });
      setIsUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append("profile_photo", selectedFile);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}profiles`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar("Profile picture updated successfully!", {
          variant: "success",
        });
        setSelectedFile(null);
        setImagePreview(null);
        fetchUserData();
      } else {
        enqueueSnackbar("Failed to upload image.", { variant: "error" });
      }
    } catch (err) {
      // --- THIS IS THE KEY CHANGE FOR ERROR HANDLING ---
      let errorMessage = "An error occurred during upload.";
      if (err.response?.data) {
        // Check for the specific validation error structure from your API
        if (
          err.response.data.errors &&
          err.response.data.errors.profile_photo
        ) {
          // If the 'profile_photo' error exists, use its message
          errorMessage = err.response.data.errors.profile_photo[0];
        } else if (err.response.data.message) {
          // Otherwise, use the general message if available
          errorMessage = err.response.data.message;
        }
      }
      enqueueSnackbar(errorMessage, { variant: "error" });
      // --- END OF KEY CHANGE ---
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section !== "loginDetails") {
      setShowChangePasswordCard(false);
    }
  };

  const handleDeleteAccountClick = () => setShowDeleteConfirmModal(true);

  const proceedWithAccountDeletion = () => {
    alert("Account deletion process initiated (API call to be implemented)!");
    setShowDeleteConfirmModal(false);
  };

  const toggleChangePasswordCardVisibility = () =>
    setShowChangePasswordCard((prev) => !prev);

  // --- ProfileFields COMPONENT ---
  const ProfileFields = ({ userData, onProfileUpdate }) => {
    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [popupFormData, setPopupFormData] = useState({
      first_name: "",
      last_name: "",
      birthday: "",
      gender: "",
      city_of_residence: "",
    });
    const [isPopupLoading, setIsPopupLoading] = useState(false);
    const handleEditField = (fieldName, currentValue) => {
      const valueToSet =
        fieldName === "Gender"
          ? currentValue.toLowerCase()
          : currentValue || "";
      setEditingField(fieldName);
      setEditValue(valueToSet);
    };
    const handleCancelEdit = () => {
      setEditingField(null);
      setEditValue("");
    };
    const handleOpenEditPopup = () => {
      setPopupFormData({
        first_name: userData.user?.first_name || "",
        last_name: userData.user?.last_name || "",
        birthday: userData.birthday || "",
        gender: userData.gender || "",
        city_of_residence: userData.city_of_residence || "",
      });
      setShowEditPopup(true);
    };
    const handleCloseEditPopup = () => {
      setShowEditPopup(false);
    };
    const handlePopupInputChange = (field, value) => {
      setPopupFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
    const handleSavePopup = async () => {
      setIsPopupLoading(true);
      try {
        const authToken =
          localStorage.getItem("auth_token_login") ||
          localStorage.getItem("auth_token_register");
        if (!authToken) {
          enqueueSnackbar("Authentication token not found", {
            variant: "error",
          });
          setIsPopupLoading(false);
          return;
        }
        const finalRequestBody = {
          first_name: popupFormData.first_name.trim() || null,
          last_name: popupFormData.last_name.trim() || null,
          birthday: popupFormData.birthday || null,
          gender: popupFormData.gender
            ? popupFormData.gender.toLowerCase()
            : null,
          city_of_residence: popupFormData.city_of_residence || null,
        };
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}profiles/user`,
          finalRequestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.data.success
        ) {
          enqueueSnackbar("Profile updated successfully!", {
            variant: "success",
          });
          if (typeof onProfileUpdate === "function") {
            onProfileUpdate();
          }
          handleCloseEditPopup();
        } else {
          enqueueSnackbar(
            response.data?.message || "Failed to update profile.",
            { variant: "error" }
          );
        }
      } catch (err) {
        let errorMessage = "Error updating profile.";
        if (err.response?.data) {
          errorMessage = err.response.data.message || errorMessage;
        }
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setIsPopupLoading(false);
      }
    };

    const profileDisplayItems = [
      {
        label: "NAME",
        value:
          `${userData.user?.first_name || ""} ${
            userData.user?.last_name || ""
          }`.trim() || userData.name,
        field: "Name",
      },
      { label: "BIRTHDAY", value: userData.birthday, field: "Birthday" },
      { label: "GENDER", value: userData.gender, field: "Gender" },
      {
        label: "CITY OF RESIDENCE",
        value: userData.city_of_residence,
        field: "City of Residence",
        noBorder: true,
      },
    ];

    const renderField = (item) => {
      const isEditing = editingField === item.field;
      if (isEditing) {
        // This section's logic remains unchanged
        return <></>;
      }
      let displayValue = item.value;
      if (item.field === "Birthday" && item.value) {
        displayValue = formatDate(item.value);
      }
      const finalDisplayValue = displayValue || ` ${item.label} `;
      return (
        <>
          <div>
            <span
              className="fw-medium"
              style={{
                color: item.value ? "#333" : "#757575",
                fontSize: "16px",
                textTransform: "capitalize",
              }}
            >
              {finalDisplayValue}
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              item.field === "Name"
                ? handleOpenEditPopup()
                : handleEditField(item.field, item.value)
            }
            className="btn btn-link text-decoration-none p-0"
            style={{ color: "#17a2b8", fontSize: "14px", fontWeight: "500" }}
          >
            {item.value ? "" : "+ Add"}
          </button>
        </>
      );
    };

    return (
      <>
        <div
          className="card border-0 shadow-sm"
          style={{ borderRadius: "12px" }}
        >
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h3
                  className="fw-bold mb-2"
                  style={{ color: "#333", fontSize: "24px" }}
                >
                  Profile
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: "15px" }}>
                  Basic info, for a faster booking experience
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenEditPopup}
                className="btn btn-outline-primary d-flex align-items-center px-3 py-2"
                style={{
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "1px solid #17a2b8",
                  color: "#17a2b8",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="me-2"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                EDIT
              </button>
            </div>
            <div className="row g-0">
              {profileDisplayItems.map((item) => (
                <div className="col-12" key={item.label}>
                  <label
                    className="form-label fw-medium pt-0"
                    style={{ fontSize: "12px" }}
                  >
                    {!item.value ? " " : item.label}
                  </label>
                  <div
                    style={{ paddingTop: "0px" }}
                    className={`d-flex justify-content-between align-items-center ${
                      !item.noBorder ? "border-bottom" : ""
                    }`}
                  >
                    {renderField(item)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showEditPopup && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" style={{ borderRadius: "12px" }}>
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title fw-bold" style={{ color: "#333" }}>
                    Edit Profile
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseEditPopup}
                    disabled={isPopupLoading}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-medium">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={popupFormData.first_name}
                      onChange={(e) =>
                        handlePopupInputChange("first_name", e.target.value)
                      }
                      disabled={isPopupLoading}
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={popupFormData.last_name}
                      onChange={(e) =>
                        handlePopupInputChange("last_name", e.target.value)
                      }
                      disabled={isPopupLoading}
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Birthday</label>
                    <input
                      type="date"
                      className="form-control"
                      value={popupFormData.birthday}
                      onChange={(e) =>
                        handlePopupInputChange("birthday", e.target.value)
                      }
                      disabled={isPopupLoading}
                      style={{ fontSize: "16px" }}
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Gender</label>
                    <select
                      className="form-select"
                      value={popupFormData.gender}
                      onChange={(e) =>
                        handlePopupInputChange("gender", e.target.value)
                      }
                      disabled={isPopupLoading}
                      style={{ fontSize: "16px" }}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={popupFormData.city_of_residence}
                      onChange={(e) =>
                        handlePopupInputChange(
                          "city_of_residence",
                          e.target.value
                        )
                      }
                      disabled={isPopupLoading}
                      style={{ fontSize: "16px" }}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCloseEditPopup}
                    disabled={isPopupLoading}
                    style={{ fontSize: "14px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleSavePopup}
                    disabled={isPopupLoading}
                    style={{
                      backgroundColor: "#17a2b8",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {isPopupLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // --- LoginDetailsCard COMPONENT ---
  const LoginDetailsCard = ({ userData }) => (
    <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h3
              className="fw-bold mb-2"
              style={{ color: "#333", fontSize: "24px" }}
            >
              Login Details
            </h3>
            <p className="text-muted mb-0" style={{ fontSize: "15px" }}>
              Manage your mobile number, email address and password
            </p>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <span
                  className="fw-medium"
                  style={{
                    color: "#757575",
                    fontSize: "13px",
                    textTransform: "uppercase",
                  }}
                >
                  EMAIL ID
                </span>
                <div className="d-flex align-items-center">
                  <p
                    className="mb-0 fw-normal me-2"
                    style={{ color: "#333", fontSize: "16px" }}
                  >
                    {userData.email || userData.user?.email || "Not Added"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center py-3">
              <div>
                <span
                  className="fw-medium"
                  style={{
                    color: "#757575",
                    fontSize: "13px",
                    textTransform: "uppercase",
                  }}
                >
                  PASSWORD
                </span>
                <p
                  className="mb-0 fw-normal"
                  style={{ color: "#333", fontSize: "16px" }}
                >
                  ********
                </p>
              </div>
              <button
                type="button"
                onClick={toggleChangePasswordCardVisibility}
                className="btn btn-link text-decoration-none p-0"
                style={{
                  color: "#17a2b8",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {showChangePasswordCard ? "Cancel" : "Change Password?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- ChangePasswordCard COMPONENT ---
  const ChangePasswordCard = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showCurrentPw, setShowCurrentPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmNewPw, setShowConfirmNewPw] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmitPasswordChange = async (e) => {
      e.preventDefault();
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        enqueueSnackbar("Please fill all password fields.", {
          variant: "warning",
        });
        return;
      }
      if (newPassword.length < 6) {
        enqueueSnackbar("New password must be at least 6 characters.", {
          variant: "warning",
        });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        enqueueSnackbar("New passwords do not match.", { variant: "error" });
        return;
      }
      setIsSubmitting(true);
      try {
        const authToken =
          localStorage.getItem("auth_token_login") ||
          localStorage.getItem("auth_token_register");
        if (!authToken) {
          enqueueSnackbar("Authentication token not found.", {
            variant: "error",
          });
          setIsSubmitting(false);
          return;
        }
        const requestBody = {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}user/change-password`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.data.success
        ) {
          enqueueSnackbar("Password changed successfully!", {
            variant: "success",
          });
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setShowChangePasswordCard(false);
        } else {
          enqueueSnackbar(
            response.data.message ||
              "Failed to change password. Please try again.",
            { variant: "error" }
          );
        }
      } catch (error) {
        let errorMessage = "Error changing password.";
        if (error.response?.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setIsSubmitting(false);
      }
    };
    return (
      <div
        className="card border-0 shadow-sm mt-4"
        style={{ borderRadius: "12px" }}
      >
        <div className="card-body p-4">
          <h4
            className="fw-bold mb-2"
            style={{ color: "#333", fontSize: "24px" }}
          >
            Change Password
          </h4>
          <p className="text-muted mb-4" style={{ fontSize: "15px" }}>
            Please choose a password you haven't used before.
          </p>
          <form onSubmit={handleSubmitPasswordChange}>
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="currentPassword-change"
                className="col-sm-4 col-form-label"
                style={{
                  color: "#757575",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                CURRENT PASSWORD
              </label>
              <div className="col-sm-8">
                <div className="position-relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    id="currentPassword-change"
                    className="form-control py-2"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      fontSize: "16px",
                      paddingRight: "40px",
                      borderWidth: "0px",
                    }}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-2 me-1"
                    style={{
                      color: "#757575",
                      border: "none",
                      background: "none",
                    }}
                    aria-label="Toggle current password visibility"
                    disabled={isSubmitting}
                  >
                    {showCurrentPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <div className="mb-3 row align-items-center">
              <label
                htmlFor="newPassword-change"
                className="col-sm-4 col-form-label"
                style={{
                  color: "#757575",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                NEW PASSWORD{" "}
              </label>
              <div className="col-sm-8">
                <div className="position-relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    id="newPassword-change"
                    className="form-control py-2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      fontSize: "16px",
                      paddingRight: "40px",
                      borderWidth: "0px",
                    }}
                    aria-describedby="newPasswordHelp-change"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-2 me-1"
                    style={{
                      color: "#757575",
                      border: "none",
                      background: "none",
                    }}
                    aria-label="Toggle new password visibility"
                    disabled={isSubmitting}
                  >
                    {showNewPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div
                id="newPasswordHelp-change"
                className="form-text offset-sm-0"
                style={{
                  fontSize: "13px",
                  color: "#6c757d",
                  marginTop: "0.25rem",
                }}
              >
                {" "}
                Password must have at least 6 characters.
              </div>
            </div>
            <hr className="my-3" />
            <div className="mb-4 row align-items-center">
              <label
                htmlFor="confirmNewPassword-change"
                className="col-sm-4 col-form-label"
                style={{
                  color: "#757575",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                CONFIRM PASSWORD{" "}
              </label>
              <div className="col-sm-8">
                <div className="position-relative">
                  <input
                    type={showConfirmNewPw ? "text" : "password"}
                    id="confirmNewPassword-change"
                    className="form-control py-2"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      fontSize: "16px",
                      paddingRight: "40px",
                      borderWidth: "0px",
                    }}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmNewPw(!showConfirmNewPw)}
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-2 me-1"
                    style={{
                      color: "#757575",
                      border: "none",
                      background: "none",
                    }}
                    aria-label="Toggle confirm new password visibility"
                    disabled={isSubmitting}
                  >
                    {showConfirmNewPw ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "#17a2b8",
                  borderColor: "#17a2b8",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // --- DeleteConfirmationModal COMPONENT ---
  const DeleteConfirmationModal = () => (
    <>
      {showDeleteConfirmModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050 }}
          ></div>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ zIndex: 1060 }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">
                    Confirm Account Deletion
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteConfirmModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you absolutely sure you want to delete your account?
                    This action is permanent and cannot be undone. All your data
                    associated with this account will be lost.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={proceedWithAccountDeletion}
                  >
                    Yes, Delete My Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3 col-md-4" style={{ marginTop: "175px" }}>
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body p-0">
                <div className="text-center p-4 border-bottom">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg, image/gif"
                  />
                  <div
                    className="mx-auto mb-3 position-relative d-inline-block"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "12px",
                    }}
                  >
                    <img
                      src={
                        imagePreview ||
                        sharedUserData.profile_photo_url ||
                        "/images/placeholder.jpg"
                      }
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #90c695, #7bb67e)",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/placeholder.jpg";
                      }}
                    />
                    {!selectedFile ? (
                      <div
                        className="position-absolute d-flex align-items-center justify-content-center"
                        style={{
                          bottom: "5px",
                          right: "5px",
                          width: "24px",
                          height: "24px",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          borderRadius: "50%",
                          border: "1px solid white",
                          cursor: "pointer",
                        }}
                        onClick={() => fileInputRef.current.click()}
                        title="Change Profile Image"
                      >
                        <svg
                          width="12"
                          height="12"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="position-absolute d-flex gap-1"
                        style={{
                          bottom: "-35px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <button
                          className="btn btn-sm btn-success"
                          onClick={handleImageUpload}
                          disabled={isUploading}
                        >
                          {isUploading ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={handleCancelUpload}
                          disabled={isUploading}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <h5
                    className="fw-bold mb-1"
                    style={{
                      color: "#333",
                      marginTop: selectedFile ? "35px" : "0",
                    }}
                  >
                    {isUserDataLoading
                      ? "Loading..."
                      : sharedUserData.name || "User Name"}
                  </h5>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "13px", fontWeight: "500" }}
                  >
                    PERSONAL PROFILE
                  </p>
                </div>
                <div className="list-group list-group-flush">
                  <button
                    type="button"
                    onClick={() => handleSectionChange("profile")}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3 ${
                      activeSection === "profile" ? "active-profile-item" : ""
                    }`}
                    style={
                      activeSection === "profile"
                        ? { backgroundColor: "#e3f2fd", color: "#1976d2" }
                        : { color: "#6c757d" }
                    }
                  >
                    <User size={20} className="me-3" />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      Profile
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSectionChange("loginDetails")}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3 ${
                      activeSection === "loginDetails"
                        ? "active-profile-item"
                        : ""
                    }`}
                    style={
                      activeSection === "loginDetails"
                        ? { backgroundColor: "#e3f2fd", color: "#1976d2" }
                        : { color: "#6c757d" }
                    }
                  >
                    <Lock size={20} className="me-3" />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      Login Details
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSectionChange("myBookings")}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3 ${
                      activeSection === "myBookings"
                        ? "active-profile-item"
                        : ""
                    }`}
                    style={
                      activeSection === "myBookings"
                        ? { backgroundColor: "#e3f2fd", color: "#1976d2" }
                        : { color: "#6c757d" }
                    }
                  >
                    <Ticket size={20} className="me-3" />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      My Bookings
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3"
                    style={{ color: "#6c757d" }}
                  >
                    <Power size={20} className="me-3" />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      Logout
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccountClick}
                    className="list-group-item list-group-item-action text-danger border-0 d-flex align-items-center px-4 py-3"
                  >
                    <Trash2 size={20} className="me-3" />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      Delete Account
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-9 col-md-8 mb-5 mb-lg-0"
            style={{ marginTop: "80px" }}
          >
            <div className="text-start mb-3">
              <h2
                className="fw-bold mb-3"
                style={{ color: "#333", fontSize: "28px" }}
              >
                Your Travel Account
              </h2>
              <div className="d-inline-block">
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: "#92D0BC",
                    color: "#333",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {activeSection === "profile" && "Your Profile"}
                  {activeSection === "loginDetails" && "Login & Security"}
                  {activeSection === "myBookings" && "Your Bookings"}
                </span>
              </div>
            </div>
            {activeSection === "myBookings" && <MyBookingsSection />}
            {isUserDataLoading && activeSection === "profile" ? (
              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                Loading profile data...
              </div>
            ) : (
              activeSection === "profile" && (
                <ProfileFields
                  userData={sharedUserData}
                  onProfileUpdate={fetchUserData}
                />
              )
            )}
            {activeSection === "loginDetails" && (
              <>
                <LoginDetailsCard userData={sharedUserData} />
                {showChangePasswordCard && <ChangePasswordCard />}
              </>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmationModal />
      <style jsx global>{`
        .active-profile-item {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
          border-left: 4px solid #1976d2;
          padding-left: calc(1rem + 12px - 4px) !important;
        }
        .list-group-item-action:hover,
        .list-group-item-action:focus {
          background-color: #f0f0f0;
        }
        .form-control,
        .form-select {
          width: 100%;
        }
        .form-control:focus,
        .form-select:focus {
          box-shadow: none;
          border-color: #17a2b8;
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25);
        }
        .col-form-label {
          display: flex;
          align-items: center;
          padding-top: calc(0.375rem + 1px);
          padding-bottom: calc(0.375rem + 1px);
          margin-bottom: 0;
          line-height: 1.5;
        }
        body.modal-open {
          overflow: hidden !important;
        }
        .modal-backdrop.fade.show {
          opacity: 0.5;
        }
        .status-badge {
          padding: 0.35em 0.65em;
          font-size: 0.75em;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
          text-transform: capitalize;
        }
        .status-confirmed {
          background-color: #198754;
        }
        .status-pending {
          background-color: #ffc107;
          color: #000;
        }
        .status-cancelled {
          background-color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default TravelAccountProfile;
