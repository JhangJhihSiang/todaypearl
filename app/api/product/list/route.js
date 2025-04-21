import connectDB from "@/config/mongodb";
import productModel from "@/models/productModel";
import { NextResponse } from "next/server";


export async function GET(req){


    try {

        await connectDB()

        const products = await productModel.find({})

        return NextResponse.json({success: true, products})


        
    } catch (error) {

        return NextResponse.json({success: false, message: error.message})

        
    }
}