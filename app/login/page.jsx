'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '@/components/Navbar';

const Login = () => {


  const [currentState, setCurrentState] = useState('尊爵用戶請登入');

  const { token, setToken, router } = useContext(ShopContext)


  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      if (currentState === '註冊') {

        const response = await axios.post('/api/user/register', { name, email, password })

        if (response.data.success) {

          setToken(response.data.token)

          localStorage.setItem('token', response.data.token)

          toast.success('恭喜您成為尊爵會員')

        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post('/api/user/login', { email, password })

        if (response.data.success) {
          setToken(response.data.token)
          toast.success('尊爵會員歡迎光臨～')

          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }

    } catch (error) {

      console.log(error)
      toast.error(error.message)

    }

  }


  useEffect(() => {

    if (token) {
      router.push('/')
    }

  }, [token])



  return (

    <>

      <Navbar />


      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      >

        <div className='inline-flex items-center gap-2 mb-2 mt-10'>

          <p className='prata-regular text-3xl'>{currentState}</p>

          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

        </div>

        {currentState === '尊爵用戶請登入'
          ? ''
          : <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder='請輸入您的大名'
            className='w-full px-3 py-2 border border-gray-800'
            required
          />
        }

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder='請輸入您的電子郵件'
          className='w-full px-3 py-2 border border-gray-800'
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder='請輸入您的密碼'
          className='w-full px-3 py-2 border border-gray-800'
          required
        />

        <div className='w-full flex text-sm mt-[6px]'>

          {
            currentState === '尊爵用戶請登入'
              ? <p onClick={() => setCurrentState('註冊')} className='cursor-pointer underline'>還沒成為尊爵用戶嗎？馬上創建一個帳戶</p>
              : <p onClick={() => setCurrentState('尊爵用戶請登入')} className='cursor-pointer underline'>尊爵用戶請由此登入</p>
          }

        </div>

        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === '尊爵用戶請登入' ? '登入' : '完成註冊'}</button>



      </form>
      
    </>
  )
}

export default Login
