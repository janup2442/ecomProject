import { Router } from 'express'
import { login, verify } from '../../controllers/admin/authController.js'
import productRouter from './productRoutes.js'
const router = Router()

router.post('/login', login)
router.get('/verify', verify)
router.use('/product',productRouter)
// router.post('/register',register)

export default router