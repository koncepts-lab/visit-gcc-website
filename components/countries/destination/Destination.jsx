'use client'
import React, { useState } from 'react';
import './destination.css';
import Link from 'next/link';

function Destination() {
  const [destinationContent, setDestinationContent] = useState("manama");

  const handleLinkClick = (content) => {
    setDestinationContent(content);
  };

  return (
    <div className='destination'>
      <div className='container'>
        <h3>Popular Destination</h3>
        <div className='col-md-12'>
        <div className='link'>
            <h4 className={destinationContent === 'manama' ? 'active' : ''} onClick={() => handleLinkClick('manama')}>Manama</h4>
            <h4 className={destinationContent === 'marassi' ? 'active' : ''} onClick={() => handleLinkClick('marassi')}>Marassi Beach</h4>
            <h4 className={destinationContent === 'reef' ? 'active' : ''} onClick={() => handleLinkClick('reef')}>Reef Island</h4>
            <h4 className={destinationContent === 'muharraq' ? 'active' : ''} onClick={() => handleLinkClick('muharraq')}>Al Muharraq</h4>
            <h4 className={destinationContent === 'arad' ? 'active' : ''} onClick={() => handleLinkClick('arad')}>Arad Fort</h4>
          </div>
        </div>
        <div className='container destination-des'>
          {destinationContent === 'manama' && (
            <div className='row'>
              <div className='col-md-6'>
                <img src='./images/manama.jpg' alt='Manama'/>
              </div>
              <div className='col-md-6'>
                <h3>Manama</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
              </div>
            </div>
          )}
          {destinationContent === 'marassi' && (
            <div className='row'>
              <div className='col-md-6'>
                <img src='./images/marassi beach.jpg' alt='Marassi Beach'/>
              </div>
              <div className='col-md-6'>
                <h3>Marassi Beach</h3>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
 
              </div>
            </div>
          )}
          {destinationContent === 'reef' && (
            <div className='row'>
              <div className='col-md-6'>
                <img src='./images/reefisland.jpg' alt='Reef Island'/>
              </div>
              <div className='col-md-6'>
                <h3>Reef Island</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
 
              </div>
            </div>
          )}
            {destinationContent === 'muharraq' && (
            <div className='row'>
              <div className='col-md-6'>
                <img src='./images/almuraq.jpg' alt='Reef Island'/>
              </div>
              <div className='col-md-6'>
                <h3>Al Muharraq</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
 
              </div>
            </div>
          )}

          {destinationContent === 'arad' && (
            <div className='row'>
              <div className='col-md-6'>
                <img src='./images/ad fort.jpg' alt='Reef Island'/>
              </div>
              <div className='col-md-6'>
                <h3>Arad Fort</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid aspernatur dolore autem quasi, minima, quod ut quam consequuntur optio dolorum praesentium tempore magnam nostrum voluptate, temporibus vitae dolorem ducimus?</p>
 
              </div>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}

export default Destination;
