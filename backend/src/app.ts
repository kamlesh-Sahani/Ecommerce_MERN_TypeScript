import express, { Request, Response } from 'express';
import { connectDB } from './Utils/DB.js';
import userRouter from './Routes/user.js';
import productRouter from './Routes/product.js';
import orderRouter from './Routes/order.js';
import paymentRouter from './Routes/payment.js';
import statsRouter from './Routes/stats.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import cors from 'cors';
const app = express();
config({
    path:"./.env"
})
const port = process.env.PORT || 4040;

// datebase connection 
connectDB();
// middleware
app.use(express.json());
app.use(cors());
export const myCache = new NodeCache();

// routes 
app.get('/',(req:Request,res:Response)=>{
    res.json({
        message:"welcome"
    })
})
app.use('/api-v1/user/',userRouter);
app.use('/api-v1/product/',productRouter);
app.use('/api-v1/order/',orderRouter);
app.use('/api-v1/payment/',paymentRouter);
app.use('/api-v1/dashboard/',statsRouter);

app.use("/uploads",express.static("uploads"))

//server linten
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})