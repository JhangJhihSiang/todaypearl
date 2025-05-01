import mongoose from "mongoose";


// 全局緩存對象，儲存與數據庫連接相關的數據

let cached = global.mongoose


// 緩局不存在的話，初始化新對象

if (!cached) {


    // conn：連接資料庫的通道，只需在第一次連接時建立一次，之後就可以直接使用通道
    // promise：等待連接的過程，與資料庫連接完成時給通知，過程中不必等待，可做其他事

    cached = global.mongoose = { conn: null, promise: null }


}


async function connectDB() {


    // 資料庫已建立連結，直接使用該通道

    if (cached.conn) {

        return cached.conn
    }



    if (!cached.promise) {

        const opts = {

            bufferCommands: false,

        }


        // mongoose.connect：連接資料庫
        // todaypearl：資料庫名字
        // 連接成功之後，再執行，回傳一個已連接的 mongoose

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/todaypearl`, opts).then((mongoose) => {

            return mongoose;

        })

    }


    // 等待資料庫連接完成，然後把結果存在 cached.conn 中，下次要用到資料庫時就可直接使用該通道

    cached.conn = await cached.promise


    return cached.conn

}




export default connectDB;