import React from 'react'
import style from './style.module.css';
import Search from '../search/search';

const Banner = () => {

  return (
    <>
      <section className={style['banner']}>
        <div className={'container'}>
          <div className={'row'}>
            <div className="col-md-12">
              <div className={style['banner-container']}>
                <div><img src="../images/01.png" alt="Bahrain" /><h4>Explore</h4></div>
                <div><img src="../images/02.png" alt="Bahrain" /><h4>Plan</h4></div>
                <div><img src="../images/03.png" alt="Bahrain" /><h4>Book</h4></div>
                <div><img src="../images/04.png" alt="Bahrain" /><h4>Experience</h4></div>
              </div>
              <Search />
            </div>
          </div>
        </div>
      </section>
    </>
  )
  
}

export default Banner
