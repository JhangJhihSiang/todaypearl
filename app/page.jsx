'use client'

import BestSeller from '@/components/BestSeller'
import Copyright from '@/components/Copyright'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import LatestCollection from '@/components/LatestCollection'
import Navbar from '@/components/Navbar'
import OurPolicy from '@/components/OurPolicy'
import ScrollToTop from '@/components/ScrollToTop'
import React from 'react'

const Home = () => {
  return (

    <>

      <Navbar />

      <div className="px-2 mt-4 md:px-16 lg:px-32">

        <Hero />

        <LatestCollection />

        <BestSeller />

        <OurPolicy />

        <Footer />

        <Copyright />

      </div>


      <div>

      <ScrollToTop  />
      
      </div>

    </>
  )
}

export default Home
