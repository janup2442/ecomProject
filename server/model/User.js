


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Fname:{
        type:String,
        default:"Guest"
    },
    Mname:{
        type:String,
        default:""
    },
    Lname:{
        type:String,     
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    mobile:{
        type:String
    }
},{timestamps:true});


const User = new mongoose.model('user',userSchema);

export default User;