import React from 'react'
import CountryBanner from '../../components/countries/banner/CountryBanner'
import Requirments from '@/components/countries/requirments/Requirments'
import About from '@/components/countries/about/About'


const page = () => {
  return (
    <div>
      <CountryBanner/>
      <Requirments/>
      <About/>

    </div>
  )
}

export default page
