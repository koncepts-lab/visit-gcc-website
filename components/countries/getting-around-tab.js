"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';
import { FaBusAlt } from "react-icons/fa";
import { IoMdBoat } from "react-icons/io";
import { MdAirplanemodeActive } from "react-icons/md";
import { FaTrainSubway } from "react-icons/fa6";
import MapEmbed from './map-embed';
import { LuArrowRightCircle } from "react-icons/lu";

const GettingAroundTab = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);

    return (
        <section className={style.innerpage}>
            <div className={`container ${style['light-bg']}`}>
                <div className="row pb-2">
                    <div className={`pr-0 ${style['country-container-box']}`}>
                        <div className={style['country-container']}>
                            <div className="row">
                                <div className="col-md-4">
                                    <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link active border-0 ${style['around-nav-link']} ${style['active-tab']}`}
                                                id="tour-tab-unique"
                                                data-bs-toggle="tab"
                                                data-bs-target="#tour-unique"
                                                type="button"
                                                role="tab"
                                                aria-controls="tour-unique"
                                                aria-selected="true"
                                            >
                                                <FaBusAlt />
                                            </button>
                                        </li>
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['around-nav-link']}`}
                                                id="passport-tab-unique"
                                                data-bs-toggle="tab"
                                                data-bs-target="#passport-unique"
                                                type="button"
                                                role="tab"
                                                aria-controls="passport-unique"
                                                aria-selected="false"
                                            ><FaTrainSubway />

                                            </button>
                                        </li>
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['around-nav-link']}`}
                                                id="other-tab-unique"
                                                data-bs-toggle="tab"
                                                data-bs-target="#other-unique"
                                                type="button"
                                                role="tab"
                                                aria-controls="other-unique"
                                                aria-selected="false"
                                            >
                                                <MdAirplanemodeActive />
                                            </button>
                                        </li>
                                        <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                            <button
                                                className={`nav-link border-0 ${style['around-nav-link']}`}
                                                id="other-tab-unique"
                                                data-bs-toggle="tab"
                                                data-bs-target="#other-unique"
                                                type="button"
                                                role="tab"
                                                aria-controls="other-unique"
                                                aria-selected="false"
                                            >
                                                <IoMdBoat />
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-8">
                                    <div className='row'>
                                        <div className='col-md-6 pb-3 mpt-15'>
                                            <label>From where in Behrain?</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Place</option>
                                                <option>Place</option>
                                            </select>
                                        </div>
                                        <div className='col-md-6 pb-3'>
                                            <label>To where in behrain?</label>
                                            <select className='form-control'>
                                                <option>Select</option>
                                                <option>Place</option>
                                                <option>Place</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-md-12">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="tour-unique"
                                        role="tabpanel"
                                        aria-labelledby="tour-tab-unique"
                                    >
                                        <div className={style['getting-around']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <MapEmbed />

                                                        <div className='table-responsive pt-3'>

                                                            <table className={`table ${style['country-table']}`}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Departs</th>
                                                                        <th></th>
                                                                        <th>Arriving</th>

                                                                        <th>Departs</th>
                                                                        <th></th>
                                                                        <th>Arriving</th>

                                                                        <th>Departs</th>
                                                                        <th></th>
                                                                        <th>Arriving</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr className='border'>
                                                                        <td colspan="9">
                                                                            <p className='py-0'>Next Available</p>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className='border'>
                                                                        <td className={style['bg-1']}>

                                                                            <p>01:00 PM</p>




                                                                        </td>
                                                                        <td className={style['bg-1']}><LuArrowRightCircle /></td>
                                                                        <td className={style['bg-1']}>
                                                                            <div><p>01:00 PM</p></div></td>

                                                                        <td>
                                                                            <p>01:00 PM</p></td>
                                                                        <td><LuArrowRightCircle /></td>
                                                                        <td>
                                                                            <p>01:00 PM</p></td>

                                                                        <td className={style['bg-1']}>
                                                                            <p>01:00 PM</p></td>
                                                                        <td className={style['bg-1']}><LuArrowRightCircle /></td>
                                                                        <td className={style['bg-1']}>
                                                                            <p>01:00 PM</p></td>


                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="passport-unique"
                                        role="tabpanel"
                                        aria-labelledby="passport-tab-unique"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <p>Dummy Text</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="other-unique"
                                        role="tabpanel"
                                        aria-labelledby="other-tab-unique"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <p>Dummy Text</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GettingAroundTab;
