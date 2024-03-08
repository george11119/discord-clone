import express from "express"
import ChannelsController from "./channels.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"

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

export default router
