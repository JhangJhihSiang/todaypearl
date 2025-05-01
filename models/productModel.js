import mongoose from "mongoose";


// 創建 product 的資料格式

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    image: { type: Array, required: true },

    category: { type: String, required: true },

    bestseller: { type: Boolean },

    date: { type: Number, required: true },

})




// 檢查 mongoose.models 中有無 "product" 的 model 存在，若已存在就直接使用，避免重複定義
// 若不存在，用 productSchema 的資料格式建立名為 "product" 的 model，存到 mongoose.models 中
// 會對應到 MongoDB 中的 "products" collection ( MongoDB 會自動加 s )

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel