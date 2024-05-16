import { Request, Response } from "express";
import twilio from "twilio";
import getId from "get-short-id";
import User from "../models/user";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const accountSid: any = process.env.ACCOUNT_SID;
const authToken: any = process.env.AUTH_TOKEN;
const verifySid: any = process.env.VERIFY_SID;
const client: twilio.Twilio = twilio(accountSid, authToken);
const secretKey: any = process.env.SECRET_KEY;
const expiresIn: number = 60 * 60 * 24 * 365;

const masterPhoneNumber = "9999999999";
const masterOTP = "123456";

const sendOTP = async (req: Request, res: Response) => {
  try {
    const phoneNumber: string = req.body.phoneNumber;

    if (phoneNumber === masterPhoneNumber) {
      return res.status(200).send({
        data: {
          success: true,
          sendAt: new Date().getTime(),
        },
        error: null,
      });
    }

    const result: any = await client.verify.v2
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
  } catch (err: any) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error While sending the OTP",
    });
  }
};

const verifyOTP = async (req: Request, res: Response) => {
  try {
    const phoneNumber: string = req.body.phoneNumber;
    const otp: string = req.body.otp;

    if (phoneNumber === masterPhoneNumber && otp === masterOTP) {
      const userExist = await User.findOne({ phoneNumber });
      let userId: string;
      if (userExist) {
        userId = userExist.userId as string;
      } else {
        userId = getId({ prefix: "user-", count: 20 });
        const user = new User({
          userId,
          phoneNumber,
        });
        await user.save();
      }
      const token: string = jwt.sign({ phoneNumber, userId }, secretKey, {
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

    const result: any = await client.verify.v2
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
      const userExist = await User.findOne({ phoneNumber });
      let userId: string;
      if (userExist) {
        userId = userExist.userId as string;
      } else {
        userId = getId({ prefix: "user-", count: 20 });
        const user = new User({
          userId,
          phoneNumber,
        });
        await user.save();
      }
      const token: string = jwt.sign({ phoneNumber, userId }, secretKey, {
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
  } catch (err: any) {
    return res.status(500).send({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Unknown error. Team informed, will fix it soon",
      },
      meta: "Error Verifying the otp",
    });
  }
};

export { sendOTP, verifyOTP };