import userModel from '@/models/userModel';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import connectDB from '@/config/mongodb';



const createToken = (id, role) => {

    return jwt.sign({ id, role }, process.env.JWT_SECRET)

}

// Route For User Login


export async function POST(req) {

    try {

        const { email, password } = await req.json();

        await connectDB()

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ success: false, message: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id, user.role)

        // 如果是管理員，返回特定的管理權限 token
        if (user.role === 'admin') {
            return NextResponse.json({ success: true, message: 'Admin login successful', token });
        }

        // 如果是普通用戶，返回普通用戶 token
        return NextResponse.json({ success: true, message: 'User login successful', token });




    } catch (error) {

        console.log(error)

        return NextResponse.json({ success: false, message: error.message })


    }

}
