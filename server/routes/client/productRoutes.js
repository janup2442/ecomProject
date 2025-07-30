


import express from 'express'
import { getAllCategory, getAllProduct, getProductDetail } from '../../controllers/client/productController.js';
const productRouteHandler  = express.Router();


productRouteHandler.get('/category',getAllCategory);
productRouteHandler.get('/products',getAllProduct);
productRouteHandler.get('/productdetail',getProductDetail)

export default productRouteHandler