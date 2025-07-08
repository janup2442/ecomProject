import jwt from 'jsonwebtoken'
import Admin from '../model/Admin.js'
import { config } from 'dotenv'
config();
const adminAuth = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
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