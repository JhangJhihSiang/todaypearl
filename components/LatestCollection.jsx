import { ShopContext } from '@/context/ShopContext';
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {

  const {products} = useContext(ShopContext);

  const[latestProducts, setLatestProducts] = useState([]);


  useEffect(() => {

    setLatestProducts(products.slice(0, 10));

  }, [products])




  return (
    <div className='my-10'>

        <div className='text-center py-8 text-4xl '>

            <Title text1={'剛出爐'} text2={'的東西'} />

            <p className='w-3/4 m-auto text-base sm:text-lg md:text-xl text-gray-600'>結合美感、流行、創意與靈巧的雙手編織而成</p>

        </div>


        {/* Rendering Products */}

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
