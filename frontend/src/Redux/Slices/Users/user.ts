import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {  LoginUserArr, UserInitialStateType, UserResponseType } from "../../../Types/types";


// login
export const fetchLoginUser = createAsyncThunk<UserResponseType,LoginUserArr>(
  "fetch/loginUser",
  async ({email,userId}) => {
    try {
      const api: string = `${import.meta.env.VITE_SERVER}/api-v1/user/login`;
      const { data } = await axios.post(api, {email,userId});
      return data;
    } catch (error) {
      return error;
    }
  }
);

// register
export const fetchRegisterUser = createAsyncThunk<UserResponseType,LoginUserArr>(
  "fetch/registerUser",
  async (RegisterData) => {
    try {
      const api: string = `${import.meta.env.VITE_SERVER}/api-v1/user/register`;
      const { data } = await axios.post(api, RegisterData);
      return data;
    } catch (error) {
      return error;
    }
  }
);


// get  user 
export const fetchGetUser  = createAsyncThunk<UserResponseType,string>("fetch/getUser",async(uid)=>{
  try {
    const api:string =`${import.meta.env.VITE_SERVER}/api-v1/user/${uid}`;
    const {data } =  await axios.get(api);
    return data;
  } catch (error) {
    return error;
  }
})

const initialState:UserInitialStateType={
  loading:false,
  user:null,
  error:undefined
}
const userSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login user ------------
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.loading = true;
      state.error = undefined; 
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = undefined; 
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message ;
    });


    // register user --------
    builder.addCase(fetchRegisterUser.pending,(state)=>{
      state.loading = true;
      state.error = undefined;
    })
    .addCase(fetchRegisterUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
      state.error = undefined; 
    })
    .addCase(fetchRegisterUser.rejected,(state,action)=>{
      state.loading = false;
      state.user = null;
      state.error = action.error.message ;
    })

    // get user

    builder.addCase(fetchGetUser.pending,(state)=>{
      state.loading=true
    })
    .addCase(fetchGetUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(fetchGetUser.rejected,(state,action)=>{
      state.loading = false;
      state.user = null;
      state.error = action.error.message;

    })
  },
});

export default userSlice;
