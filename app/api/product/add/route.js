
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import productModel from "@/models/productModel";
import connectDB from "@/config/mongodb";



// 設定 cloudinary ： 處理圖片的工具

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
})



// 前端在 admin => add => page.jsx

export async function POST(req){
    
    try {
        

        // req.formData() : 解析從前端傳來的 FormData , 可以讀取所有欄位

        const formData = await req.formData()



        // 從 formData 中 取出某個欄位的值，EX:取出名為 'name' 的表單欄位值，並把它存進變數 name

        const name = formData.get('name');

        const description = formData.get('description');

        const category = formData.get('category');

        const price = formData.get('price');

        const bestseller = formData.get('bestseller');




        // 從上傳的表單中一次取得所有名為 'images' 的欄位值（通常是多個檔案），並存入變數 files。

        const files = formData.getAll('images');


        if(!files || files.length === 0){

            return NextResponse.json({success: false, message:'No files uploaded'})

        }



        // 同步操作：一件事情做完再做下一件事情（你站在櫃台，等飲料做完才能排下一個客人 → 所有人都被你擋住）
        // 非同步操作：程式先繼續往下執行，那個動作自己跑，之後再通知你「我好了」，不會阻塞主程式（你點完飲料拿號碼牌，等叫號再來拿 → 系統可以同時處理其他人）
        // 處理非同步的方式 ： Promise , async/await
        // Promise.all() : 同時處理所有上傳（非一個一個等），所有圖片都上傳完後，會回傳一個結果陣列

        const result = await Promise.all(



            // map() : 把每個檔案轉換成一個上傳用的 Promise
            // async 函式本身會自動回傳一個 Promise

            files.map(async (file) => {


                // file.arrayBuffer() : 把一個檔案讀取成原始的二進位資料，以便後續處理或上傳
                // arrayBuffer 是一個 ArrayBuffer 物件，通常從像是 file.arrayBuffer() 或其他類似 API 取得
                // ArrayBuffer 是一種原始二進位資料的表示方式，它本身不具有對資料的直接操作功能

                const arrayBuffer = await file.arrayBuffer()


                // 將 ArrayBuffer 轉換為 Buffer 類型，並儲存到變數 buffer 中
                // Buffer : Node.js 中用來處理二進位資料的標準物件，提供了更多操作資料的方法

                const buffer = Buffer.from(arrayBuffer)


                // Promise() : 表示未來會完成或失敗的非同步任務 ( 上傳檔案常使用到 )
                // resolve() : 當操作成功完成時被呼叫，並傳回結果
                // reject() : 當操作失敗時被呼叫，並傳回錯誤訊息

                return new Promise((resolve, reject) => {



                    // 建立上傳資料流的介面，將資料以串流方式上傳到 Cloudinary
                    // cloudinary.uploader.upload_stream：
// Cloudinary 提供的 API 方法，允許你以「串流方式」上傳資源。
// 它會回傳一個可以寫入資料的 stream 物件

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
