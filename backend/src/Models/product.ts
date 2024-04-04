import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },
    photo: {
      type: String,
      required: [true, "please upload images"],
    },
    price: {
      type: Number,
      required: [true, "please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "please enter stack"],
    },
    category: {
      type: String,
      required: [true, "please enter category"],
      trim:true
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
