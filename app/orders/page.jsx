'use client'


import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { admin_assets } from '@/assets/admin_assets'
import { useRouter } from 'next/navigation'
import { ShopContext } from '@/context/ShopContext'
import Navbar from '@/components/Navbar'
import Title from '@/components/Title'
import { assets } from '@/assets/assets'

const Orders = () => {

  const {token, currency} = useContext(ShopContext)


  const [orders, setOrders] = useState([])
  



  const fetchAllOrders = async () => {

    if (!token) {

      toast.error('please login first')
      return null;
    }

    try {

      const response = await axios.get('/api/order/list', { headers: {Authorization: `Bearer ${token}`}})

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



  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post('/api/order/status', {orderId, status:event.target.value}, {headers: {token}})

      if(response.data.success){

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



    // Function to determine styles based on status
    const getStatus = (status) => {

      switch(status) {
        case '訂單處理中':
          return (<Image src={assets.gray_circle} width={20} height={20}/>);  // Order Placed status
        case '商品已寄件':
          return (<Image src={assets.yellow_circle} width={20} height={20}/>);  // Order Placed status
        case '商品已到指定門市，記得取貨唷～':
          return (<Image src={assets.red_circle} width={20} height={20}/>);  // Order Placed status
        case '交易完成':
          return (<Image src={assets.green_circle} width={20} height={20}/>);  // Order Placed status
        default:
          return '';  // Default empty string if no status matches
      }
    }






  return (

    <>
    <Navbar />

    <div>

      <Title text1={'我的'} text2={'訂單'} />

      <div>

        {
          orders.map((order, index) => (
            
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>

<Image
    key={index}
    src={order.items.image}
    width={48}
    height={48}
    className="w-12 h-12 object-cover"
    alt={order.name}/>
              <div>


                <div>

                  {order.items.map((item, index) => {
                    
                    if (index === order.items.length - 1) {
                      
                      // return <p key={index} className='py-0.5'> {item.name} X {item.quantity}</p>
                      return <Image src={item.image[0]} width={100} height={100} alt='item.image' />
                      
                    } else {
                      
                      // return <p key={index} className='py-0.5'> {item.name} X {item.quantity} , </p>
                      return <Image src={item.image[0]} width={100} height={100} alt='item.image' />
                      
                    }
                    
                  })}

                </div>

                <p className='mt-3 mb-2 font-medium'>{order.store}</p>

                {/* <div>

<p>{order.address.store + ","}</p>

<p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>


</div> */}

                {/* <p>{order.address.phone}</p> */}

              </div>

              <div>

                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>

                {/* <p className='mt-3'>Method : {order.paymentMethod}</p> */}

                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>

                <p>Date : {new Date(order.date).toLocaleDateString()}</p>

              </div>

              <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>


              

                <div>
                {/* Display status with dynamic prefix */}
                <p className='flex gap-3'>{getStatus(order.status)} {order.status}</p>
              </div>             

              {/* <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>

                <option value="訂單處理中">訂單處理中</option>

                <option value="商品已寄件">商品已寄件</option>

                <option value="商品已到指定門市，記得取貨唷～">商品已到指定門市，記得取貨唷～</option>

                <option value="交易完成">交易完成</option>



              </select> */}

            </div>
          ))
        }

      </div>

    </div>
        </>
  )
}

export default Orders
