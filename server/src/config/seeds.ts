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
import { getRepository } from "typeorm"

const seedDatabase = async () => {
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

  for (let i = 1; i <= 5; i++) {
    const server = await Server.save({ name: `User 1's Server ${i}` })
    await UserServers.save({ user: user1, server })
  }

  for (let i = 1; i <= 3; i++) {
    const server = await Server.save({ name: `User 2's Server ${i}` })
    await UserServers.save({ user: user2, server })
  }

  for (let i = 1; i <= 3; i++) {
    const server = await Server.findOne({ where: { name: "Server 1" } })
    const channel = Channel.create({ name: `Channel ${i}` })

    if (server) channel.server = server

    await channel.save()
  }

  const servers = await db.query(
    `
        SELECT "server".*
        FROM "user"
                 INNER JOIN "user_servers" ON "user"."id" = "user_servers"."userId"
                 INNER JOIN "server" ON "user_servers"."serverId" = "server"."id"
        WHERE "user"."id" = $1
    `,
    [user1.id],
  )

  console.log(servers)
}

const main = async () => {
  await db.initialize()
  await db.dropDatabase()
  await db.destroy()

  logger.info("Initializing database")
  await db.initialize()
  logger.info("Database initialized")

  logger.info("Starting database seed")
  await seedDatabase()
  logger.info("Database seeded")

  await db.destroy()
}

main()
