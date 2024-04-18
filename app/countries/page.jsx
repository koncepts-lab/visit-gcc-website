import React from 'react'
import CountryBanner from '../../components/countries/banner/CountryBanner'
import Requirments from '@/components/countries/requirments/Requirments'
import About from '@/components/countries/about/About'
import Events from "@/components/home/events/Events"
import Destination from '@/components/countries/destination/Destination'
import Contacts from '@/components/countries/contacts/contacts'




const page = () => {
  return (
    <div>
      <CountryBanner/>
      <Requirments/>
      <About/>
      <Events />
      <Destination/>
      <Contacts/>
      
      

    </div>
  )
}

export default page
