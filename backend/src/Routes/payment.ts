import express from 'express';
import { deleteCoupon, discount, getAllCoupon, newCoupon } from '../Controllers/payment.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();
// new coupon 
router.post("/coupon/new",isAdmin,newCoupon);
// apply discount
router.post("/coupon/discount",discount);
// get all coupon 
router.get('/coupon/all',getAllCoupon);
// delete coupon    
router.delete('/coupon/:id',isAdmin,deleteCoupon);
export default router;
