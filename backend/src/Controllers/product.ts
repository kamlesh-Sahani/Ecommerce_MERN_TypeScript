import { Request, Response, query, response } from "express";
import { Product } from "../Models/product.js";
import {
  newProductType,
  queryObjType,
  queryType,
  userResponseType,
} from "../Types/types.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidDataCashe } from "../Utils/feature.js";

//new product

export const newProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category } = req.body as newProductType;
    const photo = req.file;
    const product = await Product.create({
      name,
      photo: photo?.path,
      price,
      category: category.toLocaleLowerCase(),
      stock,
    });

    if (!product) {
      const response: userResponseType = {
        success: false,
        message: "faild to post",
      };
      return res.status(400).json(response);
    }

    const response: userResponseType = {
      success: true,
      message: "successfuly post",
    };
    await invalidDataCashe({product:{isProduct:true}})
    return res.status(201).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      message: error.message,
      success: false,
    };
    return res.status(500).json(response);
  }
};

//latest product
export const getLatestProduct = async (req: Request, res: Response) => {
  try {
    let products;
    if(myCache.has("latest-product")){
      products = JSON.parse(myCache.get("latest-product") as string);
    }
    else{
      products = await Product.find({}).sort({ createdAt: -1 }).limit(10);
      myCache.set("latest-product", JSON.stringify(products));
    }

    const response: userResponseType = {
      success: true,
      products,
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

//get categories

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    let categories;

    if(myCache.has("categories")){
      categories=JSON.parse(myCache.get("categories") as string);
    }else{
      categories = await Product.distinct("category");
       myCache.set("categories",JSON.stringify(categories));
    }
    return res.status(200).json({
      succes: true,
      categories,
    });
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// get single product detail

export const getProduct = async (req: Request, res: Response) => {
  try {
    let product;
    const id = req.params.id;
    if(myCache.has(`product-${id}`)){
      product = JSON.parse(myCache.get(`product-${id}`) as string);
    }else{
       product = await Product.findById(req.params.id);
       if(!product){
        return res.status(400).json({success:false,message:"product is not found"})
       }
       myCache.set(`product-${id}`,JSON.stringify(product));
    }
   
    const response: userResponseType = {
      success: true,
      product,
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

// delete product

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      const response: userResponseType = {
        success: false,
        message: "product is not Found",
      };
      return res.status(400).json(response);
    }

    rm(product.photo, () => {
      console.log("photo deleted");
    });
    await product?.deleteOne();
    const response: userResponseType = {
      success: true,
      message: "product deleted",
    };

    await invalidDataCashe({product:{isProduct:true,"product_id":`${id}`}})
    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// update the product details

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    const { name, stock, category, price } = req.body;
    const photo = req.file;

    if (!product) {
      const response: userResponseType = {
        success: false,
        message: "Product is not found",
      };
      return res.status(400).json(response);
    }

    if (name) {
      product.name = name;
    }
    if (price) {
      product.price = price;
    }
    if (photo) {
      rm(product.photo, () => {
        console.log("prev photo deleted");
      });
      product.photo = photo.path;
    }

    if (stock) {
      product.stock = stock;
    }
    if (category) {
      product.category = category;
    }

    await product.save();

    const response: userResponseType = {
      message: "Updated successfuly",
      success: true,
    };
    await invalidDataCashe({product:{isProduct:true}})
    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

// get all product

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category, sort, page } = req.query as queryType;
    const queryObj: queryObjType = {};

    if (name) {
      queryObj.name = {
        $regex: name,
        $options: "i",
      };
    }
    if (price) {
      queryObj.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      queryObj.category = {
        $regex: category,
        $options: "i",
      };
    }
    //pagination
    const pageNo = Number(page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 6;
    const skip = (pageNo - 1) * limit;
    const products = await Product.find(queryObj)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    // for the pagination
    const allProducts = await Product.find(queryObj).sort(
      sort && { price: sort === "asc" ? 1 : -1 }
    );

    const totalPage = Math.ceil(allProducts.length / limit);
    const response: userResponseType = {
      success: true,
      products,
      totalPage,
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
