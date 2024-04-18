// components/countries/requirments/Requirments.jsx
import React from 'react';
import './requirments.css'

function Accordion({ title, content }) {
  return (
    <div className="accordin">
      <input type="checkbox" name={title} id={title} />
      <label htmlFor={title} className="accordin_title">
        {title}
      </label>
      <p className="accordin_detail">{content}</p>
    </div>
  );
}

function Requirments() {
  return (
    <div className='container'>
       <h3 className='pb-3'>Visa Requirments</h3>
      <Accordion
        title="Content Title"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis velit, esse laboriosam ipsam unde assumenda? Earum eum eos sequi quidem minima adipisci voluptate dolore fugiat quos, quam rem cupiditate."
      />
      <Accordion
        title="Content Title 2"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis velit, esse laboriosam ipsam unde assumenda? Earum eum eos sequi quidem minima adipisci voluptate dolore fugiat quos, quam rem cupiditate."
      />
      <Accordion
        title="Content Title 3"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis velit, esse laboriosam ipsam unde assumenda? Earum eum eos sequi quidem minima adipisci voluptate dolore fugiat quos, quam rem cupiditate."
      />
    </div>
  );
}

export default Requirments;
