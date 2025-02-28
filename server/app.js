import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["https://automatic-fishstick-wpjjp696wxxh5rg7-5173.app.github.dev","https://automatic-fishstick-wpjjp696wxxh5rg7-5174.app.github.dev"]
}))

app.get('/',(req,res)=>{
    res.json("All good bro")
})

app.listen(8080 , ()=>{
    console.log("server is  running on 8080");
})