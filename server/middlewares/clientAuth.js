import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import {User} from '../model/User.js';
config();


const userAuth = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.admin = admin // Attach admin info to request
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export default userAuth