
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import productModel from "@/models/productModel";
import connectDB from "@/config/mongodb";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})


export async function POST(req){
    
    try {
        


        const formData = await req.formData()

        const name = formData.get('name');

        const description = formData.get('description');

        const category = formData.get('category');

        const price = formData.get('price');

        const bestseller = formData.get('bestseller');


        const files = formData.getAll('images');

        if(!files || files.length === 0){
            return NextResponse.json({success: false, message:'No files uploaded'})

        }

        const result = await Promise.all(

            files.map(async (file) => {

                const arrayBuffer = await file.arrayBuffer()

                const buffer = Buffer.from(arrayBuffer)

                return new Promise((resolve, reject) => {

                    const stream = cloudinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error, result) => {
                            if(error){
                                reject(error)
                            }else{
                                resolve(result)
                            }
                        }

                    )
                    stream.end(buffer)
                })
            })
        )

        const image = result.map(result => result.secure_url)

        await connectDB()

        const newProduct = await productModel.create({
            name,
            description,
            price:Number(price),
            bestseller,
            image,
            category,
            date: Date.now(),
        })

        return NextResponse.json({success: true, message:'成功新增產品！', newProduct})
        
    } catch (error) {

        return NextResponse.json({success: false, message: error.message})

        
    }
}
