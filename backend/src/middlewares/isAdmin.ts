import { NextFunction, Request, Response } from "express";
import { User } from "../Models/user.js";
import { userResponseType } from "../Types/types.js";


export const  isAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await User.findById(req.query.id);
        if(!user){
            const response:userResponseType={
                success:false,
                message:"invalid id"
            }
            return res.status(400).json(response);
        }
        if(user.role!=="admin"){
            const response:userResponseType={
                success:false,
                message:'you are  Unauthorized'
            }
            return res.status(401).json(response);
        }

        next();
    } catch (error:any) {
        const response:userResponseType={
            success:false,
            message:error.message
        }
        return res.status(500).json(response);
    }
}