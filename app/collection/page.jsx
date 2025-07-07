'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import ProductItem from '@/components/ProductItem';
import Title from '@/components/Title';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import ScrollToTop from '@/components/ScrollToTop';



const Collection = () => {


  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState('relevant');




  // 控制主分類的函式

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }

  }


  // 控制次分類的函式

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }

  }



  // 控制篩選條件的函式

  const applyFilter = () => {


    // slice()：複製陣列，回傳新陣列，不會改變原陣列
    // 初始載入頁面時， category, subCategory, search 皆為空的，篩選條件皆不會生效，所以 productsCopy 會呈現所有 products

    let productsCopy = products.slice();



    // 篩選條件一：與使用者在 searchbar 輸入的名稱相符合的產品

    if (showSearch && search) {

      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    }



    // 篩選條件二：與主分類相符合的產品

    if (category.length > 0) {

      productsCopy = productsCopy.filter((item) => category.includes(item.category));

    }



    // 篩選條件三：與次分類相符合的產品

    if (subCategory.length > 0) {

      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));

    }


    setFilterProducts(productsCopy)

  }



  // 控制商品排序的函式

  const sortProduct = () => {

    let filterProductCopy = filterProducts.slice();


    // 根據 sortType 變數的不同而執行不同的程式，直到遇到 break

    switch (sortType) {


      // 當 sortType = 'low-high' ，將金額由小到大排序

      case 'low-high':

        setFilterProducts(filterProductCopy.sort((a, b) => (a.price - b.price)));

        break;



      // 當 sortType = 'high-low' ，將金額由大到小排序

      case 'high-low':

        setFilterProducts(filterProductCopy.sort((a, b) => (b.price - a.price)));

        break;



      default:

        applyFilter();

        break;

    }

  }



  useEffect(() => {

    applyFilter();

  }, [category, subCategory, search, showSearch, products])



  useEffect(() => {

    sortProduct();

  }, [sortType])




  return (

    <>

      <Navbar />


      <SearchBar />


      <div className='hidden sm:block'>

        <ScrollToTop />

      </div>



      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>


        {/* 篩選條件選項 */}

        <div className='min-w-60 mb-8'>

          <p
            onClick={() => setShowFilter(!showFilter)}
            className='my-2 text-xl flex items-center cursor-pointer gap-2'
          >

            篩選條件

            <Image
              src={assets.dropdown_icon}
              alt="dropdown_icon"
              className={`w-5 h-5 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            />

          </p>


          {/* 主分類類別 */}

          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>

            <p className='mb-3 text-sm font-medium'>分類</p>

            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

              <p className='flex items-center gap-2'>

                <input
                  onChange={toggleCategory}
                  value={'戒指'}
                  type="checkbox"
                  className='w-3 cursor-pointer'
                />

                戒指

              </p>

              <p className='flex items-center gap-2'>

                <input
                  onChange={toggleCategory}
                  value={'項鍊'}
                  type="checkbox"
                  className='w-3 cursor-pointer'
                />

                項鍊

              </p>

              <p className='flex items-center gap-2'>

                <input
                  onChange={toggleCategory}
                  value={'耳環'}
                  type="checkbox"
                  className='w-3 cursor-pointer'
                />

                耳環

              </p>

              <p className='flex items-center gap-2'>

                <input
                  onChange={toggleCategory}
                  value={'手環'}
                  type="checkbox"
                  className='w-3 cursor-pointer'
                />

                手環

              </p>

            </div>

          </div>

        </div>


        {/* 右側主要內容區塊 */}

        <div className='flex-1'>

          <div className='flex justify-between text-base sm:text-2xl mb-4'>

            <Title
              text1={'所有'}
              text2={'飾品'}
            />


            {/* 商品排序 */}

            <select
              onChange={(e) => setSortType(e.target.value)}
              className='border-2 border-gray-300 text-sm px-2'
            >

              <option value="relevant">相關性</option>

              <option value="low-high">價格：低到高</option>

              <option value="high-low">價格：高到低</option>

            </select>

          </div>


          {/* 商品圖 */}

          <div className='grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

            {
              filterProducts.map((item, index) => (

                <ProductItem
                  key={index}
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image}
                />



              ))
            }

          </div>

        </div>

      </div>

    </>

  )
}

export default Collection
