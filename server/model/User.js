


import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";

const cartItem = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number
    }
});

const orderItem = mongoose.Schema({
    
})

const userSchema = mongoose.Schema({
    fName:{
        type:String,
        default:"Guest"
    },
    mName:{
        type:String,
        default:""
    },
    lName:{
        type:String,     
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        default:'user'
    },
    cart:{
        type:[cartItem]
    },
    orders:{
        type:[]
    }
},{timestamps:true});



const User = new mongoose.model('user',userSchema);

export {User};