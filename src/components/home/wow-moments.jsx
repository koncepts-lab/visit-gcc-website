import React from 'react'
import style from "./style.module.css";

function WowMoments() {
  return (
    <>
    <section className={style['home-wow']}>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                <h4>Perfect For</h4>
                <h3>Create a WOW Moment</h3>
                <p  className={style['home-wow-p']}><span> The result? A face cushion that fits you perfectly. </span><br/>
                Enhanced immersion with no more light leakage, and comfortable to wear for hours.
                </p>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className={style['wow-box']}>
                        <img src="/assets/images/perfect/01.jpg" className="w-100" alt="" />
                        <h4>Automotive</h4>
                        <p>Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.</p>
                    </div>
                    
                </div>
                <div className='col-md-6'>
                    <div className={style['wow-box']}>
                        <img src="/assets/images/perfect/02.jpg" className="w-100" alt="" />
                        <h4>Corporate</h4>
                        <p>The Wall is the standout centerp ece for any lobby boardroom, allowing you to highlight your values and communicate with hybrid workforces in profound ways</p>
                    </div>
                    
                </div>
                <div className='col-md-6'>
                    <div className={style['wow-box']}>
                        <img src="/assets/images/perfect/03.jpg" className="w-100" alt="" />
                        <h4>Government</h4>
                        <p>Ensure decision makers are empowered with secure, crystal
                        clear information supported by TAA compliance', remote power
                        options and 24/7 Performence</p>
                    </div>
                    
                </div>
                <div className='col-md-6'>
                    <div className={style['wow-box']}>
                        <img src="/assets/images/perfect/04.jpg" className="w-100" alt="" />
                        <h4>Retail</h4>
                        <p>Lure customers into stores and increase revenue with branding and experiential walls integrated into the design.</p>
                    </div>
                    
                </div>

                <div className='col-md-12 text-center'>
                    <button>Know More Details</button>
                </div>


            </div>
        </div>
    </section>
    
    </>
  )
}

export default WowMoments
