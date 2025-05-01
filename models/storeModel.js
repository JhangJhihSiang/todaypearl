import mongoose from "mongoose";


// 創建 store 的資料格式

const storeSchema = new mongoose.Schema({

    userId: { type: String, required: true },

    name: { type: String, required: true },

    phoneNumber: { type: String, required: true },

    store: { type: String, required: true },

    code: { type: String, required: true },

    note: { type: String, },

})




// 檢查 mongoose.models 中有無 "store" 的 model 存在，若已存在就直接使用，避免重複定義
// 若不存在，用 storeSchema 的資料格式建立名為 "store" 的 model，存到 mongoose.models 中
// 會對應到 MongoDB 中的 "stores" collection ( MongoDB 會自動加 s )

const storeModel = mongoose.models.store || mongoose.model('store', storeSchema)

export default storeModel