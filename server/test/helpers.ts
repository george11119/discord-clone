import { afterAll, beforeAll } from "@jest/globals"
import { clearDatabase, db } from "../src/config/db"
import bcrypt from "bcrypt"
import { User } from "../src/models/user"
import { Server } from "../src/models/server"
import { UserServers } from "../src/models/userServers"
import { Channel } from "../src/models/channel"

export const dbSetupAndTeardown = () => {
  beforeAll(async () => {
    // start up database connection
    await db.initialize()
  })

  afterAll(async () => {
    // clear out database and close database connection
    await clearDatabase()
    await db.destroy()
  })
}

const generateUser = async ({
  email,
  username,
  password,
}: {
  email: string
  username: string
  password: string
}): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await User.save({
    email,
    passwordHash,
    username,
  })

  return newUser
}

const generateServer = async ({
  name,
  user,
}: {
  name: string
  user: User
}): Promise<Server> => {
  const newServer = await Server.save({ name })
  await UserServers.save({ user, server: newServer })

  return newServer
}

const generateChannel = async ({
  name,
  server,
}: {
  name: string
  server: Server
}): Promise<Channel> => {
  const newChannel = Channel.create({ name })
  newChannel.server = server
  await Channel.save(newChannel)

  return newChannel
}

export default {
  generateUser,
  generateServer,
  generateChannel,
}
