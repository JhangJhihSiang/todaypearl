'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';


const Opinion = () => {


  const [email, setEmail] = useState('')

  const [opinion, setOpinion] = useState('')

  const [notification, setNotification] = useState(null);  // 用來管理通知的狀態

  const [isRedirecting, setIsRedirecting] = useState(false);  // 控制是否開始跳轉




  // 提交意見的表單

  const onSubmitHandler = async (e) => {


    e.preventDefault();



    try {


      // 到指定後端 api/opinion/create 執行功能
      // { email, opinion } ： 給後端的資料
      // {data} 跟 response.data 是一樣的意思

      const { data } = await axios.post('/api/opinion/create', { email, opinion })

      if (data.success) {


        // 清空欄位

        setEmail('');

        setOpinion('');

        setNotification({

          success: true,

          message: (

            <>

              <p>已將您的寶貴意見送出</p>

            </>

          )

        });

      }


    } catch (error) {

      console.log(error)

      setNotification({ success: false, message: error.message });

    }

  }


  useEffect(() => {


    // 有 token 且沒有跳轉時才會執行程式碼

    if (!isRedirecting) {

      setIsRedirecting(true);


      // 三秒後跳至首頁

      setTimeout(() => {

        router.push('/');

      }, 3000);

    }

  }, [isRedirecting]);




  // 處理通知關閉

  const handleCloseNotification = () => {

    setNotification(null);

  };



  return (

    <>

      <Navbar />


      {/* 顯示錯誤或成功通知 */}

      {notification && (

        <Notification

          // 將這些 props 傳入 Notification 的子元件中

          message={notification.message}

          onClose={handleCloseNotification}

        />

      )}


      {/* 意見表單 */}

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >


        {/* 意見箱 */}

        <div className='inline-flex items-center gap-2 mb-2 mt-10'>

          <p className='text-3xl'>意見箱</p>

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
            rows={15}
            className='w-full max-w-[500px] px-3 py-2 border resize-none'
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
