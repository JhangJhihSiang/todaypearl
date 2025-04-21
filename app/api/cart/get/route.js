import connectDB from "@/config/mongodb";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export async function GET(req) {


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



        await connectDB()

        const user = await userModel.findById(userId);

        const { cartData } = user

        return NextResponse.json({ success: true, cartData})

    } catch (error) {

        return NextResponse.json({ success: false, message: error.message });

    }

}