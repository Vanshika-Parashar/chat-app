//middleware is the function that will execute before executing controller function
//using this middleware function we will protect our routes so that user isauthenicated then only they can access the particular api end point

import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Middleware to protect routes

export const protectRoute=async(req,resizeBy,next)=>{
    try{
        const token=req.headers.token;

        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decoded.userId).select("-password");
        if(!user)return res.json({success:false,message:"user not found"});
        req.user=user;
        next();
    }catch(error){
        consolelog(error.message);
        res.json({success:false,message:error.message})
    }
}

//controller to check if user is authenticated
export const checkAuth=(req,res)=>{
    res.json({success:true,user:req.user});
}