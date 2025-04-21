'use client'

import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'


const List = () => {

    const{token}=useContext(ShopContext)


    const [list, setList] = useState([])


    const fetchList = async () => {

        try {

            const response = await axios.get("/api/product/list")

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

    const removeProduct = async(productId) => {

        try {

            const response = await axios.post('/api/product/remove',{productId}, { headers: { Authorization: `Bearer ${token}` } })

            console.log(response)

            if (response.data.success) {

                toast.success(response.data.message)

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


                {/* List Table Title */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm'>

                    <b>圖片</b>

                    <b>名稱</b>

                    <b>種類</b>

                    <b>價格</b>

                    <b className='text-center'>移除</b>

                </div>


                {/* Product List */}

                {
                    [...list].reverse().map((item, index) => {

                        console.log('Product ID:', item._id)

                        return(
                        <div key={index} className='grid gird-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 py-1 border text-sm'>

                            <Image src={item.image[0]} width={48} height={48} className='w-12' alt="" />

                            <p>{item.name}</p>

                            <p>{item.category}</p>

                            <p>${item.price}</p>

                            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>

                        </div>
                        )

})
                }

            </div>

        </>
    )
}

export default List
