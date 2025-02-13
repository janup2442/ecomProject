import express from 'express'
import authenticateRequest from '../../middleware/authRequest.js'

const userProfileRoute = express.Router()

userProfileRoute.use('/',authenticateRequest);

userProfileRoute.get('/',async (req,res)=>{
    res.json({status:"user is cheked and valid"})
})
export default userProfileRoute