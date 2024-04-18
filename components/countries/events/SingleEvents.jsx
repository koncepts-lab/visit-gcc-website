import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa'; // Correct import statement

const ArrowIcon = () => <FaArrowRightLong />;

const SingleEvents = (props) => {
  const sendData = () => {
    const data = props.id;

    props.sendDataToParent(data); // Correct usage of sendDataToParent prop
  };

  return (
    <div onClick={sendData} className="item">
      <img src={props.image} className="w-100" alt="" />
      <div>
        <h4>{props.heading}</h4>
      </div>
    </div>
  );
};

export default SingleEvents;
