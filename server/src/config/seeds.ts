// initial data for database
import logger from "../utils/logger"
import { Server } from "../models/server"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { db } from "./db"
import { Message } from "../models/message"
import { Channel } from "../models/channel"
import { UserServers } from "../models/userServers"

const seedDatabase = async () => {
  await User.delete({})
  await Server.delete({})
  await Message.delete({})
  await Channel.delete({})

  const user = await User.save({
    username: "testusername",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test@test.com",
  })

  const server1 = await Server.save({ name: "Server 1" })
  const server2 = await Server.save({ name: "Server 2" })

  const userServer1 = await UserServers.save({ user: user, server: server1 })
  const userServer2 = await UserServers.save({ user: user, server: server2 })

  logger.info(userServer1)
  logger.info(userServer2)
}

const main = async () => {
  logger.info("Initializing database")
  await db.initialize()
  logger.info("Database initialized")

  logger.info("Starting database seed")
  await seedDatabase()
  logger.info("Database seeded")

  await db.close()
}

main()
