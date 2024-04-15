import express from "express"
import cors from "cors"
import "express-async-errors"
import { createServer } from "http"
import { Server } from "socket.io"
import { initializeDatabase } from "./config/db"
import config from "./config/config"
import passport from "passport"

import "./config/passportConfig"
import testingRouter from "./controllers/testing/testing.routes"
import authRouter from "./controllers/auth/auth.routes"
import messageRouter from "./controllers/messages/messages.routes"
import usersRouter from "./controllers/users/users.routes"
import serverRouter from "./controllers/servers/servers.routes"
import channelsRouter from "./controllers/channels/channels.routes"
import messageSocket from "./controllers/messages/messages.socket"

import { requestLogger } from "./middleware/requestLogger"
import { unknownEndpoint } from "./middleware/unknownEndpoint"
import { errorHandler } from "./middleware/errorHandler"
import { tokenExtractor } from "./middleware/tokenExtractor"
import logger from "./utils/logger"

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
app.use(tokenExtractor)
app.use(requestLogger)

// test route
app.get("/api", (req, res) => res.json({ status: "Running" }))

// routes that dont require login
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)

// routes to be used when testing
if (process.env.NODE_ENV === "test") {
  logger.info("Using development routes")
  app.use("/api/testing", testingRouter)
}

// routes that require login
app.use("/api/messages", messageRouter)
app.use("/api/servers", serverRouter)
app.use("/api/channels", channelsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

// websocket stuff
io.on("connection", (socket) => {
  // console.log("CONNECTED")

  // server room stuff
  socket.on("joinServerRoom", (serverId) => {
    socket.join(`server-${serverId}`)
  })
  socket.on("leaveServerRoom", (serverId) => {
    socket.leave(`server-${serverId}`)
  })

  // channel room stuff
  socket.on("joinChannelRoom", (channelId) => {
    socket.join(`channel-${channelId}`)
  })
  socket.on("leaveChannelRoom", (channelId) => {
    socket.leave(`channel-${channelId}`)
  })

  socket.on("message:create", (m) => messageSocket.emitCreatedMessage(m))

  // socket.on("disconnect", (reason) => {
  //   console.log("USER DISCONNECTED", reason)
  // })
})

let i = 0
setInterval(() => {
  console.log(`ran setInterval ${i} times`)
  console.log(io.sockets.adapter.rooms)
  i++
}, 5000)
