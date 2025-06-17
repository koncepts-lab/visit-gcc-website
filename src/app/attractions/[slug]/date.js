import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

const DatePickerWithHover = ({ onClose, packageId }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [slugPackage, setSlugPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customDateRange, setCustomDateRange] = useState(false);
  const [rooms, setRooms] = useState([
    { id: 1, adults: 0, children: 0, infant: 0 },
  ]);
  const [nextRoomId, setNextRoomId] = useState(2);
  const [showRoomAlert, setShowRoomAlert] = useState(false);

  // Function to get all dates between start and end date
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    // Use <= to include both start and end dates
    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Fetch package data from API
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}packages/${packageId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const singlePackageData = response.data.data || response.data || [];
        console.log("packages Data:", singlePackageData);
        setSlugPackage(singlePackageData);

        // Check if package has null dates and set custom date range flag
        if (!singlePackageData.start_date || !singlePackageData.end_date) {
          setCustomDateRange(true);
        } else {
          // If start and end dates are provided, select all dates in the range
          const startDate = new Date(singlePackageData.start_date);
          const endDate = new Date(singlePackageData.end_date);

          // Get all dates between start and end (inclusive)
          const dateRange = getDatesInRange(startDate, endDate);
          setSelectedDates(dateRange);
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchPackageData();
  }, [packageId]);

  // Generate time slots based on the package dates or allow custom date selection
  const generateTimeSlots = () => {
    if (!slugPackage) return {};

    const timeSlots = {};

    if (customDateRange) {
      // For custom date range, we'll generate slots for the next 12 months
      const today = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(today.getFullYear() + 1);

      for (
        let date = new Date(today);
        date <= nextYear;
        date.setDate(date.getDate() + 1)
      ) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        // Create time slots with prices from package
        timeSlots[dateString] = [
          {
            time: "09:00 AM",
            price: `₹${parseFloat(slugPackage.adult_price).toLocaleString()}`,
          },
          {
            time: "02:00 PM",
            price: `₹${parseFloat(slugPackage.adult_price).toLocaleString()}`,
          },
        ];
      }
    } else {
      // Use the package's start and end dates
      const startDate = new Date(slugPackage.start_date);
      const endDate = new Date(slugPackage.end_date);

      // Loop through each date between start and end
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        // Create time slots with prices from package
        timeSlots[dateString] = [
          {
            time: "09:00 AM",
            price: `₹${parseFloat(slugPackage.adult_price).toLocaleString()}`,
          },
          {
            time: "02:00 PM",
            price: `₹${parseFloat(slugPackage.adult_price).toLocaleString()}`,
          },
        ];
      }
    }

    return timeSlots;
  };

  const timeSlots = slugPackage ? generateTimeSlots() : {};

  // Check if a date is already selected
  const isDateSelected = (date) => {
    return selectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleIncrement = (roomId, type) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.map((room) => {
        if (room.id === roomId) {
          // For infant, limit is 3 regardless of other counts
          if (type === "infant" && room.infant < 3) {
            return {
              ...room,
              infant: room.infant + 1,
            };
          }
          // For adults and children, check combined total
          else if (type !== "infant") {
            // Check the total count of adults and children
            const currentTotal = room.adults + room.children;

            // Only increment if total will be <= 3
            if (currentTotal < 3 && room[type] < 3) {
              return {
                ...room,
                [type]: room[type] + 1,
              };
            } else {
              // Show alert to add a new room
              setShowRoomAlert(true);
              setTimeout(() => setShowRoomAlert(false), 3000);
            }
          }
        }
        return room;
      });
      return updatedRooms;
    });
  };

  const handleDecrement = (roomId, type) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId && room[type] > 0
          ? {
              ...room,
              [type]: room[type] - 1,
            }
          : room
      )
    );
    // Hide alert if showing
    if (showRoomAlert) {
      setShowRoomAlert(false);
    }
  };

  const handleAddRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      { id: nextRoomId, adults: 0, children: 0, infant: 0 },
    ]);
    setNextRoomId(nextRoomId + 1);
    // Hide alert if showing
    if (showRoomAlert) {
      setShowRoomAlert(false);
    }
  };

  const handleRemoveRoom = (roomId) => {
    if (rooms.length > 1) {
      // Prevent deleting the last room
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    }
  };

  // Custom CSS for the hover effect
  const customStyles = `
      .date-cell:hover .time-slots {
          display: block;
          font-size: 15px
        }

      .date-cell--selected .time-slots {
          display: block;
          color: black;
      }

      .time-slots {
          display: none;
          position: absolute;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 8px;
          z-index: 1000;
          margin-left: -20px;
        }
    
      .time-slot {
          padding: 0px 4px;
          width: 150px;
          border-bottom: 1px solid #eee;
      }

      .time-slot:last-child {
          border-bottom: none;
      }

    .react-datepicker__day--highlighted {
      background-color: #dbf0e9 !important; 
      color: black !important; 
      border: none !important;
      font-weight: 600
    }

    .react-datepicker__day--selected {
      background-color: #dbf0e9 !important; 
      color: black !important;
      border: none !important;
      font-weight: 600
    }

    .react-datepicker__day--in-range {
      background-color: #dbf0e9 !important;
      color: black !important;
      border: none !important;
      font-weight: 600
    }

    .react-datepicker__day--disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .react-datepicker__day-name {
      width: 92px !important;
      padding: 7px 0;
      font-size: 20px;
    }

    .react-datepicker__day {
      width: 92px !important;
      cursor: pointer;
    }

    .react-datepicker__day-names {
      margin-bottom: -20px;
    }

    .react-datepicker__day {
      font-weight: 550
    }
    
    .room-alert {
      background-color: #f8d7da;
      color: #721c24;
      padding: 10px;
      border-radius: 4px;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }
    
    @media (max-width: 1200px) {
      .react-datepicker__day {
        width: 76px !important;
        padding: 7px 0;
        font-size: 15px;
        color: #797979 !important;
      }

      .react-datepicker__day-names {
        margin-bottom: -10px;
      }

      .react-datepicker__day-name {
        width: 76px !important;
        padding: 7px 0;
        font-size: 18px;
      }
      
      .react-datepicker__day:nth-child(7n+1) .time-slots,
      .react-datepicker__day:nth-child(7n+2) .time-slots,
      .react-datepicker__day:nth-child(7n+3) .time-slots,
      .react-datepicker__day:nth-child(7n+4) .time-slots {
        margin-left: 0px;
      }
      
      .react-datepicker__day:nth-child(7n+5) .time-slots,
      .react-datepicker__day:nth-child(7n+6) .time-slots,
      .react-datepicker__day:nth-child(7n) .time-slots {
        margin-left: -100px;
      }
    }

    @media (max-width: 600px) {
      .react-datepicker__day {
        width: 65px !important;
      }

      .react-datepicker__day-name {
        width: 65px !important;
      }
    }

    @media (max-width: 520px) {
      .react-datepicker__day {
        width: 42px !important;
        padding: 4px 0;
        font-size: 15px;
        color: #797979 !important;
      }

      .react-datepicker__day-name {
        width: 42px !important;
        padding: 4px 0;
        font-size: 18px;
      }

      .react-datepicker__day-names {
        margin-bottom: -10px;
      }

      .react-datepicker__current-month {
        padding-bottom: 15px !important;
        margin-top: -10px !important;
      }

      .time-slot {
        padding: 4px 8px;
        width: 120px;
      }

      .react-datepicker__day:nth-child(7n+1) .time-slots,
      .react-datepicker__day:nth-child(7n+2) .time-slots,
      .react-datepicker__day:nth-child(7n+3) .time-slots,
      .react-datepicker__day:nth-child(7n+4) .time-slots {
        margin-left: 0px;
        width: 140px;
      }
      
      .react-datepicker__day:nth-child(7n+5) .time-slots,
      .react-datepicker__day:nth-child(7n+6) .time-slots,
      .react-datepicker__day:nth-child(7n) .time-slots {
        margin-left: -100px;
        width: 140px;
      }
    }

    .custom-date-range-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #5bb3b5;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  `;

  const renderDayContents = (day, date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${dayOfMonth}`;
    const slots = timeSlots[dateString];

    // Check if this date has available time slots
    const hasTimeSlots = !!slots;

    // Apply opacity style to dates without time slots
    const dateStyle = hasTimeSlots
      ? {}
      : { opacity: 0.5, pointerEvents: "none" };

    return (
      <div className="date-cell" style={dateStyle}>
        {day}
        {slots && slugPackage && (
          <div className="time-slots">
            <div className="font-bold">Available Prices:</div>
            <div className="time-slot">
              <div className="d-flex justify-content-between">
                <span className="text-green-600">
                  Adult: ₹{parseFloat(slugPackage.adult_price).toLocaleString()}
                </span>
                {/* Checkbox removed as requested */}
              </div>
            </div>
            <div className="time-slot">
              <div className="d-flex justify-content-between">
                <span className="text-green-600">
                  Child: ₹{parseFloat(slugPackage.child_price).toLocaleString()}
                </span>
                {/* Checkbox removed as requested */}
              </div>
            </div>
            <div className="time-slot">
              <div className="d-flex justify-content-between">
                <span className="text-green-600">
                  Infant: ₹
                  {parseFloat(slugPackage.infant_price).toLocaleString()}
                </span>
                {/* Checkbox removed as requested */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      return "Invalid date";
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Modified to handle direct date selection
  const handleDateChange = (date) => {
    if (isDateSelected(date)) {
      // If date is already selected, remove it
      setSelectedDates((prevDates) =>
        prevDates.filter(
          (d) =>
            !(
              d.getDate() === date.getDate() &&
              d.getMonth() === date.getMonth() &&
              d.getFullYear() === date.getFullYear()
            )
        )
      );
    } else {
      // If date is not selected, add it
      setSelectedDates((prevDates) => [...prevDates, date]);
    }
  };

  const filterAvailableDates = (date) => {
    // If custom date range is enabled, don't filter dates
    if (customDateRange) {
      // Just filter out past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }

    // Otherwise, use the package's date range
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${dayOfMonth}`;

    return !!timeSlots[dateString];
  };

  const displaySelectedDateAndTime = () => {
    if (selectedDates.length === 0) {
      return "No date selected";
    }

    // Sort dates chronologically
    const sortedDates = [...selectedDates].sort((a, b) => a - b);

    // If there are many dates selected (e.g., a full week or more), display a range
    if (sortedDates.length > 3) {
      return `${formatDate(sortedDates[0])} to ${formatDate(
        sortedDates[sortedDates.length - 1]
      )}`;
    }

    // Otherwise show individual dates
    const dateElements = sortedDates.map((date, index) => {
      const formattedDate = formatDate(date);
      return (
        <span key={index}>
          {formattedDate}
          <span style={{ marginLeft: "15px" }}></span>
        </span>
      );
    });

    return dateElements.length > 0 ? dateElements : "No date selected";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={`bg-white ${style["date-pick-container"]}`}>
      <div
        className="flex justify-between items-center"
        style={{ backgroundColor: "#fcfafb", borderRadius: "11px" }}
      >
        <h3 className="font-semibold">Check Price & Availability</h3>
        <button onClick={onClose} className={`${style["date-close-btn"]}`}>
          ×
        </button>
      </div>
      <div
        className={`bg-white rounded-lg shadow-xl p-lg-6 p-2 ${style["date-pick"]}`}
      >
        <div className={`${style["date-left"]}`}>
          <p className="py-2 ms-2">
            Departure Data Selected:{" "}
            {displaySelectedDateAndTime() || "No date selected"}
          </p>

          <style>{customStyles}</style>
          <div className="relative">
            {customDateRange && (
              <div className="custom-date-range-badge">Choose Any Date</div>
            )}
            <DatePicker
              selected={new Date()}
              onChange={handleDateChange}
              inline
              renderDayContents={renderDayContents}
              filterDate={filterAvailableDates}
              calendarStartDay={0}
              highlightDates={selectedDates}
              minDate={new Date()} // Prevent selection of past dates
            />
          </div>
        </div>

        <div className={style["date-right"]}>
          <div
            className={` ${style["room-section"]} d-flex flex-column  justify-content-between`}
          >
            <div className="">
              <h4 className="text-xl font-semibold">Rooms & Travellers:</h4>
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="d-flex flex-row justify-content-between col-12"
                >
                  <div className="me-xl-0 me-lg-5 me-5">
                    <p>Room {room.id}</p>
                  </div>
                  <div className="d-flex flex-xl-column flex-lg-row flex-md-row flex-column">
                    <div className="me-xl-0 me-xl-5 me-lg-4 me-md-4 me-5">
                      <p style={{ height: "10px" }}>Adult(s)</p>
                      <div style={{ display: "flex", gap: "0px" }}>
                        <button
                          onClick={() => handleDecrement(room.id, "adults")}
                          className={style["numberdecrement"]}
                        >
                          -
                        </button>
                        <span
                          style={{
                            padding: "1px 10px",
                            fontSize: "20px",
                            border: "1px solid",
                          }}
                        >
                          {room.adults}
                        </span>
                        <button
                          onClick={() => handleIncrement(room.id, "adults")}
                          className={style["numberincrement"]}
                        >
                          +
                        </button>
                      </div>
                      <p className="date_right_para">(12+ years)</p>
                    </div>

                    <div>
                      <p style={{ height: "10px" }}>Infant</p>
                      <div style={{ display: "flex", gap: "0px" }}>
                        <button
                          onClick={() => handleDecrement(room.id, "infant")}
                          className={style["numberdecrement"]}
                        >
                          -
                        </button>
                        <span
                          style={{
                            padding: "1px 10px",
                            fontSize: "20px",
                            border: "1px solid",
                          }}
                        >
                          {room.infant}
                        </span>
                        <button
                          onClick={() => handleIncrement(room.id, "infant")}
                          className={style["numberincrement"]}
                        >
                          +
                        </button>
                      </div>
                      <p className="date_right_para">(Below 2 years)</p>
                    </div>
                  </div>
                  <div>
                    <p style={{ height: "10px" }}>Children</p>
                    <div style={{ display: "flex", gap: "0px" }}>
                      <button
                        onClick={() => handleDecrement(room.id, "children")}
                        className={style["numberdecrement"]}
                      >
                        -
                      </button>
                      <span
                        style={{
                          padding: "1px 10px",
                          fontSize: "20px",
                          border: "1px solid",
                        }}
                      >
                        {room.children}
                      </span>
                      <button
                        onClick={() => handleIncrement(room.id, "children")}
                        className={style["numberincrement"]}
                      >
                        +
                      </button>
                    </div>
                    <p className="date_right_para">(Below 12 years)</p>
                  </div>
                  {index > 0 && (
                    <MdOutlineCancel
                      className="ms-3"
                      size={20}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleRemoveRoom(room.id)}
                    />
                  )}
                  <br />
                </div>
              ))}
              {showRoomAlert && (
                <div className="room-alert">
                  Maximum of 3 guests (excluding infants) reached. Please add a
                  new room.
                </div>
              )}
              <button
                className="bg-white col-12"
                style={{ border: "none", color: "#3C99DC" }}
                onClick={handleAddRoom}
              >
                + Add another room
              </button>
            </div>

            <div className="my-md-4 my-1 pe-2">
              <label className="text-black">Customer Country*</label>
              <br />
              <select
                className={`form-select col-xl-11 col-lg-12 col-12 fw-semibold my-1`}
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  boxShadow: "none",
                }}
              >
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Qatar">Qatar</option>
                <option value="Oman">Oman</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Bahrain">Bahrain</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex">
            <Link href="/checkout">
              <button
                onClick={() => {
                  // Handle booking logic here
                  onClose();
                }}
                className="bg-blue-600 text-white rounded col-12"
                style={{
                  background: "#5bb3b5",
                  border: "none",
                  fontSize: "20px",
                  padding: "14px",
                }}
                disabled={selectedDates.length === 0}
              >
                Proceed
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithHover;
