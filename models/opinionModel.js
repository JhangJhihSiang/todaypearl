import mongoose from "mongoose";


// 創建 opinion 的資料格式

const opinionSchema = new mongoose.Schema({

    email: { type: String, required: true },

    opinion: { type: String, required: true }

})




// 檢查 mongoose.models 中有無 "opinion" 的 model，已存在就直接使用，避免重複定義
// 若不存在，用 opinionSchema 的資料格式建立名為 "opinion" 的 model，存到 mongoose.models 中
// 會對應到 MongoDB 中的 "opinions" collection ( MongoDB 會自動加 s )

const opinionModel = mongoose.models.opinion || mongoose.model('opinion', opinionSchema)




export default opinionModel