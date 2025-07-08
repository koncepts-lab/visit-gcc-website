import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Eye, EyeOff } from "lucide-react";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { enqueueSnackbar } = useSnackbar();

  const validateOldPassword = (password) => {
    if (!password) {
      return "Old password is required.";
    }
    return "";
  };

  const validateNewPassword = (password) => {
    if (!password) {
      return "New password is required.";
    }
    if (password.length < 8) {
      return "New password must be at least 8 characters long.";
    }
    return "";
  };

  const validateConfirmNewPassword = (confirmPass, newPass) => {
    if (!confirmPass) {
      return "Confirm new password is required.";
    }
    if (confirmPass !== newPass) {
      return "New password and confirm password do not match.";
    }
    return "";
  };

  const handleValidation = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    const oldPassError = validateOldPassword(oldPassword);
    if (oldPassError) {
      newErrors.oldPassword = oldPassError;
      isValid = false;
    }

    const newPassError = validateNewPassword(newPassword);
    if (newPassError) {
      newErrors.newPassword = newPassError;
      isValid = false;
    }

    const confirmPassError = validateConfirmNewPassword(
      confirmNewPassword,
      newPassword
    );
    if (confirmPassError) {
      newErrors.confirmNewPassword = confirmPassError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOldPasswordChange = (e) => {
    const value = e.target.value;
    setOldPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      oldPassword: validateOldPassword(value),
    }));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      newPassword: validateNewPassword(value),
      confirmNewPassword: validateConfirmNewPassword(confirmNewPassword, value), // Re-validate confirm if new changes
    }));
  };

  const handleConfirmNewPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmNewPassword: validateConfirmNewPassword(value, newPassword),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      enqueueSnackbar("Please fix the errors in the form.", {
        variant: "error",
      });
      return;
    }

    setIsSubmitting(true);
    const authToken = localStorage.getItem("auth_token_login");

    if (!authToken) {
      enqueueSnackbar("Authentication token not found. Please log in again.", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/change-password`,
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        enqueueSnackbar(
          response.data.message || "Password changed successfully!",
          {
            variant: "success",
          }
        );
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
      } else {
        enqueueSnackbar(
          response.data?.message || `Failed to change password.`,
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message ||
          "Error changing password. Please try again.",
        { variant: "error" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-2">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between">
          <h5
            className="text-black text-decoration-none fw-bold py-1"
            style={{ fontSize: "1rem" }}
          >
            Change Password
          </h5>
          <button
            type="submit"
            className="py-1 text-decoration-underline form-label border-0 bg-transparent"
            disabled={isSubmitting}
            style={{
              cursor: isSubmitting ? "not-allowed" : "pointer",
              color: "black",
            }}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
        <p className="form-label" style={{ fontSize: "0.85rem" }}>
          Please choose a password you haven't used before.
        </p>

        <div style={{ marginBottom: errors.oldPassword ? "0.5rem" : "0.3rem" }}>
          <div className="position-relative flex">
            <input
              type={showOldPassword ? "text" : "password"}
              className="form-control"
              id="oldPassword"
              placeholder="Current Password"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
              }}
            />
            <button
              className="position-absolute btn end-0 top-50 translate-middle-y p-2 me-1"
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <EyeOff size={26} /> : <Eye size={26} />}
            </button>
          </div>
          {errors.oldPassword && (
            <div
              className="text-danger"
              style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}
            >
              {errors.oldPassword}
            </div>
          )}
        </div>
        <div style={{ marginBottom: errors.newPassword ? "0.5rem" : "1rem" }}>
          <div className="position-relative flex">
            <input
              type={showNewPassword ? "text" : "password"}
              className="form-control"
              id="newPassword"
              value={newPassword}
              placeholder="New Password"
              onChange={handleNewPasswordChange}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
              }}
            />
            <button
              className="position-absolute btn end-0 top-50 translate-middle-y p-2 me-1"
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff size={26} /> : <Eye size={26} />}
            </button>
          </div>
          {errors.newPassword && (
            <div
              className="text-danger"
              style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}
            >
              {errors.newPassword}
            </div>
          )}
        </div>
        <div
          style={{
            marginBottom: errors.confirmNewPassword ? "0.5rem" : "1rem",
          }}
        >
          <div className="position-relative flex">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              className="form-control"
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              required
              style={{
                border: "none",
                borderBottom: "1px solid #ced4da",
                borderRadius: "0",
              }}
            />
            <button
              className="position-absolute btn end-0 top-50 translate-middle-y p-2 me-1"
              type="button"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? (
                <EyeOff size={26} />
              ) : (
                <Eye size={26} />
              )}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <div
              className="text-danger"
              style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}
            >
              {errors.confirmNewPassword}
            </div>
          )}
        </div>
      </form>
      <label className="" style={{ fontSize: "0.8rem" }}>
        ✔ Password must have at least 6 characters.
      </label>
    </div>
  );
}

export default ChangePasswordForm;
