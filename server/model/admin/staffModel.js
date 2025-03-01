import mongoose, { mongo, Mongoose } from "mongoose";

const staffSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        default:"Guest User"
    },
    userEmail:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    }
},{timestamps:true})



const Staff = mongoose.model('staff',staffSchema)
export default Staff