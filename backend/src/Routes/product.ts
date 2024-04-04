import express from "express";
import { deleteProduct, getAllCategories, getAllProduct, getLatestProduct, getProduct, newProduct, updateProduct } from "../Controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const router = express.Router();
// new product create
router.post('/new',isAdmin,singleUpload,newProduct);
// get latest products
router.get('/latest',getLatestProduct);
//get categories
router.get('/categories',getAllCategories);
//filter products 
router.get('/product',getAllProduct)


//get single product 
router.get('/:id',getProduct);
// product deleted 
router.delete('/:id',isAdmin,deleteProduct);
//update product
router.put('/:id',isAdmin,singleUpload,updateProduct);
export default router;