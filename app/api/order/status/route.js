import orderModel from "@/models/orderModel"
import { NextResponse } from "next/server"



// 前端在 admin => orders => page.jsx

export async function POST(req) {

    try {


        // 前端傳 orderId, status 到後端，後端會解析請求體中的 json
        // 解構賦值，從  req.json() 中提取 orderId, status 屬性，並賦值到變數 orderId, status

        const { orderId, status } = await req.json()


        // 找到一筆對應 orderId 的資料，只更新這筆資料的 status 欄位
        // {status} 是簡寫，完整寫法是 status : status ，左邊是 key , 右邊是 value

        await orderModel.findByIdAndUpdate(orderId, { status })

        return NextResponse.json({ success: true, message: 'Status Updated' })

    } catch (error) {

        console.log(error)

        return NextResponse.json({ success: false, message: error.message })

    }
}