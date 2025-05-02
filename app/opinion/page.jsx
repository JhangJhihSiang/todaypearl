'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';


const Opinion = () => {


  const [email, setEmail] = useState('')

  const [opinion, setOpinion] = useState('')



  // 提交意見的表單

  const onSubmitHandler = async (e) => {


    e.preventDefault();



    try {


      // 到指定後端 api/opinion/create 執行功能
      // { email, opinion } ： 給後端的資料
      // {data} 跟 response.data 是一樣的意思

      const { data } = await axios.post('/api/opinion/create', { email, opinion })

      if (data.success) {

        toast.success('意見已成功提交', { autoClose: 1000 });


        // 清空欄位

        setEmail('');

        setOpinion('');

      }


    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }



  return (

    <>

      <Navbar />


      {/* 意見表單 */}

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >


        {/* 意見箱 */}

        <div className='inline-flex items-center gap-2 mb-2 mt-10'>

          <p className='prata-regular text-3xl'>意見箱</p>

          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

        </div>



        {/* 電子信箱 */}

        <div className='w-full'>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder='請輸入您的電子郵件'
            className='w-full max-w-[500px] px-3 py-2 border'
            required
          />

        </div>


        {/* 意見內容 */}

        <div className='w-full'>

          <textarea
            onChange={(e) => setOpinion(e.target.value)}
            value={opinion}
            type="text"
            placeholder='寫下您寶貴的意見'
            required
            rows={10}
            className='w-full max-w-[500px] px-3 py-2 border'
          />

        </div>



        {/* 按鈕會觸發onSubmit功能，提交表單，執行 {onSubmitHandler} */}

        <button
          type='submit'
          className='bg-black text-white font-light px-8 py-2 mt-4'
        >

          送出

        </button>



      </form>


    </>
  )
}



export default Opinion
