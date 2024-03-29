import express from "express"
import ChannelsController from "./channels.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import { Server } from "../../models/server"

const router = express.Router()

router.get("/:serverId", authenticatedValidator, async (req, res) => {
  const { serverId } = req.params
  const userId = req.user?.id as string

  // to check if current logged in user is in the server they want channels for
  const userIsInServer = await isUserInServer({ serverId, userId })

  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to access the channels in this server",
    })
  }

  const channels = await ChannelsController.getChannels(
    req.user?.id as string,
    serverId,
  )

  if (!channels) {
    res.status(404).json({ message: "Server does not exist" })
  }

  res.json({ channels })
})

router.post("/:serverId", authenticatedValidator, async (req, res) => {
  const { serverId } = req.params
  const userId = req.user?.id as string
  const { name } = req.body

  // check if the server exists
  const server = await Server.findOne({ where: { id: serverId } })
  if (!server) {
    res.status(400).json({ message: "Server does not exist" })
  }

  // check if the ser is in the server
  const userIsInServer = await isUserInServer({ serverId, userId })
  if (!userIsInServer) {
    res.status(401).json({
      message: "You are not allowed to create channels in this server",
    })
  }

  // attempt to create the channel
  const channel = await ChannelsController.createChannel(name, serverId)
  channel ? res.status(201).json(channel) : res.status(500)
})

export default router
