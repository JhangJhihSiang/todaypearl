'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { ShopContext } from '@/context/ShopContext';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import RelatedProducts from '@/components/RelatedProducts';
import Navbar from '@/components/Navbar';

const Product = () => {


    const { id } = useParams();


    const { products, currency, addToCart } = useContext(ShopContext);


    const [productData, setProductData] = useState(false);

    const [image, setImage] = useState('');

    const [size, setSize] = useState('');


    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }



    useEffect(() => {
        fetchProductData();
    }, [id, products])


    return productData ? (

        <>

            <Navbar />

            <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

                {/* Product Data */}

                <div className='flex flex-col sm:flex-row gap-12 sm:gap-12 '>




                    {/* Product Images */}

                    <div className='flex flex-1 flex-col-reverse gap-3 sm:flex-row '>

                        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]'>

                            {
                                productData.image.map((item, index) => (

                                    <Image
                                        onClick={() => setImage(item)}
                                        key={index}
                                        src={item}
                                        width={100}
                                        height={100}
                                        alt="image"
                                        className='sm:mb-3 flex-shrink-0 cursor-pointer'
                                    />

                                ))
                            }

                        </div>

                        <div className='w-full sm:w-[30%]'>

                            <Image src={image || productData.image[0] } width={400} height={400}  alt="image-big" />

                        </div>

                    </div>


                    {/* Product Info */}

                    <div className='flex-1 '>

                        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

                        <div className='flex items-center gap-1 mt-2'>

                            <Image src={assets.star_icon} className='w-3.5' alt="" />

                            <Image src={assets.star_icon} className='w-3.5' alt="" />

                            <Image src={assets.star_icon} className='w-3.5' alt="" />

                            <Image src={assets.star_icon} className='w-3.5' alt="" />

                            <Image src={assets.star_dull_icon} className='w-3.5' alt="" />

                            <p className='pl-2'>(122)</p>

                        </div>

                        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

                        <p className='mt-5 text-gray-500 md:w-4/5 '>{productData.description}</p>



                        <button onClick={() => addToCart(productData._id)} className='bg-black text-white px-8 py-3 mt-4 text-sm active:bg-gray-700'>加入購物車</button>

                        <hr className='mt-8 sm:w-4/5' />

                        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>

                            <p>100% Original product.</p>

                            <p>Cash on delivery is available on this product.</p>

                            <p>Easy return and exchange policy within 7 days.</p>

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


                {/* Display Related Products */}

                <RelatedProducts category={productData.category} subCategory={productData.subCategory} />



            </div>
        </>
    ) : <div className='opacity-0'></div>
}

export default Product
