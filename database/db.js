import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDb  = async()=>{
    await mongoose.connect(process.env.MONGO_URL,{
        dbName:"kanpurClassic",
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("MongoDb connected")
    }).catch((err)=>{
        console.log("MongoDB connection error" + err.message)
        process.exit(1)
    })
}

export default connectDb