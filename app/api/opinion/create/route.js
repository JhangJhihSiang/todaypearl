import { NextResponse } from "next/server";
import connectDB from "@/config/mongodb";
import opinionModel from "@/models/opinionModel";


export async function POST(req) {


  try {

    const { email, opinion } = await req.json()

    // 檢查是否提供了 email 和 opinion
    if (!email || !opinion) {
      return NextResponse.json({ message: "缺少必要資料" })
    }

    await connectDB()

    const newOpinion = await opinionModel.create({
      email,
      opinion
    })

    return NextResponse.json({ success: true, message: "成功" })


  } catch (error) {

    console.log(error)

    return NextResponse.json({ success: false, message: error.message });

  }


}