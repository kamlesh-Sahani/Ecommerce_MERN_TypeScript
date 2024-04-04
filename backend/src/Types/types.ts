export interface newUserType {
    name:string;
    _id?:string;
    email:string;
    dob:Date;
    gender:string;
    photo:string;
    userId:string;
}

export interface newProductType{
    name?:string;
    photo?:string;
    stock?:number|null;
    category:string;
    price?:number;
}
export  interface userResponseType{
    success:boolean;
    message?:string;
    user?:newUserType |undefined;
    users?:newUserType[] |undefined;
    product?:newProductType|null;
    products?:newProductType[]|null;
    totalPage?:number;
    orders?:newOrderType[]|undefined;
    order?:newOrderType|undefined;
    amount?:number;
    coupons?:couponType[]|undefined;
    stats?:any;
    pieChart?:any
}

export interface queryType{
    name?:string;
    price?:number;
    sort?:string;
    category?:string;
    page?:number;
}


export interface queryObjType{
    name?:{
        $regex:string,
        $options:string
    };
    price?:{
        $lte:number
    };
    sort?:string;
    category?:{
        $regex:string,
        $options:string
    }
}


export type invalidDataCasheType={
   
    product?:{
        isProduct?:boolean;
        product_id?:string;
    };
    order?:{
        isOrder?:boolean,
        order_id?:string,
        userId?:any
    }
}


export type shippingInfoType={
    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:string;
}

export type orderItemType={
    _id?:string
    name:string;
    photo:string;
    price:number;
    quantity:number;
    productId?:any
}

export interface newOrderType{
    shippingInfo:shippingInfoType;
    user:string;
    subTotal:number;
    tax:number;
    shippingCharge:number;
    discount:number;
    total:number;
    orderItem:orderItemType[];
}



export type couponType={
    code:string,
    amount:number
}