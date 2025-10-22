import { Router } from 'express'
import { login , verify ,register} from '../../controllers/admin/adminController.js'
import productRouter from './productRoutes.js'
import adminAuth from '../../middlewares/adminAuth.js'

const router = Router()

router.post('/login', login)
router.get('/verify', verify)
router.use('/product',adminAuth,productRouter)
router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'?'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
});
router.post('/register',register)

export default router