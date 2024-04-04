import { Request, Response, response } from "express";
import { Coupon } from "../Models/coupon.js";
import { couponType, userResponseType } from "../Types/types.js";
import { json } from "stream/consumers";

export const newCoupon = async(req:Request,res:Response)=>{
    try {
        const {code,amount} = req.body as couponType;
        const coupon = await Coupon.create({code,amount});
        if(!coupon){
            const response:userResponseType={
                success:false,
                message:"faild to create coupon"
            }
            return res.status(400).json(response);
        }
        const response:userResponseType={
            success:true,
            message:`${coupon.code} is created sucesfuly`
        }
        return res.status(201).json(response)
    } catch (error:any) {
        const response:userResponseType={
            success:false,
            message:error.message
        }
        return res.status(500).json(response);
    }
}


export const discount = async(req:Request,res:Response)=>{
    try {
        const {code} = req.body;
        console.log(code)
        console.log(req.body)
        const coupon= await Coupon.findOne({code});
        if(!coupon){
            const response:userResponseType={
                success:false,
                message:"wrong coupon code"
            }
            return res.status(400).json(response);
        }
        const response:userResponseType={
            success:true,
            amount:coupon.amount
        }
        return res.status(200).json(response);
    } catch (error:any) {
        const response:userResponseType={
            success:false,
            message:error.message
        }
        return res.status(500).json(response);
    }
}


// get all coupon

export const getAllCoupon = async(req:Request,res:Response)=>{
    try {
        const coupons = await Coupon.find({});
        const response:userResponseType={
            success:true,
            coupons
        }
        return res.status(200).json(response);
    } catch (error:any) {
        const response:userResponseType={
            success:false,
            message:error.message
        }
        return res.status(500).json(response);
    }
}

// delete coupon

export const deleteCoupon = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const coupon = await Coupon.findById(id);
        if(!coupon){
            const response:userResponseType={
                success:false,
                message:"Coupon is not found"
            }
            return res.status(400).json(response);
        }

        await coupon.deleteOne();
        const response:userResponseType={
            success:true,
            message:"coupon deleted"
        }
        return res.status(200).json(response);
    } catch (error:any) {
        const response:userResponseType={
            success:false,
            message:error.message
        }
        return res.status(500).json(response)
    }
}