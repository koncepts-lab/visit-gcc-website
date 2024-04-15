import React from 'react';
import InnerPageBanner from '@/components/layouts/InnerPageBanner';
import './packages.css';
import Packages from '@/components/home/packages/Packages';

function Page() {
  return (
    <>
      <InnerPageBanner />
      <section className='inner-page-container'>
        <div className='container'>
          <div className="row">
            <div className="col-md-2">
              <a href="#0" className="box">
                <img src="../images/countries/01.jpg" alt="Bahrain" />
                <h4 className='text-center'>Bahrain</h4>
              </a>
            </div>
            <div className="col-md-2">
            <a href="#0" className="box">
                <img src="../images/countries/02.jpg" alt="Bahrain" />
                <h4 className='text-center'>Kuwait</h4>
              </a>
            </div>
            <div className="col-md-2">
            <a href="#0" className="box">
                <img src="../images/countries/03.jpg" alt="Bahrain" />
                <h4 className='text-center'>Oman</h4>
              </a>
            </div>
            <div className="col-md-2">
            <a href="#0" className="box">
                <img src="../images/countries/04.jpg" alt="Bahrain" />
                <h4 className='text-center'>Qatar</h4>
              </a>
            </div>
            <div className="col-md-2">
            <a href="#0" className="box">
                <img src="../images/countries/05.jpg" alt="Bahrain" />
                <h4 className='text-center'>Saudi Arabia</h4>
              </a>
            </div>
            <div className="col-md-2">
            <a href="#0" className="box">
                <img src="../images/countries/06.jpg" alt="Bahrain" />
                <h4 className='text-center'>United Arab Emirates</h4>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Packages />

      <section className='package-category'></section>
    </>
  );
}

export default Page;
