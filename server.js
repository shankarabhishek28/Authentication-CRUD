import { app } from "./app.js"
import { connectDB } from "./data/database.js";
import {config} from "dotenv";



config({
    path:"./data/config.env"
})
connectDB();
console.log(process.env.PORT)
app.listen(4000,() => {
    console.log(`server is working in ${process.env.PORT} in ${process.env.NODE_ENV} mode `)
})