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



  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }

  }


  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }

  }



  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {

      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    }

    if (category.length > 0) {

      productsCopy = productsCopy.filter((item) => category.includes(item.category));

    }

    if (subCategory.length > 0) {

      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));

    }

    setFilterProducts(productsCopy)

  }



  const sortProduct = () => {

    let filterProductCopy = filterProducts.slice();

    switch (sortType) {

      case 'low-high':
        setFilterProducts(filterProductCopy.sort((a, b) => (a.price - b.price)));

        break;

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
      
      <ScrollToTop />


      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

        {/* Filter Options */}

        <div className='min-w-60 mb-8'>

          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>篩選條件

            <Image src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />

          </p>


          {/* Category Filter */}

          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>

            <p className='mb-3 text-sm font-medium'>分類</p>

            <div className='flex flex-col gap-2 text-sm font-light text-gray-700 align-middle'>

              <p className='flex items-center gap-2'>

                <input type="checkbox" className='w-3 cursor-pointer' value={'戒指'} onChange={toggleCategory} />

                戒指

              </p>

              <p className='flex items-center gap-2'>

                <input type="checkbox" className='w-3 cursor-pointer' value={'項鍊'} onChange={toggleCategory} />

                項鍊

              </p>

              <p className='flex items-center gap-2'>

                <input type="checkbox" className='w-3 cursor-pointer' value={'耳環'} onChange={toggleCategory} />

                耳環

              </p>

              <p className='flex items-center gap-2'>

                <input type="checkbox" className='w-3 cursor-pointer' value={'手環'} onChange={toggleCategory} />

                手環

              </p>

            </div>

          </div>

        </div>


        {/* Right Side */}

        <div className='flex-1'>

          <div className=' flex justify-between text-base sm:text-2xl mb-4'>

            <Title text1={'所有'} text2={'飾品'} />


            {/* Product Sort */}

            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>

              <option value="relevant">相關性</option>

              <option value="low-high">價格：低到高</option>

              <option value="high-low">價格：高到低</option>

            </select>

          </div>


          {/* Map Products */}

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
