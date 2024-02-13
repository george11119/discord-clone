import express from "express"
import cors from "cors"
import messagesRouter from "./routes/v1/messages"

export const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("working")
})

app.use("/api/messages", messagesRouter)
