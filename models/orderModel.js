import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    userId: {type: String, required: true, ref:'user'},
    name:{type: String, required:true},
    items: {type: Array, required: true},
    amount: {type: String, required: true},
    store: {type: Object, required: true},
    status: {type: String, required: true, default: '訂單已成立'},
    payment: {type: Boolean, required: true, default: false},
    date: {type: Number, required: true}

})


const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;