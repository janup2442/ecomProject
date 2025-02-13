import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const authenticateRequest = async function (req,res,next){
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).json({messsage:"Unauthorized user , please login"})
    }
    try{
        const decode  = jwt.verify(token,JWT_SECRET)
        req.userId = decode.userId;
    }catch(error){
        return res.status(403).json({message:"invalid or expired token"})
    }
}

export default authenticateRequest