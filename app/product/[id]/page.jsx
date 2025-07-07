'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import RelatedProducts from '@/components/RelatedProducts';
import Navbar from '@/components/Navbar';

const Product = () => {

    // useParams()： 讀取網址中的動態參數，也就是[id]
    // {id} : 解構賦值，取得 useParams() 回傳物件中的 id 屬性

    const { id } = useParams();


    const { products, currency, addToCart } = useContext(ShopContext);


    const [productData, setProductData] = useState(false);

    const [image, setImage] = useState('');

    const [size, setSize] = useState('');



    // 取得產品資訊

    const fetchProductData = async () => {


        // 尋找產品 id 與 網址中的動態參數 [id] 相符合的產品

        const product = products.find(product => product._id === id);

        setProductData(product);

    }



    useEffect(() => {

        fetchProductData();

    }, [id, products])




    // 有產品資訊才呈現畫面

    return productData ? (

        <>

            <Navbar />


            <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>


                {/* 產品區塊： 圖片 ＋ 資訊 ＋ 補充 */}

                <div className='flex flex-col sm:flex-row gap-12 sm:gap-12 '>


                    {/* 產品圖片 */}

                    <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row '>


                        {/* 旁邊產品小圖 */}

                        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]'>


                            {
                                productData.image.map((item, index) => (

                                    <Image
                                        key={index}
                                        onClick={() => setImage(item)}
                                        src={item}
                                        alt="image"
                                        width={100}
                                        height={100}
                                        className='sm:mb-3 flex-shrink-0 cursor-pointer'
                                    />

                                ))
                            }

                        </div>


                        {/* 產品主視覺圖 */}

                        <div className='w-full sm:w-[30%]'>

                            <Image
                                src={image || productData.image[0]}
                                alt="image-big"
                                width={400}
                                height={400}
                            />

                        </div>

                    </div>


                    {/* 產品資訊 */}

                    <div className='flex-1 '>


                        {/* 產品名稱 */}

                        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>


                        {/* 星星圖示 */}

                        <div className='flex items-center gap-1 mt-2'>

                            <Image 
                                src={assets.star_icon} 
                                alt="star_icon" 
                                className='w-3.5' 
                            />

                            <Image 
                                src={assets.star_icon} 
                                alt="star_icon" 
                                className='w-3.5' 
                            />

                            <Image 
                                src={assets.star_icon} 
                                alt="star_icon" 
                                className='w-3.5' 
                            />

                            <Image 
                                src={assets.star_icon} 
                                alt="star_icon" 
                                className='w-3.5' 
                            />

                            <Image 
                                src={assets.star_dull_icon} 
                                alt="star_dull_icon" 
                                className='w-3.5' 
                            />

                            <p className='pl-2'>(122)</p>

                        </div>


                        {/* 產品售價 */}

                        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>


                        {/* 產品介紹 */}

                        <p className='mt-5 text-gray-500 md:w-4/5 '>{productData.description}</p>


                        {/* 加入購物車按鈕，按下後執行 addToCart 函式 */}

                        <button 
                            onClick={() => addToCart(productData._id)} 
                            className='bg-black text-white px-8 py-3 mt-4 text-sm active:bg-gray-700'
                        >
                            
                            加入購物車
                        
                        </button>


                        <hr className='mt-8 sm:w-4/5' />


                        {/* 額外補充資訊 */}

                        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

                            <p>100% 天然珍珠</p>

                            <p>超商店到店取貨</p>

                            <p>服務頂</p>

                        </div>


                    </div>


                </div>


                {/* Description % Review Section */}

                <div className='mt-20'>

                    <div className='flex'>

                        <b className='border px-5 py-3 text-sm'>Description</b>

                        <p className='border px-5 py-3 text-sm'>Reviews (122)</p>

                    </div>

                    <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>

                        <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves a virtual marketplace where business and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

                        <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>


                    </div>

                </div>


                {/* 將產品的 category , subCategory 傳到 RelatedProducts 中，呈現相關產品 */}

                <RelatedProducts 
                    category={productData.category} 
                    subCategory={productData.subCategory} 
                />



            </div>
        </>

    )

        : <div className='opacity-0'></div>

}

export default Product
