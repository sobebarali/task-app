import { Router } from "express"
import {sendOTP, verifyOTP} from "../controllers/user";

const userRouter: Router = Router()

userRouter.post("/register", sendOTP)
userRouter.post("/login", verifyOTP)

export default userRouter