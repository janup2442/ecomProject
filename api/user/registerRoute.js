import express from 'express'
import User from '../../model/user.js';

const registerRoute = express.Router();

// before handling the new user details , do pre processing
// details isto be chekced in middleware , sanetize all fields , check if a user exists with same email
registerRoute.post('/',(req,res)=>{
    const {userName,userEmail,userPassword} = req.body
    // after the development dont forget to secure and sanetize the user  credentials. use the middleware for that

    const user = new User({
        name:userName,
        email:userEmail,
        password:userPassword
    })
    // user.save()
    res.json(user)

})

export default registerRoute