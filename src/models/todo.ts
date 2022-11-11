import { ITodo } from "./../types/todo"
import { model, Schema } from "mongoose"

const todoSchema: Schema = new Schema({
    title: {type: String},
    status: {type: Boolean},
  },
  { timestamps: true }
)

export default model<ITodo>("Todo", todoSchema)