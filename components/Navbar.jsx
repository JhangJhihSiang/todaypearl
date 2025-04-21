'use client'

import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Link from 'next/link'
import Image from 'next/image';
import { ShopContext } from '../context/ShopContext';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';


const Navbar = () => {


    const [visible, setVisible] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);



    const { setShowSearch, getCartCount, token, setToken, setCartItems, router } = useContext(ShopContext);


    const pathname = usePathname()


    useEffect(() => {
        // 假设你将角色信息存储在 localStorage 或 token 中
        const userToken = localStorage.getItem('token');  // 从 localStorage 获取 token

        if (userToken) {
            const decodedToken = JSON.parse(atob(userToken.split('.')[1]));  // 解码 token
            if (decodedToken.role === 'admin') {
                setIsAdmin(true);  // 如果角色是 admin, 显示管理员按钮
            }
        }
    }, [token]); // token 更新时，重新检查是否是管理员

    






    const logout = () => {

        router.push('/')

        localStorage.removeItem('token')

        setToken('')

        setCartItems({})

        setIsAdmin(false)

        toast.success('成功登出！期待您下次再度光臨')



    }





    return (

        <nav className='flex items-center justify-between py-5 font-medium'>

            <Link href='/'>

                <Image
                    src={assets.today_pearl_logo_1}
                    className='w-36'
                    alt="today_pearl_logo_1"
                />

            </Link>

            <div className='hidden sm:flex gap-10 text-base text-gray-700'>

                <Link href='/' className='flex flex-col items-center gap-1 group'>

                    <p>首頁</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>

                <Link href='/collection' className='flex flex-col items-center gap-1 group'>

                    <p>飾品</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/collection' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>


                <Link href='/about' className='flex flex-col items-center gap-1 group'>

                    <p>關於今珠</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/about' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>


                <Link href='/contact' className='flex flex-col items-center gap-1 group'>

                    <p>聯絡我們</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/contact' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>




            </div>


            <div className='flex items-center gap-6'>

                {pathname === '/collection' && (

                    <Image
                        src={assets.search_icon}
                        onClick={() => setShowSearch((prev) => !prev)}
                        className="w-5 cursor-pointer"
                        alt="search_icon"
                    />
                )}

                {isAdmin && (
                    <button
                        onClick={() => router.push('/admin')}
                        className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-sm sm:text-base'>芝麻開門</button>
                )}



                <div className='group relative'>

                    <Image
                        src={assets.profile_icon}
                        onClick={() => token ? null : router.push('/login')}
                        className='w-5 cursor-pointer'
                        alt="profile_icon"
                    />


                    {/* Dropdown Menu */}

                    {token &&


                        <div className='hidden group-hover:block absolute  right-0 pt-4 z-10'>

                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100  text-gray-500 rounded'>

                                <p
                                    onClick={() => router.push('/orders')}
                                    className='cursor-pointer hover:text-black'
                                >
                                    我的訂單
                                </p>


                                <p
                                    onClick={logout}
                                    className='cursor-pointer hover:text-black'
                                >
                                    登出
                                </p>

                            </div>

                        </div>
                    }

                </div>

                <Link href='/cart' className='relative'>

                    <Image
                        src={assets.cart_icon}
                        className='w-5 min-w-5'
                        alt="cart_icon"
                    />

                    <p className='absolute w-4 right-[-5px] bottom-[-5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

                </Link>

                <Image
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className='w-5 cursor-pointer sm:hidden'
                    alt="menu_icon"
                />

            </div>

            {/* Sidebar Menu For Small Screens */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full z-50' : 'w-0'}`}>


                <div className='flex flex-col text-gray-600'>

                    <div
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-4 p-3 cursor-pointer'
                    >

                        <Image
                            src={assets.dropdown_icon}
                            className='h-4 rotate-180'
                            alt="dropdown_icon"
                        />

                        <p>返回</p>

                    </div>

                    <Link
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                        href='/'
                    >
                        首頁

                    </Link>

                    <Link
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                        href='/collection'
                    >
                        飾品

                    </Link>

                    <Link
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                        href='/about'
                    >
                        關於今珠

                    </Link>

                    <Link
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                        href='/contact'
                    >
                        聯絡我們

                    </Link>


                </div>

            </div>


        </nav>
    )
}

export default Navbar
