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

          <h1 className="text-4xl font-bold text-gray-900 mb-6 ">給我的摯愛祐函：</h1>

          <p className="text-lg text-gray-700 mb-6">10月3日，妳呱呱墜地來到這個世界，是上帝最美的安排</p>

          <p className="text-lg text-gray-700 mb-6">我開始相信這世界有天使的存在</p>

          <p className="text-lg text-gray-700 mb-6">感謝有你，讓我能勇敢面對未知的未來</p>
          
          <p className="text-lg text-gray-700 mb-6">感謝有你，讓平凡的生活增添繽紛的色彩</p>

          <p className="text-lg text-gray-700 mb-6">感謝有你，讓我知道什麼是愛</p>

          <p className="text-lg text-gray-700 mb-6">未來的日子，不論好壞</p>

          <p className="text-lg text-gray-700 mb-6">我們彼此都相互扶持相互依賴</p>

          <p className="text-lg text-gray-700 mb-6">希望你每天都能chill high high </p>

          <p className="text-lg text-gray-700 mb-6">生日快樂～我的摯愛</p>

        </div>


        {/* Swiper 圖片幻燈片*/}

        <div className='min-h-[500px] flex items-center justify-center'>

          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 3000 }}
            className="w-full h-full rounded-lg shadow-xl"
          >


            {/* 第一張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hb1}
                alt='image01'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第二張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hb2}
                alt='image02'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第三張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hb3}
                alt='image03'
                className="w-full h-full object-cover rounded-lg"
              />

            </SwiperSlide>


            {/* 第四張幻燈片 */}

            <SwiperSlide>

              <Image
                src={assets.hb4}
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
