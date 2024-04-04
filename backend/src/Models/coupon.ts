import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:[true,"please enter coupon code "]
    },
    amount:{
        type:Number,
        required:[true,"Please enter Amount"]
    }
})

export const Coupon = mongoose.model('Coupon',schema);