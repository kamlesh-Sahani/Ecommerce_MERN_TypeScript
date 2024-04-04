import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CouponinitialStateType, GetCouponDiscountArr } from "../../../Types/types";
export const fetchCouponDiscount = createAsyncThunk<GetCouponDiscountArr,string>(
  "fetch/couponDiscount",
  async (code) => {
    try {
      const api =`${
        import.meta.env.VITE_SERVER
      }/api-v1/payment/coupon/discount`;
      const { data } = await axios.post(api,{code});
      return data;
    } catch (error) {
      return error;
    }
  }
);

const initialState: CouponinitialStateType = {
  loading: false,
  coupon: null,
  error: undefined,
};
const couponSlice = createSlice({
  name: "couponSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponDiscount.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCouponDiscount.fulfilled,
        (state, action) => {
          state.loading = false;
          state.coupon = action.payload;
        }
      )
      .addCase(
        fetchCouponDiscount.rejected,
        (state, action) => {
          state.loading = false;
          state.coupon = null;
          state.error = action.error.message;
        }
      );
  },
});

export default couponSlice;
