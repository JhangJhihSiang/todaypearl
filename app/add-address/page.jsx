'use client'

import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "@/context/ShopContext";
import { toast } from "react-toastify";

const AddAddress = () => {


    const { token, router } = useContext(ShopContext)


    // 會影響到 MongoDB 中的 stores collection中的資料順序

    const [address, setAddress] = useState({
        name: '',
        phoneNumber: '',
        store: '7-11',
        code: '',
        note: '',
    })


    // 提交新增門市的表單

    const onSubmitHandler = async (e) => {

        e.preventDefault();


        try {


            // 去指定後端 api/user/add-address 執行功能
            //  { address } ： 給後端的資料
            //  { headers: { Authorization: `Bearer ${token}` } } : 告訴後端我是誰
            // {data}： 解構賦值，為 NextResponse.json() 回傳的資料

            const { data } = await axios.post('/api/user/add-address', { address }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {

                toast.success(data.message, { autoClose: 500 })

                router.push('/cart')

            } else {

                toast.error(data.message)

            }

        } catch (error) {

            toast.error('請您先登入')

        }

    }


    return (

        <>

            <Navbar />



            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">



                {/* 門市資訊的表單 */}

                <form
                    onSubmit={onSubmitHandler}
                    className="w-full"
                >


                    <p className="text-2xl md:text-3xl font-semibold text-orange-600">

                        超商門市選擇

                    </p>


                    <div className="space-y-6 max-w-sm mt-10">


                        <div className="flex gap-6">


                            {/* 門市選擇 */}

                            <select
                                onChange={(e) => setAddress({ ...address, store: e.target.value })}
                                value={address.store}
                                className="border-2 border-gray-300 "
                            >

                                <option value="7-11">7-11</option>

                                <option value="全家">全家</option>

                            </select>


                            {/* 連結外部門市查詢網站 */}
                            {/* target="_blank" : 開新視窗 */}

                            {address.store === '7-11'

                                ?
                                <div>
                                    <a href="https://emap.pcsc.com.tw" target="_blank" className="text-blue-500 underline text-lg" >快速查詢7-11門市請按這</a>
                                </div>

                                :
                                <div>

                                    <a href="https://www.family.com.tw/Marketing/zh/Map" target="_blank" className="text-blue-500 underline text-lg" >快速查詢全家門市請按這</a>

                                </div>
                            }

                        </div>

                        {/* 門市代碼 */}

                        <input
                            onChange={(e) => setAddress({ ...address, code: e.target.value })}
                            value={address.code}
                            type="text"
                            placeholder="門市代碼"
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                        />


                        {/* 取貨時的證件姓名 */}

                        <input
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                            value={address.name}
                            type="text"
                            placeholder="姓名（須與證件相同）"
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                        />


                        {/* 手機號碼 */}

                        <input
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                            type="text"
                            placeholder="手機號碼"
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                        />


                        {/* 備註事項（選填） */}

                        <textarea
                            onChange={(e) => setAddress({ ...address, note: e.target.value })}
                            value={address.note}
                            type="text"
                            placeholder="備註事項（選填）"
                            rows={4}
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                        ></textarea>


                    </div>


                    {/* 按鈕會觸發onSubmit功能，提交表單，執行 {onSubmitHandler} */}

                    <button
                        type="submit"
                        className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase"
                    >

                        儲存

                    </button>

                </form>


                <Image
                    src={assets.my_location}
                    alt="my_location_image"
                    className="md:mr-16 mt-16 md:mt-0"
                />


            </div>


        </>
    );
};



export default AddAddress;