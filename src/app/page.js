'use client'

import React from 'react'
import Wrapper from '@/layouts/wrapper'
import Header from '@/layouts/header'
import Footer from '@/layouts/footer'

// Home components
import BannerVideo from '@/components/home/banner-video'
import HomeExperience from '@/components/home/home-experience'
import ScreenSizes from '@/components/home/screen-szes'
import HomeCarousel from '@/components/home/home-carousel'
import Displays from '@/components/home/displays'
import WowMoments from '@/components/home/wow-moments'
import LetsTalk from '@/components/home/lets-talk'

function HomePage() {
  return (
    <Wrapper>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <main>
            <BannerVideo />
            <HomeExperience />
            <Displays />
            <ScreenSizes />
            <HomeCarousel />
            <WowMoments />
            <LetsTalk />
            <Footer />
          </main>
        </div>
      </div>
    </Wrapper>
  )
}

export default HomePage