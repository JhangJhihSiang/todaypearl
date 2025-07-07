'use client'

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import { assets } from '@/assets/assets';
import Image from 'next/image';


const Login = () => {


  const [currentState, setCurrentState] = useState('尊爵用戶請登入');


  const { token, setToken, router } = useContext(ShopContext);


  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [notification, setNotification] = useState(null);  // 用來管理通知的狀態

  const [isRedirecting, setIsRedirecting] = useState(false);  // 控制是否開始跳轉

  const [showPassword, setShowPassword] = useState(false);  //控制顯示密碼與否



  // 提交註冊或登入的表單

  const onSubmitHandler = async (e) => {


    e.preventDefault();

    try {

      if (currentState === '註冊') {


        // 去指定後端 api/user/register 執行功能
        // { name, email, password } ： 給後端的資料
        // {data} 跟 response.data 是一樣的意思

        const response = await axios.post('/api/user/register', { name, email, password });

        if (response.data.success) {

          setToken(response.data.token);

          localStorage.setItem('token', response.data.token);

          setNotification({

            success: true,

            message: (

              <>

                <p>恭喜您成為尊爵會員</p>

                <p className='text-center mt-2'>(為您帶路請稍等)</p>

              </>

            )

          });


        } else {

          setNotification({ success: false, message: '使用者已經存在' });

        }


      } else {


        // 去指定後端 api/user/login 執行功能
        //  { email, password } ： 給後端的資料

        const response = await axios.post('/api/user/login', { email, password });

        if (response.data.success) {

          setToken(response.data.token);

          localStorage.setItem('token', response.data.token);

          setNotification({ success: true, message: '尊爵會員歡迎光臨～' });

        } else {

          setNotification({ success: false, message: response.data.message });

        }
      }

    } catch (error) {

      console.log(error);

      setNotification({ success: false, message: error.message });

    }

  };



  useEffect(() => {


    // 有 token 且沒有跳轉時才會執行程式碼

    if (token && !isRedirecting) {

      setIsRedirecting(true);


      // 三秒後跳至首頁

      setTimeout(() => {

        router.push('/');

      }, 3000);

    }

  }, [token, router, isRedirecting]);




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



      {/* 註冊或登入的表單 */}

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >


        {/* 標題 */}

        <div className="inline-flex items-center gap-2 mb-2 mt-10">

          <p className="text-3xl">{currentState}</p>

          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />

        </div>


        {/* 註冊頁面出現名字欄位，在登入頁面不出現名字欄位 */}

        {currentState !== '尊爵用戶請登入' && (


          // 名字欄位

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="請輸入您的大名"
            className="w-full px-3 py-2 border border-gray-800"
            required
          />

        )}


        {/* 電子郵件欄位 */}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="請輸入您的電子郵件"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />


        {/* 密碼欄位 */}

        <div className='w-full relative'>


          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            placeholder="請輸入您的密碼"
            className="w-full px-3 py-2 border border-gray-800"
            required
          />


          {/* 點擊圖示切換密碼顯示與否 */}

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
          >

            {showPassword 
              ? <Image 
                  src={assets.eye_open} 
                  alt='eye_open'
                  width={20} 
                  height={20}
                />  

              : <Image 
                  src={assets.eye_close} 
                  alt='eye_close'
                  width={20} 
                  height={20}
                /> 
            }

          </span>

        </div>



        {/* 註冊、登入頁面的切換 */}

        <div className="w-full flex text-sm mt-[6px]">

          {currentState === '尊爵用戶請登入'

            ? (

              <p
                onClick={() => setCurrentState('註冊')}
                className="cursor-pointer underline"
              >

                還沒成為尊爵用戶嗎？馬上創建一個帳戶

              </p>

            )

            : (

              <p
                onClick={() => setCurrentState('尊爵用戶請登入')}
                className="cursor-pointer underline"
              >

                尊爵用戶請由此登入

              </p>

            )
          }

        </div>


        {/* 按鈕會觸發 onSubmit 功能，提交表單，執行 {onSubmitHandler} */}

        <button
          type='submit'
          className="bg-black text-white font-light px-8 py-2 mt-4"
        >

          {currentState === '尊爵用戶請登入' ? '登入' : '完成註冊'}

        </button>


      </form>

    </>

  );
};

export default Login;
