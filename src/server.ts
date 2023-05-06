import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/user";
import taskRouter from "./routes/task";
import cors from "cors";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const uri: any = process.env.MONGO_URI

const PORT: any = process.env.PORT
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
