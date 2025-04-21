'use client'

import { admin_assets } from '@/assets/admin_assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React from 'react'


const Navbar = ({setToken}) => {

  const router = useRouter()

  return (

    <div className='flex items-center py-2 px-[4%] justify-between border-b-2'>

        <Image 
          onClick={() => router.push('/admin')}
          src={admin_assets.pearl_logo} 
          className='w-[max(10%,80px)] cursor-pointer' 
          alt="pearl_logo" 
        />

        <button onClick={() => router.push('/')} className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-sm sm:text-base'>芝麻關門</button>


    </div>
  )
}

export default Navbar
