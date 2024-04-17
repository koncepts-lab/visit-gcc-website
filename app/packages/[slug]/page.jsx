import React from 'react'
import './pakage-details.css'

const page = ({ params }) => {
  const { slug } = params;
  return (
    <>
      <section className='pakage-details-container'>
        <div className='breadcrumb'>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Library</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{slug}</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        
        <section className='title-section'>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1>{slug}</h1>
              <h6>Pick Up and Drop Off with Dune Bashing, Live Entertainment, with Short Camel Ride</h6>
            </div>
            <div className="col-md-5">
              <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-5"><p className='mb-0'>Starting From </p><h1>AED 85.00</h1></div>
              <div className="col-md-7">
                <div className='d-flex'>
                <a class="book-btn" href="#0">Book Now</a>
                <a class="query-btn" href="#0">Submit Query</a>
                </div>
              </div>
              </div>
            </div>

          </div>
        </div>
        </section>


        <section className='pakage-banner'>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
            <img src="../images/gallery/01.jpg" className='w-100' alt="Bahrain" />
            </div>
            <div className="col-md-2">
            <iframe width="100%" height="340" src="https://www.youtube.com/embed/IHa0uoVjfOE?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=IHa0uoVjfOE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

            

            </div>
            <div className="col-md-2">
            <img src="../images/gallery/01.jpg" className='w-100' alt="Bahrain" />
            <img src="../images/gallery/01.jpg" className='w-100' alt="Bahrain" />
            </div>
            <div className="col-md-3">
            <img src="../images/gallery/02.jpg" className='w-100' alt="Bahrain" />
            </div>

              </div>
              </div>
        </section>

        


      </section>
 
    </>
  )
}

export default page


