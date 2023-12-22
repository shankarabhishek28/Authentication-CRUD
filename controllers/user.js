import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import ErrorHandler from "../middlewares/error.js";

import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/feature.js"


export const login = async (req, res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("User Not Found",404));

    const isMatch = await bcrypt.compare(password, user.password )
    
    if(!isMatch) return next(new ErrorHandler("Invalid Email or Passsword",404));

    sendCookie(user,res,`Welcome back,${user.name}`,200)
}
export const register = async(req,res,next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(404).json({
        success:false,
        message:"user exist"
    });
    
    if(user) return next(new ErrorHandler("User Exist already",404));

    const hashedPassword = await bcrypt.hash(password,10);
    
    user = await User.create({name,email,password:hashedPassword});
    sendCookie(user,res,"ho gaya registered",201);

}
export const getMyDetail = async(req,res) => {

    res.status(200).json({
        success:true,
        user:req.user,
    })

};
export const logout = (req,res) => {
    res
    .status(200)
    .cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
        secure: process.env.NODE_ENV === "Development" ? false: true,
    })
    .json({
        success:true,
        message:"Logged Out Successfully",
        user:req.user,
    })

}