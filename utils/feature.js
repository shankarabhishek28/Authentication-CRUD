import jwt from "jsonwebtoken"

export const sendCookie = (user,res,message,statusCode = 200) => {
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge: 15 * 60 * 1000,
        sameSite:process.env.NODE_ENV === "Development" ? "lax":"none",
        //since we are using cors
        secure:process.env.NODE_ENV === "Development" ? false: true,
        //is site is not same so atleast it should be secure? is it too much to ask?
    }).json({
        success:true,
        message,
    })
}