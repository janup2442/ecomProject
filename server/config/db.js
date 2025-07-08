import mongoose from "mongoose"
// process.env.MONGO_URI |   'mongodb://localhost:27017/'
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName:"kanpurClassic",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
    process.exit(1)
  }
}


export default connectDB