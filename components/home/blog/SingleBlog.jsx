import React from 'react'


const SingleBlog = ({value}) => {
  return (
    <div className="item">
      <div className='blog-box'>
        <img src={value.image} className='w-100' alt="" />
        <h4>{value.heading}</h4>
        <p>{value.description}</p>
      </div>
    </div>
  ) 
}

export default SingleBlog
