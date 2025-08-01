import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";

const DatePickerWithHover = ({ onClose, packageId, type = "attraction" }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [slugPackage, setSlugPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customDateRange, setCustomDateRange] = useState(false);

  // MODIFIED: Replaced room state with individual traveler counts
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);

  const [customerCountry, setCustomerCountry] = useState("UAE");
  const [packageDateRange, setPackageDateRange] = useState({
    start: null,
    end: null,
  });
  const [initialCalendarMonth, setInitialCalendarMonth] = useState(new Date());
  const [isBooking, setIsBooking] = useState(false);
  const [ticketType, setTicketType] = useState("VIP");
  const router = useRouter();

  // Fetch package data from API
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}attractions/${packageId}`
        );

        const singlePackageData = response.data.data || response.data || [];
        setSlugPackage(singlePackageData);

        if (!singlePackageData.start_date || !singlePackageData.end_date) {
          setCustomDateRange(true);
          setInitialCalendarMonth(new Date());
        } else {
          const startDate = new Date(singlePackageData.start_date);
          const endDate = new Date(singlePackageData.end_date);
          setInitialCalendarMonth(startDate);
          setPackageDateRange({ start: startDate, end: endDate });
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

  const isDateInValidRange = (date) => {
    if (customDateRange) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }

    return date >= packageDateRange.start && date <= packageDateRange.end;
  };

  // MODIFIED: Simplified increment handler for travelers
  const handleIncrement = (type) => {
    if (type === "adults") {
      if (adults < 9) {
        // Set maximum of 9 adults
        setAdults((prev) => prev + 1);
      }
    } else if (type === "children") {
      setChildren((prev) => prev + 1);
    } else if (type === "infant") {
      setInfant((prev) => prev + 1);
    }
  };

  // MODIFIED: Simplified decrement handler for travelers
  const handleDecrement = (type) => {
    if (type === "adults") {
      if (adults > 0) {
        setAdults((prev) => prev - 1);
      }
    } else if (type === "children") {
      if (children > 0) {
        setChildren((prev) => prev - 1);
      }
    } else if (type === "infant") {
      if (infant > 0) {
        setInfant((prev) => prev - 1);
      }
    }
  };

  // MODIFIED: Date change handler for single date selection
  const handleDateChange = (date) => {
    if (!isDateInValidRange(date)) return;
    setSelectedDates([date]); // Always select a single date
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

  // MODIFIED: Display for a single selected date
  const displaySelectedDateAndTime = () => {
    if (selectedDates.length === 0) return "No date selected";
    return formatDate(selectedDates[0]);
  };

  const toYyyyMmDd = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // MODIFIED: Calculate total travelers (excluding infants) from new state
  const totalTravelers = adults + children;

  // MODIFIED: Updated handleBookNow with new state and payload structure
  const handleBookNow = () => {
    if (selectedDates.length === 0) {
      setError("Please select a date to proceed.");
      return;
    }
    if (totalTravelers === 0) {
      setError(
        "Please add at least one adult or child. Infants must be accompanied."
      );
      return;
    }

    setError(null);
    setIsBooking(true);

    const bookingData = {
      start_date: toYyyyMmDd(selectedDates[0]),
      end_date: toYyyyMmDd(selectedDates[0]), // Start and end date are the same
      customer_country: customerCountry,
      ticket_type: ticketType,
      rooms: [
        {
          // Send traveler counts in a single "room" object to match API
          adults: adults,
          children: children,
          infants: infant,
        },
      ],
    };

    const authToken =
      localStorage.getItem("auth_token_login") ||
      localStorage.getItem("auth_token_register");
    if (!authToken) {
      setError("Authentication token not found. Please log in.");
      setIsBooking(false);
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
        localStorage.setItem("booking_data", JSON.stringify(bookingData));
        localStorage.setItem("data", JSON.stringify(slugPackage));
        onClose();
        router.push(`/checkout?bookingId=${encodeURIComponent(bookingId)}`);
      })
      .catch((error) => {
        console.error("Error booking package:", error);
        setError(
          error.response?.data?.message ||
            "Failed to book package. Please try again."
        );
        setIsBooking(false);
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
    `;

  const renderDayContents = (day) => {
    return <div className="date-cell">{day}</div>;
  };

  if (isLoading) return <p>Loading...</p>;
  if (error && !slugPackage) return <p>Error: {error}</p>;

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
            Data Selected: {displaySelectedDateAndTime()}
          </p>
          <style>{customStyles}</style>
          <div className="relative">
            <DatePicker
              selected={selectedDates[0]} // Show selected date
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

        <div
          className={style["date-right"]}
          style={{ paddingInline: "20px", paddingBlock: "0px" }}
        >
          {/* MODIFIED: Replaced room selection with new traveler selection UI */}
          <div className="p-2">
            <h4 className="text-xl font-semibold mb-4 text-center">
              Book A Session
            </h4>
            <div className="d-flex flex-row justify-content-around mb-3">
              {/* Adults Counter */}
              <div className="text-center">
                <p>Adult(s)</p>
                <div className="d-flex">
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
                      width: "40px",
                      textAlign: "center",
                    }}
                  >
                    {adults}
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
              {/* Children Counter */}
              <div className="text-center">
                <p>Children</p>
                <div className="d-flex">
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
                      width: "40px",
                      textAlign: "center",
                    }}
                  >
                    {children}
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
            </div>
            {/* Infant Counter */}
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <p>Infant</p>
                <div className="d-flex">
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
                      width: "40px",
                      textAlign: "center",
                    }}
                  >
                    {infant}
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
              <option value="Standard" selected>Standard</option>
            </select>
          </div>
          {error && <div className="room-alert mt-2">{error}</div>}
          <div className="mt-4 flex">
            <button
              onClick={handleBookNow}
              className="bg-blue-600 text-white rounded col-12 d-flex align-items-center justify-content-center"
              style={{
                background: "#5bb3b5",
                border: "none",
                fontSize: "20px",
                padding: "14px",
                cursor:
                  selectedDates.length === 0 ||
                  totalTravelers === 0 ||
                  isBooking
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                selectedDates.length === 0 || totalTravelers === 0 || isBooking
              }
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
