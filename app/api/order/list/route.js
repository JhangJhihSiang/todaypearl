import connectDB from "@/config/mongodb"
import orderModel from "@/models/orderModel"
import productModel from "@/models/productModel"
import { NextResponse } from "next/server"



// export async function GET(req) {

//     try {

//         await connectDB()

//         const orders = await orderModel.find({})
        



//         return NextResponse.json({ success: true, orders })

//     } catch (error) {

//         console.log(error)
//         return NextResponse.json({ success: false, message: error.message })

//     }

// }

export async function GET(req) {
    try {
      await connectDB();
  
      const orders = await orderModel.find({}).lean(); // 加 .lean() 提高效能
  
      // 建立一個 productId 清單
      const productIds = orders.flatMap(order =>
        order.items.map(item => item.product)
      );
  
      // 查詢所有產品資料
      const products = await productModel.find({
        _id: { $in: productIds }
      }).lean();
  
      // 建立一個 map 方便查詢
      const productMap = {};
      products.forEach(p => {
        productMap[p._id.toString()] = p;
      });
  
      // 把圖片加入 orders
      const ordersWithImages = orders.map(order => {
        const itemsWithImages = order.items.map(item => {
          const product = productMap[item.product.toString()];
          return {
            ...item,
            image: product?.image || ""
          };
        });
        return {
          ...order,
          items: itemsWithImages
        };
      });
  
      return NextResponse.json({ success: true, orders: ordersWithImages });
  
    } catch (error) {
      console.log(error);
      return NextResponse.json({ success: false, message: error.message });
    }
  }
  