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

    const [address, setAddress] = useState({
        name: '',
        phoneNumber: '',
        store: '7-11',
        code: '',
        note: '',
    })

    const onSubmitHandler = async (e) => {

        e.preventDefault();


        try {


            const { data } = await axios.post('/api/user/add-address', { address }, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                toast.success(data.message)
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

                <form onSubmit={onSubmitHandler} className="w-full">

                    <p className="text-2xl md:text-3xl font-semibold text-orange-600">

                        超商門市選擇

                    </p>

                    <div className="space-y-6 max-w-sm mt-10">

                        <div className="flex gap-6">


                            <select
                                onChange={(e) => setAddress({ ...address, store: e.target.value })}
                                value={address.store}
                                className="border-2 border-gray-300 "
                            >

                                <option value="7-11">7-11</option>

                                <option value="全家">全家</option>


                            </select>


                            {address.store === '7-11'
                                ?

                                <div>
                                    <a href="https://emap.pcsc.com.tw" target="_blank" className="text-blue-500 underline text-lg" >快速查詢7-11門市請按這</a>
                                </div>

                                : <div>

                                    <a href="https://www.family.com.tw/Marketing/zh/Map" target="_blank" className="text-blue-500 underline text-lg" >快速查詢全家門市請按這</a>

                                </div>
                            }
                        </div>

                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="門市代碼"
                            onChange={(e) => setAddress({ ...address, code: e.target.value })}
                            value={address.code}
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="姓名（須與證件相同）"
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                            value={address.name}
                        />

                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="手機號碼"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />


                        <textarea
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                            type="text"
                            rows={4}
                            placeholder="備註事項（選填）"
                            onChange={(e) => setAddress({ ...address, note: e.target.value })}
                            value={address.note}
                        ></textarea>



                    </div>

                    <button type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase">
                        儲存
                    </button>

                </form>

                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location}
                    alt="my_location_image"
                />

            </div>


        </>
    );
};



export default AddAddress;