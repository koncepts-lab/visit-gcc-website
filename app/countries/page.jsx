import React from 'react'
import CountryBanner from '../../components/countries/banner/CountryBanner'
import Requirments from '@/components/countries/requirments/Requirments'
import About from '@/components/countries/about/About'
import Tabs from '@/components/countries/popular spot/tab'




const page = () => {
  return (
    <div>
      <CountryBanner/>
      <Requirments/>
      <About/>
      <Tabs/>
      
      

    </div>
  )
}

export default page
