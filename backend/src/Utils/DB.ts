import mongoose from "mongoose";
export const connectDB = async()=>{
 try {
    const conn = await mongoose.connect(process.env.DB_URL as string,{
        dbName:process.env.DB_NAME
    })
    console.log(`database connect succesfuly : ${conn.connection.host}`)
 } catch (error:any) {
    console.log(`database connection error : ${error.message}`);
 }   
}