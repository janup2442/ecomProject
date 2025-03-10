import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Staff from '../../model/admin/staffModel.js'
const adminLogin = express.Router()

// validate the req.body here before processing using middle were

adminLogin.post('/',(req,res)=>{
    console.log(req.body);
    const {userEmail  , userPassword} = req.body;

    try{
        const validateUser = async ()=>{
            const isUserExist = await Staff.findOne({userEmail:userEmail})
            if(isUserExist){
                const checkPassword  = await bcrypt.compare(userPassword,isUserExist.userPassword)
                if(checkPassword){
                    const token = jwt.sign({
                        userId :  isUserExist._id
                    },process.env.JWT_SECRET,{expiresIn:'30d'})
                    res.cookie("authToken",token,{
                        httpOnly:true,
                        secure:false,
                        sameSite:"lax"
                    })
                    res.status(200).json({
                        userId :  isUserExist._id,
                        userName: isUserExist.userName,
                        userRole: isUserExist.userRole,
                        message:"LoggenIn"
                    })
                }else {
                    res.status(401).json({message:"Invalid Email or Password"})
                }
            }else{
                res.status(401).json({message:"User does not exist or Invalid Email Id"})
            }
        }
        validateUser();
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"Internal server error"})
    }
})

export default adminLogin