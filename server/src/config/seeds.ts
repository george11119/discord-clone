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
  await UserServers.delete({})
  await User.delete({})
  await Server.delete({})
  await Message.delete({})
  await Channel.delete({})

  const user = await User.save({
    username: "testusername",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test@test.com",
  })

  for (let i = 1; i <= 5; i++) {
    const server = await Server.save({ name: `Server ${i}` })
    await UserServers.save({ user, server })
  }

  const u = await User.findOne({
    where: { id: user.id },
    relations: {
      userServers: {
        server: true,
      },
    },
  })

  const userServers = u?.userServers.forEach(({ server }) =>
    logger.info(server),
  )
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
