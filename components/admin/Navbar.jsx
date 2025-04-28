'use client'

import { admin_assets } from '@/assets/admin_assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React from 'react'


const Navbar = () => {

  const router = useRouter()

  return (

    <div className='flex items-center py-2 px-[4%] justify-between border-b-2'>


      {/* 品牌 logo */}

      <Image
        onClick={() => router.push('/admin')}
        src={admin_assets.today_pearl_logo_1}
        alt="today_pearl_logo_1"
        className='w-[max(10%,80px)] cursor-pointer'
      />


      {/* 按下按鈕回到首頁 */}

      <button
        onClick={() => router.push('/')}
        className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-sm sm:text-base'
      >

        芝麻關門

      </button>


    </div>
  )
}

export default Navbar
