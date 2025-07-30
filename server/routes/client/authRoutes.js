import express from 'express'
import { getCartItems, userLogin, userRegister, userVerify } from '../../controllers/client/userController.js'
import userAuth from '../../middlewares/clientAuth.js'

const userRoute = express.Router()

userRoute.post('/login',userLogin)
userRoute.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'?'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});
userRoute.post('/register',userRegister)
userRoute.get('/verify',userVerify)

// protected routes
userRoute.get('/profile',userAuth,(req,res)=>{
    console.log('got the request');
})
userRoute.get('/cart',userAuth,getCartItems)
userRoute.get('/orders',userAuth,)



export default userRoute