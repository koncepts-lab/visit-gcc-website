import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
        } else if (registerToken) {
          authToken = registerToken;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}events/${eventId}`
        );

        const singleEventData = response.data.data || response.data || [];
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

    if (selectedDate?.toDateString() !== date.toDateString()) {
      setSelectedDate(date);
      setSelectedTimeSlot(null);
    }
    setError(null);
  };

  const filterAvailableDates = (date) => {
    if (customDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }
    return isDateInValidRange(date);
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

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const displaySelectedDateAndTime = () => {
    if (!selectedDate) return "No date selected";
    let display = formatDate(selectedDate);
    if (selectedTimeSlot) {
      display += ` at ${formatTime(selectedTimeSlot.start_time)}`;
    }
    return display;
  };

  const toYyyyMmDd = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      setError("Please select a date to proceed.");
      return;
    }
    if (!selectedTimeSlot) {
      setError("Please select a time slot to proceed.");
      return;
    }
    if (room.adults === 0 && room.children === 0) {
      setError("Please add at least one adult or child to proceed.");
      return;
    }

    const bookingData = {
      start_date: toYyyyMmDd(selectedDate),
      end_date: toYyyyMmDd(selectedDate),
      customer_country: customerCountry,
      ticket_type: ticketType,
      timeslot_id: selectedTimeSlot.id,
      rooms: [
        { adults: room.adults, children: room.children, infants: room.infant },
      ],
    };

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
        console.log("booking",response.data.data);
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
      .react-datepicker__day--selected { 
        background-color: #dbf0e9 !important; 
        color: black !important; 
        border: none !important; 
        font-weight: 600; 
        border-radius: 5px !important;
        overflow: visible; /* Allow timeslots to show */
      }
      .react-datepicker__day--disabled { opacity: 0.5; cursor: not-allowed; }
      .react-datepicker__day-name { width: 92px !important; padding: 7px 0; font-size: 20px; }
      .react-datepicker__day { width: 92px !important; cursor: pointer; position: relative; }
      .react-datepicker__day-names { margin-bottom: -20px; }
      .react-datepicker__day { font-weight: 550 }
      .room-alert { background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin-top: 10px; font-size: 14px; text-align: center; }
      .custom-date-range-badge { position: absolute; top: 10px; right: 10px; background-color: #5bb3b5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .animate-spin { animation: spin 1s linear infinite; }
      
      .date-cell { position: relative; }
      .time-slots {
        position: absolute;
        top: 100%;
        left: 0;
        background: #5BB3B5;
        border: 1px solid #ccc;
        border-radius: 4px;
        z-index: 2;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        padding:10px 10px;
        font-size: 12px;
        
      }
      .time-slots> * + * {
          margin-top: 8px;
        }

      .time-slot {
          padding: 4px 8px;  
          border: 1.5px solid white;
          cursor: pointer;
          background-color: #5BB3B5;
          color: white;
          text-align: center;
          border-radius: 100px;
          transition: background-color 0.2s, color 0.2s;
      }
      .time-slot.selected {
        background-color: white;
        color: #5BB3B5;
        border: 1.5px solid white;
        font-weight: 700;
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

      @media (max-width: 1200px) {
        .react-datepicker__day { width: 76px !important; padding: 7px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__day-name { width: 76px !important; padding: 7px 0; font-size: 18px; }
      }
      @media (max-width: 600px) { 
        .react-datepicker__day, .react-datepicker__day-name { width: 65px !important; } 
      }
      @media (max-width: 520px) {
        .react-datepicker__day { width: 42px !important; padding: 4px 0; font-size: 15px; color: #797979 !important; }
        .react-datepicker__day-name { width: 42px !important; padding: 4px 0; font-size: 18px; }
        .react-datepicker__day-names { margin-bottom: -10px; }
        .react-datepicker__current-month { padding-bottom: 15px !important; margin-top: -10px !important; }
        
        .time-slot {
            padding: 4px 8px;
            width: 100%;
            border-radius: 100px;
        }
        .react-datepicker__day:nth-child(7n+1) .time-slots,
        .react-datepicker__day:nth-child(7n+2) .time-slots,
        .react-datepicker__day:nth-child(7n+3) .time-slots,
        .react-datepicker__day:nth-child(7n+4) .time-slots {
            margin-left: 0px;
            width: 190px;
        }
        .react-datepicker__day:nth-child(7n+5) .time-slots,
        .react-datepicker__day:nth-child(7n+6) .time-slots {
            margin-left: -100px;
            width: 190px;
        }

        .react-datepicker__day:nth-child(7n) .time-slots {
         margin-left: -150px;
            width: 190px;
}

      }
    `;

  const renderDayContents = (day, date) => {
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const slots = slugEvent?.timeslots;

    return (
      <div className="date-cell">
        {day}
        {isSelected && slots && slots.length > 0 && (
          <div className="time-slots" onClick={(e) => e.stopPropagation()}>
            {slots.map((slot) => {
              const isTimeSelected = selectedTimeSlot?.id === slot.id;
              return (
                <div
                  key={slot.id}
                  className={`time-slot ${isTimeSelected ? "selected" : ""}`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {`${formatTime(slot.start_time)} - ${formatTime(
                    slot.end_time
                  )}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const isProceedDisabled =
    !selectedDate ||
    !selectedTimeSlot ||
    (room.adults === 0 && room.children === 0) ||
    isBooking;

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
              <option value="Standard" selected>
                Standard
              </option>
            </select>
          </div>
          {error && <div className="room-alert mt-2">{error}</div>}
          
          {selectedTimeSlot && (
            <div className="pt-2 mt-2 pb-0 h-auto d-flex justify-content-center rounded-2" style={{background: '#DBF0E9'}}>
              <h4 className="align-self-center" style={{color: '#46c1c1ff'}}>
                Chosen Time: {formatTime(selectedTimeSlot.start_time)} - {formatTime(selectedTimeSlot.end_time)}
              </h4>
            </div>
          )}

          <div className="mt-4 flex">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithHover;