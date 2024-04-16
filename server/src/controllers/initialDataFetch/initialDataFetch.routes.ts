import express from "express"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import serversDb from "../servers/servers.db"

const router = express.Router()

router.get("/", authenticatedValidator, async (req, res) => {
  const user = req?.user
  const servers = await serversDb.getServersWithChannels(user?.id as string)
  const payload = { user, servers }
  res.status(200).json(payload)
})

export default router
