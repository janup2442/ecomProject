import express from 'express'
import { userLogin, userRegister } from '../../controllers/client/authClient.js'
import userAuth from '../../middlewares/clientAuth.js'

const userRoute = express.Router()

userRoute.post('/login',userLogin)
userRoute.post('/register',userRegister)
userRoute.get('/profile',userAuth,(req,res)=>{
    console.log('got the request');
})


// protected routes



export default userRoute