import { assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SocialMedia = () => {


    // 滾動到頁首

    const scrollToTop = () => {

        window.scrollTo({ top: 0, behavior: 'smooth' })

    }



    return (

        <div>

            <div className='flex flex-col items-center sm:grid grid-cols-[3fr_5fr] gap-14 my-8 text-sm'>


                {/* logo區塊 ，點擊可滾動到頁首 */}

                <div>

                    <Image
                        onClick={scrollToTop}
                        src={assets.today_pearl_logo_2}
                        alt="today_pearl_logo_2"
                        className='mb-5 w-80 cursor-pointer'
                    />

                </div>

                {/* 社群區塊 */}

                <div>

                    <p className='text-3xl font-medium mb-5'>歡迎追蹤訂閱</p>

                    <div className='flex flex-row gap-8 text-gray-600'>


                        {/* Facebook */}
                        {/* target='_blank' : 開新視窗*/}

                        <Link
                            href="https://www.facebook.com/share/1Q111xKs49/?mibextid=wwXlfr"
                            target='_blank'
                        >

                            <Image
                                src={assets.facebook_icon}
                                alt="facebook_icon"
                                className='w-20 hover:scale-110 cursor-pointer'
                            />

                        </Link>


                        {/* Instagram */}
                        {/* target='_blank' : 開新視窗*/}

                        <Link
                            href="https://www.instagram.com/p/DGZXq7yTf0J/?igsh=MWZ3OG5scnJtY3RwZg=="
                            target='_blank'
                        >

                            <Image
                                src={assets.instagram_icon}
                                alt="instagram_icon"
                                className='w-20 hover:scale-110 cursor-pointer'
                            />

                        </Link>


                    </div>

                </div>

            </div>



        </div>
    )
}


export default SocialMedia
