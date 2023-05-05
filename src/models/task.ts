import { ITodo } from "../types/task"
import { model, Schema } from "mongoose"

const todoSchema: Schema = new Schema({
    userId: {type: String},
    title: {type: String},
    status: {type: Boolean, default: false},
  },
  { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)