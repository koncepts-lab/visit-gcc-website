import React from 'react';

function SinglePackageCategory(props) {
    
  return (
    <>
      <a className="item" href='#0'>
        <div className='event-box'>
          <img src={props.image} className='w-100' alt="" />
          <h4>{props.heading}</h4>
        </div>
      </a>
    </>
  );
}

export default SinglePackageCategory;
