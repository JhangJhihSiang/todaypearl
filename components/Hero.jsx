import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import 'swiper/css';
import Image from 'next/image';



const Hero = () => {


  return (

    <section className="relative bg-gray-100 py-6 px-6 md:px-20">


      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">


        {/* 文字區塊 */}

        <div className='text-center'>

          <h1 className="text-4xl font-bold text-gray-900 mb-6 ">市集出攤</h1>

          <p className="text-lg text-gray-700 mb-6">4/3 ~ 4/6 : 駁二大義</p>

          <p className="text-lg text-gray-700 mb-6">4/3 ~ 4/6 : 駁二大義</p>

          <p className="text-lg text-gray-700 mb-6">4/3 ~ 4/6 : 駁二大義</p>

          <p className="text-lg text-gray-700 mb-6">4/3 ~ 4/6 : 駁二大義</p>

        </div>


        {/* Swiper 圖片幻燈片*/}

        <div className='min-h-[500px] flex items-center justify-center'>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{delay: 3000}}
            className="w-full h-full rounded-lg shadow-xl"
          >


            {/* 第一張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hero_swiper_1}
                alt='image01'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第二張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hero_swiper_2}
                alt='image02'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第三張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hero_swiper_3}
                alt='image03'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第四張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hero_swiper_4}
                alt='image04'
                className="w-full h-full object-cover rounded-lg"
              />


            </SwiperSlide>


          </Swiper>

        </div>

      </div>


    </section>
  );
};

export default Hero;
