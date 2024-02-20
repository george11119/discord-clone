import express from "express"
import cors from "cors"
import messagesRouter from "./routes/messages"
import { createServer } from "http"
import { Server } from "socket.io"
import config from "./utils/config"

const app = express()
export const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: [config.CLIENT_URL],
  },
})

app.use(express.json())
app.use(cors())

// test route
app.get("/api", (req, res) => {
  res.send("working")
})

// routes
app.use("/api/messages", messagesRouter)

// websocket stuff
io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () => {
    console.log("A user disconnected")
  })
})
