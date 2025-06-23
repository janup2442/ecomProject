import Admin from '../../model/Admin.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username , password);
  
  try {
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: admin._id ,
    role:'Admin'
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token })
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
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ valid: false })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id)
    if (!admin) return res.status(401).json({ valid: false })

    res.json({ valid: true })
  } catch (err) {
    res.status(401).json({ valid: false })
  }
}