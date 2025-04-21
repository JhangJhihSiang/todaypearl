import connectDB from "@/config/mongodb"
import orderModel from "@/models/orderModel"
import { NextResponse } from "next/server"



export async function GET(req) {

    try {

        await connectDB()

        const orders = await orderModel.find({})


        return NextResponse.json({ success: true, orders })

    } catch (error) {

        console.log(error)
        return NextResponse.json({ success: false, message: error.message })

    }

}