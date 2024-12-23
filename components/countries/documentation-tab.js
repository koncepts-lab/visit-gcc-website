"use client";
import React, { useEffect } from 'react';
import style from './style.module.css';

const DocumentationTabs = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []); 

    return (
        <section className={style.innerpage}>
            <div className={`container ${style['light-bg']}`}>
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className={`pr-0 ${style['country-container-box']}`}>
                            <div className={style['country-container']}>
                                <ul className={`nav nav-tabs border-0 ${style['country-nav-tabs']}`} id="myTab" role="tablist">
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link active border-0 ${style['country-nav-link']} ${style['active-tab']}`}
                                            id="tour-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#tour"
                                            type="button"
                                            role="tab"
                                            aria-controls="tour"
                                            aria-selected="true"
                                        >
                                        Emergency Numbers
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="passport-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#passport"
                                            type="button"
                                            role="tab"
                                            aria-controls="passport"
                                            aria-selected="false"
                                        >
                                        Transportation Services
                                        </button>
                                    </li>
                                    <li className={`nav-item ${style['country-nav-item']}`} role="presentation">
                                        <button
                                            className={`nav-link border-0 ${style['country-nav-link']}`}
                                            id="other-tab"
                                            data-bs-toggle="tab"
                                            data-bs-target="#other"
                                            type="button"
                                            role="tab"
                                            aria-controls="other"
                                            aria-selected="false"
                                        >
                                        Visa Information & Processing Centers
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="tour"
                                        role="tabpanel"
                                        aria-labelledby="tour-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4 className='pb-2'>Important Contact Numbers</h4>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/01.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>Police</p>
                                                                <p>999</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/02.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>Ambulance</p>
                                                                <p>998</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/03.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>Fire Department</p>
                                                                <p>997</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/04.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>Tourism Call Centre</p>
                                                                <p>800 555</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/05.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>International Tourism Call Centre</p>
                                                                <p>+971 4 555 5555</p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className={style['important_numbers']}>
                                                            <span><img src="../images/icons/06.png" alt="Bahrain" className='img-center' /></span>
                                                            <span>
                                                                <p>Road Assistance</p>
                                                                <p>800 4330<br /><small>(Dubai Roads and Transport Authority)</small></p>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="passport"
                                        role="tabpanel"
                                        aria-labelledby="passport-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Getting started</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    {['Confirm your email', 'Install boardme', 'Complete your profile', 'Create your first guide', 'Check out the documentation'].map((text, index) => (
                                                        <div key={index} className={`col-md-4 ${style['check-cotainer']}`}>
                                                            <div className={`form-check ${style['rounded-checkbox']}`}>
                                                                <input type="checkbox" className="form-check-input" id={`passportCheck${index}`} />
                                                                <label className="form-check-label" htmlFor={`passportCheck${index}`}>{text}</label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="other"
                                        role="tabpanel"
                                        aria-labelledby="other-tab"
                                    >
                                        <div className={style['documentation-container']}>
                                            <div className='container'>
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <h4>Getting started</h4>
                                                        <p>Here’s how you get the most out of boardme.</p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    {['Confirm your email', 'Install boardme', 'Complete your profile', 'Create your first guide', 'Check out the documentation'].map((text, index) => (
                                                        <div key={index} className={`col-md-4 ${style['check-cotainer']}`}>
                                                            <div className={`form-check ${style['rounded-checkbox']}`}>
                                                                <input type="checkbox" className="form-check-input" id={`otherCheck${index}`} />
                                                                <label className="form-check-label" htmlFor={`otherCheck${index}`}>{text}</label>
                                                            </div>
                                                        </div>
                                                    ))}
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

export default DocumentationTabs;
