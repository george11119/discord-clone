import express from "express"
import ChannelsController from "./channels.db"

const router = express.Router()

router.get("/:serverId", async (req, res) => {
  const { serverId } = req.params

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
