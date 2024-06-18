import {mongoose, model} from "mongoose";

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
})

export default model('myModel', schema);