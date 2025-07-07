import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';
import { ShopContext } from '@/context/ShopContext';

const RelatedProducts = ({ category, subCategory }) => {
    // ({category, subCategory}：解構賦值，從父元件傳來的 props 中提取屬性，並賦值到變數中


    const { products } = useContext(ShopContext);


    const [related, setRelated] = useState([]);




    // 在 products 的值發生變化時執行 useEffect，當產品資料載入或更新時，會重新計算相關產品

    useEffect(() => {


        // products 陣列不為空才繼續執行操作

        if (products.length > 0) {


            // 拷貝一整個 products 陣列
            // slice()：陣列方法，會回傳新陣列，不會改變原陣列

            let productsCopy = products.slice();


            // filter()：陣列方法，回傳符合條件的元素所組成的新陣列
            // 第一層篩選：保留 category 相符合的產品

            productsCopy = productsCopy.filter((item) => category === item.category);


            // 第二層篩選：再保留 subCategory 也符合的產品

            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);


            // 只取前五筆符合 category + subCategory 的產品，設定為 related 狀態

            setRelated(productsCopy.slice(0, 5));


        }

    }, [products])




    return (

        <div className='my-24'>


            {/* 標題 */}

            <div className='text-center text-3xl py-2'>

                <Title
                    text1={'RELATED'}
                    text2={'PRODUCTS'}
                />

            </div>



            {/* 顯示商品，將父元件的 props 傳到 ProductItem 的 props 中 */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

                {
                    related.map((item, index) => (

                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />

                    ))
                }

            </div>

        </div>
    )
}


export default RelatedProducts
