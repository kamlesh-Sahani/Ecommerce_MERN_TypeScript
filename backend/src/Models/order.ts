import mongoose from "mongoose";
import { newOrderType } from "../Types/types.js";

const schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "please Enter Address"],
      },
      city: {
        type: String,
        required: [true, "Please enter city "],
      },
      state: {
        type: String,
        required: [true, "Please enter city "],
      },
      country: {
        type: String,
        required: [true, "Please enter city "],
      },
      pinCode: {
        type: String,
        required: [true, "please enter the pin code "],
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      requied: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: Number,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    orderItem: [
      {
        name: String,
        photo: String,
        price: Number,
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", schema);
