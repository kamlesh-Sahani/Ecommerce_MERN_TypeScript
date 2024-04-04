import { Request, Response } from "express";
import { userResponseType } from "../Types/types.js";
import { myCache } from "../app.js";
import { Product } from "../Models/product.js";
import Order from "../Models/order.js";
import { User } from "../Models/user.js";
import { calPercentage } from "../Utils/feature.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    let stats;
    const key = "admin-stats";
    if (myCache.has(key)) {
      stats = JSON.parse(myCache.get(key) as string);
    } else {
      const today = new Date();
      const thisMonth = {
        start: new Date(today.getFullYear(), today.getMonth(), 1),
        end: today,
      };

      const lastMonth = {
        start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
        end: new Date(today.getFullYear(), today.getMonth(), 0),
      };

      //last 6 month
      const last6Month = {
        start: new Date(today.getFullYear(), today.getMonth() - 6, 1),
        end: today,
      };

      // products
      const thisMonthProductPromise = Product.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthProductPromise = Product.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      // orders

      const thisMonthOrderPromise = Order.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthOrderPromise = Order.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      //users
      const thisMonthUserPromise = User.find({
        createdAt: {
          $gte: thisMonth.start,
          $lte: thisMonth.end,
        },
      });

      const lastMonthUserPromise = User.find({
        createdAt: {
          $gte: lastMonth.start,
          $lte: lastMonth.end,
        },
      });

      // last 6 month revenue
      const last6MonthTotalPromise = Order.find({
        createdAt: {
          $gte: last6Month.start,
          $lte: last6Month.end,
        },
      }).select("total");

      // lastest transction
      const latestTranscationPromise = Order.find({}).limit(4);

      const [
        lastMonthUser,
        thisMonthUser,
        lastMonthOrder,
        thisMonthOrder,
        lastMonthProduct,
        thisMonthProduct,
        productCount,
        userCount,
        allOrder,
        last6MonthTotal,
        categories,
        allProducts,
        userRatioCount,
        latestTranscation,
      ] = await Promise.all([
        lastMonthUserPromise,
        thisMonthUserPromise,
        lastMonthOrderPromise,
        thisMonthOrderPromise,
        lastMonthProductPromise,
        thisMonthProductPromise,
        Product.countDocuments(),
        User.countDocuments(),
        Order.find({}).select("total"),
        last6MonthTotalPromise,
        Product.find({}).distinct("category"),
        Product.find({}),
        User.countDocuments({ gender: "male" }),
        latestTranscationPromise,
      ]);

      // modifing the latest transction

      const modifiedLatestTrancation = latestTranscation.map((o) => ({
        _id: o._id,
        discount: o.discount,
        amount: o.total,
        quantity: o.orderItem.length,
        status: o.status,
      }));
      // revenue calulation
      // this month
      let thisMonthRevenue = 0;
      const thisLen = thisMonthOrder.length;
      for (let i = 0; i < thisLen; i++) {
        thisMonthRevenue += thisMonthOrder[i].total;
      }

      //lastMonth Revenue
      const LastLen = lastMonthOrder.length;
      let lastMonthRevenue = 0;
      for (let i = 0; i < LastLen; i++) {
        lastMonthRevenue += lastMonthOrder[i].total;
      }
      const userPercentage = calPercentage(
        thisMonthUser.length,
        lastMonthUser.length
      );
      const productPercentage = calPercentage(
        thisMonthProduct.length,
        lastMonthProduct.length
      );
      const orderPercentage = calPercentage(
        thisMonthOrder.length,
        lastMonthOrder.length
      );
      const revenuePercentage = calPercentage(
        thisMonthRevenue,
        lastMonthRevenue
      );

      let totalRevenue = 0;
      for (let i = 0; i < allOrder.length; i++) {
        totalRevenue += allOrder[i].total;
      }

      let last6MonthRevenue: number[] = [];
      for (let i = 0; i < last6MonthTotal.length; i++) {
        last6MonthRevenue.push(last6MonthTotal[i].total);
      }

      const CategoryCount: Record<string, number>[] = [];
      for (let i = 0; i < categories.length; i++) {
        let count = 0;
        let jIndex = 0;
        for (let j = 0; j < allProducts.length; j++) {
          if (allProducts[j].category === categories[i]) {
            count += 1;
            jIndex = j;
          }
        }
        CategoryCount.push({
          [allProducts[jIndex].category]: Math.round(
            (count / allProducts.length) * 100
          ),
        });
      }

      const userRatio = {
        male: userRatioCount,
        femal: userCount - userRatioCount,
      };
      // stats objects

      stats = {
        userRatio,
        CategoryCount,
        changePercent: {
          userPercentage,
          productPercentage,
          orderPercentage,
          revenuePercentage,
        },
        count: {
          revenue: totalRevenue,
          product: productCount,
          user: userCount,
          order: allOrder.length,
        },
        last6MonthRevenue,
        modifiedLatestTrancation,
      };

      myCache.set(key, JSON.stringify(stats));
    }
    const response: userResponseType = {
      success: true,
      stats,
    };
    res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};

export const getPieChart = async (req: Request, res: Response) => {
  try {
    let pieChart;
    const key = "admin-pie-chart";
    if (myCache.has(key)) {
      pieChart = JSON.parse(myCache.get(key) as string);
    } else {
      const [
        processingOrder,
        shippedOrder,
        deliveredOrder,
        categories,
        allProducts,
        outOfStock,
        noOfAdmin,
        noOfUser,
        allUsers,
      ] = await Promise.all([
        Order.countDocuments({ status: "Processing" }),
        Order.countDocuments({ status: "Shipped" }),
        Order.countDocuments({ status: "Delivered" }),
        Product.find({}).distinct("category"),
        Product.find({}),
        Product.countDocuments({stock:0}),
        User.countDocuments({role:"admin"}),
        User.countDocuments({role:"user"}),
        User.find({}).select("dob")
      ]);

      // order fullfilment wheter its processing,shipped or delivered status
      const orderFullfillment = {
        processing: processingOrder,
        shipped: shippedOrder,
        delivered: deliveredOrder,
      };

      // product categoies and its percentage
      const CategoryCount: Record<string, number>[] = [];
      for (let i = 0; i < categories.length; i++) {
        let count = 0;
        let jIndex = 0;
        for (let j = 0; j < allProducts.length; j++) {
          if (allProducts[j].category === categories[i]) {
            count += 1;
            jIndex = j;
          }
        }
        CategoryCount.push({
          [allProducts[jIndex].category]: Math.round(
            (count / allProducts.length) * 100
          ),
        });
      }


      // stock availibilty
      const stockAvailability={
        inStock:allProducts.length - outOfStock,
        outOfStock
      }


      // admin and customer 
      const adminUser={
        noOfAdmin,
        noOfUser
      } 

      // age group
      const userAgeGroup={
        teen:allUsers.filter((u)=>u.age <=18).length,
        adult:allUsers.filter((u)=>u.age>=18 && u.age<= 40).length,
        olda:allUsers.filter((u)=>u.age>=40).length
      }
      pieChart = {
        orderFullfillment,
        CategoryCount,
        stockAvailability,
        adminUser,
        userAgeGroup
      };

      myCache.set(key,JSON.stringify(pieChart));

    }
    const response:userResponseType={
      success:true,
      pieChart
    }
    return res.status(200).json(response);
  } catch (error: any) {
    const response: userResponseType = {
      success: false,
      message: error.message,
    };
    return res.status(500).json(response);
  }
};
