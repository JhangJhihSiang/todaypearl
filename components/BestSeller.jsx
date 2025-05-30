import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '@/context/ShopContext';

const BestSeller = () => {

  const { products } = useContext(ShopContext);

  const [bestSeller, setBestSeller] = useState([]);


  // 顯示五個 bestseller products
  // filter()：回傳符合條件的元素所組成的新陣列
  // slice(0,5)：提取 0 ~ 5的元素，不含 5 ，回傳新陣列，不會改變原陣列
  // filter()、slice()都是陣列方法

  useEffect(() => {

    const bestProduct = products.filter((item) => (item.bestseller));

    setBestSeller(bestProduct.slice(0, 5))


  }, [products])



  return (

    <div className='my-10'>


      {/* 標題 */}

      <div className='text-center text-4xl py-8'>

        <Title
          text1={'最燙手'}
          text2={'的東西'}
        />

        <p className='w-3/4 m-auto text-base sm:text-lg md:text-xl text-gray-600'>

          時尚流行的趨勢指標，成為回頭率百分百的路人吧

        </p>

      </div>


      {/* 顯示商品，將父元件的 props 傳到 ProductItem 的 props 中 */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

        {
          bestSeller.map((item, index) => (

            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />

          ))
        }

      </div>

    </div>

  )
}

export default BestSeller
