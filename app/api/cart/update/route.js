import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import connectDB from "@/config/mongodb";
import userModel from "@/models/userModel";


// 前端在 context => ShopContext.jsx


export async function POST(req) {

    try {

        // 從前端 { headers: { Authorization: `Bearer ${token}` } } 中取得 Authorization 的值
        // 用 split(' ') 作分隔取得 [ " Bearer " , " token的值 "]，[1]的元素即我們要的 token

        const token = req.headers.get('Authorization')?.split(' ')[1];


        if (!token) {

            return NextResponse.json({ success: false, message: 'No token provided' })

        }


        //  用 jwt.sign({ id, role }, process.env.JWT_SECRET) 建立 JWT
        // jwt.verify() 驗證並解碼 token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // JWT 的 payload 部分包含 id , role 取其中 id 屬性

        const userId = decoded.id


        if (!userId) {

            return NextResponse.json({ success: false, message: 'User not found' })

        }


        // 前端傳 cartData 到後端，後端會解析請求體中的 json
        // 解構賦值，從  req.json() 中提取 cartData 屬性，並賦值到變數 cartData

        const { cartData } = await req.json()


        await connectDB()


        //在 userModel 中 查找與 userId 相符合的資料

        const user = await userModel.findById(userId)


        // 將從前端傳給後端的 cartData 賦值到 user.cartData 中，也就是更新 user.cartData

        user.cartData = cartData


        //將所做的更改存回 『 users collection 』 的資料庫中

        await user.save()

        return NextResponse.json({ success: true, message: "成功更新購物車" })


    } catch (error) {

        console.log(error)

        return NextResponse.json({ success: false, message: error.message })

    }

}