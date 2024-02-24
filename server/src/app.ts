import express from "express"
import cors from "cors"
import "express-async-errors"
import { createServer } from "http"
import { Server } from "socket.io"
import { db } from "./config/db"
import config from "./config/config"

import messageRouter from "./controllers/messages/messages.routes"
import usersRouter from "./controllers/users/users.routes"
import messageService from "./controllers/messages/messages.socket"

db.initialize()
  .then(() => {
    console.log("Database initialized")
  })
  .catch((e) => {
    console.log("Database initialization error", e)
  })

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
app.use("/api/users", usersRouter)

// websocket stuff
io.on("connection", (socket) => {
  socket.on("message:create", messageService.createMessage)
})
