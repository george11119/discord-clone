import express from "express"
import cors from "cors"
import "express-async-errors"
import { createServer } from "http"
import { Server } from "socket.io"
import { initializeDatabase } from "./config/db"
import config from "./config/config"
import passport from "passport"

import "./config/passportConfig"
import authRouter from "./controllers/auth/auth.routes"
import messageRouter from "./controllers/messages/messages.routes"
import usersRouter from "./controllers/users/users.routes"
import serverRouter from "./controllers/servers/servers.routes"
import channelsRouter from "./controllers/channels/channels.routes"
import messageService from "./controllers/messages/messages.socket"

import { requestLogger } from "./middleware/requestLogger"
import { unknownEndpoint } from "./middleware/unknownEndpoint"
import { errorHandler } from "./middleware/errorHandler"
import { tokenExtractor } from "./middleware/tokenExtractor"
import { authenticatedValidator } from "./middleware/authenticatedValidator"

initializeDatabase()

const app = express()
export const server = createServer(app)
export const io = new Server(server, {
  cors: {
    origin: [config.CLIENT_URL],
  },
})

app.use(passport.initialize())
app.use(express.json())
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
)
app.use(requestLogger)

// test route
app.get("/api", (req, res) => {
  res.send("working")
})

// routes that dont require login
app.use("/api/auth", authRouter)

// routes that require login
app.use("/api/messages", messageRouter)
app.use("/api/users", usersRouter)
app.use("/api/servers", serverRouter)
app.use("/api/channels", channelsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

// websocket stuff
io.on("connection", (socket) => {
  socket.on("message:create", messageService.createMessage)
})
