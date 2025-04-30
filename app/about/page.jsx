'use client'

import React from 'react'
import Title from '@/components/Title'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import Navbar from '@/components/Navbar'


const About = () => {


  return (

    <>

      <Navbar />


      <div>


        <div className='text-4xl text-center pt-8 border-t'>

          <Title 
            text1={'關於'} 
            text2={'今珠'} 
          />

        </div>


        <div className='flex flex-col md:flex-row my-10 gap-16'>


          {/* 左邊是圖片 */}

          <Image
            src={assets.about_img}
            className='w-full md:max-w-[450px]'
            alt="about_img"
          />



          {/* 右邊是關於今珠的主要內容 */}

          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>

            <p>『今珠』品牌成立於2023年，品牌發想取自於台灣人最愛用的諧音梗，以珍珠的諧音命名而成。</p>

            <p>目前以珍珠飾品為主，主要活動於高雄區的市集中。</p>

            <p>詳細擺攤資訊及最新產品消息會上傳臉書及ＩＧ，歡迎訂閱追蹤起來！</p>

            <b className='text-gray-800'>我們的目標：</b>

            <p>用珍珠飾品點亮你那不起眼的路人穿搭，提升你在路上的回頭率，提升你被搭訕的機率，捫心自問，不敢開口跟人說話的你與幸福擦身而過多少次了呢？讓珍珠飾品協助你建立與人聊天的第一句話，讓你多了些追求幸福的權利</p>

          </div>


        </div>



        <div className='text-xl py-4'>

          <Title 
            text1={'為什麼'} 
            text2={'選擇我們'} 
          />

        </div>


        <div className='flex flex-col md:flex-row text-sm mb-20'>


          {/* 今珠特色 1 */}

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

            <b>品質保證：</b>

            <p className='text-gray-600'>採用天然珍珠，從原料到成品均由設計師親自操刀</p>

          </div>


          {/* 今珠特色 2 */}

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

            <b>美感保證：</b>

            <p className='text-gray-600'>時刻掌握最新流行趨勢，踏在時尚潮流的浪尖上，像魯夫一樣航行於偉大的航道上</p>

          </div>


          {/* 今珠特色 3 */}

          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>

            <b>物美價廉：</b>

            <p className='text-gray-600'>在結合美與時尚的前提下，又不讓你的荷包大失血，用小小的金額就能讓你置身於巴黎時裝秀的伸展台上</p>

          </div>


        </div>


      </div>


    </>
    
  )
}


export default About
