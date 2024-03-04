// initial data for database
import logger from "../utils/logger"
import { Server } from "../models/server"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { db } from "./db"
import { Message } from "../models/message"
import { Channel } from "../models/channel"
import { UserServers } from "../models/userServers"
import { server } from "../app"

const seedDatabase = async () => {
  await UserServers.delete({})
  await User.delete({})
  await Server.delete({})
  await Message.delete({})
  await Channel.delete({})

  const user1 = await User.save({
    username: "testusername1",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test1@test.com",
  })

  for (let i = 1; i <= 5; i++) {
    const server = await Server.save({ name: `Server ${i}` })
    await UserServers.save({ user: user1, server })
  }

  // const user2 = await User.save({
  //   username: "testusername2",
  //   passwordHash: await bcrypt.hash("password", 10), // password is "password"
  //   email: "test2@test.com",
  // })

  // for (let i = 1; i <= 3; i++) {
  //   const server = await Server.save({ name: `Server ${i}` })
  //   await UserServers.save({ user: user2, server })
  // }

  const server = await Server.findOne({ where: { name: "Server 1" } })

  for (let i = 1; i <= 3; i++) {
    const channel = Channel.create({ name: `Channel ${i}` })

    if (server) {
      channel.server = server
    }

    await channel.save()
  }
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
