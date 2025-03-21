import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import { RiCheckboxBlankFill } from "react-icons/ri";
import Link from 'next/link';
import { MdOutlineCancel } from "react-icons/md";


const DatePickerWithHover = ({ onClose }) => {
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState({}); // State to hold selected Price

    const [rooms, setRooms] = useState([{ id: 1, adults: 0, children: 0, infant: 0 }]);
    const [nextRoomId, setNextRoomId] = useState(2);

    const handleIncrement = (roomId, type) => {
        setRooms((prevRooms) =>
            prevRooms.map((room) => {
                if (room.id === roomId) {
                    if (room[type] < 3) {
                        return {
                            ...room,
                            [type]: room[type] + 1,
                        };
                    }
                }
                return room;
            })
        );
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
    };

    const handleAddRoom = () => {
        setRooms((prevRooms) => [
            ...prevRooms,
            { id: nextRoomId, adults: 0, children: 0 , infant: 0},
        ]);
        setNextRoomId(nextRoomId + 1);
    };

    const handleRemoveRoom = (roomId) => {
      if (rooms.length > 1) {  //Prevent deleting the last room
          setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
      }
    };

    const timeSlots = {
        '2025-03-02': [
            { time: '09:00 AM', price: '₹6,599' },
            { time: '02:00 PM', price: '₹7,299' },
            { time: '05:00 PM', price: '₹6,999' }
        ],
        '2025-03-04': [
            { time: '09:00 AM', price: '₹6,599' },
            { time: '02:00 PM', price: '₹7,299' },
            { time: '05:00 PM', price: '₹6,999' }
        ],
        '2025-03-05': [
            { time: '10:00 AM', price: '₹6,799' },
            { time: '03:00 PM', price: '₹7,099' }
        ],
        '2025-03-06': [
            { time: '09:00 AM', price: '₹6,599' },
            { time: '02:00 PM', price: '₹7,299' },
            { time: '05:00 PM', price: '₹6,999' }
        ],
        '2025-03-07': [
            { time: '10:00 AM', price: '₹6,799' },
            { time: '03:00 PM', price: '₹7,099' }
        ],
        '2025-03-08': [
            { time: '09:00 AM', price: '₹6,599' },
            { time: '02:00 PM', price: '₹7,299' },
            { time: '05:00 PM', price: '₹6,999' }
        ],
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
 
    }

       .react-datepicker__day-names {
    margin-bottom: -20px;
  }


        .react-datepicker__day {
      font-weight: 550
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
      width:65px !important;

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
      width:42px !important;
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
  `;

  const renderDayContents = (day, date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${dayOfMonth}`;
    const slots = timeSlots[dateString];
    
    // Check if this date has available time slots
    const hasTimeSlots = !!slots;
    
    // Check if date has any selected time slots
    const hasSelectedTimeSlots = selectedPrice[dateString] && selectedPrice[dateString].length > 0;

    // Apply opacity style to dates without time slots
    const dateStyle = hasTimeSlots ? {} : { opacity: 0.5, pointerEvents: 'none' };

    return (
        <div className="date-cell" style={dateStyle}>
            {day}
            {slots && (
                <div className="time-slots">
                    <div className="font-bold">Available Prices:</div>
                    {slots.map((slot, index) => {
                        const isPriceSelected = selectedPrice[dateString]?.includes(slot.price);
                        return (
                            <div key={index} className="time-slot">
                                <div className="d-flex justify-content-between">
                                    <span className="text-green-600">{slot.price}</span>
                                    <input style={{marginTop: "-10px"}}
                                        type="checkbox"
                                        checked={isPriceSelected}evenly
                                        onChange={(e) => handlePriceSelect(dateString, slot.price, e.target.checked, date)}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) {
            return 'Invalid date';
        }
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short', // Add this line
        };
        return date.toLocaleDateString(undefined, options);
    };

// Modified to do nothing when clicking on a date directly
const handleDateChange = (date) => {
    // No longer toggle selection when clicking directly on a date
    // Selection is now managed through time slot selection only
    return;
};

const filterAvailableDates = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${dayOfMonth}`;
    
    return !!timeSlots[dateString];
};

    const formatDateList = (dates) => {
        return dates.map(date => formatDate(date)).join(', ');
    };

    // Modified to handle date selection based on time slot selections
    const handlePriceSelect = (dateString, price, isChecked, date) => {
        if (isChecked) {
            // Add the price to the selected prices
            setSelectedPrice((prevPrices) => {
                const datePrices = prevPrices[dateString] || [];
                if (!datePrices.includes(price)) {
                    return {
                        ...prevPrices,
                        [dateString]: [...datePrices, price],
                    };
                }
                return prevPrices;
            });
            
            // Add date to selectedDates if not already there
            if (!selectedDates.some(d => {
                const selYear = d.getFullYear();
                const selMonth = String(d.getMonth() + 1).padStart(2, '0');
                const selDayOfMonth = String(d.getDate()).padStart(2, '0');
                return `${selYear}-${selMonth}-${selDayOfMonth}` === dateString;
            })) {
                setSelectedDates(prevDates => [...prevDates, date]);
            }
        } else {
            setSelectedPrice((prevPrices) => {
                const datePrices = prevPrices[dateString] || [];
                const updatedPrices = datePrices.filter(p => p !== price);
                
                // If no more prices selected for this date
                if (updatedPrices.length === 0) {
                    const newPrices = { ...prevPrices };
                    delete newPrices[dateString];
                    
                    // Remove date from selectedDates when no time slots are selected
                    setSelectedDates(prevDates => prevDates.filter(d => {
                        const selYear = d.getFullYear();
                        const selMonth = String(d.getMonth() + 1).padStart(2, '0');
                        const selDayOfMonth = String(d.getDate()).padStart(2, '0');
                        return `${selYear}-${selMonth}-${selDayOfMonth}` !== dateString;
                    }));
                    
                    return newPrices;
                }
                
                return {
                    ...prevPrices,
                    [dateString]: updatedPrices,
                };
            });
        }
    };

    const displaySelectedDateAndTime = () => {
        if (selectedDates.length === 0) {
            return 'No date selected';
        }

        const dateTimeMap = {};

        selectedDates.forEach(date => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const dayOfMonth = String(date.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${dayOfMonth}`;

            if (selectedPrice[dateString] && selectedPrice[dateString].length > 0) {
                dateTimeMap[dateString] = {
                    formattedDate: formatDate(date),
                    prices: selectedPrice[dateString]
                };
            } else if (!dateTimeMap[dateString]) {
                dateTimeMap[dateString] = {
                    formattedDate: formatDate(date),
                    prices: []
                };
            }
        });

        const dateElements = Object.entries(dateTimeMap).map(([dateString, data]) => {
            let displayString = data.formattedDate;

            if (data.prices.length > 0) {
                displayString += ` (${data.prices.join(', ')})`;
            }

            return <span key={dateString}>{displayString}<span style={{marginLeft: '15px'}}></span></span>;
        });

        return dateElements.length > 0 
            ? dateElements.reduce((prev, curr) => [prev, ', ', curr]) 
            : 'No date selected';
    };

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('Failed to fetch country data');
          }
          const data = await response.json();
          const countryNames = data.map((country) => country.name.common).sort();
          setCountries(countryNames);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <p>Loading countries...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }


    return (
        <div className={`bg-white ${style["date-pick-container"]}`}>

            <div className="flex justify-between items-center" style={{backgroundColor: '#fcfafb', borderRadius: '11px'}}>
              <h3 className="font-semibold">Check Price & Availability</h3>
                <button
                    onClick={onClose} className={`${style["date-close-btn"]}`}
                >
                    ×
                </button>
            </div>
            <div className={`bg-white rounded-lg shadow-xl p-lg-6 p-2 ${style["date-pick"]}`}>


                <div className={`${style["date-left"]}`}>
                    <p className='py-2 ms-2'>Departure Data Selected: {displaySelectedDateAndTime() || 'No date selected'}</p>

                    <style>{customStyles}</style>
                    <div className="relative">
                    <DatePicker
                        selected={new Date()}
                        onChange={handleDateChange}
                        inline
                        renderDayContents={renderDayContents}
                        filterDate={filterAvailableDates}
                        calendarStartDay={0}
                        highlightDates={selectedDates}
                    />
                </div>
                </div>

                <div className={style["date-right"]}>
                    <div className={` ${style["room-section"]} d-flex flex-column  justify-content-between`}>
                        <div className=''>
                            <h4 className="text-xl font-semibold">Rooms & Travellers:</h4>
                            {rooms.map((room, index) => (
                                <div
                                    key={room.id}
                                    className="d-flex flex-row justify-content-between col-12"
                                >
                                    <div className="me-xl-0 me-lg-5 me-5">
                                        <p>Room {room.id}</p>
                                    </div>
                                    <div className='d-flex flex-xl-column flex-lg-row flex-md-row flex-column'>
                                        <div className="me-xl-0 me-xl-5 me-lg-4 me-md-4 me-5">
                                            <p style={{ height: '10px' }}>Adult(s)</p>
                                            <div style={{ display: 'flex', gap: '0px' }}>
                                                <button onClick={() => handleDecrement(room.id, 'adults')} className={style["numberdecrement"]} >
                                                    -
                                                </button>
                                                <span
                                                    style={{
                                                        padding: '1px 10px',
                                                        fontSize: '20px',
                                                        border: '1px solid',
                                                    }}
                                                >
                                                    {room.adults}
                                                </span>
                                                <button onClick={() => handleIncrement(room.id, 'adults')} className={style["numberincrement"]}>
                                                    +
                                                </button>
                                            </div>
                                            <p className="date_right_para">(12+ years)</p>
                                        </div>

                                        <div>
                                            <p style={{ height: '10px' }}>Infant</p>
                                            <div style={{ display: 'flex', gap: '0px' }}>
                                                <button onClick={() => handleDecrement(room.id, 'infant')} className={style["numberdecrement"]} >
                                                    -
                                                </button>
                                                <span
                                                    style={{
                                                        padding: '1px 10px',
                                                        fontSize: '20px',
                                                        border: '1px solid',
                                                    }}
                                                >
                                                    {room.infant}
                                                </span>
                                                <button onClick={() => handleIncrement(room.id, 'infant')} className={style["numberincrement"]}>
                                                    +
                                                </button>
                                            </div>
                                            <p className="date_right_para">(Below 2 years)</p>
                                        </div>

                                    </div>
                                    <div>
                                        <p style={{ height: '10px' }}>Children</p>
                                        <div style={{ display: 'flex', gap: '0px' }}>
                                            <button onClick={() => handleDecrement(room.id, 'children')} className={style["numberdecrement"]} >
                                                -
                                            </button>
                                            <span
                                                style={{
                                                    padding: '1px 10px',
                                                    fontSize: '20px',
                                                    border: '1px solid',
                                                }}
                                            >
                                                {room.children}
                                            </span>
                                            <button onClick={() => handleIncrement(room.id, 'children')} className={style["numberincrement"]}>
                                                +
                                            </button>
                                        </div>
                                        <p className="date_right_para">(Below 12 years)</p>
                                    </div>
                                    {index > 0 && (
                                        <MdOutlineCancel className=' ms-3' size={20} color="red"
                                            style={{ cursor: 'pointer',  }}
                                            onClick={() => handleRemoveRoom(room.id)}
                                        />
                                     
                                    )}
                                    <br />
                                </div>
                            ))}
                            <button
                                className="bg-white col-12"
                                style={{ border: 'none', color: '#3C99DC' }}
                                onClick={handleAddRoom}
                            >
                                + Add another room
                            </button>

                        </div>

                        <div className='my-md-4 my-1 pe-2'>
                            <label className='text-black'>Customer Country*</label><br />
                            <select
                                className={`form-select ${style['form-control']} col-xl-11 col-lg-12 col-12 fw-semibold my-1`}
                                style={{ maxHeight: '200px', overflowY: 'auto' }} 
                                >
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                    {country}
                                    </option>
                                ))}
                             </select>
                        </div>

                    </div>
                    <div className="mt-4 flex ">
                        <Link href="/checkout">
                            <button
                                onClick={() => {
                                    // Handle booking logic here
                                    onClose();
                                }}
                                className="bg-blue-600 text-white rounded col-12 " style={{ background: '#5bb3b5', border: 'none', fontSize: '20px', padding: "14px" }}
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