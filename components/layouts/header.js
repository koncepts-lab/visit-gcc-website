"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import style from "./style.module.css";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import ChangePasswordForm from "./ChangePasswordForm";

import {
  Settings,
  LogOut,
  UserCircle,
  Edit3,
  Mail,
  Phone,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  // Twitter, // Your X icon if you have one
  Home,
} from "lucide-react";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 576 : false
  );
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState("account");
  const [selectedCurrency, setSelectedCurrency] = useState("AED");
  const [selectedCountry, setSelectedCountry] = useState("UAE");
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [editingField, setEditingField] = useState(null);
  const [editFieldValue, setEditFieldValue] = useState("");
  const [editingFirstName, setEditingFirstName] = useState("");
  const [editingLastName, setEditingLastName] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const router = useRouter();
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const genderOptions = [
    { value: "", label: "Select Gender...", disabled: true },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  const accountMenuItems = [
    {
      fieldKey: "Display Name",
      label: "Display Name",
      inputType: "text",
      placeholder: "Enter full name",
    },
    {
      fieldKey: "Gender",
      label: "Gender",
      inputType: "select",
      options: genderOptions,
      placeholder: "Select Gender",
    },
    { fieldKey: "Date of Birth", label: "Date of Birth", inputType: "date" },
    {
      fieldKey: "City of Residence",
      label: "City of Residence",
      inputType: "text",
      placeholder: "Enter city",
    },
  ];

  const fetchUserData = async () => {
    setLoading(true);
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      setUserData(null);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}profiles/user`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.data) {
        const profileData = response.data.profile || response.data;
        setUserData({
          first_name:
            profileData.user?.first_name || profileData.first_name || "",
          last_name: profileData.user?.last_name || profileData.last_name || "",
          name: `${
            profileData.user?.first_name || profileData.first_name || ""
          } ${
            profileData.user?.last_name || profileData.last_name || ""
          }`.trim(),
          email: profileData.user?.email || profileData.email || "",
          profile_image_url:
            profileData.profile_image_url ||
            profileData.user?.profile_image_url ||
            null,
          gender: profileData.gender || "",
          date_of_birth:
            profileData.birthday || profileData.date_of_birth || "",
          city: profileData.city_of_residence || profileData.city || "",
          mobile_number:
            profileData.mobileNumber || profileData.mobile_number || "",
          email_verified_at:
            profileData.user?.email_verified_at ||
            profileData.email_verified_at ||
            null,
        });
      } else {
        setUserData(null);
      }
    } catch (err) {
      setUserData(null);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("auth_token_login");
        localStorage.removeItem("auth_token_register");
        localStorage.removeItem("userId");
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to handle successful password change
  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false); // Hide the form
    enqueueSnackbar("Password changed successfully!", { variant: "success" });
    // Optionally, you can redirect the user or close the entire mobile menu
    toggleMenu(); // Closes the mobile menu after password change
  };

  // Function to cancel password change (go back to settings)
  const handleCancelPasswordChange = () => {
    setShowChangePassword(false);
  };

  const handleStartEditing = (fieldKey, currentValue = "") => {
    setEditingField(fieldKey);
    if (fieldKey === "Display Name") {
      setEditingFirstName(
        userData?.first_name || currentValue.split(" ")[0] || ""
      );
      setEditingLastName(
        userData?.last_name || currentValue.split(" ").slice(1).join(" ") || ""
      );
      setEditFieldValue("");
    } else {
      setEditFieldValue(currentValue || "");
      setEditingFirstName("");
      setEditingLastName("");
    }
  };
  const handleCancelEditing = () => {
    setEditingField(null);
    setEditFieldValue("");
    setEditingFirstName("");
    setEditingLastName("");
  };

  const handleEditingFirstNameChange = useCallback((e) => {
    setEditingFirstName(e.target.value);
  }, []);
  const handleEditingLastNameChange = useCallback((e) => {
    setEditingLastName(e.target.value);
  }, []);
  const handleGenericEditFieldValueChange = useCallback((e) => {
    setEditFieldValue(e.target.value);
  }, []);

  const handleSaveEdit = async () => {
    setIsSubmittingEdit(true);
    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      enqueueSnackbar("Authentication token not found.", { variant: "error" });
      setIsSubmittingEdit(false);
      return;
    }

    let currentFieldLabel = editingField;

    // Prepare the complete payload with all profile fields
    // Use current userData values for unchanged fields, and new values for the field being edited
    let updatedFirstName = userData?.first_name || "";
    let updatedLastName = userData?.last_name || "";
    let updatedGender = userData?.gender || "";
    let updatedBirthday = userData?.date_of_birth || "";
    let updatedCityOfResidence = userData?.city || "";
    let updatedMobileNumber = userData?.mobile_number || "";

    // Update the specific field being edited
    if (editingField === "Display Name") {
      if (!editingFirstName.trim() && !editingLastName.trim()) {
        enqueueSnackbar("Name fields cannot both be empty.", {
          variant: "warning",
        });
        setIsSubmittingEdit(false);
        return;
      }
      updatedFirstName = editingFirstName.trim();
      updatedLastName = editingLastName.trim();
    } else {
      const allMenuItems = [...accountMenuItems, ...settingsMenuItems];
      const currentItemConfig = allMenuItems.find(
        (item) => item.fieldKey === editingField
      );
      const inputType = currentItemConfig?.inputType || "text";

      if (
        typeof editFieldValue === "string" &&
        !editFieldValue.trim() &&
        inputType !== "date"
      ) {
        enqueueSnackbar("Value cannot be empty.", { variant: "warning" });
        setIsSubmittingEdit(false);
        return;
      }
      if (inputType === "date" && !editFieldValue) {
        enqueueSnackbar("Date cannot be empty if specified.", {
          variant: "warning",
        });
        setIsSubmittingEdit(false);
        return;
      }

      switch (editingField) {
        case "Gender":
          updatedGender = editFieldValue;
          break;
        case "Date of Birth":
          updatedBirthday = editFieldValue;
          break;
        case "City of Residence":
          updatedCityOfResidence = editFieldValue;
          break;
        default:
          enqueueSnackbar(`Unknown field: ${editingField}`, {
            variant: "error",
          });
          setIsSubmittingEdit(false);
          return;
      }
    }

    // Create the complete payload with all fields
    // Send null for empty fields, actual values for filled fields
    const finalRequestBody = {
      first_name: updatedFirstName.trim() || null,
      last_name: updatedLastName.trim() || null,
      birthday: updatedBirthday || null,
      gender: updatedGender ? updatedGender.toLowerCase() : null,
      city_of_residence: updatedCityOfResidence || null,
      mobile_number: updatedMobileNumber || null,
    };

    try {
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
        response.data &&
        response.data.success !== false &&
        (response.status === 200 || response.status === 201)
      ) {
        enqueueSnackbar(`${currentFieldLabel} updated!`, {
          variant: "success",
        });
        await fetchUserData();
        handleCancelEditing();
      } else {
        enqueueSnackbar(response.data?.message || `Failed to update.`, {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || `Error updating.`, {
        variant: "error",
      });
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevMenuOpen) => {
      const newState = !prevMenuOpen;
      if (typeof document !== "undefined") {
        document.body.style.overflow = newState && isMobile ? "hidden" : "auto";
      }
      if (newState && userData) {
        setMobileActiveTab("account");
        setShowChangePassword(false);
      }
      return newState;
    });
  }, [isMobile, userData]); // Dependencies for toggleMenu

  useEffect(() => {
    if (typeof window !== "undefined" && !window.bootstrap) {
      try {
        window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      } catch (e) {
        console.error("Failed to load Bootstrap JS:", e);
      }
    }
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 600);
      setHideOnScroll(
        currentScrollPos > lastScrollPos && currentScrollPos > 100
      );
      setLastScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);
  useEffect(() => {
    fetchUserData();
    const handleStorageChange = (event) => {
      if (
        event.key === "auth_token_login" ||
        event.key === "auth_token_register" ||
        event.key === "userId"
      )
        fetchUserData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      )
        setProfileDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutsideMobileMenu = (event) => {
      const toggleButton = document.querySelector(`.${style["toggle-btn"]}`);
      if (
        menuOpen &&
        isMobile &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      )
        toggleMenu();
    };
    if (isMobile)
      document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    return () => {
      if (isMobile)
        document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    };
  }, [menuOpen, isMobile, toggleMenu]);

  const toggleProfileDropdown = () =>
    setProfileDropdownOpen(!profileDropdownOpen);
  const handleLogout = () => {
    localStorage.removeItem("auth_token_login");
    localStorage.removeItem("auth_token_register");
    localStorage.removeItem("userId");
    setUserData(null);
    if (menuOpen && isMobile) toggleMenu();
    setProfileDropdownOpen(false);
    enqueueSnackbar("You have been logged out.", { variant: "info" });
  };

  let profileDisplayName = "Login/Sign-up";
  if (loading) profileDisplayName = "Loading...";
  else if (userData)
    profileDisplayName =
      userData.name ||
      userData.first_name ||
      userData.email?.split("@")[0] ||
      "User";

  const socialMediaPlatforms = [
    {
      name: "linkedin",
      link: "https://www.linkedin.com/company/visitgcc/",
      imgSrc: "/images/icons/linkedin.png",
    },
    {
      name: "facebook",
      link: "https://www.facebook.com/people/VisitGCC/100093838223257/",
      imgSrc: "/images/icons/facebook.png",
    },
    {
      name: "instagram",
      link: "https://www.instagram.com/visit.gcc/",
      imgSrc: "/images/icons/instagram.png",
    },
  ];

  const MobileMenuItem = ({
    label,
    fieldKey,
    value,
    href = "#",
    isNavigation = false,
    isDanger = false,
    onClick,
    rightContent,
    inputType = "text",
    placeholder = "Enter value",
    options = [],
  }) => {
    const isCurrentlyEditingThisField = editingField === fieldKey;
    const handleLocalEditOrAddClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleStartEditing(fieldKey, value || "");
    };
    if (isCurrentlyEditingThisField) {
      if (fieldKey === "Display Name") {
        return (
          <li className="mb-0 px-3 py-2 border-bottom">
            <div className="d-flex flex-column">
              <span
                className="text-muted small mb-2"
                style={{ textTransform: "uppercase" }}
              >
                {label}
              </span>
              <div className="mb-2">
                <label
                  htmlFor={`edit-first-name-${fieldKey}`}
                  className="form-label visually-hidden"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id={`edit-first-name-${fieldKey}`}
                  className="form-control form-control-sm py-1 px-2"
                  value={editingFirstName}
                  onChange={handleEditingFirstNameChange}
                  placeholder="First Name"
                  autoFocus
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor={`edit-last-name-${fieldKey}`}
                  className="form-label visually-hidden"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id={`edit-last-name-${fieldKey}`}
                  className="form-control form-control-sm py-1 px-2"
                  value={editingLastName}
                  onChange={handleEditingLastNameChange}
                  placeholder="Last Name"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  className="btn btn-sm btn-primary me-1"
                  onClick={handleSaveEdit}
                  disabled={isSubmittingEdit}
                  style={{
                    lineHeight: 1.2,
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {isSubmittingEdit ? "..." : "Save"}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleCancelEditing}
                  disabled={isSubmittingEdit}
                  style={{
                    lineHeight: 1.2,
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.8rem",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </li>
        );
      }
      return (
        <li className="mb-0 px-3 py-2 border-bottom">
          <div className="d-flex flex-column">
            <span
              className="text-muted small mb-1"
              style={{ textTransform: "uppercase" }}
            >
              {label}
            </span>
            <div className="d-flex align-items-center">
              {inputType === "select" ? (
                <select
                  className="form-select form-select-sm me-2 py-1 px-2"
                  value={editFieldValue}
                  onChange={handleGenericEditFieldValueChange}
                  autoFocus
                  style={{ fontSize: "0.9rem" }}
                >
                  <option value="" disabled>
                    {placeholder || "Select..."}
                  </option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={inputType}
                  className="form-control form-control-sm me-2 py-1 px-2"
                  value={editFieldValue}
                  onChange={handleGenericEditFieldValueChange}
                  placeholder={placeholder}
                  autoFocus
                  style={{ fontSize: "0.9rem" }}
                />
              )}
              <button
                className="btn btn-sm btn-primary me-1"
                onClick={handleSaveEdit}
                disabled={isSubmittingEdit}
                style={{
                  lineHeight: 1.2,
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                {isSubmittingEdit ? "..." : "Save"}
              </button>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={handleCancelEditing}
                disabled={isSubmittingEdit}
                style={{
                  lineHeight: 1.2,
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.8rem",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </li>
      );
    }
    return (
      <li className="mb-0 px-3 py-3 border-bottom">
        <div
          className={`d-flex justify-content-between align-items-center text-decoration-none ${
            isDanger ? "text-danger" : "text-dark"
          }`}
          onClick={
            onClick ||
            (isNavigation
              ? () => {
                  router.push(href);
                  toggleMenu();
                }
              : undefined)
          }
          style={{ cursor: onClick || isNavigation ? "pointer" : "default" }}
        >
          <span>{label}</span>
          <div className="d-flex align-items-center">
            {rightContent}
            {value ? (
              <>
                {" "}
                <span
                  className="text-muted me-2"
                  style={{ fontSize: "0.9em", textTransform: "capitalize" }}
                >
                  {value}
                </span>{" "}
                {!isNavigation && !onClick && fieldKey && (
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-0 me-2"
                    onClick={handleLocalEditOrAddClick}
                    style={{ color: "#17a2b8", fontSize: "0.9em" }}
                    aria-label={`Edit ${label}`}
                  >
                    <Edit3 size={16} />
                  </button>
                )}{" "}
              </>
            ) : (
              !isNavigation &&
              !onClick &&
              fieldKey && (
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-0 me-2"
                  onClick={handleLocalEditOrAddClick}
                  style={{
                    color: "#17a2b8",
                    fontSize: "0.9em",
                    fontWeight: "500",
                  }}
                >
                  + Add
                </button>
              )
            )}
            {isNavigation && <ChevronRight size={18} className="text-muted" />}
          </div>
        </div>
      </li>
    );
  };

  const MobileMenuSocials = () => (
    <li className="mb-0 px-3 py-3 d-flex flex-column">
      {" "}
      <div className="mb-2 text-muted small">Show us love & Follow</div>{" "}
      <div className="d-flex gap-3">
        {" "}
        {socialMediaPlatforms.map((social) => (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={social.name}
            aria-label={`VisitGCC on ${social.name}`}
            className="text-muted"
          >
            {" "}
            <img
              src={social.imgSrc}
              alt={social.name}
              style={{ width: "28px", height: "28px" }}
              className="rounded-circle border p-1"
            />{" "}
          </a>
        ))}{" "}
      </div>{" "}
    </li>
  );

  const LoggedInMobileMenu = () => (
    <>
      <div className="d-flex justify-content-around border-bottom mb-0">
        <button
          className={`btn btn-link text-decoration-none fw-bold py-2 ${
            mobileActiveTab === "account" ? style.activeMobileTab : "text-muted"
          }`}
          onClick={() => {
            setMobileActiveTab("account");
            setShowChangePassword(false); // Hide ChangePasswordForm when switching tabs
          }}
          style={{
            flex: 1,
            borderRadius: 0,
            borderBottom:
              mobileActiveTab === "account"
                ? "3px solid #169496"
                : "3px solid transparent",
            color: mobileActiveTab === "account" ? "#169496" : "#6c757d",
            fontSize: "0.9rem",
          }}
        >
          Account
        </button>
        <button
          className={`btn btn-link text-decoration-none fw-bold py-2 ${
            mobileActiveTab === "settings"
              ? style.activeMobileTab
              : "text-muted"
          }`}
          onClick={() => {
            setMobileActiveTab("settings");
            setShowChangePassword(false);
          }}
          style={{
            flex: 1,
            borderRadius: 0,
            borderBottom:
              mobileActiveTab === "settings"
                ? "3px solid #169496"
                : "3px solid transparent",
            color: mobileActiveTab === "settings" ? "#169496" : "#6c757d",
            fontSize: "0.9rem",
          }}
        >
          Settings
        </button>
      </div>

      {mobileActiveTab === "account" && (
        <>
          <MobileMenuItem
            fieldKey="Display Name"
            label="Display Name"
            value={userData?.name}
            placeholder="Enter full name"
          />
          <MobileMenuItem
            fieldKey="Gender"
            label="Gender"
            value={userData?.gender}
            inputType="select"
            options={genderOptions}
            placeholder="Select Gender"
          />
          <MobileMenuItem
            fieldKey="Date of Birth"
            label="Date of Birth"
            value={userData?.date_of_birth}
            inputType="date"
          />
          <MobileMenuItem
            fieldKey="City of Residence"
            label="City of Residence"
            value={userData?.city}
            placeholder="Enter city"
          />
          <MobileMenuItem
            label="Partner With Us"
            href="/partner-with-us"
            isNavigation={true}
          />
          <MobileMenuSocials />
        </>
      )}
      {mobileActiveTab === "settings" && (
        <>
          <MobileMenuItem label="Currency" value={selectedCurrency} />
          <MobileMenuItem label="Country" value={selectedCountry} />
          <MobileMenuItem
            label="Email address"
            value={userData?.email}
          />
  
          <MobileMenuItem
            label="Change Password"
            onClick={() => setShowChangePassword(true)}
            isNavigation={false}
          />
          <MobileMenuItem
            label="Privacy Policy"
            href="/privacy-policy"
            isNavigation={true}
          />
          <MobileMenuItem
            label="Terms & Conditions"
            href="/terms-conditions"
            isNavigation={true}
          />
          <MobileMenuItem
            label="Contact Support"
            href="mailto:support@example.com"
            isNavigation={true}
          />
          <li className="mb-0 px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
            <span>Notifications</span>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="notificationSwitchMobile"
                defaultChecked
              />
            </div>
          </li>
          <MobileMenuItem
            label="Log Out"
            onClick={handleLogout}
            isDanger={true}
          />
          <MobileMenuItem
            label="Delete account"
            onClick={() => alert("Connect Delete Confirm Modal here")}
            isDanger={true}
          />
        </>
      )}
    </>
  );

  const GuestMobileMenu = () => (
    <>
      <li className="mb-0 px-3 pt-3 border-bottom">
        <h6
          className="mb-0 pb-2 fw-bold"
          style={{
            display: "inline-block",
            borderBottom: "3px solid #169496",
            color: "#169496",
          }}
        >
          Settings
        </h6>
      </li>{" "}
      <MobileMenuItem label="Currency" value={selectedCurrency} />{" "}
      <MobileMenuItem label="Country" value={selectedCountry} />{" "}
      <MobileMenuItem
        label="Contact Support"
        href="/contact-support"
        isNavigation={true}
      />{" "}
      <MobileMenuItem
        label="Partner With Us"
        href="/partner-with-us"
        isNavigation={true}
      />{" "}
      <MobileMenuSocials />{" "}
    </>
  );
  return (
    <div
      className={`${style.headerWrapper} ${hideOnScroll ? style.hidden : ""}`}
    >
      <nav
        className={`navbar navbar-expand-sm navbar-light ${style.navbar} ${
          scrolled ? style.scrolled : ""
        }`}
        id="navbar"
      >
        <div className="container position-relative" style={{ zIndex: "10" }}>
          <div
            className={style["navbar_sticky_mobile_container"]}
            style={{ width: "100%" }}
          >
            <div className={`nav-item ${style["navbar_sticky_mobile"]} d-sm-none d-block`}>
              <Link className="nav-link active d-flex flex-column" href="/country">
                <img
                  src="../images/Explore.svg"
                  className={style["img-top-logo"]}
                  alt="Explore"
                />
                Explore
              </Link>
            </div>
             <div className={` d-sm-block d-none`}>
              <Link className="navbar-brand active" href="/country">
                <img
                  src="../images/logo.svg"
                  className={style[""]} style={{maxHeight: '100px', maxWidth: '110px' , marginTop: '-5px'}}
                  alt="Explore"
                />
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]} d-sm-none d-block`}>
              <Link className="nav-link active d-flex flex-column" href="/">
                <img
                  src="../images/Plan.svg"
                  className={style["img-top-logo"]}
                  alt="Plan"
                />
                Plan
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]} d-sm-none d-block`}>
              <Link className="nav-link active d-flex flex-column" href="/">
                <img
                  src="../images/Event.svg"
                  className={style["img-top-logo"]}
                  alt="Events"
                />
                Events
              </Link>
            </div>
            <div className={`nav-item ${style["navbar_sticky_mobile"]} d-sm-none d-block`}>
              <Link className="nav-link active d-flex flex-column" href="/">
                <img
                  src="../images/Book.svg"
                  className={style["img-top-logo"]}
                  alt="Book"
                />
                Book
              </Link>
            </div>
          </div>
          <Link className={`navbar-brand ${style["navbar_logo"]}`} href="/">
            <img src="/images/logo.svg " alt="Logo" />
          </Link>
          <button
            className={`navbar-toggler ${style["toggle-btn"]} ms-auto` }
            style={{marginRight: '-25px'}}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="collapsibleNavbar"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <span className={style["close-icon"]}>×</span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>
          <div
            ref={mobileMenuRef}
            className={`collapse navbar-collapse justify-content-end ${
              style["stiky_time"]
            } ${menuOpen && isMobile ? "show" : ""}`}
            id="collapsibleNavbar"
          >
            {isMobile && menuOpen && (
              <ul
                className={`navbar-nav ${style["navbar-nav-c"]} position-fixed top-0 start-0 bg-white vh-100 w-100 p-0 d-flex flex-column`}
                style={{
                  zIndex: 1040,
                  alignItems: "initial",
                  justifyContent: "start",
                  overflowY: "auto",
                }}
              >
                <li
                  className="py-3 px-3 d-flex align-items-center justify-content-between text-white w-100"
                  style={{ backgroundColor: "#169496" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    {userData ? (
                      <img
                        src={
                          userData.profile_image_url ||
                          "/images/icons/placeholder.jpg"
                        }
                        alt="User"
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <CgProfile size={40} />
                    )}
                    <div>
                      <div className="fw-bold">{profileDisplayName}</div>
                      <div className="small">
                        {userData
                          ? userData.email || "Welcome!"
                          : "Login for best deals & offers"}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn text-white p-0"
                    style={{ fontSize: "2rem", lineHeight: 1 }}
                    onClick={toggleMenu}
                    aria-label="Close menu"
                  >
                    ×
                  </button>
                </li>
{showChangePassword ? (
        <ChangePasswordForm
        />
      ) : userData ? (
        <LoggedInMobileMenu />
      ) : (
        <GuestMobileMenu />
      )}              </ul>
            )}
            <ul
              className={`navbar-nav ${style["navbar-nav-c"]} d-none d-sm-flex`}
            >
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/country">
                  <img
                    src="../images/Explore.svg"
                    className={style["img-top-logo"]}
                    alt="Explore"
                  />{" "}
                  Explore
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/Plan.svg"
                    className={style["img-top-logo"]}
                    alt="Plan"
                  />{" "}
                  Plan
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/Event.svg"
                    className={style["img-top-logo"]}
                    alt="Events"
                  />{" "}
                  Events
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky"]}`}>
                <Link className="nav-link active" href="/">
                  <img
                    src="../images/Book.svg"
                    className={style["img-top-logo"]}
                    alt="Book"
                  />{" "}
                  Book
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link
                  className="nav-link active d-sm-block d-none"
                  href="/invest-in-gcc"
                >
                  <img
                    src="/images/inv-gcc.svg"
                    className={style["img-top-logo"]}
                    alt="Invest in GCC"
                    height={40}
                  />
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link className="nav-link d-sm-block d-none" href="/one-visa">
                  <img
                    src="/images/one-visa.svg"
                    className={style["img-top-logo"]}
                    alt="One Visa"
                    height={40}
                  />
                </Link>
              </li>
              <li className={`nav-item ${style["navbar_sticky_hide"]}`}>
                <Link
                  className="nav-link d-sm-block d-none"
                  href="/partner-with-us"
                >
                  <img
                    src="/images/Partner.png"
                    alt="Partner with Us"
                    className={style["img-top-logo"]}
                  />
                </Link>
              </li>
            
            </ul>
          </div>
            <li
                className={`nav-item ${style["navbar_sticky_hide"]} d-flex align-items-center position-relative`}
                ref={profileDropdownRef}
              >
                {!loading && !userData ? (
                  <Link
                    className={`nav-link d-sm-block d-none ${style["login-link"]} `}
                    href="/login"

                  >
                    Login/Signup
                  </Link>
                ) : !loading && userData ? (
                  <div
                    className={`nav-item d-none d-sm-flex position-relative`}
                  >
                    <button
                      className={`nav-link ${style["login_profile"]} btn btn-link text-decoration-none p-2`}
                      onClick={toggleProfileDropdown}
                      style={{
                        background: "none",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      aria-haspopup="true"
                      aria-expanded={profileDropdownOpen}
                    >
                      <CgProfile size={24} />
                      <span>{profileDisplayName}</span>
                    </button>
                    {profileDropdownOpen && (
                      <div
                        className="position-absolute bg-white shadow-lg border rounded"
                        style={{
                          top: "100%",
                          right: "0",
                          minWidth: "280px",
                          zIndex: 1050,
                          marginTop: "8px",
                        }}
                      >
                        <Link
                          href="/profile"
                          className="p-3 border-bottom d-flex justify-content-between align-items-center text-dark text-decoration-none"
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            textTransform: "capitalize",
                            flexDirection: "row",
                          }}
                        >
                          <span>Your Profile</span>{" "}
                          <ChevronRight size={18} className="text-muted" />
                        </Link>
                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                          <span>Currency</span>{" "}
                          <span className="text-muted">{selectedCurrency}</span>
                        </div>
                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                          <span>Country</span>{" "}
                          <span className="text-muted">{selectedCountry}</span>
                        </div>
                        <Link
                          href="mailto:support@example.com"
                          style={{
                            fontSize: "16px",
                            color: "#000",
                            textTransform: "capitalize",
                            flexDirection: "row",
                          }}
                          className="p-3 border-bottom d-flex justify-content-between align-items-center text-dark text-decoration-none"
                        >
                          <span>Support</span>{" "}
                          <ChevronRight size={18} className="text-muted" />
                        </Link>
                        <div className="p-3">
                          <button
                            onClick={handleLogout}
                            className="btn btn-link text-danger p-0 text-decoration-none text-start w-100"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="nav-link">{profileDisplayName}</span>
                )}
              </li>
        </div>
      </nav>
      <style jsx global>{`
        .${style.activeMobileTab} {
          color: #169496 !important;
          border-bottom: 3px solid #169496 !important;
          padding-bottom: calc(0.5rem - 3px) !important;
        }
      `}</style>
    </div>
  );
}

export default Header;
