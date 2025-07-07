import productModel from "@/models/productModel";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import orderModel from "@/models/orderModel";
import storeModel from "@/models/storeModel";


// 前端在 components => OrderSummary.jsx


export async function POST(req) {


    try {

        // 一：對應到 『 orders collection 』 中的 userId 欄位
        // 從前端 { headers: { Authorization: `Bearer ${token}` } } 中取得 Authorization 的值
        // 用 split(' ') 作分隔取得 [ " Bearer " , " token的值 "]，[1]的元素即我們要的 token

        const token = req.headers.get('Authorization')?.split(' ')[1];


        if (!token) {

            return NextResponse.json({ success: false, message: 'No token provided' });

        }


        // 用 jwt.sign({ id, role }, process.env.JWT_SECRET) 建立 JWT
        // jwt.verify() 驗證並解碼 token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // JWT 的 payload 部分包含 id , role 取其中 id 屬性

        const userId = decoded.id;

        if (!userId) {

            return NextResponse.json({ success: false, message: 'User not found' });

        }


        // 前端傳 store, items 到後端，後端會解析請求體中的 json
        // 解構賦值，從  req.json() 中提取 store, items 屬性，並賦值到變數 store, items

        const { store, items } = await req.json();


        // 檢查是否有 store ? 檢查 items 是否有內容

        if (!store || items.length === 0) {

            return NextResponse.json({ success: false, message: 'Invalid data' });

        }


        // 二：對應到 『 orders collection 』 中的 items 欄位
        // 查找並加入商品名稱，更新 items 陣列
        // items：購物清單 , item：針對每一個商品做一些動作

        const updatedItems = await Promise.all(items.map(async (item) => {


            // 在 productModel 中用 item.product(產品的識別碼_id) 查找相對應的資料

            const product = await productModel.findById(item.product);

            return {


                // item.product 賦值到 product 欄位中

                product: item.product,


                // 新增 name欄位，並將 product.name 賦值到 name 欄位中

                name: product.name, 


                // item.quantity 賦值到 quantity 欄位中

                quantity: item.quantity

            };

        }));


        // 三： 對應到 『 orders collection 』 中的 amount 欄位
        // 計算金額
        // reduce()：處理陣列中的所有元素，最終返回累積的單一結果值
        // acc：累積結果 , item：針對每個元素做的一些動作

        const amount = await items.reduce(async (acc, item) => {


            // 在 productModel 中用 item.product(產品的識別碼_id) 查找相對應的資料

            const product = await productModel.findById(item.product);


            // 將每個產品的價格 Ｘ 數量，並累加到 acc 上

            return await acc + (product.price * item.quantity);

        }, 0)



        // 在 storeModel 中用 userId 查找相對應的資料
        // findOne() 傳入一個查詢條件的物件，會回傳符合條件的第一筆資料，只需要找到一筆資料時使用

        const pickup = await storeModel.findOne({ userId });



        // 在 orderModel 中創建新的物件，包含 userId , name , store , items , amount , date 欄位

        const order = new orderModel({

            userId,

            name: pickup.name,  // 將 pickup.name 賦值到 name 欄位中

            store,

            items: updatedItems,  // 將 updatedItems 賦值到 items 欄位中

            amount, 

            date: Date.now()

        });



        // 將所做的更改存回 『 orders collection 』 的資料庫中

        await order.save();


        // 在 userModel 中 查找與 userId 相符合的資料

        const user = await userModel.findById(userId)


        // 將空物件賦值到 user.cartData ，也就是清空購物車資料的意思

        user.cartData = {}


        // 將所做的更改存回 『 users collection 』 的資料庫中

        await user.save()


        return NextResponse.json({ success: true, message: 'Order Placed' })


    } catch (error) {

        console.log(error)

        return NextResponse.json({ success: false, message: error.message });

    }


}