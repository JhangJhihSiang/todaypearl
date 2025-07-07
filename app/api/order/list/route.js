import connectDB from "@/config/mongodb"
import orderModel from "@/models/orderModel"
import productModel from "@/models/productModel"
import { NextResponse } from "next/server"


// 前端在 admin => orders => page.jsx
// 前端在 orders => page.jsx


export async function GET(req) {

  try {

    await connectDB();


    // 在 orderModel 中 查找所有資料
    // find({}) ： 查詢條件是空的，表示沒有條件

    const orders = await orderModel.find({}).lean(); // 加 .lean() 提高效能


    // 建立一個 productId 清單
    // flatMap() ： 先進行 map() , 再攤平放到同一陣列中
    
    const productIds = orders.flatMap(order =>

      
      // 針對每個 order 中的 items 屬性做操作,抓取其中 product 屬性的值

      order.items.map(item => item.product)

    );


    // 在 productModel 中查找 _id 欄位的值 與 productIds 相符合的資料

    const products = await productModel.find({


      // _id ： 要查詢的欄位名稱
      // $in ： 後面為一陣列，陣列中的元素就是要查詢的值

      _id: { $in: productIds }

    }).lean();



    // 建立一個「商品 ID 對應商品資料」的對照表，方便查詢

    const productMap = {};


    // forEach ： 陣列方法，對每個元素執行指定操作，不會回傳新陣列

    products.forEach(p => {


      // 將 p 值 (value) , 賦值到 [p._id.toString()] (key) 中
      // p._id.toString() ： 將 _id 值轉成字串，因為物件中的 key 值需為字串格式

      productMap[p._id.toString()] = p;

    });



    // 將每筆 order 的 items 欄位的每個 item 加上對應商品的圖片，然後產出新陣列 ordersWithImages，其中每個 item 都多了一個 image 欄位

    const ordersWithImages = orders.map(order => {


      // 針對每筆 order 中的 items 欄位 做操作

      const itemsWithImages = order.items.map(item => {


        // 在商品對照表中根據 _id 查找商品

        const product = productMap[item.product.toString()];


        return {


          // 保留原本欄位

          ...item,


          // 加上照片欄位

          image: product?.image || ""

        };

      });

      return {


        // 保留原本訂單

        ...order,


        // 將 itemsWithImages 賦值到 items 欄位

        items: itemsWithImages

      };

    });


    // 將 ordersWithImages 賦值到 orders 並回傳給前端，所以前端收到的 orders 是含有照片的

    return NextResponse.json({ success: true, orders: ordersWithImages });
    

  } catch (error) {

    console.log(error);

    return NextResponse.json({ success: false, message: error.message });

  }

}
