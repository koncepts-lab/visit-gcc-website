import React from 'react'
import './countrybanner.css'
import { LiaCertificateSolid } from "react-icons/lia";
import { IoAirplaneSharp } from "react-icons/io5";


function CountryBanner() {
  return (
    <div>
    <div className='countrybanner'>
      
      <div className='container'>
        <h1 >Lorem ipsum dolor sit <br/>Lorem amet </h1>

        

         

      </div>


    </div>

       
    <div className='container cardsec'>

          <div className='bannercard'>
        <div  className='cardmain'> 
          <div className='cardicon'>
<LiaCertificateSolid
  size={70} // Custom size value, can be adjusted as needed
  style={{
    color: '#7fd2ba',
  }}
/>
</div>

  <div className='point'> 
      <ul>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
        <li>Lorem ipsum dolor sit amet</li>
      </ul>
  </div>


</div>

    <div className='cardbutton'>

      <button>Apply Online <IoAirplaneSharp
      size={25}

      /></button>
      

      


    </div>
    

          </div>

          


       
            



          

        </div>
      
    </div>
    
  )
}

export default CountryBanner
