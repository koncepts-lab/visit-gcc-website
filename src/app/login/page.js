import React from 'react'
import style from './style.module.css';
import Banner from '../../../components/banner/banner'

import LoginRegisterTabs111 from '../../../components/login-register/login-register';
import LoginRegisterTabs from '../../../components/login/login';

function page() {
  return (
    <div>
      <Banner />
      <section className={style['login_register']}>
       <LoginRegisterTabs111 />
 
      </section>
    </div>
  )
}

export default page