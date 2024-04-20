import express from "express"
import messagesController from "./messages.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import { Channel } from "../../models/channel"
import { User } from "../../models/user"
import { io } from "../../app"

const router = express.Router()
router.use(authenticatedValidator)

// get all messages
router.get("/:channelId", async (req, res) => {
  const { channelId } = req.params
  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" })
  }

  const userId = req.user?.id as string
  const serverId = channel?.server.id as string

  const userIsInServer = await isUserInServer({
    userId,
    serverId,
  })

  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to access the messages on this channel",
    })
  }

  const messages = await messagesController.getMessages({ channelId })
  res.json(messages)
})

// create a message
router.post("/:channelId", async (req, res) => {
  const { channelId } = req.params
  const { content } = req.body
  const user = req.user as User

  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  const userIsInServer = await isUserInServer({
    serverId: channel?.server.id as string,
    userId: user.id,
  })

  if (!channel || !userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to create messages on this channel",
    })
  }

  const message = await messagesController.createMessage({
    content,
    user,
    channel,
  })

  io.to(`channel-${message.channel.id}`)
    .except(`${user.id}`)
    .emit("message:create", message)

  res.status(201).json(message)
})

router.patch("/:channelId/:messageId", async (req, res) => {
  const { channelId, messageId } = req.params
  const { content } = req.body
  const user = req.user as User

  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  const userIsInServer = await isUserInServer({
    serverId: channel?.server.id as string,
    userId: user.id,
  })

  if (!channel || !userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to create messages on this channel",
    })
  }

  const message = await messagesController.updateMessage({
    content,
    messageId,
  })

  io.to(`channel-${message?.channel.id}`)
    .except(`${user.id}`)
    .emit("message:edit", message)

  res.status(200).json(message)
})

router.delete("/:channelId/:messageId", async (req, res) => {
  const { channelId, messageId } = req.params
  const user = req.user as User

  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  const userIsInServer = await isUserInServer({
    serverId: channel?.server.id as string,
    userId: user.id,
  })

  if (!channel || !userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to create messages on this channel",
    })
  }

  await messagesController.deleteMessage({ messageId })

  io.to(`channel-${channelId}`)
    .except(`${user.id}`)
    .emit("message:delete", messageId)

  res.status(204).end()
})

export default router
