import mongoose from "mongoose";


const opinionSchema = new mongoose.Schema({

    email: {type: String, required: true},

    opinion: {type: String, required: true}

})



const opinionModel = mongoose.models.opinion || mongoose.model('opinion', opinionSchema)


export default opinionModel