import mongoose from "mongoose";


// 創建 user 的資料格式

const userSchema = new mongoose.Schema({

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    cartData: { type: Object, default: {} },

    role: { type: String, enum: ['user', 'admin'], default: 'user' }  //enum：只允許設定的值存在


    // minimize:false：告訴 MongoDB 不要自動刪除欄位，以便未來擴充 cartData

}, { minimize: false })




// 檢查 mongoose.models 中有無 "user" 的 model 存在，若已存在就直接使用，避免重複定義
// 若不存在，用 userSchema 的資料格式建立名為 "user" 的 model ，存到 mongoose.models 中
// 會對應到 MongoDB 中的 "users" collection ( MongoDB 會自動加 s )

const userModel = mongoose.models.user || mongoose.model("user", userSchema);


export default userModel