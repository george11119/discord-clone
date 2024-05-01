// initial data for database
import logger from "../utils/logger"
import { Server } from "../models/server"
import { User } from "../models/user"
import bcrypt from "bcrypt"
import { clearDatabase, db } from "./db"
import { Channel } from "../models/channel"
import { UserServers } from "../models/userServers"
import { Message } from "../models/message"
import { FriendRequest } from "../models/friendRequest"
import { Friendship } from "../models/friendship"
import { DirectMessage } from "../models/directMessage"
import { ChannelType } from "../../../types"
import { createInverseDirectMessage } from "../controllers/helpers"

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
    const channel = Channel.create({
      name: `Channel ${i}`,
    })

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

  // 10 messages in server 1
  for (let i = 1; i <= 10; i++) {
    await Message.create({ content: `Hello ${i}`, user: user1, channel }).save()
  }

  // create 15 more users in 'Server 1'
  for (let i = 5; i < 20; i++) {
    const fillerUser = await User.save({
      username: `testusername${i}`,
      passwordHash: await bcrypt.hash("password", 10), // password is "password"
      email: `test${i}@test.com`,
    })
    await UserServers.save({ user: fillerUser, server: server! })
  }
  const user10 = await User.findOne({ where: { username: "testusername10" } })
  await FriendRequest.save({
    senderId: user1.id,
    receiverId: user10?.id,
  })

  const user11 = await User.findOne({ where: { username: "testusername11" } })
  await FriendRequest.save({
    senderId: user1.id,
    receiverId: user11?.id,
  })

  const user12 = await User.findOne({ where: { username: "testusername12" } })
  await FriendRequest.save({
    senderId: user12?.id,
    receiverId: user1.id,
  })

  const friendship1 = Friendship.create({
    ownerId: user1.id,
    friendId: user2.id,
  })
  await friendship1.save()

  const friendship2 = Friendship.create({
    ownerId: user1.id,
    friendId: user3.id,
  })
  await friendship2.save()

  const directMessageChannel = await Channel.save({
    name: "user1 user2",
    channelType: ChannelType.DIRECT_MESSAGE,
  })

  const directMessageRelation1 = await DirectMessage.save({
    ownerId: user1?.id,
    recepientId: user2?.id,
    channelId: directMessageChannel.id,
  })
  await createInverseDirectMessage(directMessageRelation1)
}

const testingStuff = async () => {
  for (let i = 1; i <= 10; i++) {
    await User.save({
      username: `testusername${i}`,
      passwordHash: await bcrypt.hash("password", 10), // password is "password"
      email: `test${i}@test.com`,
    })
  }

  for (let i = 1; i <= 5; i++) {
    await Channel.save({ name: `Channel ${i}` })
  }

  const user1 = await User.findOne({ where: { username: "testusername1" } })
  const user2 = await User.findOne({ where: { username: "testusername2" } })
  const user3 = await User.findOne({ where: { username: "testusername3" } })
  const user4 = await User.findOne({ where: { username: "testusername4" } })
  const user5 = await User.findOne({ where: { username: "testusername5" } })
  const user6 = await User.findOne({ where: { username: "testusername6" } })
  const user7 = await User.findOne({ where: { username: "testusername7" } })
  const user8 = await User.findOne({ where: { username: "testusername8" } })
  const user9 = await User.findOne({ where: { username: "testusername9" } })
  const user10 = await User.findOne({ where: { username: "testusername10" } })

  const channel1 = await Channel.findOne({ where: { name: "Channel 1" } })
  const channel2 = await Channel.findOne({ where: { name: "Channel 2" } })
  const channel3 = await Channel.findOne({ where: { name: "Channel 3" } })
  const channel4 = await Channel.findOne({ where: { name: "Channel 4" } })
  const channel5 = await Channel.findOne({ where: { name: "Channel 5" } })

  const directMessage1 = DirectMessage.create({
    ownerId: user1?.id,
    recepientId: user3?.id,
    channelId: channel1?.id,
  })
  await directMessage1.save()
  await createInverseDirectMessage(directMessage1)

  const directMessage2 = await DirectMessage.save({
    ownerId: user6?.id,
    recepientId: user2?.id,
    channelId: channel4?.id,
  })
  await createInverseDirectMessage(directMessage2)

  const directMessage3 = DirectMessage.create({
    ownerId: user4?.id,
    recepientId: user5?.id,
    channelId: channel3?.id,
  })
  await directMessage3.save()
  await createInverseDirectMessage(directMessage3)

  const directMessage4 = DirectMessage.create({
    ownerId: user1?.id,
    recepientId: user10?.id,
    channelId: channel5?.id,
  })
  await directMessage4.save()
  await createInverseDirectMessage(directMessage4)

  const directMessage5 = DirectMessage.create({
    ownerId: user8?.id,
    recepientId: user7?.id,
    channelId: channel3?.id,
  })
  await directMessage5.save()
  await createInverseDirectMessage(directMessage5)

  const queryResult = await User.findOne({
    where: { username: "testusername1" },
    relations: { ownedDirectMessages: { recepient: true } },
  })
  console.log(queryResult)

  const count = await DirectMessage.count()
  console.log(count)
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
  // await testingStuff()
  logger.info("Database seeded")

  await db.destroy()
}

main()
