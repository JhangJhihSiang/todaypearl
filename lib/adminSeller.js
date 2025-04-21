import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const adminSeller = async (req) => {

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

        // 檢查用戶角色是否為 'seller'
        if (decodedUser.role === 'admin') {
            return true;  // 是賣家，返回 true
        } else {
            return false;  // 不是賣家，返回 false
        }

    } catch (error) {
        // 如果驗證失敗，返回錯誤訊息
        return NextResponse.json({ success: false, message: error.message });
    }
};

export default adminSeller;
