import express from "express"
import ServersController from "./servers.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import idGenerator from "../../utils/idGenerator"
import { redisClient } from "../../config/redis"
import { UserServers } from "../../models/userServers"
import { io } from "../../app"
import ChannelsController from "../channels/channels.db"
import MessagesController from "../messages/messages.db"
import { User } from "../../models/user"
import { MessageType } from "../../models/message"

const router = express.Router()
router.use(authenticatedValidator)

router.get("/", async (req, res) => {
  const servers = await ServersController.getServersWithChannels(
    req.user?.id as string,
  )
  res.json({ servers })
})

router.post("/", async (req, res) => {
  const { name } = req.body
  const user = req.user

  if (!user) {
    return res.json({ message: "You must be logged in to create a server" })
  }

  const newServer = await ServersController.createServer({ name, user })
  await ChannelsController.createChannel("general", newServer.id)

  res.status(201).json(newServer)
})

router.patch("/:serverId", async (req, res) => {
  const { name } = req.body
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)

  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to update this server",
    })
  }

  const updatedServer = await ServersController.updateServer({ name, serverId })

  io.except(`${req.user?.id}`).emit("server:edit", updatedServer)

  res.json(updatedServer)
})

router.delete("/:serverId", async (req, res) => {
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)
  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to delete this server",
    })
  }

  await ServersController.deleteServer({ serverId })

  io.except(`${req.user?.id}`).emit("server:delete", serverId)

  res.status(204).end()
})

// creates a invite link for a user to join a server
router.post("/:serverId/invites", async (req, res) => {
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)
  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to create a invite for this server",
    })
  }

  const inviteLinkId = idGenerator.generateInviteLinkId()
  await redisClient.set(inviteLinkId, serverId, { EX: 60 * 60 * 24 * 7 }) // 7 days

  res.json({ code: inviteLinkId })
})

// allows a user to join a server given that the invite link is valid
router.post("/join/:inviteLinkId", async (req, res) => {
  const { inviteLinkId } = req.params

  const serverId = await redisClient.get(inviteLinkId)

  const server = await ServersController.getServer(serverId as string, {
    withChannels: true,
  })

  if (!server) {
    return res
      .status(400)
      .json({ joined: false, message: "Invalid invite link" })
  }

  const user = req.user as User

  const userIsInServer = await isUserInServer({
    serverId: server?.id,
    userId: user?.id as string,
  })

  if (userIsInServer) {
    return res.status(400).json({
      joined: false,
      message: "You are already part of this server",
    })
  }

  await UserServers.save({ user, server })

  io.to(`server-${serverId}`).emit("user:join", user, serverId)

  const channels = server.channels.filter((c) => c.channelType === "text")

  if (channels.length !== 0) {
    const channel = channels[0]
    const welcomeMessage = await MessagesController.createMessage({
      content: "",
      user,
      channel: channel,
      messageType: MessageType.WELCOME,
    })

    io.to(`channel-${channel.id}`)
      .except(`${user.id}`)
      .emit("message:create", welcomeMessage)
  }

  res.status(200).json({ joined: true })
})

router.post("/leave/:serverId", async (req, res) => {
  const { serverId } = req.params
  const user = req.user as User

  const userServer = await UserServers.findOne({
    where: {
      serverId: serverId,
      userId: user?.id as string,
    },
  })

  if (!userServer) {
    return res.status(400).json({
      left: false,
      message: "You are not in the given server",
    })
  }

  await UserServers.delete({ serverId: serverId, userId: user.id })

  io.to(`server-${serverId}`).emit("user:leave", user, serverId)

  const userCount = await ServersController.getUserCountOfServer(serverId)

  if (userCount === 0) await ServersController.deleteServer({ serverId })

  res.status(200).json({ left: true })
})

router.get("/:serverId/users", async (req, res) => {
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)

  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to get users in this server",
    })
  }

  const users = await ServersController.getUsersOfServer(serverId)

  res.status(200).json(users)
})

export default router
