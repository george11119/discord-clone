import express from "express"
import cors from "cors"
import "express-async-errors"
import { createServer } from "http"
import { Server } from "socket.io"
import { db } from "./config/db"
import config from "./config/config"
import passport from "passport"
import session from "express-session"

import "./config/passport-setup"
import authRouter from "./controllers/auth/auth.routes"
import messageRouter from "./controllers/messages/messages.routes"
import usersRouter from "./controllers/users/users.routes"
import messageService from "./controllers/messages/messages.socket"

import { requestLogger } from "./middleware/requestLogger"
import { unknownEndpoint } from "./middleware/unknownEndpoint"
import { errorHandler } from "./middleware/errorHandler"

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

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
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

// routes
app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

// websocket stuff
io.on("connection", (socket) => {
  socket.on("message:create", messageService.createMessage)
})
