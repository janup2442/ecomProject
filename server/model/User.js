


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
        default:'customer'
    }
},{timestamps:true});


const User = new mongoose.model('user',userSchema);

export default User;