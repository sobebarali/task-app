import express, { Express } from "express"
import mongoose from "mongoose"
import todoRoutes from "./routes/todo"
import directoryRoutes from "./routes/directory"

const app: Express = express()

app.use(express.json())
app.use(todoRoutes)
app.use(directoryRoutes)

const uri: string = `mongodb+srv://sobebarali:sobebarali@cluster0.hgfhdxu.mongodb.net/?retryWrites=true&w=majority`

const PORT: number = 8000
mongoose.connect(uri).then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })