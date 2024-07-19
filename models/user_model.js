import mongoose from "mongoose";
import { type } from "os";

const user_schema = new mongoose.Schema({
    name : {
        type :String,
        required:true,
        trim:true,
    },
    email :{
        type:String,
        required:true,
        unique:true ,
    },
    password : {
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    answer:{
        type: {},
        required:true,
        trim:true
    },
    role:{
        type:Number,
        default:0,
    }
},
{timestamps:true}
);
 
export default mongoose.model("users",user_schema);