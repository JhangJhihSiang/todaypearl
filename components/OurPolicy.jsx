import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'


const OurPolicy = () => {


    return (

        
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 mt-20 text-xs sm:text-sm md:text-base text-gray-700'>

            <div>

                <Image src={assets.handmade_icon} className='w-24 m-auto mb-5' alt="" />

                <p className='font-semibold text-2xl'>設計師手作</p>


            </div>

            <div>

                <Image src={assets.pearl_icon} className='w-24 m-auto mb-5' alt="" />

                <p className='font-semibold text-2xl'>100% 淡水珍珠</p>


            </div>

            <div>

                <Image src={assets.stall_icon} className='w-24 m-auto mb-5' alt="" />

                <p className='font-semibold text-2xl'>市集出攤</p>


            </div>

        </div>
    )
}

export default OurPolicy
