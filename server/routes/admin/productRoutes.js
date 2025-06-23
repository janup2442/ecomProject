


import { Router } from 'express'
import { addProduct, addSubCategory, getProductBySKU, inventoryoverview, setNewCategory } from '../../controllers/admin/productController.js';
import multer from 'multer'
import cloudinary from '../../config/cloudinary.js';
const productRouter = Router();
const upload = multer();


productRouter.post('/category', setNewCategory);
productRouter.post('/subcategory', addSubCategory);
productRouter.post('/addProduct', upload.array('images', 4), addProduct)
productRouter.get('/getProduct',getProductBySKU);
productRouter.get('/inventoryoverview',inventoryoverview);

export default productRouter;



