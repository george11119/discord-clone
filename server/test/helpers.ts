import { afterAll, beforeAll } from "@jest/globals"
import { clearDatabase, db } from "../src/config/db"
import bcrypt from "bcrypt"
import { User } from "../src/models/user"
import { Server } from "../src/models/server"
import { UserServers } from "../src/models/userServers"
import { Channel } from "../src/models/channel"
import { Message } from "../src/models/message"
import { clearRedis, redisClient } from "../src/config/redis"
import idGenerator from "../src/utils/idGenerator"

export const dbSetupAndTeardown = () => {
  beforeAll(async () => {
    // start up database and redis connection
    await db.initialize()
    await redisClient.connect()
  })

  afterAll(async () => {
    // clear out database and close database connection
    await clearDatabase()
    await db.destroy()

    // clear out redis and close redis connection
    await clearRedis()
    await redisClient.quit()
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

const generateMessage = async ({
  content,
  user,
  channel,
}: {
  content: string
  user: User
  channel: Channel
}): Promise<Message> => {
  const newMessage = await Message.save({
    content,
    user,
    channel,
  })

  return newMessage
}

const generateServerInviteLink = async ({
  server,
}: {
  server: Server
}): Promise<{ code: string }> => {
  const inviteLinkId = idGenerator.generateInviteLinkId()
  await redisClient.set(inviteLinkId, server.id, { EX: 60 * 60 * 24 }) // 1 day
  return { code: inviteLinkId }
}

const testHelpers = {
  generateUser,
  generateServer,
  generateChannel,
  generateMessage,
  generateServerInviteLink,
}

export default testHelpers
