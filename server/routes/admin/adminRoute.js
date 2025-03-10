import express from 'express'
import jwt from 'jsonwebtoken'
import adminHome from './adminHome.js'
import dotenv from 'dotenv'
import adminLogin from './adminLogin.js'
import authAdmin from '../../middlewere/admin/authAdmin.js'
dotenv.config()
const adminRoute = express.Router()

adminRoute.get('/auth',authAdmin,(req,res)=>{
    res.status(200).end();
})
adminRoute.use('/home',adminHome)
adminRoute.use('/login',adminLogin)

export default adminRoute


