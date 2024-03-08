import express from "express"
import ServersController from "./servers.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"

const router = express.Router()

router.get("/", authenticatedValidator, async (req, res) => {
  const servers = await ServersController.getServers(req.user?.id as string)
  res.json({ servers })
})

export default router
