import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import { RiCheckboxBlankFill } from "react-icons/ri";
import Link from 'next/link';


const DatePickerWithHover = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [number, setNumber] = useState(0);

  const handleIncrement = () => {
    setNumber(number + 1);
  };

  const handleDecrement = () => {
    setNumber(number - 1);
  };

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
        border: none;
    }

    .react-datepicker__day--selected {
  color: white !important;
    background-color: blue !important;
  border: none;
    }

    .react-datepicker__day--selected:hover,
.react-datepicker__day--in-selecting-range:hover,
.react-datepicker__day--in-range:hover,
.react-datepicker__month-text--selected:hover,
.react-datepicker__month-text--in-selecting-range:hover,
.react-datepicker__month-text--in-range:hover,
.react-datepicker__quarter-text--selected:hover,
.react-datepicker__quarter-text--in-selecting-range:hover,
.react-datepicker__quarter-text--in-range:hover,
.react-datepicker__year-text--selected:hover,
.react-datepicker__year-text--in-selecting-range:hover,
.react-datepicker__year-text--in-range:hover {
  border: none;
  border-radius: 0px;
  background-color: blue !important;
  color: white !important;
}

   @media (max-width: 1200px) {
 .react-datepicker__day {
    width: 70px !important;
    padding: 7px 0;
    font-size: 15px;
    color: #797979 !important;    }

  }
    .react-datepicker__day-name {
    width: 70px !important;
    padding: 10px 0;
    font-size: 20px;
}
     .react-datepicker__day-names {
 margin-bottom: -20px
}

   @media (max-width: 520px) {
 .react-datepicker__day {
    width: 30px !important;
    padding: 4px 0;
    font-size: 15px;
    color: #797979 !important;    }

  }
    .react-datepicker__day-name {
    width: 30px !important;
    padding: 4px 0;
    font-size: 18px;
}
     .react-datepicker__day-names {
 margin-bottom: -25px
}
 .react-datepicker__current-month {
    padding-bottom: 5px !important;
    margin-top: -10px !important
}


.time-slots {
  left: 10%;
}

.time-slot {
  padding: 4px 8px;
  border-bottom: 1px solid #eee;
}
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

  // Function to format the selected date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className={`bg-white ${style["date-pick-container"]}`}>

    <div className="flex justify-between items-center">
        <h3 className="font-semibold">Check Price & Availability</h3>
        <button 
          onClick={onClose} className={`${style["date-close-btn"]}`}
        >
          ×
        </button>
      </div>
    <div className={`bg-white rounded-lg shadow-xl p-lg-6 p-2 ${style["date-pick"]}`}>

      <div className={style["date-right"]}>
        <div className='d-flex flex-column overflow-auto justify-content-between'>
          <div className=''>
        <h4 className="text-xl font-semibold">Rooms & Travellers:</h4>
    <div className='d-flex flex-row justify-content-between col-12'>
      <div className='me-xl-0 me-lg-5 me-5'>
        <p>Room 1</p>
      </div>
      <div className='me-xl-0 me-lg-5 me-5'>
        <p style={{height: '10px'}}> Adult(s)</p>
        <div style={{ display: 'flex',  gap: '0px' }}>
      <button onClick={handleDecrement} className={style["numberdecrement"]}>
        -
      </button>
      <span style={{ padding: '5px 10px', fontSize: '20px', border: '1px solid'  }}>{number}</span>
      <button onClick={handleIncrement}  className={style["numberincrement"]}>
        +
      </button>
    </div>
    <p className={`${style["date_right_para"]}`}>(12+ years)</p>
      </div>
      <div >
        <p style={{height: '10px'}}>children</p>
        <div style={{ display: 'flex', gap: '0px' }}>
      <button onClick={handleDecrement} className={style["numberdecrement"]}>
        -
      </button>
      <span style={{ padding: '5px 10px', fontSize: '20px', border: '1px solid'  }}>{number}</span>
      <button onClick={handleIncrement}  className={style["numberincrement"]}>
        +
      </button>
    </div>
    <p className={`${style["date_right_para"]}`}>(Below 12 years)</p>

      </div>
    </div>
    <button className='bg-white col-12 ' style={{border: 'none', color: '#3C99DC'}}>+ Add another room</button>
    </div>
    <div className='my-md-4 my-1'>
      <label className='text-black fw-semibold'>Customer State*</label><br/>
      <select className='col-11 fw-semibold' style={{height: '35px'}}>
        <option>New Delhi</option>
        <option>Delhi</option>
        <option>Chennai</option>
        <option>Coimbatore</option>
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
          className="py-3 bg-blue-600 text-white rounded col-12 " style={{background: '#5bb3b5', border: 'none', fontSize: '20px'}}
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
