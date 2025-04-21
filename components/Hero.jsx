import React from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className='flex flex-col lg:flex-row border border-gray-400'>


            {/* Heo Left Side */}

            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 '>

                <div className='text-[#414141]'>

                    <div className='flex items-center gap-2'>

                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

                        <p className='font-medium text-lg md:text-xl'>2025年</p>

                    </div>

                    <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/8~2/9： 駁二大義</h1>

                    <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/15~2/16： 駁二大義</h1>

                    <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/22~2/23：駁二大勇</h1>

                    <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/28~3/2： 駁二大義＆高美館</h1>

                    <div className='flex items-center gap-2'>

                        <p className='font-medium text-lg md:text-xl'>出攤資訊</p>

                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

                    </div>

                </div>

            </div>


            {/* Hero Right Side */}

            <div className='container lg:w-1/2'>

                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={50}
                    centeredSlides
                    autoplay={{delay: 3000}}
                    loop={true}
                >
                    <SwiperSlide>
                        
                        <Image 
                            src={assets.hero_swiper_1} 
                            alt="hero_swiper_1" 
                        />
                    
                    </SwiperSlide>


                    <SwiperSlide>
                        
                        <Image 
                            src={assets.hero_swiper_2} 
                            alt="hero_swiper_2" 
                        />
                        
                    </SwiperSlide>


                    <SwiperSlide>
                        
                        <Image 
                            src={assets.hero_swiper_3} 
                            alt="hero_swiper_3" 
                        />
                        
                    </SwiperSlide>


                    <SwiperSlide>
                        
                        <Image 
                            src={assets.hero_swiper_4} 
                            alt="hero_swiper_4" 
                        />
                        
                    </SwiperSlide>

                    
                </Swiper>
            </div>

        </div>
    )
}

export default Hero
