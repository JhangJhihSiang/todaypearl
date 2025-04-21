'use client'

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

export const ShopContext = createContext();


const ShopContextProvider = (props) => {

    const currency = '$';

    const delivery_fee = 60;

    const router = useRouter();

    const [search, setSearch] = useState('');

    const [showSearch, setShowSearch] = useState(false);

    const [cartItems, setCartItems] = useState({});

    const [products, setProducts] = useState([]);

    const [token, setToken] = useState('');




    
    
    
    const getUserCart = async (token) => {
        
        
        try {
            
            const response = await axios.get('/api/cart/get', { headers: { Authorization: `Bearer ${token}` } })
            
            console.log("Cart Data Response:", response.data);
            
            if (response.data.success) {
                
                setCartItems(response.data.cartData)
            }
            
        } catch (error) {
            
            console.log(error)
            toast.error(error.message)
            
        }
        
    }
    
    
    const addToCart = async (itemId) => {
        
        
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]) {
            
            cartData[itemId] += 1;
            
        } else {
            cartData[itemId] = 1;
        }
        
        setCartItems(cartData);

        toast.success('已成功加入購物車')
        
        
        if (token) {
            
            try {
                
                await axios.post('/api/cart/update', { cartData }, { headers: { Authorization: `Bearer ${token}` } });
                
                
                
            } catch (error) {
                
                console.log(error)
                
                toast.error(error.message)
                
            }
        }
        
    }
    
    
    
    const getCartCount = () => {
        
        let totalCount = 0;
        
        for (const items in cartItems) {
            
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
            
            
        }
        
        return totalCount;
    }
    
    
    
    const updateQuantity = async (itemId, quantity) => {
        
        let cartData = structuredClone(cartItems);
        
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        
        setCartItems(cartData)
        
        if (token) {
            
            try {
                
                await axios.post('/api/cart/update', { cartData }, { headers: { Authorization: `Bearer ${token}` } })
                
            } catch (error) {
                
                console.log(error)
                toast.error(error.message)
                
            }
            
        }
        
    }




    
    const getProductsData = async () => {

        try {

            const response = await axios.get("/api/product/list")

            if (response.data.success) {

                setProducts(response.data.products)

            } else {

                toast.error(response.data.message)
            }





        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }

    }
    

    
    
    const getCartAmount = () => {

        let totalAmount = 0;

        for (const items in cartItems) {

            let itemInfo = products.find((product) => product._id === items);

            try {

                if (cartItems[items] > 0) {
                    totalAmount += itemInfo.price * cartItems[items];
                }

            } catch (error) {
                console.log(error)

            }

        }

        return totalAmount;

    }







    useEffect(() => {
        getProductsData();
    }, [])




    // 第一步：載入 localStorage 的 token
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    // 第二步：當 token 設好後，呼叫 getUserCart
    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);










    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        token,
        setToken,
        router




    }

    return (

        <ShopContext.Provider value={value}>

            {props.children}

        </ShopContext.Provider>
    )

}


export default ShopContextProvider;