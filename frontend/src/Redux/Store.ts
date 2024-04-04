import {configureStore} from '@reduxjs/toolkit';
import userSlice from './Slices/Users/user';
import productSlice from './Slices/Products/product';
import couponSlice from './Slices/Payment/Coupon';

const Store = configureStore({
        reducer:{
            user:userSlice.reducer,
            product:productSlice.reducer,
            payment:couponSlice.reducer
        }
})


export default Store;
export type AppDispatch= typeof Store.dispatch;
export type RootType = ReturnType<typeof Store.getState>;