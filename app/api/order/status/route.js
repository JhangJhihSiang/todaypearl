import orderModel from "@/models/orderModel"
import { NextResponse } from "next/server"

export async function POST(req){

    try {

        const { orderId, status} = await req.json()

        await orderModel.findByIdAndUpdate(orderId, {status})

        return NextResponse.json({success: true, message: 'Status Updated'})
        
    } catch (error) {

        console.log(error)
        
        return NextResponse.json({success: false, message: error.message})
        
    }
}