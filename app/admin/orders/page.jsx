'use client'


import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { ShopContext } from '@/context/ShopContext'

const Orders = () => {

  const { token, currency } = useContext(ShopContext)


  const [orders, setOrders] = useState([])



  // 從後端抓取所有訂單的函式

  const fetchAllOrders = async () => {


    // 先檢查有無通行證

    if (!token) {

      toast.error('please login first')

      return null;

    }


    try {


      // 去指定後端 api/order/list 執行功能
      // { headers: { Authorization: `Bearer ${token}` } } ： 告訴後端我是誰

      const response = await axios.get('/api/order/list', { headers: { Authorization: `Bearer ${token}` } })


      // response.data 跟 {data} 是一樣的意思
      // 成功的話使用 NextResponse.json() 回傳的 orders資料

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


  // 管理訂單狀態的函式

  const statusHandler = async (event, orderId) => {


    try {


      // 去指定後端 api/order/status 執行功能
      // {orderId, status:event.target.value} ： 給後端的資料
      // {headers: {Authorization: `Bearer ${token}`} } : 告訴後端我是誰

      const response = await axios.post('/api/order/status', { orderId, status: event.target.value }, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {

        await fetchAllOrders()

      }

    } catch (error) {

      console.log(error)

      toast.error(response.data.message)

    }

  }




  useEffect(() => {

    fetchAllOrders();

  }, [token])






  return (

    <div>

      <h3>客戶訂單</h3>


      {/* orders(陣列)：所有訂單o*/}
      {/* order(物件)：每筆訂單*/}

      <div>

        {
          orders.map((order, index) => (
            
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>

              {/* 第一個區塊： checkbox */}
              {/* 訂單狀態是交易完成的話就打勾，不是就不打勾 */}
              {/* readOnly：不讓用戶手動控制打勾 */}

              <input
                type='checkbox'
                checked={order.status === '交易完成'}
                readOnly
              />


              {/* 第二個區塊：訂單的產品照片 ＋ 名稱 ＋ 數量 */}
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
                          width={100}
                          height={100}
                          alt='item.image'
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
                          width={100}
                          height={100}
                          alt='item.image'
                        />

                        <p className='py-0.5'> {item.name} X {item.quantity} , </p>


                      </div>

                    )

                  }

                })}

              </div>


              {/* 第三個區塊：姓名 ＋ 商品種類、數量 ＋ 超商選擇 ＋ 門市代碼 ＋ 日期 */}
              {/* reduce()：處理元素(item)最後返回單一值，total 從 0 開始，每次累積到 total 中，直到最後返回一個最終的 total */}
              {/* split(',')：針對字串，以 '，'作分隔，然後返回一陣列 */}

              <div>

                <p className='mt-3 mb-2 font-medium'>客戶：{order.name}</p>

                <p className='mt-3 mb-2 font-medium'>有 {order.items.length} 種商品，共 {order.items.reduce((total, item) => total + item.quantity, 0)} 件 </p>

                <p className="mt-3 mb-2 font-medium">{order.store.split(' , ')[0]}</p>

                <p className="mt-3 mb-2 font-medium">{order.store.split(' , ')[1]}</p>

                <p className="mt-3 mb-2 font-medium">日期 : {new Date(order.date).toLocaleDateString()}</p>

              </div>


              {/* 第四個區塊：總金額 */}

              <p className='text-sm sm:text-[15px] text-center'>{currency}{order.amount}</p>


              {/* 第五個區塊：訂單狀態選單 ，改變會觸發 OnChange, 執行 statusHandler函式*/}
              {/* 給後端的資料中： status: event.target.value ， order.status 會依 value 不同而有所變化  */}

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className='p-2 font-semibold'
              >

                <option value="訂單處理中">訂單處理中</option>

                <option value="商品已寄件">商品已寄件</option>

                <option value="商品已到指定門市">商品已到指定門市</option>

                <option value="交易完成">交易完成</option>

              </select>

            </div>

          ))

        }

      </div>

    </div>

  )
}


export default Orders
