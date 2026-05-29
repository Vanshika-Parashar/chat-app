//using models we can store data in mongodb database
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    //define property that will be available in user data
    email:{type:String,
        required:true,
        unique:true
    },
    fullName:{type:String,
        required:true
    },
    password:{type:String,
        required:true,
        minlength:9
    },
    profilepic:{type:String,
        default:""
    },
    bio:{type:String
    },
    
},{timestamps:true});
const user=mongoose.model("User",userSchema);
export default User;