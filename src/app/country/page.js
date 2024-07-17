import React from 'react';
import style from './style.module.css';
import Banner from '../../../components/banner/banner';
import Countries from '../../../components/countries/countries';
import Tabs from '../../../components/countries/tabs';
import Carousal from '../../../components/carousel/Carousal';
import DocumentationTabs from '../../../components/countries/documentation-tab';
import GettingAroundTab from '../../../components/countries/getting-around-tab';

function country() {
    const countryExplore = [
        { id: 1, heading: 'Desitination Heading', description: 'Luxury', image: "/images/blog/01.jpg" },
        { id: 2, heading: 'Desitination Heading', description: 'Culture', image: "/images/blog/02.jpg" },
        { id: 3, heading: 'Desitination Heading', description: 'Coastal Esscapes', image: "/images/blog/03.jpg" },
        { id: 4, heading: 'Desitination Heading', description: 'History', image: "/images/blog/04.jpg" },
        { id: 5, heading: 'Desitination Heading', description: 'Events', image: "/images/blog/01.jpg" },
    ];


    const countryExperiance = [

    ];

    const accordionData = [
        {
            title: 'ACTIVITIES',
            items: ['Hiking', 'Camping', 'Wildlife Watching', 'Water Sports']
        },
        {
            title: 'CULTURAL ACTIVITIES',
            items: ['Sightseeing', 'Museums', 'Historical Sites', 'Festivals', 'Food and Wine Tours']
        },
        {
            title: 'RELAXATION AND REJUVENATION',
            items: ['Sightseeing', 'Museums', 'Historical Sites', 'Festivals', 'Food and Wine Tours']
        },
        {
            title: 'FILTER BY STAY',
            items: ['Budget-Friendly Motels', 'Luxurious Five-Star Resorts', 'Apartments', 'Private Villas', 'Homestays', 'Boutique Hotels', 'Tents']
        },
        {
            title: 'TRAVEL STYLE',
            items: ['Luxury', 'Adventure', 'Family-Friendly', 'Couple', 'Group Tour', 'Budget Friendly']
        },
        {
            title: 'GEOGRAPHY',
            items: ['Coastal', 'Desert', 'Mountain', 'Nature', 'Sea', 'Forest']
        }
    ];

    return (
        <>
            <Banner />
            <Countries />

            <div className={style['section-normal']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3>A Blend of Ancient Traditions and Modern Wonders</h3>
                            <p>Funding freemium technology focus equity bootstrapping usernce niche market. Seed round agile growth hacking retur investment alpha investor advisor marketing pitch.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs />

            {/* explore */}

            <section className={style['countries-explore-container']}>
                <div className={style['countries-explore']}>
                    <div className='container'>
                        <div className="row">
                            <div className="col-md-12 pb-3">
                                <h3>Explore your Destinations, Inspiration, Events</h3>
                            </div>
                        </div>
                    </div>

                    {/* CountryExplore */}
                    <div className={style['country-explore']}>
                        <div className='container-fluid'>
                            <div className='row'>
                                <Carousal countryExplore={countryExplore} count={5} type="country-explore" />
                            </div>
                            <div className='row'>
                                <div className='col-md-12 text-center mt-4'>
                                    <button className={style['btn-one']}>Full List</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* CountryExplore */}

            <div className={style['section-normal']}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 pb-3'>
                            <h3 className='mb-0'>Plan</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 pb-3'>
                            <label>Where am I from?</label>
                            <select className='form-control'>
                                <option>Select</option>
                                <option>Place</option>
                                <option>Place</option>
                            </select>
                        </div>
                        <div className='col-md-4 pb-3'>
                            <label>Where am I going?</label>
                            <select className='form-control'>
                                <option>Select</option>
                                <option>Place</option>
                                <option>Place</option>
                            </select>
                        </div>
                        <div className='col-md-4 pb-3 d-flex align-items-end'>
                            <button className={`${style['btn-two']} w-100`} >Get Visa Eligibility</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 text-center mt-4'>
                            <button className={style['btn-one']}>Get More Details</button>
                        </div>
                    </div>

                </div>
            </div >



            <div className={style['section-documentation']}>
                <div className={style['section-normal']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>Documentation</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <DocumentationTabs />
            </div>

            <div className={style['section-documentation']}>
                <div className={style['section-normal']}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h3>Getting Around</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <GettingAroundTab />
            </div>


            {/* explore */}

            <section className={style['countries-explore-container']}>
                <div className={style['countries-explore']}>
                    <div className='container'>
                        <div className="row">
                            <div className="col-md-12 pb-3">
                                <h3>Experience</h3>
                                <p>Funding freemium technology focus equity bootstrapping usernce niche market. Seed round agile growth hacking retur investment alpha investor advisor marketing pitch.</p>
                            </div>
                        </div>
                    </div>

                    {/* countryExperiance */}
                    <div className={style['country-experiance']}>
                        <div className='container'>
                            <div className='row'>
                                <Carousal countryExperiance={countryExperiance} count={3} type="country-experiance" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* countryExperiance */}
        </>
    );
}

export default country;
