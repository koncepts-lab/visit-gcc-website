"use client";  // Ensure this is at the top of the file

import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';  // Import Calendar styles
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Link from 'next/link';
import Carousal from '../../../components/carousel/Carousal'; 
import Accordion from '../../../components/accordion/accordion';
import EventsExploreTab from '../../../components/tour-package/events-explore';
import { RiInformationLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";



const Checkout = () => {
        const [isOpen, setIsOpen] = useState(false); 
        const initialTime = 720; 
        const [timeLeft, setTimeLeft] = useState(initialTime); 
        const [gender, setGender] = useState('');

        const handleGenderChange = (value) => {
            setGender(value);
        };
      
        useEffect(() => {
          const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
              if (prevTime <= 0) {
                clearInterval(interval); 
                return 0;
              }
              return prevTime - 1; 
            });
          }, 1000); // 1000 ms = 1 second
      
          return () => clearInterval(interval);
        }, []);
      
        // Format time to "mins:sec"
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
      
      
        const toggleAccordion = () => {
          setIsOpen(!isOpen); 
        };


  const pakageDetailsOtherPackages = [
    {
      id: 1,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/01.jpg",
    },
    {
      id: 2,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/02.jpg",
    },
    {
      id: 3,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/03.jpg",
    },
    {
      id: 4,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/04.jpg",
    },
    {
      id: 5,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/05.jpg",
    },
    {
      id: 6,
      heading: "Project Heading",
      description: "Industry Name",
      image: "/images/other-packages/06.jpg",
    },
  ];


  return (
    <div>
      <Banner />
        <div>
            <div className="">
            <div className={`container ${style["checkout-package-details"]}`}>
          <div className="row pt-5">
          <div className="col-md-8">
                <h3 className='d-flex justify-content-between'>
                  4 DAYS IN SALALAH
                  <button className='rounded-2 fw-semibold fs-6 py-2 px-2 bg-white' style={{ border: '4px solid #5ab2b3', color: '#5ab2b3' }}>
                    Customizable
                  </button>
                </h3>
                <p style={{ fontSize: '14px' }}>Discover the Coastal Charms of Oman </p>
                <p className='fs-6'>
                  <Link href="#">
                    <span style={{ color: '#3C99DC' }} className='fs-6'> Register or Sign in</span>
                  </Link> to Visitgcc.com to manage your bookings with ease!
                </p>

                <div>
                  <h1 className='m-3 ms-0'>Traveller Info</h1>
                  <form className='col-xxl-10 col-xl-12'>
                    <p className='align-items-center' style={{ color: "#5ab2b3", height: '12px' }}>
                      <FaUser size={23} className='me-3' color="#5ab2b3" style={{ marginTop: '-11px' }} />
                      Traveller <span className='fs-4 fw-bold'>1</span>
                    </p>
                    <div className=''>
                      <input className={`${style["promo_input"]} `} placeholder='LastName (in English)*' />
                      <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0`} placeholder='First & middle name(in English)*' />
                      <input className={`${style["promo_input"]}`} placeholder='ID type' />
                      <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 `} placeholder='Id number*' /> <br />

                      {/* Custom Gender Selection Buttons */}
                      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <button
                          type="button"
                          className={`${gender === 'male' ? 'active' : ''}`}
                          onClick={() => handleGenderChange('male')}
                          style={{
                            backgroundColor: gender === 'male' ? '#5ab2b3' : 'white',
                            color: gender === 'male' ? 'white' : '#686767',
                            padding: '5px 50px',
                            border: '#e2e2e2 2px solid',
                            borderRadius: '5px'
                          }}>
                          Male
                        </button>
                        <button
                          type="button"
                          className={`promo_input ${gender === 'female' ? 'active' : ''} ms-md-3 ms-2 `}
                          onClick={() => handleGenderChange('female')}
                          style={{
                            backgroundColor: gender === 'female' ? '#5ab2b3' : 'white',
                            color: gender === 'female' ? 'white' : '#686767',
                            padding: '5px 48px',
                            border: '#e2e2e2 2px solid',
                            borderRadius: '5px'
                          }}>
                          Female
                        </button>
                      </div>

                      <div className='d-flex flex-md-row flex-column justify-content-between'>
                        <p className='align-items-center d-flex' style={{ color: "#5ab2b3" }}>
                          <FaUser size={23} className='me-3' color="#5ab2b3" />
                          <span className='d-flex flex-column'>
                            <span style={{ fontSize: '11px' }}>Traveller 2</span>
                            <span>Add Traveller </span>
                          </span>
                          <FaPlus size={23} className='ms-lg-2 ms-md-2 ms-0 ' color="#5ab2b3" style={{ marginTop: '6px' }} />
                        </p>
                        <label className='my-3'>*Adult-Should be Above 18 Years</label>
                      </div>

                      {/* single line */}
                      <div className='col-12 text' style={{ height: '1.5px', background: '#e2e2e2' }} />

                      <h1 className='m-3 ms-0'>Additional Info</h1>
                      <label className=''>pickup point</label><br />
                      <select className={`${style["promo_select"]} col-8`}>
                        <option>Please select pick-up point*</option>
                      </select>

                      <h1 className='m-3 ms-0'>Contact Info</h1>
                      <div className='d-flex flex-lg-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-2'>
                        <div>
                          <label className=''>Contact Name</label><br />
                          <input className={`${style["promo_input"]} my-2`} placeholder='Please enter contact name *' />
                        </div>
                        <div className='col-6'>
                          <label className=''>Contact Number</label><br />
                          <select className={`${style["promo_select"]} my-2` } style={{width: '68px'}}>
                            <option>+918</option>
                          </select>
                          <input className={`${style["promo_input"]} my-2 ms-xl-4 ms-lg-0`} style={{width: '240px'}} placeholder='Mobile Number*' />
                        </div>
                      </div>
                      <div className='my-3'>
                        <label className='pe-0 me-0'>Email Adress</label><br />
                        <input className={`${style["promo_input"]} my-2 col-12`} placeholder='All important updates will be send to this email ID*' />
                      </div>

                      <h1 className='m-3 ms-0'>Special Requests</h1>
                        <label className='pe-0 me-0'>Special Requests</label><br />
                        <textarea className={`${style["promo_input"]} my-2 col-12`} placeholder='Please enter Special Requests' />

                      <h1 className='m-3 ms-0'>Package Add-Ons</h1>
                        <label className='pe-0 me-0'>Travel + Medical Insurace</label><br />
                        <input className={`${style["promo_input"]} my-2 col-12`} placeholder='Please enter ' />
                    </div>
                  </form>
                </div>
            </div>

            <div className="col-md-4 my-md-0 my-5">
                    <div className={style["flex-checkout-details-right"]}>
                      <div className='d-flex flex-column'>
                        <p style={{ fontSize: '10px', height: '7px' }}>Starting From</p>
                        <p className="fs-5 fw-semibold" style={{ marginTop: '-8px', minWidth: '86px', marginRight: '-5px' }}>
                          ₹6,599
                          <RiInformationLine color="#3C99DC" style={{ marginTop: '-8px' }} size={13} />
                          <p className='fw-medium'>
                            <del>₹28,599</del>
                          </p>
                        </p>
                      </div>
                      <div className='d-flex flex-lg-row flex-md-column flex-row ms-lg-0 ms-3'>
                        <span>
                          <button className={style["btn-one"]}>Pay Now</button>
                        </span>
                        <span>
                          <button className={style["btn-two"]}>Contact Seller</button>
                          <p className="col-xl-9 col-12" style={{ fontSize: '9px' }}>
                            You can now directly communicate with the Seller of this package
                          </p>
                        </span>
                      </div>
                    </div>
                    <p className="col-lg-12 col-xl-11 col-12">
                      By proceeding, I acknowledge that I have read and agree to visitgcc.com's Terms & Conditions and Privacy Statement.
                    </p>
                    <button
                      className='bg-white col-11 d-flex justify-content-between'
                      style={{ border: 'none', color: '#3C99DC' }}
                      onClick={toggleAccordion}
                    >
                      <span>Cancellation & <br className='d-lg-none d-md-block d-none' /> Date Change </span>
                      <IoIosArrowDown
                        color='grey'
                        size={22}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow when the accordion is open
                          transition: 'transform 0.3s ease', // Smooth transition for the arrow rotation
                        }}
                      />
                    </button>

                    <div className='my-4'>
                      <label className='text-black fw-semibold fs-4'>Promotion</label><br />
                      <label className=''>Promo code</label><br />
                      <div>
                        <input
                          className={`${style["promo_input"]} col-xl-8 col-lg-7 col-md-10`}
                          style={{ height: '35px' }}
                        />
                        <button
                          className={`${style["btn-one"]} my-lg-0 my-md-1`}
                          style={{ padding: '6px 10px' }}
                        >
                          Apply Now
                        </button>
                      </div>
                      <div className='pt-4 d-flex flex-xl-row flex-lg-column flex-column'>
                        <div>
                          <label className='text-black fw-semibold fs-4'>Complete Booking In</label><br />
                          <p>The package price will refresh<br className='d-lg-block d-none' /> After</p>
                        </div>
                        <div
                          className='rounded-pill align-content-center'
                          style={{ height: '85px', width: '85px', border: '4px solid #abd7d8' }}
                        >
                          <h1 className='align-items-center align-self-center d-flex flex-column ms-2 my-1'>
                            <span style={{ fontSize: '20px' }}>
                              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                            <span style={{ fontSize: '12px' }}>mins</span>
                          </h1>
                        </div>
                      </div>
                    </div>
               </div>
          </div>

            </div>
            </div>
              <div className="container">
                <img src="/images/blank.png" className='w-100 h-25' alt="Banner" />
              </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Other Packages</h3>
                </div>
              </div>
           </div>

          <div className="container-fluid">
            <div className="row pt-2">
              <div className="col-md-12">
                <Carousal
                  pakageDetailsOtherPackages={pakageDetailsOtherPackages}
                  count={5}
                  type="pakage-details-other-packages"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Checkout;
