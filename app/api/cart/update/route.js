import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import connectDB from "@/config/mongodb";
import userModel from "@/models/userModel";

export async function POST(req){

    try {

        const token = req.headers.get('Authorization')?.split(' ')[1];

        if(!token){
            return NextResponse.json({success:false, message:'No token provided'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id
        
        if(!userId){
            return NextResponse.json({success:false, message:'User not found'})
        }



        const {cartData} = await req.json()

        await connectDB()

        const user = await userModel.findById(userId)

        user.cartData = cartData

        await user.save()

        return NextResponse.json({success: true, message: "成功更新購物車"})
        
    } catch (error) {

        console.log(error)
        return NextResponse.json({success: false, message: error.message})
        
    }

}