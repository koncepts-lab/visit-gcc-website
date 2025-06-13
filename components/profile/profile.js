"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import Link from "next/link"; // If you use it
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { enqueueSnackbar } from "notistack"; // Assuming you have SnackbarProvider setup

const TravelAccountProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showChangePasswordCard, setShowChangePasswordCard] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  // 1. Lifted state for shared user data
  const [sharedUserData, setSharedUserData] = useState({
    name: "", // Will be derived from first_name, last_name
    birthday: "",
    gender: "",
    city_of_residence: "",
    email: "", // This might come from user object or profile directly
    isEmailVerified: false,
    mobileNumber: "", // Example: "+44 **** ***789"
    user: {
      // For nested user details like name and email if API returns it this way
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const [isUserDataLoading, setIsUserDataLoading] = useState(true); // Loading state for initial fetch
  const handleLogout = () => {
    localStorage.removeItem("auth_token_login"); // Ensure this key matches what's set on login
    localStorage.removeItem("userId");
    localStorage.removeItem("auth_token_register");
    window.location.href = "/"; // Redirect to login page
    enqueueSnackbar("You have been logged out successfully.", {
      variant: "info",
    });
  };
  // 2. Function to fetch/refresh user data - can be called by children after updates
  const fetchUserData = async () => {
    setIsUserDataLoading(true);
    const registerToken = localStorage.getItem("auth_token_register");
    const loginToken = localStorage.getItem("auth_token_login");
    let authToken = loginToken || registerToken;

    if (!authToken) {
      console.log("No auth token for user data fetch.");
      setIsUserDataLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}profiles/user`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (response.data) {
        // Adapt this to your actual API response structure
        const profileData = response.data.profile || response.data; // If profile is nested or direct

        setSharedUserData({
          user: {
            first_name:
              profileData.user?.first_name || profileData.first_name || "",
            last_name:
              profileData.user?.last_name || profileData.last_name || "",
            email: profileData.user?.email || profileData.email || "", // Prioritize nested email
          },
          name: `${
            profileData.user?.first_name || profileData.first_name || ""
          } ${
            profileData.user?.last_name || profileData.last_name || ""
          }`.trim(),
          birthday: profileData.birthday || "",
          gender: profileData.gender || "",
          city_of_residence: profileData.city_of_residence || "",
          email: profileData.user?.email || profileData.email || "", // Fallback to top-level email
          isEmailVerified: profileData.isEmailVerified || false,
          mobileNumber: profileData.mobileNumber || "",
        });
      } else {
        console.error("Profile: Empty response from API.");
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
        // Optionally redirect to login
      }
      // Handle 404 for profile creation if needed, though PUT/POST should handle this.
    } finally {
      setIsUserDataLoading(false);
    }
  };

  // 3. useEffect in parent to fetch initial data
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section !== "loginDetails" || section === "profile") {
      setShowChangePasswordCard(false);
    }
  };

  const handleVerifyEmail = () => {
    alert("Verify email functionality to be implemented!");
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteConfirmModal(true);
  };

  const proceedWithAccountDeletion = () => {
    console.log("User confirmed account deletion from modal. Calling API...");
    alert("Account deletion process initiated (API call to be implemented)!");
    setShowDeleteConfirmModal(false);
  };

  const toggleChangePasswordCardVisibility = () => {
    setShowChangePasswordCard((prev) => !prev);
  };

  // --- ProfileFields Component (Receives sharedUserData and a way to update it) ---
  const ProfileFields = ({ userData, onProfileUpdate }) => {
    // Removed local userData state and useEffect for fetching.
    // It now relies on the `userData` prop.

    const [editingField, setEditingField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [isLoading, setIsLoading] = useState(false); // For inline edits
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [popupFormData, setPopupFormData] = useState({
      first_name: "",
      last_name: "",
      birthday: "",
      gender: "",
      city_of_residence: "",
    });
    const [isPopupLoading, setIsPopupLoading] = useState(false); // For popup edits

    const handleEditField = (fieldName, currentValue) => {
      setEditingField(fieldName);
      setEditValue(currentValue || "");
    };

    const handleCancelEdit = () => {
      setEditingField(null);
      setEditValue("");
    };

    const handleOpenEditPopup = () => {
      setPopupFormData({
        // Initialize with current sharedUserData
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
      // No need to reset popupFormData here if it's re-initialized on open
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

        const requestBody = {
          // For names, if they are truly optional and the backend handles their absence,
          // the current conditional spread is fine.
          ...(popupFormData.first_name.trim() && {
            first_name: popupFormData.first_name.trim(),
          }),
          ...(popupFormData.last_name.trim() && {
            last_name: popupFormData.last_name.trim(),
          }),

          // For birthday, always send the key. Send null if the date is empty.
          birthday: popupFormData.birthday || null,

          // For gender, if it can be unselected/empty, send null or an empty string
          // based on backend expectation. Sending null is safer if "unsetting" is intended.
          // If gender must always be one of the options, then the previous conditional
          // spread was okay, assuming an empty string for `popupFormData.gender`
          // meant "no change desired / don't send".
          // Given the birthday error, let's be safer with other optional fields that might be empty.
          gender: popupFormData.gender
            ? popupFormData.gender.toLowerCase()
            : null,

          // For city_of_residence, if it can be empty, send null.
          city_of_residence: popupFormData.city_of_residence || null,
        };

        // Remove any keys that ended up with a value of `null` if your backend
        // prefers absent keys over `null` for "no change".
        // However, if the error is "Undefined array key", it means the backend *wants* the key.
        // So, sending `null` is generally the correct approach to signal "set this field to empty/null".
        // If you only want to send changed fields, and `null` means "clear the field", then this is fine.
        // If `null` for an unchanged field is problematic, you'd need more complex logic to detect actual changes.

        // For clarity, let's refine: if a field is empty, send `null`. If it has a value, send the value.
        // This ensures the key is always present if the field *could* have been interacted with.
        const finalRequestBody = {
          first_name: popupFormData.first_name.trim() || null, // Send null if empty after trim
          last_name: popupFormData.last_name.trim() || null, // Send null if empty after trim
          birthday: popupFormData.birthday || null, // Send null if empty
          gender: popupFormData.gender
            ? popupFormData.gender.toLowerCase()
            : null, // Send selected gender or null
          city_of_residence: popupFormData.city_of_residence || null, // Send null if empty
        };

        // Filter out null values if the backend prefers absent keys for "no change"
        // and only processes fields that are present.
        // However, the "Undefined array key" error suggests the backend *expects* the keys.
        // So, we will send them with null if empty.

        // console.log("Request Body for Profile Update:", finalRequestBody);

        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}profiles/user`, // Endpoint from your previous snippet
          finalRequestBody, // Using the version that always sends keys, with null for empty
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
            // Check if onProfileUpdate is a function
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
        console.error(
          "Error updating profile (popup):",
          err.response?.data || err.message
        );
        let errorMessage = "Error updating profile.";
        if (err.response?.data) {
          if (typeof err.response.data === "string") {
            errorMessage = err.response.data;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          } else if (err.response.data.detail) {
            // Django Rest Framework often uses 'detail'
            errorMessage = err.response.data.detail;
          } else if (err.response.data.error) {
            // General error key
            errorMessage = err.response.data.error;
          } else if (err.response.data.errors) {
            // For validation errors like { field: ["message"] }
            // If the error for "Undefined array key" is wrapped here, this might catch it.
            const errorKey = Object.keys(err.response.data.errors)[0];
            if (errorKey && Array.isArray(err.response.data.errors[errorKey])) {
              errorMessage = `${errorKey}: ${err.response.data.errors[errorKey][0]}`;
            } else if (typeof err.response.data.errors === "string") {
              // Sometimes errors can be a plain string
              errorMessage = err.response.data.errors;
            }
          } else if (
            err.response.data.birthday &&
            Array.isArray(err.response.data.birthday)
          ) {
            // Specific handling if backend returns { "birthday": ["This field is required."] }
            errorMessage = `Birthday: ${err.response.data.birthday[0]}`;
          }
        } else if (err.message) {
          errorMessage = err.message; // Network error, etc.
        }
        enqueueSnackbar(errorMessage, { variant: "error" });

        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("auth_token_login");
          localStorage.removeItem("auth_token_register");
        }
      } finally {
        setIsPopupLoading(false);
      }
    };

    const handleSaveField = async (fieldName) => {
      // For Name, it's more complex as it's split into first_name and last_name
      // This inline edit might be better for single fields like birthday, gender, city.
      // For 'Name', the popup is a better UX.
      if (fieldName === "Name") {
        enqueueSnackbar(
          "Please use the main 'EDIT' button to change your name.",
          { variant: "info" }
        );
        handleCancelEdit();
        return;
      }

      if (
        typeof editValue === "string" &&
        !editValue.trim() &&
        fieldName.toLowerCase() !== "gender" &&
        fieldName.toLowerCase() !== "birthday"
      ) {
        enqueueSnackbar("Please enter a value", { variant: "warning" });
        return;
      }

      setIsLoading(true);
      try {
        const authToken =
          localStorage.getItem("auth_token_login") ||
          localStorage.getItem("auth_token_register");
        if (!authToken) {
          enqueueSnackbar("Authentication token not found", {
            variant: "error",
          });
          setIsLoading(false);
          return;
        }

        const requestBody = {};
        switch (fieldName.toLowerCase()) {
          case "birthday":
            requestBody.birthday = editValue || null; // Allow empty date to be sent as null
            break;
          case "gender":
            requestBody.gender = editValue;
            break;
          case "city of residence":
            requestBody.city_of_residence = editValue;
            break;
          default:
            // This case should ideally not be hit if Name is handled separately
            enqueueSnackbar("Invalid field for inline edit.", {
              variant: "error",
            });
            setIsLoading(false);
            return;
        }

        const response = await axios.post(
          // Or PUT, depending on API
          `${process.env.NEXT_PUBLIC_API_URL}profiles`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          enqueueSnackbar(`${fieldName} updated successfully!`, {
            variant: "success",
          });
          onProfileUpdate(); // Refresh shared data
          setEditingField(null);
          setEditValue("");
        } else {
          enqueueSnackbar(
            response.data.message || `Failed to update ${fieldName}.`,
            { variant: "error" }
          );
        }
      } catch (err) {
        console.error(
          `Error updating ${fieldName}:`,
          err.response?.data || err.message
        );
        enqueueSnackbar(
          err.response?.data?.message || `Error updating ${fieldName}.`,
          { variant: "error" }
        );
      } finally {
        setIsLoading(false);
      }
    };

    const profileDisplayItems = [
      {
        label: "NAME",
        // Value now comes from userData prop
        value:
          `${userData.user?.first_name || ""} ${
            userData.user?.last_name || ""
          }`.trim() || userData.name,
        field: "Name", // This field is best edited via the popup
      },
      {
        label: "BIRTHDAY",
        value: userData.birthday,
        field: "Birthday",
      },
      {
        label: "GENDER",
        value: userData.gender,
        field: "Gender",
      },
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
        // Prevent inline editing for 'Name' as it's complex (first/last)
        // and better handled by the popup.
        if (item.field === "Name") {
          // This state should ideally not be reached if button is disabled or points to popup
          return (
            <>
              <div>
                <span
                  className="fw-medium"
                  style={{ color: "#333", fontSize: "16px" }}
                >
                  {item.value || item.label}
                </span>
              </div>
              <button
                type="button"
                onClick={handleOpenEditPopup} // Direct to popup for name
                className="btn btn-link text-decoration-none p-0"
                style={{
                  color: "#17a2b8",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Edit
              </button>
            </>
          );
        }
        return (
          <div className="d-flex align-items-center gap-2 flex-grow-1">
            {item.field === "Gender" ? (
              <select
                className="form-select"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                disabled={isLoading}
                autoFocus
                style={{ fontSize: "16px" }}
              >
                <option value="">-- Select Gender --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input
                type={item.field === "Birthday" ? "date" : "text"}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="form-control"
                style={{ fontSize: "16px" }}
                placeholder={`Enter ${item.field.toLowerCase()}`}
                disabled={isLoading}
                autoFocus
                {...(item.field === "Birthday" && {
                  max: new Date(new Date().setDate(new Date().getDate())) // Allow today
                    .toISOString()
                    .split("T")[0],
                })}
              />
            )}

            <div className="d-flex gap-2">
              <button
                type="button"
                onClick={() => handleSaveField(item.field)}
                disabled={isLoading}
                className="btn btn-sm"
                style={{
                  backgroundColor: "#17a2b8",
                  color: "white",
                  fontSize: "12px",
                  padding: "4px 12px",
                }}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="btn btn-sm btn-outline-secondary"
                style={{
                  fontSize: "12px",
                  padding: "4px 12px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      }

      // Display mode
      const displayValue = item.value || ` ${item.label} `;
      return (
        <>
          <div>
            <span
              className="fw-medium"
              style={{
                color: item.value ? "#333" : "#757575",
                fontSize: "16px",
              }}
            >
              {displayValue}
            </span>
          </div>
          <button
            type="button"
            // For "Name", the main "EDIT" button at the top is preferred.
            // For other fields, allow inline edit.
            onClick={() =>
              item.field === "Name"
                ? handleOpenEditPopup()
                : handleEditField(item.field, item.value)
            }
            className="btn btn-link text-decoration-none p-0"
            style={{
              color: "#17a2b8",
              fontSize: "14px",
              fontWeight: "500",
            }}
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
              <button // This is the main Edit button for the popup
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

        {/* Edit Popup Modal */}
        {showEditPopup && (
          <div
            className="modal fade show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }} // Ensure z-index is high
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
                  {/* Form fields for the popup */}
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
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
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

  // --- LoginDetailsCard Component (Receives sharedUserData) ---
  const LoginDetailsCard = (
    { userData } // Renamed prop for clarity
  ) => (
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
          {/* Mobile Number - Add if needed, similar to Email ID */}
          {/* <div className="col-12">
            <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <span className="fw-medium text-muted text-uppercase" style={{ fontSize: "13px" }}>
                  MOBILE NUMBER
                </span>
                <p className="mb-0 fw-normal" style={{ color: "#333", fontSize: "16px" }}>
                  {userData.mobileNumber || "Not Added"}
                </p>
              </div>
              <button
                type="button"
                // onClick={() => handleEditField("Mobile Number")} // This would need its own modal/logic
                onClick={() => alert("Edit Mobile Number: Functionality to be implemented.")}
                className="btn btn-link text-decoration-none p-0"
                style={{ color: "#17a2b8", fontSize: "14px", fontWeight: "500" }}
              >
                {userData.mobileNumber ? "Edit" : "+ Add"}
              </button>
            </div>
          </div> */}
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
                    {userData.email || userData.user?.email || "Not Added"}{" "}
                  </p>
                  {/* {!userData.isEmailVerified &&
                    (userData.email || userData.user?.email) && (
                      <button
                        type="button"
                        onClick={handleVerifyEmail}
                        className="btn btn-link text-decoration-none p-0"
                        style={{
                          color: "#17a2b8",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        Verify
                      </button>
                    )}
                  {userData.isEmailVerified &&
                    (userData.email || userData.user?.email) && (
                      <span
                        className="text-success"
                        style={{ fontSize: "14px", fontWeight: "500" }}
                      >
                        ✓ Verified
                      </span>
                    )} */}
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
      // Basic validations (already in your code)
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

        // Prepare the request body as specified
        const requestBody = {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword, // Backend might re-validate this
        };

        // Make the API call
        const response = await axios.post(
          // Assuming POST, adjust if it's PUT or PATCH
          `${process.env.NEXT_PUBLIC_API_URL}user/change-password`, // API endpoint
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Handle successful response
        // Adjust success condition based on your API (e.g., response.data.success, response.status)
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
          setShowChangePasswordCard(false); // This will work if setShowChangePasswordCard is available in this scope from the parent context.
        } else {
          // Handle API error response (e.g., old password incorrect, etc.)
          enqueueSnackbar(
            response.data.message ||
              "Failed to change password. Please try again.",
            { variant: "error" }
          );
        }
      } catch (error) {
        console.error(
          "Password change error:",
          error.response?.data || error.message
        );
        let errorMessage = "Error changing password.";
        if (error.response?.data) {
          // Handle specific error messages from backend if available
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data.errors) {
            // If errors is an object like { field: ["message"] }
            const firstErrorField = Object.keys(error.response.data.errors)[0];
            if (
              firstErrorField &&
              Array.isArray(error.response.data.errors[firstErrorField])
            ) {
              errorMessage = error.response.data.errors[firstErrorField][0];
            }
          }
        }
        enqueueSnackbar(errorMessage, { variant: "error" });
        if (error.response?.status === 401) {
          // Unauthorized
          // Optionally redirect to login or clear token
          localStorage.removeItem("auth_token_login");
          localStorage.removeItem("auth_token_register");
        }
      } finally {
        setIsSubmitting(false);
      }
    };

    // The rest of the return () JSX remains unchanged as per your request.
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
                    className="form-control py-2" // Removed border-0
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      fontSize: "16px",
                      paddingRight: "40px",
                      borderWidth: "0px", // As per your provided snippet
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
                      borderWidth: "0px", // As per your provided snippet
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
                className="form-text offset-sm-0" // As per your provided snippet
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
                      borderWidth: "0px", // As per your provided snippet
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
            {" "}
            {/* Increased z-index */}
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  {" "}
                  <h5 className="modal-title fw-bold">
                    {" "}
                    Confirm Account Deletion{" "}
                  </h5>{" "}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteConfirmModal(false)}
                    aria-label="Close"
                  ></button>{" "}
                </div>
                <div className="modal-body">
                  {" "}
                  <p>
                    {" "}
                    Are you absolutely sure you want to delete your account?
                    This action is permanent and cannot be undone. All your data
                    associated with this account will be lost.{" "}
                  </p>{" "}
                </div>
                <div className="modal-footer">
                  {" "}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteConfirmModal(false)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={proceedWithAccountDeletion}
                  >
                    {" "}
                    Yes, Delete My Account{" "}
                  </button>{" "}
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
                  <div
                    className="mx-auto mb-3 position-relative d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "linear-gradient(135deg, #90c695, #7bb67e)",
                      borderRadius: "12px",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />{" "}
                    </svg>
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
                      onClick={() => alert("Edit profile image functionality")}
                      title="Edit Profile Image"
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
                  </div>
                  {/* Use sharedUserData for name display */}
                  <h5 className="fw-bold mb-1" style={{ color: "#333" }}>
                    {isUserDataLoading
                      ? "Loading..."
                      : sharedUserData.name || "User Name"}
                  </h5>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "13px", fontWeight: "500" }}
                  >
                    {" "}
                    PERSONAL PROFILE{" "}
                  </p>
                </div>
                <div className="list-group list-group-flush">
                  {/* Sidebar buttons */}
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
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="me-3"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {" "}
                      Profile{" "}
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
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="me-3"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                    </svg>
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {" "}
                      Login Details{" "}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="list-group-item list-group-item-action border-0 d-flex align-items-center px-4 py-3"
                    style={{ color: "#6c757d" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="me-3"
                    >
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {" "}
                      Logout{" "}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccountClick}
                    className="list-group-item list-group-item-action text-danger border-0 d-flex align-items-center px-4 py-3"
                  >
                    <Trash2 size={20} className="me-3" />{" "}
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {" "}
                      Delete Account{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8" style={{ marginTop: "80px" }}>
            <div className="text-start mb-3">
              <h2
                className="fw-bold mb-3"
                style={{ color: "#333", fontSize: "28px" }}
              >
                {" "}
                Your Travel Account{" "}
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
                  {activeSection === "profile"
                    ? "Your Profile"
                    : "Login & Security"}
                </span>
              </div>
            </div>
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
                <LoginDetailsCard userData={sharedUserData} />{" "}
                {/* Pass sharedUserData */}
                {showChangePasswordCard && <ChangePasswordCard />}
              </>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmationModal />

      <style jsx global>{`
        /* Changed to global for modal styles */
        .active-profile-item {
          background-color: #e3f2fd !important;
          color: #1976d2 !important;
          border-left: 4px solid #1976d2;
          /* Adjust padding-left to account for the border */
          padding-left: calc(
            1rem + 12px - 4px
          ) !important; /* Original padding (1rem for px-4) + icon margin (12px for me-3) - border width */
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
          /* Added .form-select */
          box-shadow: none;
          border-color: #17a2b8; /* Example focus color */
          box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.25); /* Example focus shadow */
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
          /* This might be needed if Bootstrap's JS isn't fully managing overflow */
          overflow: hidden !important; /* Force no scroll when any modal is open */
        }
        .modal-backdrop.fade.show {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default TravelAccountProfile;
