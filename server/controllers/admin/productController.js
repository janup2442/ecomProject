
import { Category, Product } from "../../model/Product.js";

import cloudinary from "../../config/cloudinary.js";
import mongoose from "mongoose";
// import multer from 'multer'
const setNewCategory = async (req, res) => {

  try {
    const { name } = req.body;
    const newCategory = new Category({ name, subcategories: [] });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}



async function addSubCategory(req, res) {
  try {
    const { categoryName, subcategoryName } = req.body;
    if (!categoryName || !subcategoryName) {
      return res.status(400).json({ error: 'Category and subcategory names are required.' });
    }

    // Find the category by name (or use _id if you prefer)
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    // Check if subcategory already exists
    if (category.subcategories.some(sub => sub.name === subcategoryName)) {
      return res.status(409).json({ error: 'Subcategory already exists.' });
    }

    // Add new subcategory
    category.subcategories.push({ name: subcategoryName });
    await category.save();

    res.status(200).json({ message: 'Subcategory added successfully.', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



const addProduct = async (req, res) => {


  try {
    const imageUrls = [];

    // Helper to upload a buffer to Cloudinary
    const uploadToCloudinary = (fileBuffer, publicId) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            public_id: publicId,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const SKU = req.body.SKU || Date.now().toString();

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const publicId = `products/${SKU}_${i + 1}`;
      const url = await uploadToCloudinary(file.buffer, publicId);
      imageUrls.push(url);
    }

    const {
      name, category, subcategory, keywords, description,
      price, stock, brand, status, dimension, weight, discountType, discountValue, colorVariants
    } = req.body;

    const product = new Product({
      name,
      category,
      subcategory,
      keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
      SKU,
      description,
      price: Number(price),
      images: imageUrls,
      stock: Number(stock),
      brand,
      status,
      dimension: dimension ? dimension.split(',').map(item => Number(item.trim())) : [],
      weight,
      discountType: Number(discountType),
      discountValue: Number(discountValue),
      colorVariants: colorVariants ? colorVariants.split(',').map(color => color.trim()) : []
    });

    await product.save();



    res.status(201).json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getProductBySKU = async (req,res)=>{
  const SKU  = req.query.sku;
  if(SKU.length<20){
    res.status(404).end();
    return;
  }
  const data = await Product.find({SKU:SKU});
  res.json(data);
}


const inventoryoverview = async (req,res)=>{
  const productCount = await Product.countDocuments();
  const totalValuation = await Product.find({},'price');
  let total = 0 ;
  totalValuation.map(item=>total+=item.price);
  res.json({
    productCount:productCount,
    totalValuation:total
  })
}
export { setNewCategory, addSubCategory, addProduct , getProductBySKU , inventoryoverview }