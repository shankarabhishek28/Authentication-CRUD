import express from "express";
import { User } from "../models/user.js"
import { getMyDetail, login,  logout,  register} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/new", register)
router.post("/login", login )
router.post("/logout", logout )


router.get("/me",isAuthenticated,getMyDetail);

export default router;
