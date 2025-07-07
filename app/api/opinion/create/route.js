import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import opinionModel from "@/models/opinionModel";


// 前端在 opinion => page.jsx


export async function POST(req) {


  try {


    // 前端傳 email, opinion 到後端，後端會解析請求體中的 json
    // 解構賦值，從  req.json() 中提取 email, opinion 屬性，並賦值到變數 email, opinion

    const { email, opinion } = await req.json()


    // 檢查是否有 email 和 opinion

    if (!email || !opinion) {

      return NextResponse.json({ message: "缺少必要資料" })

    }

    await connectDB()


    // 在 opinionModel 中創建新的物件，包含從請求體中傳來的變數 email, opinion
    // create()會在 『 opinions collection 』 中建立一筆新的資料並儲存到資料庫

    const newOpinion = await opinionModel.create({


      // 當欄位名稱和變數名稱相同時可以簡寫
      
      email,    // 完整寫法：email : email ，一：對應到 『 opinions collection 』 中的 email 欄位

      opinion   // 完整寫法：opinion : opinion ，二：對應到 『 opinions collection 』 中的 opinion 欄位

    })

    return NextResponse.json({ success: true, message: "成功" })


  } catch (error) {

    console.log(error)

    return NextResponse.json({ success: false, message: error.message });

  }


}