


import express from 'express'
import { getAllCategory, getAllProduct } from '../../controllers/client/productController.js';
const productRouteHandler  = express.Router();


productRouteHandler.get('/category',getAllCategory);
productRouteHandler.get('/product',getAllProduct);

export default productRouteHandler