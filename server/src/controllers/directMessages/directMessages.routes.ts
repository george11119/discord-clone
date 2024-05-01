import express from "express"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { User } from "../../models/user"
import { DirectMessage } from "../../models/directMessage"
import { Channel } from "../../models/channel"
import { ChannelType } from "../../../../types"
import { createInverseDirectMessage } from "../helpers"

const router = express.Router()
router.use(authenticatedValidator)

// returns all direct messages relations the current logged in user owns
router.get("/", async (req, res) => {
  const directMessageRelations = await DirectMessage.find({
    where: { ownerId: req.user?.id },
    relations: { channel: true, recepient: true },
    order: { channel: { updatedAt: "DESC" } },
  })

  return res.status(200).json(directMessageRelations)
})

// creates a new channel for direct messages if there does not exist one already
// if one already exists, return the existing one instead
router.post("/", async (req, res) => {
  const { recepient }: { recepient: User } = req.body

  const existingDirectMessageRelation = await DirectMessage.findOne({
    where: { ownerId: req.user?.id, recepientId: recepient.id },
  })

  if (existingDirectMessageRelation) {
    return res.status(400).json({
      message: "A channel for direct messaging this user already exists",
    })
  }

  // a channel has already been created by the person the current user
  // is trying to create a direct message room for, return that already
  // created room and create a inverse relationship
  const inverseDirectMessageRelation = await DirectMessage.findOne({
    where: { ownerId: recepient.id, recepientId: req.user?.id },
    relations: { channel: true },
  })

  if (inverseDirectMessageRelation) {
    const ownedDirectMessageRelation = await createInverseDirectMessage(
      inverseDirectMessageRelation,
    )
    const channel = inverseDirectMessageRelation.channel

    return res
      .status(200)
      .json({ ...ownedDirectMessageRelation, recepient, channel })
  }

  // no channel exists, create a new channel and a direct message
  // relation owned by the current user and return the relationship
  const channel = await Channel.save({
    name: "direct message channel",
    channelType: ChannelType.DIRECT_MESSAGE,
  })
  const newDirectMessageRelation = await DirectMessage.save({
    ownerId: req.user?.id,
    recepientId: recepient.id,
    channelId: channel.id,
  })

  res.status(200).json({ ...newDirectMessageRelation, channel, recepient })
})

// syncs the seen number of messages with number of messages in the channel
router.post("/:directMessageId/ack", async (req, res) => {
  const { directMessageId } = req.params

  const directMessageRelation = await DirectMessage.findOne({
    where: { id: directMessageId },
    relations: { channel: true },
  })

  await DirectMessage.save({
    id: directMessageId,
    seenMessagesCount: directMessageRelation?.channel.messageCount,
  })

  res.status(204).end()
})

export default router
