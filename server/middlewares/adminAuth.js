import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import {config} from 'dotenv'
config();
const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized , Access Denied' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id)
    if (!admin) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.admin = admin // Attach admin info to request
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export default adminAuth