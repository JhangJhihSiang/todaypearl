import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {


    const scrollToTop = () => {

        window.scrollTo({top: 0, behavior:'smooth'})

      }



  return (
    <div>

        <div className='flex flex-col items-center sm:grid grid-cols-[3fr_5fr] gap-14 my-8 text-sm'>

            <div>

                <Image 
                    src={assets.today_pearl_logo_2} 
                    onClick={scrollToTop} 
                    className='mb-5 w-80' 
                    alt="today_pearl_logo_2" 
                />


            </div>

            <div>

                <p className='text-3xl font-medium mb-5'>歡迎追蹤訂閱</p>

                <div className='flex flex-row gap-8 text-gray-600'>

                    <Link target='_blank' href="https://www.facebook.com/share/1Q111xKs49/?mibextid=wwXlfr">

                        <Image
                            src={assets.facebook_icon} 
                            className='w-20 hover:scale-110 cursor-pointer'  
                            alt="facebook_icon" 
                        />

                    </Link>


                    <Link target='_blank' href="https://www.instagram.com/p/DGZXq7yTf0J/?igsh=MWZ3OG5scnJtY3RwZg==">
                    
                        <Image 
                            src={assets.instagram_icon} 
                            className='w-20 hover:scale-110 cursor-pointer' 
                            alt="instagram_icon" 
                        />
                        
                    </Link>


                </div>

            </div>

        </div>

        <div>

            <hr />

            <p className='py-5 text-sm text-center'>&copy;Copyright 2025 By TODAY PEARL - All Rights Reserved.</p>

        </div>
      
    </div>
  )
}

export default Footer
