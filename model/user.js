import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const user = new mongoose.Schema({
    name:{
        type:"String",
        required:true,
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true,
        minLength:8
    }
},{timestamps:true})


user.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        console.log(error.message)
    }
})

user.methods.checkPassword = async function(){
    try{
        const hashedPassword = await User.findOne({email:`${this.email}`},"password")
        return await bcrypt.compare(this.password,hashedPassword.password)
    }catch(error){
        console.log(error.message)
    }
}


const User = new mongoose.model('user',user);
export default User