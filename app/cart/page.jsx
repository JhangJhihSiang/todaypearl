'use client'
import React, { useContext } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { ShopContext } from "@/context/ShopContext";
import Title from "@/components/Title";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateQuantity, getCartCount, token, currency } = useContext(ShopContext);

  return (

    <>

      <Navbar />


      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">

        <div className="flex-1">

          <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">

            <p className="text-2xl md:text-3xl text-gray-500">

                <Title text1={'我的'} text2={'購物車'} />

            </p>

            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>

          </div>


          <div className="overflow-x-auto">

            <table className="min-w-full table-auto">

              <thead className="text-left">

                <tr>

                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    商品明細
                  </th>

                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    價格
                  </th>

                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    數量
                  </th>

                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    金額
                  </th>

                  <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                    移除
                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.keys(cartItems).map((itemId) => {

                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (

                    <tr key={itemId}>

                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">

                        <div>

                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">

                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                              width={1280}
                              height={720}
                            />

                          </div>


                        </div>

                        <div className="text-sm hidden md:block">

                          <p className="text-gray-800">{product.name}</p>

                        </div>

                      </td>

                      <td className="py-4 md:px-4 px-1 text-gray-600">${product.price}</td>

                      <td className="py-4 md:px-4 px-1">

                        <div className="flex items-center md:gap-2 gap-1">

                          <button onClick={() => updateQuantity(product._id, cartItems[itemId] - 1)}>

                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease_arrow"
                              className="w-4 h-4"
                            />

                          </button>

                          <input 
                            onChange={e => updateQuantity(product._id, Number(e.target.value))} 
                            value={cartItems[itemId]} 
                            type="number" 
                            className="w-8 border text-center appearance-none"
                          />

                          <button onClick={() => addToCart(product._id)}>

                            <Image
                              src={assets.increase_arrow}
                              alt="increase_arrow"
                              className="w-4 h-4"
                            />

                          </button>

                        </div>

                      </td>

                      <td className="py-4 md:px-4 px-1 text-gray-600">{currency} {(product.price * cartItems[itemId])}</td>

                      <td className="py-4 md:px-4 px-1 text-gray-600">

                        <Image
                          onClick={() => updateQuantity(product._id, 0)}
                          src={assets.bin_icon} 
                          width={20}
                          className="cursor-pointer hover:scale-110"
                        />

                      </td>


                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

          <button 
            onClick={()=> router.push('/collection')} 
            className="group flex items-center mt-6 gap-2 text-orange-600"
          >

            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.left_arrow}
              alt="arrow_right_icon_colored"
            />

            繼續血拼

          </button>

        </div>

        <OrderSummary />

      </div>

    </>


  );
};

export default Cart;
