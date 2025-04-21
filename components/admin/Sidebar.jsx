
import { admin_assets } from '@/assets/admin_assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {

    return (
        <div className='w-[18%] min-h-screen border-r-2'>

            <div className='flex flex-col gap-8 pt-10 pl-[20%] text-[15px]'>

                <Link href='/admin/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                    <Image src={admin_assets.add_icon} className='w-5 h-5' alt="" />

                    <p className='hidden md:block text-lg tracking-widest'>新增產品</p>

                </Link>

                <Link href='/admin/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                    <Image src={admin_assets.order_icon} className='w-5 h-5' alt="" />

                    <p className='hidden md:block text-lg tracking-widest'>產品清單</p>

                </Link>


                <Link href='/admin/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                    <Image src={admin_assets.order_icon} className='w-5 h-5' alt="" />

                    <p className='hidden md:block text-lg tracking-widest'>訂單</p>

                </Link>


            </div>

        </div>
    )
}

export default Sidebar
