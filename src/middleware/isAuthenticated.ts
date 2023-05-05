import { Request, Response, NextFunction } from "express";
import {verifyAndExtractUserId} from "../helpers/verifyAndExtractUserId";

export const isAuthenticated: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    const token: string = authorization?.split(" ")[1]!;
    const userId = verifyAndExtractUserId(token);
    if (!userId) {
      return res.status(401).send({
        data: null,
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized Access, Login Required",
        },
      });
    }
    next();
  } catch (err: any) {
    res.status(401).json({
      data: null,
      error: {
        code: "INVALID_SIGNNATURE",
        message: "Invalid Token",
      },
      meta: "Authentication Failed",
    });
  }
};
