import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import apiRoutes from './api/apiRoutes.js'
import connectDb from './database/db.js';
connectDb();
dotenv.config()

const app = express();
const PORT  = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api',apiRoutes)

app.get('/',(req,res)=>{
    res.json({isServerGood:"sever is running good"})
})

app.listen(PORT||8080 , ()=>{
    console.log("server is running on port "+ `${PORT}`);
})