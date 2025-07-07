'use client'


import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { ShopContext } from '@/context/ShopContext'
import Navbar from '@/components/Navbar'
import Title from '@/components/Title'
import { assets } from '@/assets/assets'

const Orders = () => {

  const { token, currency } = useContext(ShopContext)


  const [orders, setOrders] = useState([])



  // 取得用戶的所有訂單

  const fetchAllOrders = async () => {


    if (!token) {

      toast.error('請先登入')

      return null;
    }


    try {


      // 去指定後端 api/order/list 執行功能 
      // { headers: { Authorization: `Bearer ${token}` } } ： 告訴後端我是誰

      const response = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {

        setOrders(response.data.orders.reverse())

      } else {

        toast.error(response.data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(error.message)

    }

  }






  useEffect(() => {

    fetchAllOrders();

  }, [token])



  // 根據不同的訂單狀態，呈現相對應的程式碼

  const getStatus = (status) => {

    switch (status) {


      // 訂單狀態一：訂單處理中

      case '訂單處理中':

        return (

          <Image
            src={assets.gray_circle}
            alt='gray_circle'
            width={20}
            height={20}
          />

        );


      // 訂單狀態二：商品已寄件

      case '商品已寄件':

        return (

          <Image
            src={assets.yellow_circle}
            alt='yellow_circle'
            width={20}
            height={20}
          />

        );


      // 訂單狀態三：商品已到指定門市

      case '商品已到指定門市':

        return (

          <Image
            src={assets.red_circle}
            alt='red_circle'
            width={20}
            height={20}
          />

        );


      // 訂單狀態四：交易完成

      case '交易完成':

        return (

          <Image
            src={assets.green_circle}
            alt='green_circle'
            width={20}
            height={20}
          />

        );


      default:
        return '';

    }
  }






  return (

    <>

      <Navbar />


      <div>

        <Title
          text1={'我的'}
          text2={'訂單'}
        />

      </div>



      <div>

        {
          orders.map((order, index) => (


            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>



              {/* 第一個區塊：訂單的產品照片 ＋ 名稱 ＋ 數量 */}
              {/* items(陣列)：每筆訂單中的items欄位*/}
              {/* item(物件)：items陣列中的每個物件*/}

              <div>

                {order.items.map((item, index) => {

                  if (index === order.items.length - 1) {

                    return (

                      <div
                        key={index}
                        className='flex items-center gap-3 mt-2'
                      >

                        <Image
                          src={item.image[0]}
                          alt='item.image'
                          width={120}
                          height={120}
                        />

                        <p className='py-0.5'> {item.name} X {item.quantity}</p>


                      </div>

                    )

                  } else {

                    return (

                      <div
                        key={index}
                        className='flex items-center gap-3 mt-2'
                      >

                        <Image
                          src={item.image[0]}
                          alt='item.image'
                          width={120}
                          height={120}
                        />

                        <p className='py-0.5'> {item.name} X {item.quantity} , </p>


                      </div>

                    )

                  }

                })}

              </div>


              {/* 第二個區塊：訂單詳細內容 */}

              <div>

                <p className='mt-3 mb-2 font-medium'>有 {order.items.length} 種商品，共 {order.items.reduce((total, item) => total + item.quantity, 0)} 件 </p>

                <p className="mt-3 mb-2 font-medium">{order.store.split(' , ')[0]}</p>

                <p className="mt-3 mb-2 font-medium">{order.store.split(' , ')[1]}</p>

                <p className="mt-3 mb-2 font-medium">日期 : {new Date(order.date).toLocaleDateString()}</p>

              </div>


              {/* 第三個區塊：總金額 */}

              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>



              {/* 第四個區塊：訂單狀態 */}

              <div>

                <p className='flex gap-3'>{getStatus(order.status)} {order.status}</p>

              </div>


            </div>

          ))
        }

      </div>

    </>

  )
}


export default Orders
