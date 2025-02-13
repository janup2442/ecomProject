import express from 'express'
import User from '../../model/user.js'


const loginRoute  = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "randomKey"

// write a midddleware to sanetize the user data
loginRoute.post('/',async(req,res)=>{
    const {userEmail,userPassword,userName} = req.body
    try{
        // const hashedPassword = await User.findOne({email:userEmail},"password")
        const user = new User({
            name:userName,
            email:userEmail,
            password:userPassword
        })
        const hashedPassword = "$2a$10$hcwsAcV6eFRJ5n6t3LgvgOKYZf9zrCt1vNh6NIv1xZntJnqCLYJke"

        const checkedPassword = await user.checkPassword();
        res.json(checkedPassword)
    }catch(error){
        console.log(error.message)
    }


})



export default loginRoute