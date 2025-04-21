import jwt from 'jsonwebtoken'
import connectDB from "@/config/mongodb";
import storeModel from "@/models/storeModel";
import { NextResponse } from "next/server";



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

        const address = await storeModel.find({userId})

        return NextResponse.json({success: true, address});
        
    } catch (error) {

        return NextResponse.json({success: false, message: error.message});
        
    }
    
}