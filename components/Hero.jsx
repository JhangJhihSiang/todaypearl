// import React, { useEffect, useState } from 'react'
// import { assets } from '../assets/assets'
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// // import required modules
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import Image from 'next/image';



// const Hero = () => {


//     return (
//         <div className='flex flex-col lg:flex-row border border-gray-400'>


//             {/* Heo Left Side */}

//             <div className='w-full sm:w-1/2 flex items-center justify-center py-10 '>

//                 <div className='text-[#414141]'>

//                     <div className='flex items-center gap-2'>

//                         <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

//                         <p className='font-medium text-lg md:text-xl'>2025年</p>

//                     </div>

//                     <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/8~2/9： 駁二大義</h1>

//                     <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/15~2/16： 駁二大義</h1>

//                     <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/22~2/23：駁二大勇</h1>

//                     <h1 className='font-semibold text-3xl sm:py-3 lg:text-4xl leading-relaxed my-8'>2/28~3/2： 駁二大義＆高美館</h1>

//                     <div className='flex items-center gap-2'>

//                         <p className='font-medium text-lg md:text-xl'>出攤資訊</p>

//                         <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

//                     </div>

//                 </div>

//             </div>


//             {/* Hero Right Side */}

//             <div className='w-full lg:w-1/2 flex flex-1'>

//                 <Swiper
//                     modules={[Autoplay, Pagination, Navigation]}
//                     autoplay={{ delay: 3000 }}
//                     loop={true}
//                 >

//                     <SwiperSlide>
//                         <Image
//                             src={assets.image01}
//                             height={750}
//                             alt="hero_swiper_4"

//                         />
//                     </SwiperSlide>

//                     {/* <SwiperSlide>
//                         <Image
//                             src={assets.image02}
//                             alt="hero_swiper_4"

//                         />
//                     </SwiperSlide>

//                     <SwiperSlide>
//                         <Image
//                             src={assets.image03}
//                             alt="hero_swiper_4"

//                         />
//                     </SwiperSlide>

//                     <SwiperSlide>
//                         <Image
//                             src={assets.image04}
//                             alt="hero_swiper_4"

//                         />
//                     </SwiperSlide>
//  */}




//                 </Swiper>
//             </div>

//         </div>
//     )
// }

// export default Hero


import { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Hero = () => {


  const images = [
    assets.image01,
    assets.image02,
    assets.image03,
    assets.image04,
  ];


  // 加一張第一張圖片到最後

  const imagesWithClone = [...images, images[0]];


  const [currentImage, setCurrentImage] = useState(0);

  const [isTransitioning, setIsTransitioning] = useState(true);



  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage((prev) => prev + 1);

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {
    if (currentImage === imagesWithClone.length - 1) {
      // 複製的第一張播放完成後，瞬間切回真正第一張
      setTimeout(() => {
        setIsTransitioning(false);      // 關閉動畫
        setCurrentImage(0);             // 跳回第一張
      }, 700); // 這個時間要跟 transition duration 一致

      // 確保之後再打開 transition
      setTimeout(() => {
        setIsTransitioning(true);
      }, 750);
    }
  }, [currentImage]);



  return (

    <section className="flex flex-col lg:flex-row h-[75vh] border border-gray-400">

      {/* 文字區塊 */}

      <div className="flex-1 flex flex-col items-center justify-center px-8 bg-white text-[#414141]">

        <h1 className="mt-4 text-4xl font-bold">-- 市集出攤資訊 --</h1>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

        <p className="mt-4 text-lg">4/3 ~ 4/6 : 駁二大義</p>

      </div>

      {/* 圖片輪播區 */}

      {/* 圖片輪播區 */}
      <div className="relative w-full sm:w-[80vw] md:w-[560px] lg:w-[560px] h-full overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
            transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
          }}
        >
          {imagesWithClone.map((img, index) => (
            <div key={index} className="relative w-full flex-shrink-0 h-full">
              <Image
                src={img}
                alt={`輪播圖片 ${index}`}
                layout="fill" // 填滿父容器的寬高
                objectFit="cover" // 保持比例並填滿區域
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;