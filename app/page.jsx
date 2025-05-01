'use client'

import BestSeller from '@/components/BestSeller'
import Hero from '@/components/Hero'
import LatestCollection from '@/components/LatestCollection'
import Navbar from '@/components/Navbar'
import Features from '@/components/Features'
import ScrollToTop from '@/components/ScrollToTop'
import React from 'react'
import SocialMedia from '@/components/SocialMedia'
import Footer from '@/components/Footer'

const Home = () => {
  return (

    <>

      <Navbar />

      <div className="px-2 mt-4 md:px-16 lg:px-32">

        <Hero />

        <LatestCollection />

        <BestSeller />

        <Features />

        <SocialMedia/>

        <Footer/>

      </div>


      <div>

      <ScrollToTop  />
      
      </div>

    </>
  )
}

export default Home
