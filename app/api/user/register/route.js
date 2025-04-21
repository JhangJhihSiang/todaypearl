import { NextResponse } from 'next/server';  // 用於返回響應
import bcrypt from 'bcrypt';  // 用於密碼加密
import validator from 'validator';  // 用於驗證信箱格式
import userModel from '@/models/userModel';  // 導入用戶模型
import jwt from 'jsonwebtoken';  // 用於創建JWT Token
import connectDB from '@/config/mongodb';

// 創建JWT Token函數
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET)
};

// 用戶註冊的路由
export async function POST(req) {

  try {
    // 獲取請求體中的數據
    const { name, email, password, role } = await req.json();

    await connectDB()


    // 檢查用戶是否已經存在
    const exists = await userModel.findOne({ email });

    if (exists) {
      return NextResponse.json({ success: false, message: "User already exists" });
    }

    // 驗證信箱格式
    if (!validator.isEmail(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email" });
    }

    // 密碼長度至少8位
    if (password.length < 8) {
      return NextResponse.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // 密碼加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 創建新用戶
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role: email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ? 'admin': 'user',
    });

    // 保存用戶到數據庫
    const user = await newUser.save();

    // 生成 JWT Token
    const token = createToken(user._id, user.role);

    // 返回響應

    return NextResponse.json({ success: true, message: 'User registered successfully', token });

  } catch (error) {

    console.log(error);

    return NextResponse.json({ success: false, message: error.message });

  }
}
