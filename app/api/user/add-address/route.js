

import connectDB from '@/config/mongodb';
import storeModel from '@/models/storeModel';
import jwt from 'jsonwebtoken';  // 引入 jsonwebtoken 用來解碼 JWT
import { NextResponse } from "next/server";


export async function POST(req) {
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

        // 解析請求中的地址資料
        const { address } = await req.json();

        // 連接到資料庫
        await connectDB();

        // 創建新地址並關聯到該用戶
        const newAddress = await storeModel.create({
            ...address, 
            userId  // 使用從 JWT 解碼中獲得的 userId
        });

        return NextResponse.json({success: true, message: '已新增門市', newAddress });

    } catch (error) {
        return NextResponse.json({success: false, message: error.message });
    }
}
