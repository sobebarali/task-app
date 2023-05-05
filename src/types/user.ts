import {Document} from "mongoose";

export interface IUser extends Document {
    phoneNumber?: string
    userId?: string
}