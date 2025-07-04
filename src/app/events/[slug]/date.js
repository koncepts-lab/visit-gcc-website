import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa"; // Imported for the loader icon

const DatePickerWithHover = ({ onClose, eventId, type = "event" }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slugEvent, setSlugEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customDateRange, setCustomDateRange] = useState(false);
  const [room, setRoom] = useState({ adults: 1, children: 0, infant: 0 });
  const [showRoomAlert, setShowRoomAlert] = useState(false);
  const [customerCountry, setCustomerCountry] = useState("UAE");
  const [eventDateRange, setEventDateRange] = useState({
    start: null,
    end: null,
  });
  const [initialCalendarMonth, setInitialCalendarMonth] = useState(new Date());
  const [ticketType, setTicketType] = useState("VIP");
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          //console.log("Using login token for fetching events.");
        } else if (registerToken) {
          authToken = registerToken;
          //console.log("Using register token for fetching events.");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/${eventId}`
        );

        const singleEventData = response.data.data || response.data || [];
        //console.log("events Data:", singleEventData);
        setSlugEvent(singleEventData);

        if (!singleEventData.start_date || !singleEventData.end_date) {
          setCustomDateRange(true);
          setInitialCalendarMonth(new Date());
        } else {
          const startDate = new Date(singleEventData.start_date);
          const endDate = new Date(singleEventData.end_date);
          setInitialCalendarMonth(startDate);
          setEventDateRange({ start: startDate, end: endDate });
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      }
    };
    fetchEventData();
  }, [eventId]);

  const isDateInValidRange = (date) => {
    if (customDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }
    return date >= eventDateRange.start && date <= eventDateRange.end;
  };

  const handleIncrement = (type) => {
    setRoom((prevRoom) => {
      if (type === "infant") {
        if (prevRoom.infant < 3)
          return { ...prevRoom, infant: prevRoom.infant + 1 };
      } else {
        const currentTotal = prevRoom.adults + prevRoom.children;
        if (currentTotal < 9)
          return { ...prevRoom, [type]: prevRoom[type] + 1 };
        else {
          setShowRoomAlert(true);
          setTimeout(() => setShowRoomAlert(false), 3000);
        }
      }
      return prevRoom;
    });
  };

  const handleDecrement = (type) => {
    setRoom((prevRoom) => {
      if (prevRoom[type] > 0)
        return { ...prevRoom, [type]: prevRoom[type] - 1 };
      return prevRoom;
    });
    if (showRoomAlert) setShowRoomAlert(false);
  };

  const handleDateChange = (date) => {
    if (!isDateInValidRange(date)) return;
    setSelectedDate(date);
    setError(null); // Clear error on date selection
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
    if (!selectedDate) return "No date selected";
    return formatDate(selectedDate);
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

  const handleBookNow = () => {
    // --- MODIFIED SECTION: Added validation checks ---
    if (!selectedDate) {
      setError("Please select a date to proceed.");
      return;
    }
    if (room.adults === 0 && room.children === 0) {
      setError("Please add at least one adult or child to proceed.");
      return;
    }
    // --- END OF MODIFICATION ---

    const bookingData = {
      start_date: toYyyyMmDd(selectedDate),
      end_date: toYyyyMmDd(selectedDate),
      customer_country: customerCountry,
      ticket_type: ticketType,
      rooms: [
        { adults: room.adults, children: room.children, infants: room.infant },
      ],
    };
    //console.log("Submitting Booking Payload:", bookingData);

    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      setError("Authentication token not found. Please log in.");
      return;
    }

    setIsBooking(true);
    setError(null);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}book/${type}/${eventId}`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        const bookingId = response.data.data.id;
        //console.log("Booking API Response:", response);
        setIsBooking(false);
        onClose();
        router.push(
          `/event-checkout?bookingId=${encodeURIComponent(bookingId)}`
        );
      })
      .catch((error) => {
        console.error("Error booking event:", error);
        setError(
          error.response?.data?.message ||
            "Failed to book event. Please try again."
        );
        setIsBooking(false);
      });
  };

  const customStyles = `
      .react-datepicker__day--highlighted,
      .react-datepicker__day--selected { background-color: #dbf0e9 !important; color: black !important; border: none !important; font-weight: 600; border-radius: 5px !important; }
      .react-datepicker__day--disabled { opacity: 0.5; cursor: not-allowed; }
      .react-datepicker__day-name { width: 92px !important; padding: 7px 0; font-size: 20px; }
      .react-datepicker__day { width: 92px !important; cursor: pointer; }
      .react-datepicker__day-names { margin-bottom: -20px; }
      .react-datepicker__day { font-weight: 550 }
      .room-alert { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-top: 10px; font-size: 14px; text-align: center; }
      .custom-date-range-badge { position: absolute; top: 10px; right: 10px; background-color: #5bb3b5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .animate-spin { animation: spin 1s linear infinite; }
      @media (max-width: 1200px) {
        .react-datepicker__day { width: 76px !important; padding: 7px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__day-name { width: 76px !important; padding: 7px 0; font-size: 18px; }
      }
      @media (max-width: 600px) { .react-datepicker__day, .react-datepicker__day-name { width: 65px !important; } }
      @media (max-width: 520px) {
        .react-datepicker__day { width: 42px !important; padding: 4px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-name { width: 42px !important; padding: 4px 0; font-size: 18px; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__current-month { padding-bottom: 15px !important; margin-top: -10px !important; }
      }
    `;

  const renderDayContents = (day) => <div className="date-cell">{day}</div>;

  // --- MODIFIED SECTION: Logic to disable the proceed button ---
  const isProceedDisabled =
    !selectedDate || (room.adults === 0 && room.children === 0) || isBooking;

  if (isLoading) return <p>Loading...</p>;
  if (error && !slugEvent) return <p>Error: {error}</p>;

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
            Departure Data Selected: {displaySelectedDateAndTime()}
          </p>
          <style>{customStyles}</style>
          <div className="relative">
            {customDateRange && (
              <div className="custom-date-range-badge">Choose Any Date</div>
            )}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              openToDate={initialCalendarMonth}
              renderDayContents={renderDayContents}
              filterDate={filterAvailableDates}
              calendarStartDay={0}
              minDate={new Date()}
            />
          </div>
        </div>

        <div className={style["date-right"]}>
          <div
            className={` ${style["room-section"]} d-flex flex-column justify-content-between`}
          >
            <div>
              <h4 className="text-xl font-semibold">Book A Session</h4>
              <div
                className="d-flex flex-row justify-content-around col-12 my-3"
                style={{ flexWrap: "wrap" }}
              >
                <div>
                  <p style={{ height: "10px" }}>Adult(s)</p>
                  <div style={{ display: "flex", gap: "0px" }}>
                    <button
                      onClick={() => handleDecrement("adults")}
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
                      onClick={() => handleIncrement("adults")}
                      className={style["numberincrement"]}
                    >
                      +
                    </button>
                  </div>
                  <p className="date_right_para">(12+ years)</p>
                </div>
                <div>
                  <p style={{ height: "10px" }}>Children</p>
                  <div style={{ display: "flex", gap: "0px" }}>
                    <button
                      onClick={() => handleDecrement("children")}
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
                      onClick={() => handleIncrement("children")}
                      className={style["numberincrement"]}
                    >
                      +
                    </button>
                  </div>
                  <p className="date_right_para">(Below 12 years)</p>
                </div>
                <div>
                  <p style={{ height: "10px" }}>Infant</p>
                  <div style={{ display: "flex", gap: "0px" }}>
                    <button
                      onClick={() => handleDecrement("infant")}
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
                      onClick={() => handleIncrement("infant")}
                      className={style["numberincrement"]}
                    >
                      +
                    </button>
                  </div>
                  <p className="date_right_para">(Below 2 years)</p>
                </div>
              </div>
              {showRoomAlert && (
                <div className="room-alert">
                  Maximum of 9 guests (excluding infants) reached.
                </div>
              )}
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
            {/* --- MODIFIED SECTION: Button with loader and updated disabled logic --- */}
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white rounded col-12 d-flex align-items-center justify-content-center"
              style={{
                background: "#5bb3b5",
                border: "none",
                fontSize: "20px",
                padding: "14px",
                cursor: isProceedDisabled ? "not-allowed" : "pointer",
                opacity: isProceedDisabled ? 0.6 : 1,
              }}
              disabled={isProceedDisabled}
            >
              {isBooking ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span className="ms-2">Processing...</span>
                </>
              ) : (
                "Proceed"
              )}
            </button>
            {/* --- END OF MODIFICATION --- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithHover;
