import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role :{
    type:String,
  }
},{timestamps:true})

const Admin = mongoose.model('staff', adminSchema)
export default Admin