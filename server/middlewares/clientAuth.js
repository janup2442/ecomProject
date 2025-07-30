import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import {User} from '../model/User.js';
config();


const userAuth = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthroized User , Please Login' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.userId = decoded.id; // Attach user info to request
    next()
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export default userAuth