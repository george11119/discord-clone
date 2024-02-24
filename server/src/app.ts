import express from "express"
import cors from "cors"
import "express-async-errors"
import messageRouter from "./controllers/messages/messages.routes"
import { createServer } from "http"
import { Server } from "socket.io"
import config from "./config/config"
import messageService from "./controllers/messages/messages.socket"

const app = express()
export const server = createServer(app)
export const io = new Server(server, {
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
app.use("/api/messages", messageRouter)

// websocket stuff
io.on("connection", (socket) => {
  socket.on("message:create", messageService.createMessage)
})
