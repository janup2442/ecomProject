import {User} from "../../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const userLogin = async (req, res) => {
  const { emailOrPhone, password } = req.body

  if(!(emailOrPhone && password)){
    return res.status(400).json({message : "invalid credentials"})
  }
  console.log(emailOrPhone, password);

  try {
    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { phone: emailOrPhone }
      ]
    })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({
      id: user._id,
      role: 'user'
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token',token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only over HTTPS in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    res.status(200).json({message:"User Logged In"})
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}


export const userRegister = async (req, res) => {
  const { email, fName, mName, lName, phone, password } = req.body;

  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(401).json({ message: "User already exists , please Login or try different email" })
  }

  const isPhoneExists = await User.findOne({ phone })
  if (isPhoneExists) {
    res.status(401).json({ message: "Phone Already exists , PLease login or try different phone" })
  }

  const hash = await bcrypt.hash(password, 10);
  if (hash) {
    const newUser = new User({
      fName,
      mName,
      lName,
      email,
      phone,
      password: hash
    });
    try {
      newUser.save();
      res.json({message:"Account Created Successfully..Please wait, Redirecting to login"})
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}


export const userVerify = async (req, res) => {
  const token = req.cookies.token; // Read token from cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    res.status(200).json({message:"Login Successful"});
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

export const getCartItems = async (req,res)=>{
  const id = req.userId;

  try {
    const cartItems = await User.findById(id,'cart')
    if(cartItems){
       res.status(200).json(cartItems)
    }else{
      res.status(401).json({message:"Something went wrong"});
    }
  } catch (error) {
    res.status(500).json({message:"Server error"})
  }
}


export const getAllOrders = async (req,res)=>{
  const id = req.userId
  try {
    const orderItem = await User.findById(id,'orders')
  } catch (error) {
    res.status(500).json({message:"server error"});
  }
}