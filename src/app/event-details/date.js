import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";

const DatePickerWithHover = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data - add more dates as needed
  const timeSlots = {
    '2025-02-10': [
      { time: '09:00 AM', price: '₹6,599' },
      { time: '02:00 PM', price: '₹7,299' },
      { time: '05:00 PM', price: '₹6,999' }
    ],
    '2025-02-11': [
      { time: '10:00 AM', price: '₹6,799' },
      { time: '03:00 PM', price: '₹7,099' }
    ]
  };

  // Custom CSS for the hover effect
  const customStyles = `
    .date-cell {
      position: relative;
      cursor: pointer;
    }

    .date-cell:hover .time-slots {
      display: block;
    }

    .time-slots {
      display: none;
      position: absolute;
      left: 100%;
      top: -10px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px;
      width: 200px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      z-index: 1000;
    }

    .time-slot {
      padding: 4px 8px;
      border-bottom: 1px solid #eee;
    }

    .time-slot:last-child {
      border-bottom: none;
    }

    .react-datepicker__day:hover {
      background-color: #f0f9ff;
    }

    .react-datepicker__day--selected {
      background-color: #3b82f6 !important;
      color: white !important;
    }
  `;

  const renderDayContents = (day, date) => {
    const dateString = date.toISOString().split('T')[0];
    const slots = timeSlots[dateString];

    return (
      <div className="date-cell">
        {day}
        {slots && (
          <div className="time-slots">
            <div className="font-bold mb-2">Available Times:</div>
            {slots.map((slot, index) => (
              <div key={index} className="time-slot">
                <div className="flex justify-between">
                  <span>{slot.time}</span>
                  <span className="text-green-600">{slot.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white ${style["date-pick-container"]}`}>

    <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Check Price & Availability</h3>
        <button 
          onClick={onClose} className={`text-2xl text-gray-500 hover:text-gray-700 ${style["date-close-btn"]}`}
        >
          ×
        </button>
      </div>



    <div className={`bg-white rounded-lg shadow-xl p-6 ${style["date-pick"]}`}>


    <div className={style["date-left"]}>
      <style>{customStyles}</style>
      
      

      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={setSelectedDate}
          inline
          renderDayContents={renderDayContents}
          calendarStartDay={0}
        />
      </div>

      
      </div>


      <div className={style["date-right"]}>
      <h3 className="text-xl font-semibold">&nbsp;</h3>
      <h4 className="text-xl font-semibold">Book a session:</h4>
      <h3 className="text-xl font-semibold">Ticket Type</h3>
      <p>Available Ticket: 40</p>
      <p>Chosen Time: 6:00 PM 8:00 PM</p>


      <div className="mt-4 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Handle booking logic here
            onClose();
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        Proceed
        </button>
      </div>


      
      </div>
      </div>




    </div>
  );
};

export default DatePickerWithHover;