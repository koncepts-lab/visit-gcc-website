import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import Link from 'next/link';
import { MdOutlineCancel } from "react-icons/md";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DatePickerWithHover = ({ onClose, packageId, type = "attraction" }) => {
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
  const [customerCountry, setCustomerCountry] = useState("UAE");
  const [packageDateRange, setPackageDateRange] = useState({
    start: null,
    end: null,
    totalDays: 0,
  });
  const [selectionDays, setSelectionDays] = useState(0);
  const [initialCalendarMonth, setInitialCalendarMonth] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const [ticketType, setTicketType] = useState("VIP");
  const router = useRouter(); 
  

  // Function to get all dates between start and end date
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  // Calculate days between two dates
  const getDaysBetween = (startDate, endDate) => {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  };

  // Function to get continuous date range starting from a specific date
  const getContinuousDateRange = (startDate, days) => {
    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < days; i++) {
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

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/${packageId}`
        );

        const singlePackageData = response.data.data || response.data || [];
        console.log("packages Data:", singlePackageData);
        setSlugPackage(singlePackageData);

        const numberOfDays = singlePackageData.number_of_days || 5;
        console.log("Number of days from API:", numberOfDays);

        if (!singlePackageData.start_date || !singlePackageData.end_date) {
          setCustomDateRange(true);
          setSelectionDays(numberOfDays);
          setInitialCalendarMonth(new Date());
        } else {
          const startDate = new Date(singlePackageData.start_date);
          const endDate = new Date(singlePackageData.end_date);
          const totalDays = getDaysBetween(startDate, endDate);

          setInitialCalendarMonth(startDate);

          setPackageDateRange({
            start: startDate,
            end: endDate,
            totalDays: totalDays,
          });

          if (totalDays <= numberOfDays) {
            const dateRange = getDatesInRange(startDate, endDate);
            setSelectedDates(dateRange);
            setSelectionDays(totalDays);
          } else {
            setSelectionDays(numberOfDays);
            const defaultRange = getContinuousDateRange(
              startDate,
              numberOfDays
            );
            setSelectedDates(defaultRange);
          }
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

  const generateTimeSlots = () => {
    if (!slugPackage) return {};

    const timeSlots = {};

    if (customDateRange) {
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
      const startDate = new Date(slugPackage.start_date);
      const endDate = new Date(slugPackage.end_date);

      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

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

  const isDateSelected = (date) => {
    return selectedDates.some(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const isDateInValidRange = (date) => {
    if (customDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }

    return date >= packageDateRange.start && date <= packageDateRange.end;
  };

  const handleIncrement = (roomId, type) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.map((room) => {
        if (room.id === roomId) {
          if (type === "infant" && room.infant < 3) {
            return { ...room, infant: room.infant + 1 };
          } else if (type !== "infant") {
            const currentTotal = room.adults + room.children;
            if (currentTotal < 3 && room[type] < 3) {
              return { ...room, [type]: room[type] + 1 };
            } else {
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
          ? { ...room, [type]: room[type] - 1 }
          : room
      )
    );
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
    if (showRoomAlert) {
      setShowRoomAlert(false);
    }
  };

  const handleRemoveRoom = (roomId) => {
    if (rooms.length > 1) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId));
    }
  };

  const handleDateChange = (date) => {
    if (!isDateInValidRange(date)) return;

    const numberOfDays = slugPackage?.number_of_days || 5;

    if (customDateRange || packageDateRange.totalDays <= numberOfDays) {
      if (isDateSelected(date)) {
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
        if (customDateRange) {
          const newRange = getContinuousDateRange(date, numberOfDays);
          setSelectedDates(newRange);
        } else {
          setSelectedDates((prevDates) => [...prevDates, date]);
        }
      }
    } else {
      const maxStartDate = new Date(packageDateRange.end);
      maxStartDate.setDate(maxStartDate.getDate() - (selectionDays - 1));

      let startDate = date > maxStartDate ? maxStartDate : date;
      const newRange = getContinuousDateRange(startDate, selectionDays);
      const validRange = newRange.filter((d) => d <= packageDateRange.end);
      setSelectedDates(validRange);
    }
  };

  const filterAvailableDates = (date) => {
    if (customDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }

    return isDateInValidRange(date);
  };

  const displaySelectedDateAndTime = () => {
    if (selectedDates.length === 0) return "No date selected";
    const sortedDates = [...selectedDates].sort((a, b) => a - b);

    if (sortedDates.length > 3) {
      return `${formatDate(sortedDates[0])} to ${formatDate(
        sortedDates[sortedDates.length - 1]
      )}`;
    }

    return sortedDates.map((date, index) => (
      <span key={index}>
        {formatDate(date)}
        <span style={{ marginLeft: "15px" }}></span>
      </span>
    ));
  };

  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "Invalid date";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const toYyyyMmDd = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  // MODIFIED: Calculate total travelers (excluding infants)
  const totalTravelers = rooms.reduce((total, room) => total + room.adults + room.children, 0);

  // MODIFIED: Updated handleBookNow with validation and proper state handling
  const handleBookNow = () => {
    // Validation checks
    if (selectedDates.length === 0) {
      setError("Please select at least one date to proceed.");
      return;
    }
    if (totalTravelers === 0) {
      setError("Please add at least one adult or child. Infants must be accompanied.");
      return;
    }

    setError(null); // Clear previous errors
    setIsBooking(true); // Set loading state to true

    const sortedDates = [...selectedDates].sort((a, b) => a - b);
    const bookingData = {
      start_date: toYyyyMmDd(sortedDates[0]),
      end_date: toYyyyMmDd(sortedDates[sortedDates.length - 1]),
      customer_country: customerCountry,
      ticket_type: ticketType,
      rooms: rooms.map((room) => ({
        adults: room.adults,
        children: room.children,
        infants: room.infant,
      })),
    };
    console.log("Submitting Booking Payload:", bookingData);

    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      setError("Authentication token not found. Please log in.");
      setIsBooking(false); // Stop loading if no token
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}book/${type}/${packageId}`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const bookingId = response.data.data.id;
        console.log("Booking API Response:", response);
        console.log("Booking API Response ID:", bookingId);

        localStorage.setItem("booking_data", JSON.stringify(bookingData));
        localStorage.setItem("data", JSON.stringify(slugPackage));
        onClose();
        router.push(
          `/checkout?bookingId=${encodeURIComponent(bookingId)}`
        );
        // No need to set isBooking to false here, as the component will unmount on redirect.
      })
      .catch((error) => {
        console.error("Error booking package:", error);
        setError(
          error.response?.data?.message ||
            "Failed to book package. Please try again."
        );
        setIsBooking(false); // Stop loading on error
      });
  };

  const customStyles = `
      .time-slot:last-child { border-bottom: none; }
      .react-datepicker__day--highlighted,
      .react-datepicker__day--selected { background-color: #dbf0e9 !important; color: black !important; border: none !important; font-weight: 600 }
      .react-datepicker__day--in-range { background-color: #dbf0e9 !important; color: black !important; border: none !important; font-weight: 600 }
      .react-datepicker__day--disabled { opacity: 0.5; cursor: not-allowed; }
      .react-datepicker__day-name { width: 92px !important; padding: 7px 0; font-size: 20px; }
      .react-datepicker__day { width: 92px !important; cursor: pointer; }
      .react-datepicker__day-names { margin-bottom: -20px; }
      .react-datepicker__day { font-weight: 550 }
      .room-alert { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-top: 10px; font-size: 14px; text-align: center; }
      .selection-info { background-color: #e8f4f8; color: #2c5282; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px; font-size: 14px; text-align: center; }

      /* MODIFIED: Added loader styles */
      .loader {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: #fff;
        border-radius: 50%;
        display: inline-block;
        animation: spin 1s linear infinite;
        margin-right: 10px;
        vertical-align: middle;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      @media (max-width: 1200px) {
        .react-datepicker__day { width: 76px !important; padding: 7px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__day-name { width: 76px !important; padding: 7px 0; font-size: 18px; }
      }
      @media (max-width: 600px) {
        .react-datepicker__day { width: 65px !important; }
        .react-datepicker__day-name { width: 65px !important; }
      }
      @media (max-width: 520px) {
        .react-datepicker__day { width: 42px !important; padding: 4px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-name { width: 42px !important; padding: 4px 0; font-size: 18px; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__current-month { padding-bottom: 15px !important; margin-top: -10px !important; }
      }
      .custom-date-range-badge { position: absolute; top: 10px; right: 10px; background-color: #5bb3b5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
    `;

  const renderDayContents = (day) => {
    return <div className="date-cell">{day}</div>;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error && !slugPackage) return <p>Error: {error}</p>;

  const numberOfDays = slugPackage?.number_of_days || 5;

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
             Data Selected:{" "}
            {displaySelectedDateAndTime() || "No date selected"}
          </p>
          <style>{customStyles}</style>
          <div className="relative">
            <DatePicker
              openToDate={initialCalendarMonth}
              onChange={handleDateChange}
              inline
              renderDayContents={renderDayContents}
              filterDate={filterAvailableDates}
              calendarStartDay={0}
              highlightDates={selectedDates}
              minDate={new Date()}
            />
          </div>
        </div>

        <div className={style["date-right"]}>
          <div
            className={` ${style["room-section"]} d-flex flex-column justify-content-between`}
          >
            <div>
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
          </div>
          <div className="my-md-4 my-1 pe-2">
            <label className="text-black">Ticket Type*</label>
            <br />
            <select
              className={`form-select col-xl-11 col-lg-12 col-12 fw-semibold my-1`}
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow: "none",
              }}
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          {error && <div className="room-alert mt-2">{error}</div>}
          <div className="mt-4 flex">
              {/* MODIFIED: Updated button with loader and disabled logic */}
              <button
                onClick={handleBookNow}
                className="bg-blue-600 text-white rounded col-12 d-flex align-items-center justify-content-center"
                style={{
                  background: "#5bb3b5",
                  border: "none",
                  fontSize: "20px",
                  padding: "14px",
                  cursor: (selectedDates.length === 0 || totalTravelers === 0 || isBooking) ? 'not-allowed' : 'pointer'
                }}
                disabled={selectedDates.length === 0 || totalTravelers === 0 || isBooking}
              >
                {isBooking ? (
                  <>
                    <span className="loader"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithHover;