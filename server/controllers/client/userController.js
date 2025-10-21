import {User} from "../../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { Product } from "../../model/Product.js";


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
      secure: process.env.NODE_ENV === 'production',
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


export const addToCartAction  = async(req,res)=>{
  const id = req.userId;
  const {productId,quantity = 1} = req.body;
  console.log('Add to cart request:', req.body);
  
  try {
    const userInstance = await User.findById(id);
    if(!userInstance){
      return res.status(404).json({message:"User not found"});
    }

    // Check if product already exists in cart
    const existingItemIndex = userInstance.cart.findIndex(item => 
      item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Product exists, update quantity
      userInstance.cart[existingItemIndex].quantity += quantity;
    } else {
      // Product doesn't exist, add new item
      userInstance.cart.push({productId, quantity});
    }

    await userInstance.save();
    
    // Return updated cart count
    const cartCount = userInstance.cart.reduce((total, item) => total + item.quantity, 0);
    
    res.status(201).json({
      message: "Product added to cart successfully",
      cartCount: cartCount
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({message:"Internal server error"});
  }
}

export const getCartItems = async (req,res)=>{
  const id = req.userId;

  try {
    const user = await User.findById(id).populate({
      path: 'cart.productId',
      select: 'name price images brand stock status discountValue SKU'
    });

    
    if(user){
      // Filter out any cart items where product might have been deleted
      const validCartItems = user.cart.filter(item => item.productId);
      console.log(validCartItems);
      
      // Calculate totals
      const cartSummary = {
        items: validCartItems,
        totalItems: validCartItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: validCartItems.reduce((sum, item) => {
          const price = item.productId.discountValue 
            ? Math.round(item.productId.price * (1 - item.productId.discountValue / 100))
            : item.productId.price;
          return sum + (price * item.quantity);
        }, 0)
      };
      
      res.status(200).json(cartSummary);
    } else {
      res.status(401).json({message:"User not found"});
    }
  } catch (error) {
    console.error('Get cart items error:', error);
    res.status(500).json({message:"Server error"})
  }
}

export const updateCartItemQuantity = async (req, res) => {
  const id = req.userId;
  const { productId, quantity } = req.body;

  try {
    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItemIndex = user.cart.findIndex(item => 
      item.productId.toString() === productId
    );

    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity = quantity;
      await user.save();
      
      const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);
      
      res.status(200).json({
        message: "Cart updated successfully",
        cartCount: cartCount
      });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const removeFromCart = async (req, res) => {
  const id = req.userId;
  const { productId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    console.log("deleting the productid "+ productId +"new cart list is :");
    console.log(user.cart);
    
    
    await user.save();
    console.log("item removed from cart");
    
    const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);
    
    res.status(200).json({
      message: "Item removed from cart",
      cartCount: cartCount
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: "Internal server error" });
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