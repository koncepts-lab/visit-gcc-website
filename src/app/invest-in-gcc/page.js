import React from 'react'
import style from './style.module.css';
import Banner from '../../../components/banner/banner'


function page() {
    return (
        <>
            <Banner />
            <section className={style['invest-in-gcc']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3>Invest in the GCC: Diversifying Powerhouse Awaits</h3>
                            <p>The Gulf Cooperation Council (GCC), a consortium of six nations — Bahrain, Kuwait, Oman, Qatar, Saudi Arabia, and the United Arab Emirates - offers exciting opportunities for foreign investors. Traditionally reliant on oil and gas, the GCC is strategically shifting its focus towards economic diversification, presenting a dynamic and promising investment landscape.</p>
                            <h3 className={style['pt-25']}>Member Countries</h3>
                            <p>Understand the GCC region and its member states</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={style['flex-box']}>
                                <span><div><img src="../images/flag/01.jpg" alt="Bahrain" /><h4>Oman</h4></div></span>
                                <span><div><img src="../images/flag/02.jpg" alt="Bahrain" /><h4>Qatar</h4></div></span>
                                <span><div><img src="../images/flag/03.jpg" alt="Bahrain" /><h4>Kuwait</h4></div></span>
                                <span><div><img src="../images/flag/04.jpg" alt="Bahrain" /><h4>Saudi Arabia</h4></div></span>
                                <span><div><img src="../images/flag/05.jpg" alt="Bahrain" /><h4>Bahrain</h4></div></span>
                                <span><div><img src="../images/flag/06.jpg" alt="Bahrain" /><h4>United Arab Emirates</h4></div></span>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className={style['pt-25']}>Thriving Investment Climate</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h4>FDI on the Rise</h4>
                            <p>The GCC witnessed af 20% surge in FDI inflows in 2023, reaching $77 billion</p>
                            <h4>Diversification Drives Growth</h4>
                            <p>Governments promote non-oil sectors via infrastructure development and incentives.</p>
                            <h4>Strategic Location</h4>
                            <p>The GCC's position at the crossroads of continents grants access to lucrative markets in Asia, Africa, and Europe</p>
                            <h4>Political Stability</h4>
                            <p>The GCC offers relative political stability, attracting investors seeking long-term security for their investments</p>
                        </div>
                        <div className='col-md-6'>
                            <img src="../images/thriving-investment-climate.jpg" alt="Bahrain" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className={style['pt-25']}>Key Sectors for Investment</h3>
                            <p>Leading sectors drawing FDI in the GCC include</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3 text-center'>
                            <img src="../images/icons/01.jpg" alt="Bahrain" />
                            <h4 className='pt-2'>Manufacturing</h4>
                            <p>Witnessing a surge in advanced manufacturing, particularly in petrochemicals, pharmaceuticals, and food processing</p>
                        </div>
                        <div className='col-md-3 text-center'>
                            <img src="../images/icons/02.jpg" alt="Bahrain" />
                            <h4 className='pt-2'>Tourism and Hospitality</h4>
                            <p>Booming tourism infrastructure and cultural attractions are attracting significant investments in
                                this sector</p>
                        </div>
                        <div className='col-md-3 text-center'>
                            <img src="../images/icons/03.jpg" alt="Bahrain" />
                            <h4 className='pt-2'>Logistics & Transportation</h4>
                            <p>The GCC's strategic location makes it a natural logistics hub, with ongoing investments in ports, airports, and supply chain infrastructure</p>
                        </div>
                        <div className='col-md-3 text-center'>
                            <img src="../images/icons/04.jpg" alt="Bahrain" />
                            <h4 className='pt-2'>Booming Tourism</h4>
                            <p>With a focus on renewable energy sources like solar and wind, the GCC is attracting Investments in clean technologies</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className={style['pt-25']}>Invest in the future: The GCC is poised for</h3>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-5'>
                            <img src="../images/energy-subsidies.jpg" className={style['energy-subsidies-img']} alt="Bahrain" />
                        </div>
                        <div className='col-md-7'>
                            <h4>Innovation and Technology</h4>
                            <p>The region prioritizes artificial intelligence, robotics, and fintech, creating exciting opportunities for investors</p>
                            <h4>Sustainability</h4>
                            <p>Focus on developing sustainable industries and infrastructure will attract investments in green technologies and circular economy solutions</p>
                            <h4>Strategic Partnerships</h4>
                            <p>The evolving global landscape may lead to new investment partnerships with countries in Asia and Africa</p>
                        </div>
                    </div>


                </div>


                <div className={`container-fluid ${style['ask-your-questions']}`}>

                    <div className='col-md-12'>


                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-8'>
                                    <h3>Ask Your Questions</h3>
                                    <p>If your question has not been answered, you can submit your own by using the form below. Alternatively, feel free to <a href='#0'><b><u>Contact Us</u></b></a> and one of our staff will be happy to assist you.</p>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <input type='text' placeholder='Your Name'></input>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' placeholder='Your Email'></input>
                                </div>
                                <div className='col-md-12'>
                                    <textarea placeholder='Question'></textarea>

                                </div>
                                <div className='col-md-12'>
                                    <button>ASK QUESTION</button>
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
