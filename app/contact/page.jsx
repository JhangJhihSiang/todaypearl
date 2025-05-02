'use client'

import { assets } from '@/assets/assets'
import Navbar from '@/components/Navbar'
import Title from '@/components/Title'
import { ShopContext } from '@/context/ShopContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const Contact = () => {


  const {router} = useContext(ShopContext)



  return (

    <>

    <Navbar />
    
    <div>

      <div className='text-center text-2xl pt-10 border-t'>

        <Title 
          text1={'聯絡'} 
          text2={'我們'} 
        />

      </div>

      <div className='flex flex-col md:flex-row justify-center my-10 gap-10 mb-28'>

        <Image src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>

          <p className='font-semibold text-xl text-gray-600'>今珠攤位</p>

          <p className='text-gray-500'>隨機出沒於台灣地區各個角落 <br /> 詳細消息請參閱ＩＧ或網頁</p>

          <p className='text-gray-500'>Tel: (415) 555-0132 <br /> Email: admin@forever.com</p>

          <button 
            onClick={() => router.push('/opinion')}
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>


        </div>

      </div>

    </div>
    </>
  )
}

export default Contact
