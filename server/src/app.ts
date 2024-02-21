import express from "express"
import cors from "cors"
import messagesRouter from "./routes/messages"
import { createServer } from "http"
import { Server } from "socket.io"
import config from "./utils/config"
import logger from "./utils/logger"
import { createMessage } from "./controllers/messagesController"

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
app.use("/api/messages", messagesRouter)

// websocket stuff
io.on("connection", (socket) => {
  logger.info("A user connected")

  socket.on("disconnect", () => {
    logger.info("A user disconnected")
  })

  socket.on("message:create", async (res) => {
    const createdMessage = await createMessage(res)
    io.emit("message:create", { createdMessage })
  })
})
