import React from 'react';
import Image from 'next/image';
import style from "./style.module.css";

function Displays() {
  return (
    <>
    <section className={style['home-displays']}>
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h4>Displays</h4>
          <h3>Next-generation displays</h3>
        </div>
       </div>

       <div className="row">
            <div className="col-md-6">
                <Image src="/assets/images/home-displays.png" alt="Displays"  width={600}  height={400} priority />
            </div>
            <div className="col-md-6">
            <div className={style['home-displays-text']}>
            <h2>90 Degree</h2>
            <p>90° connection cabinets cut
            45° In the left or right side of your cabinet and then can't connect with normal cabinet from that side anymore.</p>
<hr/> 
            <p><br/>90° Connection <br/>
            Make your corner & cube</p>

            <Image src='/assets/images/home-displays-2.png' className='max-width-display' alt="Displays" width={600} height={400} />
          </div>

        
            </div>
        </div>

        <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
        </div>





      </div>
    </section>
    </>
  )
}

export default Displays;