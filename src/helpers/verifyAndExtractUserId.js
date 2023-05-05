"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndExtractUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const verifyAndExtractUserId = (token) => {
    const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
    const todayDate = Math.floor(new Date().getTime() / 1000);
    const isExpired = decodedToken.exp
        ? decodedToken.exp < todayDate
        : true;
    if (!isExpired && decodedToken.userId) {
        return decodedToken.userId;
    }
    return null;
};
exports.verifyAndExtractUserId = verifyAndExtractUserId;
