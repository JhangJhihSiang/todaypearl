
import { ShopContext } from "@/context/ShopContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, token, cartItems, setCartItems, delivery_fee, products} = useContext(ShopContext)
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddress, setUserAddress] = useState([]);



  const fetchUserAddress = async () => {

    try {


      const response = await axios.get('/api/user/get-address', {headers: {Authorization: `Bearer ${token}`}})


      if(response.data.success){
        setUserAddress(response.data.address)

        if(response.data.address.length > 0){

          setSelectedAddress(response.data.address[0])

        }
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error('請您先登入')
      
    }

  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };



  const createOrder = async () => {

    try {

      if(!selectedAddress){
        return toast.error('請選擇一間門市')
      }


      let cartItemsArray = Object.keys(cartItems).map((key) => ({product: key, quantity: cartItems[key]}))

      cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0) 


      if(cartItemsArray.length === 0){
        return toast.error('購物車是空的餒～')
      }

      const {data} = await axios.post('/api/order/create', {store: `超商選擇：${selectedAddress.store} , 門市代碼：${selectedAddress.code}`, items: cartItemsArray } , {headers: {Authorization:`Bearer ${token}` } })


      if(data.success){

        toast.success('恭喜您成功建立訂單')

        setCartItems({})

        router.push('/')

      }else{
        toast.error(data.message)
      }


      
    } catch (error) {

      toast.error(error.message)
      
    }

  }

  useEffect(() => {


      fetchUserAddress();

  }, [])

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">

      <h2 className="text-xl md:text-2xl font-medium text-gray-700">

        訂單明細

      </h2>

      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">

        <div>

          <label className="text-base font-medium uppercase text-gray-600 block mb-2">

            店到店門市選擇

          </label>

          <div className="relative inline-block w-full text-sm border">

            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >

              <span>

                {selectedAddress

                  ? `超商選擇： ${selectedAddress.store} , 門市代碼： ${selectedAddress.code}`

                  : "Select Address"}

              </span>

              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
              >

                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />

              </svg>

            </button>

            {isDropdownOpen && (

              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">

                {userAddress.map((address, index) => (

                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-orange-600/30 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    超商選擇： {address.store} , 門市代碼： {address.code}

                  </li>

                ))}

                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-orange-600/30 cursor-pointer text-center"
                >
                  + 店到店門市
                </li>
              </ul>
            )}
          </div>
        </div>


        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-6">
          <div className="flex justify-between text-base font-medium">
            <p className="text-gray-600">共 {getCartCount()} 件商品</p>
            <p className="text-gray-800">{currency} {getCartAmount()}</p>
          </div>
          <div className="flex justify-between text-base font-medium">
            <p className="text-gray-600">店到店運費</p>
            <p className="text-gray-800">{currency} {delivery_fee}</p>
          </div>

          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>總金額</p>
            <p>{currency}{getCartAmount() + delivery_fee }</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        送出訂單
      </button>
    </div>
  );
};

export default OrderSummary;