import express from "express";
import cors from "cors"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDB } from "./data/database.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();
// const router = express.Router();
//middleware to access the json data(in req.body)
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:[process.env.FRONTEND_URL],
        methods:["GET", "POST", "PUT", "DELETE"],
        credentials:true,
    })
)
//adding this base URL "/users" in routes-->user.js(router.post) 
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);







app.get("/",(req,res) => {
    res.send("noice");
})
//using error middleware
app.use(errorMiddleware);
