import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    userId:string;
    dob: Date;
    createdAt: Date;
    updatedAt: Date;

    // virtual attribute
    age: number;
}

const schema = new Schema<IUser>({
  
    name: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    email: {
        type: String,
        unique:true,
        required: [true, "please Enter Email"]
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please Enter gender"]
    },
    dob: {
        type: Date,
        required: [true, "please enter Date of Birth"]
    },
    userId:{
        type:String,
        select:false,
        required:[true,"Please ecnter User Id"]
    }
}, {
    timestamps: true
});

schema.virtual("age").get(function (this: IUser) {
    const today = new Date();
    const dob = this.dob;

    let age: number = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
});

export const User = mongoose.model<IUser>("User", schema);
