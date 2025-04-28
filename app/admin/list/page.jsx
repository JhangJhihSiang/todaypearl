'use client'

import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'


const List = () => {

    const { token, currency } = useContext(ShopContext)


    const [list, setList] = useState([])


    //從後端抓取產品清單的函式   

    const fetchList = async () => {

        try {

            // 去指定後端 api/product/list 執行功能

            const response = await axios.get("/api/product/list")


            // response.data 跟 {data} 是一樣的意思
            // 成功的話使用 NextResponse.json() 所回傳的 products 資料

            if (response.data.success) {

                setList(response.data.products);

            } else {

                toast.error(response.data.message)

            }


        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }

    }


    // 移除產品的函式

    const removeProduct = async (productId) => {

        try {

            // 去指定後端 api/product/remove 執行功能
            // {productId} ： 給後端的資料
            // { headers: { Authorization: `Bearer ${token}` } } : 告訴後端我是誰

            const response = await axios.post('/api/product/remove', { productId }, { headers: { Authorization: `Bearer ${token}` } })

            console.log(response)


            // response.data 跟 {data} 是一樣的意思


            if (response.data.success) {

                toast.success(response.data.message, { autoClose: 500 })

                fetchList()

            } else {

                toast.error(response.data.message)

            }


        } catch (error) {

            console.log(error)

            toast.error(error.message)

        }
    }





    useEffect(() => {

        fetchList()

    }, [])



    return (

        <>

            <p className='mb-2'>產品列表</p>

            <div className='flex flex-col gap-2'>


                {/* 表格標題 */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>

                    <b>圖片</b>

                    <b>名稱</b>

                    <b>種類</b>

                    <b>價格</b>

                    <b className='text-center'>移除</b>

                </div>


                {/* 產品清單 */}

                {
                    [...list].reverse().map((item, index) => {

                        console.log('Product ID:', item._id)

                        return (

                            <div
                                key={index}
                                className='grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm'
                            >

                                <Image
                                    src={item.image[0]}
                                    width={48}
                                    height={48}
                                    alt="image[0]"
                                />

                                <p>{item.name}</p>

                                <p>{item.category}</p>

                                <p>{currency} {item.price}</p>


                                {/* 點擊Ｘ執行 removeProduct函式 */}

                                <p
                                    onClick={() => removeProduct(item._id)}
                                    className='text-right md:text-center cursor-pointer text-lg'
                                >

                                    X

                                </p>

                            </div>

                        )

                    })

                }

            </div>

        </>
    )
}


export default List
