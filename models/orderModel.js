import mongoose from "mongoose"


// 創建 order 的資料格式

const orderSchema = new mongoose.Schema({

    userId: { type: String, required: true },

    name: { type: String, required: true },

    items: { type: Array, required: true },

    amount: { type: String, required: true },

    store: { type: Object, required: true },

    status: { type: String, required: true, default: '訂單處理中' },

    date: { type: Number, required: true }

})



// 檢查 mongoose.models 中有無 "order" 的 model 存在，若已存在就直接使用，避免重複定義
// 若不存在，用 orderSchema 的資料格式建立名為 "orders" 的 model，存到 mongoose.models 中
// 會對應到 MongoDB 中的 "orders" collection ( MongoDB 會自動加 s )

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel