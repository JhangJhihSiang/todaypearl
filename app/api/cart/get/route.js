import connectDB from "@/config/mongodb";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


// 前端在 context => ShopContext.jsx


export async function GET(req) {


    try {

        // 從前端 { headers: { Authorization: `Bearer ${token}` } } 中取得 Authorization 的值
        // 用 split(' ') 作分隔取得 [ " Bearer " , " token的值 "]，[1]的元素即我們要的 token

        const token = req.headers.get('Authorization')?.split(' ')[1];


        if (!token) {

            return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });

        }


        // 用 jwt.sign({ id, role }, process.env.JWT_SECRET) 建立 JWT
        // jwt.verify() 驗證並解碼 token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // JWT 的 payload 部分包含 id , role 取其中 id 屬性

        const userId = decoded.id;


        if (!userId) {

            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });

        }


        await connectDB()


        //在 userModel 中 查找與 userId 相符合的資料

        const user = await userModel.findById(userId);


        // 解構賦值用戶資料中的 cartData 
        // 也就是取得 『 users collection 』 中的 cartData 欄位內容

        const { cartData } = user


        // 回傳該用戶的 cartData 給前端

        return NextResponse.json({ success: true, cartData })

    } catch (error) {

        return NextResponse.json({ success: false, message: error.message });

    }

}