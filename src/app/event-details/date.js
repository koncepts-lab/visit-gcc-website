import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import style from "./style.module.css";
import { RiCheckboxBlankFill } from "react-icons/ri";
import Link from 'next/link';
import { MdOutlineCancel } from "react-icons/md";

const DatePickerWithHover = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [number, setNumber] = useState(0);

  const [rooms, setRooms] = useState([{ id: 1, adults: 1, children: 0, infant: 0 }]);
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
        { id: nextRoomId, adults: 0, children: 0 },
    ]);
    setNextRoomId(nextRoomId + 1);
};

const handleRemoveRoom = (roomId) => {
  if (rooms.length > 1) {  //Prevent deleting the last room
      setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
  }
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
                                    <div className='d-flex flex-column'>
                                        <div className="me-xl-0 me-lg-5 me-5">
                                            <p style={{ height: '10px' }}>Adult(s)</p>
                                            <div style={{ display: 'flex', gap: '0px' }}>
                                                <button onClick={() => handleDecrement(room.id, 'adults')} className={style["numberdecrement"]} >
                                                    -
                                                </button>
                                                <span
                                                    style={{
                                                        padding: '5px 10px',
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
                                                        padding: '5px 10px',
                                                        fontSize: '20px',
                                                        border: '1px solid',
                                                    }}
                                                >
                                                    {room.children}
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
                                                    padding: '5px 10px',
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
                            <select className='col-xl-11 col-lg-12 col-12 fw-semibold my-1' style={{ height: '35px' }}>
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
                                className="py-3 bg-blue-600 text-white rounded col-12 " style={{ background: '#5bb3b5', border: 'none', fontSize: '20px' }}
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
