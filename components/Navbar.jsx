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


        // 解碼 token , token分為 header, payload, signature
        // payload是主要訊息，包含了 id , role資訊，因此取 [1]也就是第二個元素 payload

        if (token) {

            const decodedToken = JSON.parse(atob(token.split('.')[1]));

            if (decodedToken.role === 'admin') {
                setIsAdmin(true);
            }
        }
    }, [token]);





    // 登出功能

    const logout = () => {

        router.push('/')

        localStorage.removeItem('token')

        setToken('')

        setCartItems({})

        setIsAdmin(false)

        toast.success('成功登出！期待您下次再度光臨', { autoClose: 500 })



    }





    return (

        <nav className='flex items-center justify-between py-5 font-medium'>


            {/* 品牌 logo */}

            <Link href='/'>

                <Image
                    src={assets.today_pearl_logo_1}
                    alt="today_pearl_logo_1"
                    className='w-36'
                />

            </Link>


            {/* 導覽列 */}

            <div className='hidden sm:flex gap-10 text-base text-gray-700'>

                <Link
                    href='/'
                    className='flex flex-col items-center gap-1 group'
                >

                    <p>首頁</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>

                <Link
                    href='/collection'
                    className='flex flex-col items-center gap-1 group'
                >

                    <p>飾品</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/collection' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>


                <Link
                    href='/about'
                    className='flex flex-col items-center gap-1 group'
                >

                    <p>關於今珠</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/about' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>


                <Link
                    href='/contact'
                    className='flex flex-col items-center gap-1 group'
                >

                    <p>聯絡我們</p>

                    <hr className={`w-11/12 border-none h-[1.5px] bg-[#fab3a9] ${pathname === '/contact' ? 'block' : 'hidden group-focus:block'}`} />

                </Link>



            </div>


            <div className='flex items-center gap-6'>


                {/* 路徑是 collection 的話，顯示搜尋圖示 */}

                {pathname === '/collection' && (

                    <Image
                        onClick={() => setShowSearch((prev) => !prev)}
                        src={assets.search_icon}
                        alt="search_icon"
                        className="w-5 cursor-pointer"
                    />
                )}


                {/* 身份為管理員的話，顯示芝麻開門按鈕 */}

                {isAdmin && (

                    <button
                        onClick={() => router.push('/admin')}
                        className='bg-gray-600 text-white px-5 sm:px-7 sm:py-2 rounded-full text-sm sm:text-base'
                    >

                        芝麻開門

                    </button>
                )}


                {/* 個人檔案圖示 */}

                <div className='group relative'>

                    <Image
                        onClick={() => token ? null : router.push('/login')}
                        src={assets.profile_icon}
                        alt="profile_icon"
                        className='w-5 cursor-pointer'
                    />


                    {/* 有 token 才顯示下拉選單 */}

                    {token &&


                        // 將整個變成一個 group，碰到任何一個地方都會顯示

                        <div className='hidden group-hover:block absolute  right-0 pt-4 z-10'>

                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100  text-gray-500 rounded'>

                                <p
                                    onClick={() => router.push('/orders')}
                                    className='cursor-pointer hover:text-black'
                                >

                                    我的訂單

                                </p>


                                {/* 點擊執行 logout函式，也就是登出功能 */}

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


                {/* 購物車圖示 */}

                <Link
                    href='/cart'
                    className='relative'
                >

                    <Image
                        src={assets.cart_icon}
                        alt="cart_icon"
                        className='w-5 min-w-5'
                    />

                    <p className='absolute w-4 right-[-5px] bottom-[-5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

                </Link>


                {/* 只有在小螢幕時才會出現的漢堡選單 */}

                <Image
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    alt="menu_icon"
                    className='w-5 cursor-pointer lg:hidden'
                />

            </div>


            {/* 點擊漢堡選單時會出現導覽列 */}

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full z-50' : 'w-0'}`}>


                <div className='flex flex-col text-gray-600'>


                    {/* 返回功能 */}

                    <div
                        onClick={() => setVisible(false)}
                        className='flex items-center gap-4 p-3 cursor-pointer'
                    >

                        <Image
                            src={assets.dropdown_icon}
                            alt="dropdown_icon"
                            className='w-4 h-4 rotate-180'
                        />

                        <p>返回</p>

                    </div>


                    {/* 導覽列 */}

                    <Link
                        href='/'
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                    >
                        首頁

                    </Link>

                    <Link
                        href='/collection'
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                    >
                        飾品

                    </Link>

                    <Link
                        href='/about'
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                    >
                        關於今珠

                    </Link>

                    <Link
                        href='/contact'
                        onClick={() => setVisible(false)}
                        className='py-2 pl-6 border hover:bg-[#fabea9]'
                    >
                        聯絡我們

                    </Link>


                </div>

            </div>


        </nav>
    )
}


export default Navbar
