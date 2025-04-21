import mongoose from "mongoose";


const storeSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    store: {type:String, required:true},
    code: {type: String, required: true},
    note: {type: String, },
    
})


const storeModel = mongoose.models.store || mongoose.model('store', storeSchema)

export default storeModel