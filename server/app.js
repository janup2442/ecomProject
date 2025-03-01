import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import connectDb from './db/db.js';
import adminRoute from './routes/admin/adminRoute.js';
import userRoute from './routes/client/userRoute.js';
import cookieParser from 'cookie-parser';
configDotenv();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:["https://automatic-fishstick-wpjjp696wxxh5rg7-5173.app.github.dev","https://automatic-fishstick-wpjjp696wxxh5rg7-5174.app.github.dev","http://localhost:5173"]
}))

app.use('/api/admin',adminRoute)
app.use('/api/user',userRoute)



app.get('/logout',(req,res)=>{
    res.clearCookie('authToken')
    res.status(200).end()
})

app.listen(8080 , ()=>{
    console.log("server is  running on 8080");
})