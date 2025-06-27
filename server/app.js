import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import adminAuthRoutes from './routes/admin/authRoutes.js'
import productRouteHandler from './routes/client/productRoutes.js'
import userRoute from './routes/client/authRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from ${req.headers.origin || req.ip}`);
    next();
});
app.use('/api',productRouteHandler)
app.use('/api/admin', adminAuthRoutes)
app.use('/user',userRoute)

app.get('/', (req, res) => res.send('API is running...'))


export default app
