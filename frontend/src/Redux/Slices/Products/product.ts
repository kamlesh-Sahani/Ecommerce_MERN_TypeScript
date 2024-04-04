import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AllProductArr, ProductIntialState, ProductResponseType, ProductType } from "../../../Types/types";

export const fetchAllProduct = createAsyncThunk<ProductResponseType, AllProductArr>(
  "fetch/allProduct",
  async ({page=1,maxPrice,sortPrice,category,name}) => {
    try {
      let  api = `${import.meta.env.VITE_SERVER}/api-v1/product/product`;
      if(page){
        api+=`?page=${page}`;
      }
      if(maxPrice && maxPrice>100){
        api+=`&price=${maxPrice}`;
      }
      if(sortPrice){
        api+=`&sort=${sortPrice}`;
      }
      if(category){
        api+=`&category=${category}`;
      }
      if(name){
        api+=`&name=${name}`;
      }
      const { data } = await axios.get(api);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchProductCategory = createAsyncThunk<ProductResponseType, void>(
    "fetch/productCategory",
    async () => {
      try {
        const api = `${import.meta.env.VITE_SERVER}/api-v1/product/categories`;
        const { data } = await axios.get(api);
        return data;
      } catch (error) {
        return error;
      }
    }
  );

  export const fetchLatestProduct = createAsyncThunk<ProductResponseType, void>(
    "fetch/latestProduct",
    async () => {
      try {
        const api = `${import.meta.env.VITE_SERVER}/api-v1/product/latest`;
        const { data } = await axios.get(api);
        return data;
      } catch (error) {
        return error;
      }
    }
  );
  // get the local storge cartItem data;
  const getLocalCartData = ()=>{
    const localData = localStorage.getItem("cartItem");
    if(localData?.length===0){
      return [];
    }
      return JSON.parse(localData!);

  }
const initialState: ProductIntialState = {
  loading: false,
  error: undefined,
  product: null,
  categories:null,
  cartItem:getLocalCartData(),
  isProductAdded:false,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addToCart:(state,action:PayloadAction<ProductType>)=>{
      for(let i=0;i<state.cartItem.length;i++){
        if(state.cartItem[i]._id===action.payload._id){
            state.isProductAdded = true;
            return;
        }
      }
      state.isProductAdded=false;
      state.cartItem.push(action.payload)
      localStorage.setItem("cartItem",JSON.stringify(state.cartItem))
    },
    removeItem:(state,action:PayloadAction<string>)=>{
      state.loading=true;
      for(let i=0;i<state.cartItem.length;i++){
        if(state.cartItem[i]._id === action.payload){
          state.cartItem.splice(i,1);
          localStorage.setItem("cartItem",JSON.stringify(state.cartItem))
          state.loading=false;
          return;
        }
      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      });


      // latest product

      builder
      .addCase(fetchLatestProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchLatestProduct.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      });


      // product categories
      builder
      .addCase(fetchProductCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchProductCategory.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.error.message;
      });

  },
});
export const {addToCart,removeItem} = productSlice.actions;
export default productSlice;

