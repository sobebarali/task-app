"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const verifyAndExtractUserId_1 = require("../helpers/verifyAndExtractUserId");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const userId = (0, verifyAndExtractUserId_1.verifyAndExtractUserId)(token);
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
    }
    catch (err) {
        res.status(401).json({
            data: null,
            error: {
                code: "INVALID_SIGNNATURE",
                message: "Invalid Token",
            },
            meta: "Authentication Failed",
        });
    }
});
exports.isAuthenticated = isAuthenticated;
