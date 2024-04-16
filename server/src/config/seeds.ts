// initial data for database
import logger from "../utils/logger"
import { Server } from "../models/server"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { clearDatabase, db } from "./db"
import { Channel } from "../models/channel"
import { UserServers } from "../models/userServers"
import { Message } from "../models/message"

const seedDatabase = async () => {
  // create users
  const user1 = await User.save({
    username: "testusername1",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test1@test.com",
  })

  const user2 = await User.save({
    username: "testusername2",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test2@test.com",
  })

  const user3 = await User.save({
    username: "testusername3",
    passwordHash: await bcrypt.hash("password", 10), // password is "password"
    email: "test3@test.com",
  })

  // put user 1, 2, and 3 in a server
  for (let i = 1; i <= 5; i++) {
    const server = await Server.save({ name: `Server ${i}` })
    await UserServers.save({ user: user1, server })
    await UserServers.save({ user: user2, server })
    await UserServers.save({ user: user3, server })
  }

  // create 5 channels for the first server
  for (let i = 1; i <= 5; i++) {
    const server = await Server.findOne({
      where: { name: "Server 1" },
    })
    const channel = Channel.create({ name: `Channel ${i}` })

    if (server) channel.server = server

    await channel.save()
  }

  // create 3 servers for user 2
  for (let i = 1; i <= 3; i++) {
    const server = await Server.save({ name: `User 2's Server ${i}` })
    await UserServers.save({ user: user2, server })
  }

  // create 10 messages for the first channel in the first server
  const server = await Server.findOne({
    where: { name: "Server 1" },
    relations: { channels: true },
  })

  const channel = server?.channels[0]

  for (let i = 1; i <= 10; i++) {
    await Message.save({ content: `Hello ${i}`, user: user1, channel })
  }
}

const main = async () => {
  logger.info("Initializing database")
  await db.initialize()
  logger.info("Database initialized")

  logger.info("Wiping out old data")
  await clearDatabase()
  logger.info("previous data deleted")

  logger.info("Starting database seed")
  await seedDatabase()
  logger.info("Database seeded")

  await db.destroy()
}

main()
