import express from 'express'
import authAdmin from '../../middlewere/admin/authAdmin.js';
import adminDashboard from './adminDashboard.js';


const adminHome = express.Router()
adminHome.use(authAdmin)
adminHome.use('/dashboard',adminDashboard)
adminHome.use('/profile',adminDashboard)
adminHome.use('/orders',adminDashboard)
adminHome.use('/user',adminDashboard)
adminHome.use('/product',adminDashboard)
export default adminHome