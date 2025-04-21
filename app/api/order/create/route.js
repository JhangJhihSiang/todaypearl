import productModel from "@/models/productModel";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import orderModel from "@/models/orderModel";
import storeModel from "@/models/storeModel";


export async function POST(req){


    try {

        // 從 Authorization 標頭中提取 JWT
        const token = req.headers.get('Authorization')?.split(' ')[1]; // 獲取 Bearer token

        if (!token) {
            return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
        }

        // 解碼 JWT 並提取 userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // 用你的密鑰解碼
        const userId = decoded.id;  // 假設你的 JWT payload 裡有 'id' 屬性

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        const {store, items} = await req.json();

        if(!store || items.length === 0){
            return NextResponse.json({success:false, message: 'Invalid data'});
        }


        // 查找並加入商品名稱，更新 items 陣列
        const updatedItems = await Promise.all(items.map(async (item) => {
            const product = await productModel.findById(item.product);
            return {
                product: item.product,
                name: product.name,  // 加入商品名稱
                quantity: item.quantity
            };
        }));

        // 計算金額
        const amount = await items.reduce(async(acc, item) => {

            const product = await productModel.findById(item.product);
            return await  acc + (product.price * item.quantity);
        }, 0)




        const pickup = await storeModel.findOne({ userId });

        const order = new orderModel({
            userId,
            name: pickup.name,
            store,
            items: updatedItems,  // 使用包含名稱的 items
            amount, // 包含額外的 2% 費用
            date: Date.now()
        });

        await order.save();



        // Clear user Cart

        const user = await userModel.findById(userId)

        user.cartData = {}

        await user.save()


        return NextResponse.json({success: true, message: 'Order Placed'})



        
    } catch (error) {

        console.log(error)

        return NextResponse.json({success: false, message: error.message});
        
    }


}