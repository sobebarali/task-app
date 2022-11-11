import express, { Express } from "express"
import mongoose from "mongoose"
import todoRoutes from "./routes/todo"
import directoryRoutes from "./routes/directory"
import * as dotenv from 'dotenv'
dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(todoRoutes)
app.use(directoryRoutes)

const uri: any = process.env.MONGO_URI

const PORT: any =  process.env.PORT || 8000
mongoose.connect(uri).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })