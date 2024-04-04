

// user
  export type UserType = {
    _id:string;
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string |Date;
    
  };

  export interface UserResponseType{
    success:boolean;
    message?:string |undefined;
    user:UserType |null;
  }

 export interface LoginUserArr{
    email:string |null,
    userId:string |null
  };

export interface UserInitialStateType {
    loading:boolean,
    error:string|undefined,
    user:UserResponseType|null
};





// products


export interface ProductType{
  name:string;
  photo:string;
  price:number;
  stock:number;
  category:string;
  _id:string;

}


export interface ProductResponseType{
  success:boolean;
  message?:string;
  products:ProductType[]|null;
  totalPage:number|0;
  categories?:Array<string>;
}

export  interface ProductIntialState{
loading:boolean;
product:ProductResponseType |null;
categories?:Array<string>|null;
error:string|undefined;
cartItem:ProductType[];
isProductAdded:boolean;
}

export interface AllProductArr{
  page?:number;
  maxPrice?:number;
  sortPrice?:string;
  category?:string;
  name?:string;
}


// coupon -----------

export interface  GetCouponDiscountArr{
  message?:string;
  success:boolean;
  coupon:string;
}

export  interface CouponinitialStateType{
  loading:boolean;
  coupon:GetCouponDiscountArr| null;
  error:string|undefined;
}

