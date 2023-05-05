import { model, Schema } from "mongoose";
import {IUser} from "../types/user";

const userSchema: Schema = new Schema({
  phoneNumber: { type: String },
  userId: { type: String },
},{
    timestamps: true
});

export default model<IUser>("User", userSchema)


