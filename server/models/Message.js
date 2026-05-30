//using models we can store data in mongodb database
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    //define property that will be available in user data
    senderId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,ref:"User",required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    },
    seen:{
        type:Boolean,default:false
    }
    
},{timestamps:true});
const message=mongoose.model("Message",messageSchema);
export default Message;