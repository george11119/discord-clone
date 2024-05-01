import express from "express"
import messagesController from "./messages.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { createInverseDirectMessage, isUserInServer } from "../helpers"
import { Channel } from "../../models/channel"
import { User } from "../../models/user"
import { io } from "../../app"
import { ChannelType } from "../../../../types"
import { DirectMessage } from "../../models/directMessage"
import { Message } from "../../models/message"
import { db } from "../../config/db"

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

  if (channel.channelType === ChannelType.TEXT) {
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
  }

  if (channel.channelType === ChannelType.DIRECT_MESSAGE) {
    const ownerId = req.user?.id as string

    // check if user has a direct message in that channel
    const directMessageRelation = await DirectMessage.findOne({
      where: {
        ownerId,
        channelId,
      },
    })

    if (!directMessageRelation) {
      res.status(401).json({
        message: "You are not allowed to access the messages on this channel",
      })
    }

    const messages = await messagesController.getMessages({ channelId })
    res.status(200).json(messages)
  }
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

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" })
  }

  if (channel.channelType === ChannelType.TEXT) {
    const userIsInServer = await isUserInServer({
      serverId: channel.server.id as string,
      userId: user.id,
    })

    if (!userIsInServer) {
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
  }

  if (channel.channelType === ChannelType.DIRECT_MESSAGE) {
    const ownerId = req.user?.id as string

    // check if user has a direct message in that channel
    const directMessageRelation = await DirectMessage.findOne({
      where: {
        ownerId,
        channelId,
      },
    })

    if (!directMessageRelation) {
      return res.status(401).json({
        message: "You are not allowed to create messages on this channel",
      })
    }

    const message = await messagesController.createMessage({
      content,
      user,
      channel,
    })

    const existingInverseMessageRelation = await DirectMessage.findOne({
      where: {
        ownerId: directMessageRelation.recepientId,
        recepientId: ownerId,
      },
    })

    if (!existingInverseMessageRelation) {
      const newInverseDirectMessageRelation = await createInverseDirectMessage(
        directMessageRelation,
      )

      io.to(`${directMessageRelation.recepientId}`).emit(
        "directMessage:create",
        { ...newInverseDirectMessageRelation, recepient: req.user, channel },
      )
    }

    await Channel.save({
      id: channelId,
      messageCount: channel.messageCount + 1,
    })

    io.to(`${directMessageRelation.recepientId}`).emit(
      "directMessage:received",
      directMessageRelation.channelId,
    )

    io.to(`channel-${message.channel.id}`)
      .except(`${user.id}`)
      .emit("message:create", message)

    res.status(201).json(message)
  }
})

router.patch("/:channelId/:messageId", async (req, res) => {
  const { channelId, messageId } = req.params
  const { content } = req.body
  const user = req.user as User

  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  const message = await Message.findOne({ where: { id: messageId } })

  if (!channel || !message) {
    return res.status(404).json({ message: "Channel or message not found" })
  }

  if (channel.channelType === ChannelType.TEXT) {
    const userIsInServer = await isUserInServer({
      serverId: channel?.server.id as string,
      userId: user.id,
    })

    if (!userIsInServer) {
      return res.status(401).json({
        message: "You are not allowed to update messages on this channel",
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
  }

  if (channel.channelType === ChannelType.DIRECT_MESSAGE) {
    const ownerId = req.user?.id as string

    // check if user has a direct message in that channel
    const directMessageRelation = await DirectMessage.findOne({
      where: {
        ownerId,
        channelId,
      },
    })

    if (!directMessageRelation) {
      return res.status(401).json({
        message: "You are not allowed to update messages on this channel",
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
  }
})

router.delete("/:channelId/:messageId", async (req, res) => {
  const { channelId, messageId } = req.params
  const user = req.user as User

  const channel = await Channel.findOne({
    where: { id: channelId },
    relations: { server: true },
  })

  if (!channel) {
    return res.status(404).json({ message: "Channel not found" })
  }

  if (channel.channelType === ChannelType.TEXT) {
    const userIsInServer = await isUserInServer({
      serverId: channel?.server.id as string,
      userId: user.id,
    })

    if (!userIsInServer) {
      return res.status(401).json({
        message: "You are not allowed to delete messages on this channel",
      })
    }

    await messagesController.deleteMessage({ messageId })

    io.to(`channel-${channelId}`)
      .except(`${user.id}`)
      .emit("message:delete", messageId, channelId)

    res.status(204).end()
  }

  if (channel.channelType === ChannelType.DIRECT_MESSAGE) {
    const ownerId = req.user?.id as string

    // check if user has a direct message in that channel
    const directMessageRelation = await DirectMessage.findOne({
      where: {
        ownerId,
        channelId,
      },
    })

    if (!directMessageRelation) {
      return res.status(401).json({
        message: "You are not allowed to delete messages on this channel",
      })
    }

    await messagesController.deleteMessage({ messageId })

    io.to(`channel-${channelId}`)
      .except(`${user.id}`)
      .emit("message:delete", messageId, channelId)

    res.status(204).end()
  }
})

export default router
