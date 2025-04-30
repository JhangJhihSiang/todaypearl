import { ShopContext } from '@/context/ShopContext';
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {


  const { products } = useContext(ShopContext);


  const [latestProducts, setLatestProducts] = useState([]);




  // 顯示最新的10個產品
  // [...product] : 拷貝陣列，不改變原來陣列
  // reverse() : 反轉陣列，新的在前，舊的在後，會改變原陣列
  // slice(0,10) : 提取 0 ~ 9 的元素，不包含10，回傳新陣列，不會改變原陣列
  // reverse() , slice()都是陣列方法

  useEffect(() => {

    setLatestProducts([...products].reverse().slice(0, 10));

  }, [products])






  return (


    <div className='my-10'>


      {/* 標題 */}

      <div className='text-center py-8 text-4xl '>

        <Title
          text1={'剛出爐'}
          text2={'的東西'}
        />

        <p className='w-3/4 m-auto text-base sm:text-lg md:text-xl text-gray-600'>

          結合美感、流行、創意與靈巧的雙手編織而成

        </p>

      </div>


      {/* 顯示商品，將父元件的 props 傳到 ProductItem 的 props 中 */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

        {
          latestProducts.map((item, index) => (

            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />

          ))
        }

      </div>

    </div>
  )
}

export default LatestCollection
