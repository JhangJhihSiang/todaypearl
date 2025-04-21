import productModel from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // 從請求體中提取 productId
        const { productId } = await req.json();  // 假設前端傳遞的 body 中包含 itemId

        if (!productId) {
            return NextResponse.json({ success: false, message: '缺少商品ID' });
        }

        // 使用 MongoDB 查找并删除产品
        const result = await productModel.findByIdAndDelete(productId);

        console.log(result);

        if (result) {
            return NextResponse.json({ success: true, message: '成功刪除！' });
        } else {
            return NextResponse.json({ success: false, message: '未找到產品' });
        }
    } catch (error) {
        console.error(error);  // 可以記錄更詳細的錯誤資訊
        return NextResponse.json({ success: false, message: '刪除失敗' });
    }
}
