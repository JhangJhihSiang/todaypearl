// api/admin/check-admin.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req) {
    try {
        // 從請求中提取 Authorization 標頭
        const authHeader = req.headers.get('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Authorization header missing or invalid' });
        }

        // 提取 token
        const token = authHeader.split(' ')[1];

        // 解碼並驗證 token
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

        // 檢查用戶角色是否為 'admin'
        if (decodedUser.role === 'admin') {
            return NextResponse.json({ success: true, message: 'Admin access granted' });
        } else {
            return NextResponse.json({ success: false, message: 'You are not authorized' });
        }

    } catch (error) {
        // 如果驗證失敗，返回錯誤訊息
        return NextResponse.json({ success: false, message: error.message });
    }
}
