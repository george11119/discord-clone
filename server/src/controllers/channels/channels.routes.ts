import express from "express"
import ChannelsController from "./channels.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import { io } from "../../app"

const router = express.Router()
router.use(authenticatedValidator)

router.get("/:serverId", async (req, res) => {
  const { serverId } = req.params
  const userId = req.user?.id as string

  // to check if current logged in user is in the server they want channels for
  const userIsInServer = await isUserInServer({ serverId, userId })

  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to access the channels in this server",
    })
  }

  const channels = await ChannelsController.getChannelsFromServerId(
    req.user?.id as string,
    serverId,
  )

  if (!channels) {
    res.status(404).json({ message: "Server does not exist" })
  }

  res.json(channels)
})

router.post("/:serverId", async (req, res) => {
  const { serverId } = req.params
  const userId = req.user?.id as string
  const { name } = req.body

  // check if the user is in the server
  const userIsInServer = await isUserInServer({ serverId, userId })
  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to create channels in this server",
    })
  }

  // attempt to create the channel
  const channel = await ChannelsController.createChannel(name, serverId)

  io.to(`server-${channel?.server.id}`)
    .except(`${userId}`)
    .emit("channel:create", channel)

  channel ? res.status(201).json(channel) : res.status(500)
})

router.patch("/:serverId/:channelId", async (req, res) => {
  const { serverId, channelId } = req.params
  const userId = req.user?.id as string
  const { name } = req.body

  const userIsInServer = await isUserInServer({ serverId, userId })
  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to update channels in this server",
    })
  }

  const channel = await ChannelsController.updateChannel(name, channelId)

  io.to(`server-${serverId}`).except(`${userId}`).emit("channel:edit", channel)

  channel ? res.status(200).json(channel) : res.status(500)
})

router.delete("/:serverId/:channelId", async (req, res) => {
  const { serverId, channelId } = req.params
  const userId = req.user?.id as string

  const userIsInServer = await isUserInServer({ serverId, userId })
  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to delete channels in this server",
    })
  }

  await ChannelsController.deleteChannel(channelId)

  io.to(`server-${serverId}`)
    .except(`${userId}`)
    .emit("channel:delete", channelId, serverId)

  res.status(204).end()
})

export default router
