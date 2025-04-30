import { assets } from '@/assets/assets';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'


const ProductItem = ({ id, image, name, price }) => {
  // {id, image, name, price}：解構賦值，從父元件傳來的 props 中提取屬性，並賦值到變數中



  const { currency, addToCart } = useContext(ShopContext);


  const [isHovered, setIsHovered] = useState(false)





  return (

    <div>


      {/* 商品圖，點了進入該商品頁面 */}

      <Link
        href={`/product/${id}`}
        className='text-gray-700 cursor-pointer overflow-hidden'
      >

        <Image
          src={image[0]}
          alt="image"
          width={300}
          height={300}
          className='w-full hover:scale-105 transition ease-in-out rounded-lg'
        />

      </Link>



      <div className='flex justify-between items-center'>


        {/* 商品名稱 ＋ 價格 */}

        <div className='mt-1'>

          <p className='pt-3 pb-1 text-sm'>{name}</p>

          <p className='text-sm font-medium'>{currency}{price}</p>

        </div>


        {/* 愛心按鈕，按了會加入到購物車 */}

        <div>

          <button
            onClick={() => addToCart(id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
          >

            <Image
              src={isHovered ? assets.heart_icon_red : assets.heart_icon}
              alt='heart_icon'
              width={10}
              height={10}
            />

          </button>

        </div>

      </div>

    </div>

  )
}


export default ProductItem
