import { assets } from '@/assets/assets';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'


const SearchBar = () => {


    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);


    const [visible, setVisible] = useState(false)


    // 查看路徑的名稱

    const pathname = usePathname();



    // 只要 pathname 改變就執行 useEffect，當路徑名稱有 'collection' 就顯示 SearchBar

    useEffect(() => {

        if (pathname === '/collection') {

            setVisible(true);

        } else {

            setVisible(false);

        }

    }, [pathname])




    // showSearch 為 true，visible 為 true 才會顯示 SearchBar

    return showSearch && visible ? (

        <div className='border-t border-b bg-gray-50 text-center'>



            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>



                {/* 輸入框 */}

                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="text"
                    placeholder='Search'
                    className='flex-1 outline-none bg-inherit text-sm'
                />


                {/* 搜尋圖示 */}

                <Image
                    src={assets.search_icon}
                    alt="search_icon"
                    className='w-4'
                />

            </div>


            {/* 關閉圖示 */}

            <Image
                onClick={() => setShowSearch(false)}
                src={assets.cross_icon}
                alt="cross_icon"
                className='inline w-3 cursor-pointer'
            />


        </div>


    ) : null

    
}

export default SearchBar
