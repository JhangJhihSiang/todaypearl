import { assets } from '@/assets/assets';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';


const ProductItem = ({ id, image, name, price }) => {
  // {id, image, name, price}：解構賦值，從父元件傳來的 props 中提取屬性，並賦值到變數中



  const { currency, addToCart, updateQuantity } = useContext(ShopContext);


  const [isHovered, setIsHovered] = useState(false);  //是否滑鼠有接觸到

  const [isClicked, setIsClicked] = useState(false);  // 是否有點擊過




  // 滑鼠有接觸到或是有被點擊過就顯示紅心，否則就顯示空心

  const heartIcon = isHovered || isClicked ? assets.heart_icon_red : assets.heart_icon;




  // 控制愛心的點擊功能

  const handleHeartClick = () => {


    // 已經有被點擊過的情形下(紅心)，再被點擊後執行以下功能

    if (isClicked) {

      updateQuantity(id, 0);

      toast.success('已從購物車移除', { autoClose: 500 })



      // 尚未被點擊過的情形下(空心)，再被點擊後執行以下功能

    } else {

      addToCart(id);

    }


    // true <--> false相互轉換

    setIsClicked(!isClicked);


  };





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


        {/* 愛心按鈕，按了執行 handleHeartClick 函式*/}
        {/* 若已被點擊過(紅心)會從購物車移除，尚未被點擊過(空心)會加到購物車中 */}

        <div>

          <button
            onClick={handleHeartClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition"
          >

            <Image
              src={heartIcon}
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
