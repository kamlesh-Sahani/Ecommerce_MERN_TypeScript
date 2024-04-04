import express from 'express';
import { allOrders, deleteOrder, getOrder, myOrder, newOrder, processingOrder } from '../Controllers/order.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// new order
router.post('/new',newOrder);
// my ordres 
router.get('/my',myOrder);

// get all orders 
router.get('/all',isAdmin,allOrders);

// get single order
router.get('/:id',isAdmin,getOrder)

// processing order (status upadte : shipped , Delivered)
router.put('/:id',isAdmin,processingOrder);
// delete order 
router.delete('/:id',deleteOrder);
export default router;