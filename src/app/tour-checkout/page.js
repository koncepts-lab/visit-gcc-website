"use client";

import React, { useState, useEffect } from 'react';
import { Range } from 'react-range';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Link from 'next/link';
import Carousal from '../../../components/carousel/Carousal'; 
import Accordion from '../../../components/accordion/accordion';
import EventsExploreTab from '../../../components/tour-package/events-explore';
import { RiInformationLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser, FaRegClock ,FaRegHeart} from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { GoShare } from "react-icons/go";
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
            <div className={`container ${style["checkout-tour-details"]}`}>
          <div className="row pt-5">
          <div className="col-md-8">
          <h1 >Rabeh Saqer Night</h1>

                <p style={{ fontSize: '14px' }}>Things to do </p>
                <p className='fs-6'>
                  <Link href="#">
                    <span style={{ color: '#3C99DC' }} className='fs-6'> Register or Sign in</span>
                  </Link> to Visitgcc.com to manage your bookings with ease!
                </p>

                <div>
                  <h1 className='m-3 ms-0'>Personal Information</h1>
                  <form className='col-xxl-10 col-xl-12'>
                    <p className='align-items-center' style={{ color: "#5ab2b3", height: '12px' }}>
                      <FaUser size={23} className='me-3' color="#5ab2b3" style={{ marginTop: '-11px' }} />
                      Adult <span className='fs-4 fw-bold'>1</span>
                    </p>
                    <div className=''>
                      <div className='col-12'>
                      <input className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12 `} placeholder='LastName (in English)*' />  <br className='d-xl-none d-lg-block'/>
                      <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-5 col-lg-6 col-12`} placeholder='First & middle name(in English)*' /><br/>
                     
                      </div>
                      <div  className='col-12'>
                      <input className={`${style["promo_input"]} col-xl-5 col-lg-6 col-12`} placeholder='ID type' /> <br className='d-xl-none d-lg-block'/>
                      <input className={`${style["promo_input"]} ms-xxl-5 ms-xl-5 ms-md-0 col-xl-4 col-lg-6 col-12 `} placeholder='Id number*' /> 

                      </div>
                     
                      {/* Custom Gender Selection Buttons */}
                      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <button
                          type="button"
                          className={`${gender === 'male' ? 'active' : ''}`}
                          onClick={() => handleGenderChange('male')}
                          style={{
                            backgroundColor: gender === 'male' ? '#5ab2b3' : 'white',
                            color: gender === 'male' ? 'white' : '#686767',
                            padding: '5px 45px',
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
                            padding: '5px 45px',
                            border: '#e2e2e2 2px solid',
                            borderRadius: '5px'
                          }}>
                          Female
                        </button>
                      </div>

                      <h1 className='m-3 my-4 ms-0'>Contact Info</h1>
                      <div className='d-flex flex-lg-row flex-md-column flex-column justify-content-between col-12 gap-xl-5 gap-lg-3'>
                        <div className='col-xl-6 col-12' >
                          <label className=''>Contact Name</label><br />
                          <input className={`${style["promo_input"]} my-2 col-12`} placeholder='Please enter contact name *' />
                        </div>
                        <div className='col-xl-6 col-lg-8 col-md-12 col-12'>
                          <label className=''>Contact Number</label><br />
                          <select className={`${style["promo_select"]} my-2` } style={{width: '68px'}}>
                            <option>+918</option>
                          </select>
                          <input className={`${style["promo_input"]} my-2 ms-xl-3 ms-lg-1 ms-2`} style={{width: '240px'}} placeholder='Mobile Number*' />
                        </div>
                      </div>
                      <div className='my-3'>
                        <label className='pe-0 me-0'>Email Adress</label><br />
                        <input className={`${style["promo_input"]} my-2 col-12`} placeholder='All important updates will be send to this email ID*' />
                      </div>

                    </div>
                  </form>
                </div>
            </div>

            <div className={` col-md-4 ps-3 my-md-0 my-5`}>
                    <div className={style["tour-checkout-details-right"]}>
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


                  <h2 className='my-3 pt-5'>Dubai Frame</h2>
                  <h5 className='pb-4'>Entry Ticket</h5>
                  <div>
                  <p style={{fontSize: '17px' , height: '17px'}}> <MdDateRange size={21} className='me-3'/><span><b>Sun</b> ,  Feb 09</span> </p>
                  <p style={{fontSize: '17px'}}> <FaRegClock size={21} className='me-3'/><span><b>11:00</b> AM - <b>7:00</b> PM</span> </p>
                  </div>
                  <div className=' text-black-50 my-4' style={{ height: '1.5px', borderTop: '2px dashed #e2e2e2' }} />

                    <div className='pb-4  mb-5' style={{borderBottom: '2px solid #e2e2e2'}}>
                        <h5 className='pt-2 d-flex pb-2 justify-content-between'><span><b>Price</b></span><span>AED 121.00</span></h5> 
                      <p>2 Adult </p>
                      <p>1 Children</p>

                    </div>              
                    <h5 className='pt-2 d-flex pb-4 justify-content-between'><span><b>Total</b></span><span><b>AED 121.00</b></span></h5> 

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

                    <div className='my-2'>
                      <label className='text-black fw-semibold fs-4'>Promotions</label><br />
                      <label className=''>Promo code</label><br />
                      <div>
                        <input
                          className={`${style["promo_input"]} col-xl-8 col-lg-7 col-md-10`}
                          style={{ height: '35px' }}
                        />
                        <button
                          className={`${style["btn-one"]} my-lg-0 my-md-1 my-2`}
                          style={{ padding: '6px 10px' }}
                        >
                          Apply Now
                        </button>
                      </div>
                      <div className='pt-4 d-flex  flex-column'>
                        <div>
                          <label className='text-black fw-semibold fs-4'>Complete Registration In</label><br />
                        </div>
                        <div className='d-flex gap-lg-5 gap-2'>
                        <label className=' fw-normal pt-1'> &nbsp; Ticket price or availability <br className='d-lg-block d-md-none d-block' /> &nbsp; updates after promo
                        <br className='d-lg-block d-none' />  &nbsp; application</label>
                        <div className='rounded-pill align-content-center' style={{ height: '85px', width: '85px', border: '4px solid #5ab2b3' }}>
                          <h1 className='align-items-center align-self-center d-flex flex-column ms-2 my-1 text-black-50'>
                            <span style={{ fontSize: '23px' }}>
                              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>
                            <span style={{ fontSize: '12px' }}>mins</span>
                          </h1>
                        </div>
                        </div>
                      </div>
                      <div className='pt-4'>
                        <div>
                          <label className='text-black fw-semibold fs-4'>Social Sharing Incentive</label><br />
                          <label className=' fw-normal pt-1'> Share your registration on social media for<br className='d-lg-block d-none' />
                          a chance to win VIP upgrades </label>
                          <div className='d-flex gap-3 pt-2'>
                            <button className={`${style["ordinary_button"]}`}><GoShare size={21}/> Share</button>
                            <button className={`${style["ordinary_button"]}`}><FaRegHeart size={20}/> Save</button>
                          </div>
                        </div>         
                      </div>
                    </div>
               </div>
          </div>

            </div>
            </div>
              <div className="container">
                <img src="/images/blank.png" className='w-100' style={{height: '400px',borderRadius: '15px'}} alt="Banner" />
              </div>
            <div className="container">
              <div className="row">
                <div className="col-md-12 pt-5 d-flex justify-content-center" >
                  <h3>Other Packages</h3>
                </div>
              </div>
           </div>

          <div className="container-fluid">
            <div className="row pt-2 pb-5">
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
