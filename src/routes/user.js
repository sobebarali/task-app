"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", user_1.sendOTP);
userRouter.post("/login", user_1.verifyOTP);
exports.default = userRouter;
