import { Product } from "../Models/product.js";
import {
    invalidDataCasheType,
    newProductType,
    orderItemType,
} from "../Types/types.js";
import { myCache } from "../app.js";

export const invalidDataCashe = async ({
    product,
    order,
}: invalidDataCasheType) => {
    if (product && product.isProduct) {
        const productKey: string[] = ["latest-product", "categories","admin-stats","admin-pie-chart"];

        if (product.product_id) {
            productKey.push(`product-${product.product_id}`);
        }
        myCache.del(productKey);
    }
    if (order && order.isOrder) {
        const orderKey: string[] = ["all-orders","admin-stats","admin-pie-chart"];

        if (order.order_id) {
            orderKey.push(`order-${order.order_id}`);
        }

        if (order.userId) {
            orderKey.push(`my-oders-${order.userId}`);
        }
        console.log(orderKey);
        myCache.del(orderKey);
    }
};

export const reduceProduct = async (orderItem: orderItemType[]) => {
    for (let i = 0; i < orderItem.length; i++) {
        const order = orderItem[i];
        const product = await Product.findById(order.productId);
        product!.stock -= order.quantity;

        await product?.save();
    }
};



// calculate the percentage 

export const calPercentage= (thisMonth:number,lastMonth:number)=>{
    if(lastMonth ===0){
        return thisMonth *100;
    }
    const percentage = ((thisMonth - lastMonth)/lastMonth )*100
    return Number(percentage.toFixed(0))
}