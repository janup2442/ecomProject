import express from 'express'
import loginRoute from './user/loginRoute.js'
import registerRoute from './user/registerRoute.js';
import userProfileRoute from './user/userProfile.js';
const routes = express.Router()


routes.use('/login',loginRoute);
routes.use('/register',registerRoute);
routes.use('/auth/dashboard',userProfileRoute);



export default routes