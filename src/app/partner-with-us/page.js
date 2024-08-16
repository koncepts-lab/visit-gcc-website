import React from 'react'
import style from './style.module.css';
import Banner from '../../../components/banner/banner'


function page() {
    return (
        <>
            <Banner /> 
            <section className={style['partner-with-us']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className={style['btn-first-section']}>
                                <div>
                                    <h3>Grow Your Business by Partnering with Our Brand.</h3>
                                    <button className={style['btn-one']}>Partner with Us</button>
                                    <button className={style['btn-two']}>Why Partner with Us?</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <img src="../images/partner-with-us.jpg" alt="Bahrain" />
                        </div>
                    </div>


                    <div className={`row ${style['pt-50']}`}>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Global Reach</h4>
                                <p>Tap into a worldwide network of travelers eager to explore the GCC region.</p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Customer-Focused Service</h4>
                                <p>Our services are designed to meet and exceed the needs of every traveler.</p>
                            </div>
                        </div>
                    </div>

                    <div className={`row ${style['pdt-4']}`}>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Marketing Advantage</h4>
                                <p>Leverage our robust marketing campaigns to boost your visibility and attract more customers.</p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Customer-First Philosophy</h4>
                                <p>Our priority is to understand and surpass customer expectations.</p>
                            </div>
                        </div>
                    </div>

                    <div className={`row ${style['pdt-4']}`}>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Broad Exposure</h4>
                                <p>Access a vast audience of global travelers and local adventurers.</p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className={style['pwu-box']}>
                                <h4>Tailored Services</h4>
                                <p>We customize our services to delight your customers and enhance their experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={style['partner-with-us-form']}>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <h3>Contact Us</h3>
                                        <p>Which best describes your activity?</p>
                                    </div>
                                    <hr />
                                    <div className='col-md-12 pb-2'><h3>Apply Now</h3></div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'><input type='text' placeholder='First name'></input></div>
                                    <div className='col-md-6'><input type='text' placeholder='Last name'></input></div>
                                    <div className='col-md-6'><input type='text' placeholder='Phone number'></input></div>
                                    <div className='col-md-6'><input type='text' placeholder='Email address'></input></div>
                                    <div className='col-md-6'><input type='text' placeholder='Location'></input></div>
                                    <div className='col-md-6'><input type='text' placeholder='Website or Social media Link'></input></div>
                                    <div className='col-md-12'><textarea placeholder='Company Description'></textarea></div>
                                    <div className='col-md-12 mb-3'><button className={style['btn-one']}>Submit Now</button></div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default page
