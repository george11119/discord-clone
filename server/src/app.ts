import express from "express"
import cors from "cors"
import "express-async-errors"
import { createServer } from "http"
import { Server } from "socket.io"
import { db } from "./config/db"
import config from "./config/config"
import passport from "passport"
import session from "express-session"
import { Strategy as LocalStrategy } from "passport-local"

import messageRouter from "./controllers/messages/messages.routes"
import usersRouter from "./controllers/users/users.routes"
import messageService from "./controllers/messages/messages.socket"

import { requestLogger } from "./middleware/requestLogger"
import { unknownEndpoint } from "./middleware/unknownEndpoint"
import { errorHandler } from "./middleware/errorHandler"
import { User } from "./models/user"
import bcrypt from "bcrypt"
import logger from "./utils/logger"

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
app.use(cors())
app.use(requestLogger)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user!)
})

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOneBy({ email })
      const passwordHash = await User.findOne({
        where: { email },
        select: ["passwordHash"],
      })

      logger.info("USER:")
      logger.info(user)
      logger.info(passwordHash)

      const passwordCorrect =
        passwordHash === null
          ? false
          : await bcrypt.compare(password, passwordHash.passwordHash)

      if (user) {
        return passwordCorrect ? done(null, user) : done(null, false)
      } else {
        return done(null, false)
      }
    } catch (e) {
      return done(e)
    }
  }),
)

app.post(
  "/api/auth",
  passport.authenticate("local", {
    successRedirect: "/api/messages",
    failureRedirect: "/login",
  }),
)

// test route
app.get("/api", (req, res) => {
  res.send("working")
})

// routes
app.use("/api/messages", messageRouter)
app.use("/api/users", usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

// websocket stuff
io.on("connection", (socket) => {
  socket.on("message:create", messageService.createMessage)
})
