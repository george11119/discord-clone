import express from "express"
import messagesController from "./messages.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import { Channel } from "../../models/channel"
import { User } from "../../models/user"

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

  const messages = await messagesController.getMessages({ channelId })
  res.json({ messages })
})

// create a message
router.post("/:channelId", authenticatedValidator, async (req, res) => {
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

  res.status(201).json(message)
})

router.patch(
  "/:channelId/:messageId",
  authenticatedValidator,
  async (req, res) => {
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
    channel ? res.status(200).json(message) : res.status(500)
  },
)

export default router
