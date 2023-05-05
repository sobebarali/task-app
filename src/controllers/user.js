"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.sendOTP = void 0;
const twilio_1 = __importDefault(require("twilio"));
const get_short_id_1 = __importDefault(require("get-short-id"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = (0, twilio_1.default)(accountSid, authToken);
const secretKey = process.env.SECRET_KEY;
const expiresIn = 60 * 60 * 24 * 365;
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phoneNumber = req.body.phoneNumber;
        const result = yield client.verify.v2
            .services(verifySid)
            .verifications.create({ to: phoneNumber, channel: "sms" });
        if (result.status === "pending") {
            return res.status(200).send({
                data: {
                    success: true,
                    sendAt: new Date().getTime(),
                },
                error: null,
            });
        }
    }
    catch (err) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error While sending the OTP",
        });
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phoneNumber = req.body.phoneNumber;
        const otp = req.body.otp;
        const result = yield client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: phoneNumber, code: otp });
        if (result.status === "pending") {
            return res.status(401).send({
                data: null,
                error: {
                    code: "INVALID_OTP",
                    message: "OTP is invalid",
                },
                meta: "OTP does not match",
            });
        }
        if (result.status === "approved") {
            const userExist = yield user_1.default.findOne({ phoneNumber });
            let userId;
            if (userExist) {
                userId = userExist.userId;
            }
            else {
                userId = (0, get_short_id_1.default)({ prefix: "user-", count: 20 });
                const user = new user_1.default({
                    userId,
                    phoneNumber,
                });
                yield user.save();
            }
            const token = jsonwebtoken_1.default.sign({ phoneNumber, userId }, secretKey, {
                expiresIn,
            });
            return res.status(200).send({
                data: {
                    success: true,
                    phoneNumber,
                    userId,
                    token,
                },
                error: null,
            });
        }
    }
    catch (err) {
        return res.status(500).send({
            data: null,
            error: {
                code: "INTERNAL_ERROR",
                message: "Unknown error. Team informed, will fix it soon",
            },
            meta: "Error Verifying the otp",
        });
    }
});
exports.verifyOTP = verifyOTP;
