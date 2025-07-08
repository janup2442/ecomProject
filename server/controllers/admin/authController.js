import Admin from '../../model/Admin.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password);

  try {
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(401).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({
      id: admin._id,
      role: 'Admin'
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// export const register = async (req, res) => {
//   const { username, password } = req.body
//   try {
//     const existingAdmin = await Admin.findOne({ username })
//     if (existingAdmin) {
//       return res.status(400).json({ message: 'Admin already exists' })
//     }
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newAdmin = new Admin({ username, password: hashedPassword })
//     await newAdmin.save()
//     res.status(201).json({ message: 'Admin registered successfully' })
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' })
//   }
// }



export const verify = async (req, res) => {
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


    res.json({message:"Login Successful"});
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}