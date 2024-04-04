import { Request, Response, response } from "express";
import Order from "../Models/order.js";
import { newOrderType, userResponseType } from "../Types/types.js";
import { invalidDataCashe, reduceProduct } from "../Utils/feature.js";
import mongoose from "mongoose";
import { myCache } from "../app.js";
import order from "../Models/order.js";

// new Order

export const newOrder = async (req: Request, res: Response) => {
  try {
    const {
      shippingInfo,
      subTotal,
      tax,
      shippingCharge,
      discount,
      total,
      orderItem,
      user,
    } = req.body as newOrderType;

    const order = await Order.create({
      shippingInfo,
      user: new mongoose.Types.ObjectId(user),
      subTotal,
      tax,
      shippingCharge,
      discount,
      total,
      orderItem,
    });
    if (!order) {
      const response: userResponseType = {
        success: false,
        message: "order faild to Placed",
      };
      return res.status(401).json(response);
    }

    await reduceProduct(orderItem);

    const response: userResponseType = {
      success: true,
      message: "Ordre placed successfuly",
    };

    await invalidDataCashe({ product: { isProduct: true } });

    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// my orders

export const myOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const key = `my-oders-${id}`;
    let orders;
    if (myCache.has(key)) {
      orders = JSON.parse(myCache.get(key) as string);
    } else {
      orders = await Order.find({ user: id });
      myCache.set(key, JSON.stringify(orders));
    }
    if (!orders) {
      const response: userResponseType = {
        success: false,
        message: "order is not found",
      };
      return res.status(400).json(response);
    }

    const response: userResponseType = {
      success: true,
      orders,
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// get all orders
export const allOrders = async (req: Request, res: Response) => {
  try {
    let orders;
    if (myCache.has("all-orders")) {
      orders = JSON.parse(myCache.get("all-orders") as string);
    } else {
      orders = await Order.find({});
      myCache.set("all-orders", JSON.stringify(orders));
    }

    const response: userResponseType = {
      success: false,
      orders,
    };

    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// get single product

export const getOrder = async (req: Request, res: Response) => {
  try {
    let order;
    const { id } = req.params;
    const key = `order-${id}`;
    if (myCache.has(key)) {
      order = JSON.parse(myCache.get(key) as string);
    } else {
      order = await Order.findById(id);
      myCache.set(key, JSON.stringify(order));
    }

    const response: userResponseType = {
      success: true,
      order,
    };

    res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.messaeg,
    };
    return res.status(500).json(response);
  }
};

// order status
export const processingOrder = async (req: Request, res: Response) => {
  try {

    const {id} = req.params;
    const order = await Order.findById(id);
    if (!order) {
      const response: userResponseType = {
        success: false,
        message: "order is not found",
      };
      return res.status(400).json(response);
    }
    switch (order.status) {
      case "Processing":
        order.status = "Shipped";
        break;

      case "Shipped":
        order.status = "Delivered";
        break;

      default:
        order.status = "Delivered";
        break;
    }
    await order.save();

    await invalidDataCashe({order:{isOrder:true,"order_id":id,"userId":order.user}})
    const response: userResponseType = {
      success: true,
      message: "order placessed successfuly",
    };
    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.messaeg,
    };
    return res.status(500).json(response);
  }
};


// delete order
export const deleteOrder = async(req:Request,res:Response)=>{
  try {
    const {id} = req.params;
    const order = await Order.findById(id);
    if(!order){
      const response:userResponseType={
        success:false,
        message:"Order is not found"
      }
      return res.status(400).json(response);
    }

    await order.deleteOne();
    const response:userResponseType={
      success:true,
      message:"order deleted successfuly"
    }

    await invalidDataCashe({order:{isOrder:true,"order_id":id,"userId":order.user}})
    
    return res.status(200).json(response);
  } catch (error:any) {
    const response: userResponseType = {
      success: false,
      message: error.messaeg,
    };
    return res.status(500).json(response);
  }
}
