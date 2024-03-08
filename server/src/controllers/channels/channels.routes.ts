import express from "express"
import ChannelsController from "./channels.db"
import { UserServers } from "../../models/userServers"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"

const router = express.Router()

router.get("/:serverId", authenticatedValidator, async (req, res) => {
  const { serverId } = req.params

  // to check if current logged in user is in the server they want channels for
  const userServer = await UserServers.findOneBy({
    serverId,
    userId: req.user?.id,
  })

  if (!userServer) {
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
