import mongoose from "mongoose";

export const connectDB = () => {

mongoose.connect(process.env.MONGO, {
    dbName: "backendapi",
})
    .then(() => console.log("connected db"))
    .catch((e) => console.log(e));
}