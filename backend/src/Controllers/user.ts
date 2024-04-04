import { Request, Response } from "express";
import { User } from "../Models/user.js";
import { newUserType, userResponseType } from "../Types/types.js";
// register

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {  name, email, photo, gender, dob,userId } = req.body as newUserType;
    const isExist = await User.findOne({ email });
    if (isExist) {
      const response: userResponseType = {
        success: false,
        message: "Email is already exist",
      };
      return res.status(400).json(response);
    }
    const user = await User.create({
      name,
      email,
      photo,
      gender,
      dob: new Date(dob),
      userId
    });

    if (!user) {
      const response: userResponseType = {
        success: false,
        message: "Failed to Register",
      };
      return res.status(400).json(response);
    }

    const response: userResponseType = {
      success: true,
      message: `Welcome ${user.name}`,
      user
    };

    return res.status(201).json(response);
  } catch (error: any) {
    console.error("Error during registration:", error);
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// login user 
export const userLogin = async(req:Request,res:Response)=>{
  try {
    const {email,userId}  = req.body;
    const user = await User.findOne({email}).select("+userId");
    if(!user){
      const response:userResponseType={
        message:"User not Found",
        success:false,
      }
    return  res.status(400).json(response);
    }

    if(user.userId!==userId){
      const response:userResponseType={
        message:"wrong password or email",
        success:false
      }
       return res.status(400).json(response);
    }
    const response:userResponseType={
      message:`Welcome ${user.name}`,
      success:true,
      user
    }
    return res.status(200).json(response);
  } catch (error:any) {
    const response:userResponseType={
      message:error.message,
      success:false
    }
  
    return res.status(500).json(response);
  }
}

// get All user 

export const getAllUser = async(req:Request,res:Response)=>{
  try {
    const users = await User.find({});
   

    if(!users){
      const response:userResponseType={
        message:"user does not found",
        success:false
      }

      return res.status(400).json(response);
    }

    const response:userResponseType={
      message:"users find successduly",
      success:true,
      users
    }


    return res.status(201).json(response);


  } catch (error:any) {
  const response:userResponseType={
    message:error.message,
    success:false
  }

  return res.status(500).json(response);
  }
}


//get single user
export const getUser = async(req:Request,res:Response)=>{
  try {
    const userId = req.params.id;
    const user = await User.findOne({userId});
    if(!user){
      const response:userResponseType={
        success:false,
        message:"user not found"
      }
      return res.status(400).json(response);
    }

    const response:userResponseType={
      success:true,
      message:"User Found",
      user
    }
    return res.status(201).json(response);
  } catch (error:any) {
    const response:userResponseType={
      success:false,
      message:error.message
    }

    return res.status(500).json(response);
  }
}


// delete user 
export const deleteUser = async(req:Request,res:Response)=>{
  try {
    const user = await User.findById(req.params.id);
    if(!user){
      const response:userResponseType={
        success:false,
        message:"user not found"
      }
      return res.status(400).json(response);
    }

    await user.deleteOne();
    const response:userResponseType={
      success:true,
      message:"user deleted",
    }
    return res.status(201).json(response);

  } catch (error:any) {
    const response:userResponseType={
      success:false,
      message:error.message
    }
    return res.status(500).json(response);
  }
}
