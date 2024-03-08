import express from "express"
import messagesController from "./messages.db"
import { Message } from "../../models/message"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import { Channel } from "../../models/channel"

const router = express.Router()

// get all messages
router.get("/:channelId", authenticatedValidator, async (req, res) => {
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

  const messages = await messagesController.getAllMessages({ channelId })
  res.json({ messages })
})

// create a message
router.post("/", authenticatedValidator, async (req, res) => {
  const { content } = req.body
  const message: Message = await messagesController.createNewMessage({
    content,
  })
  res.status(201).json(message)
})

export default router
