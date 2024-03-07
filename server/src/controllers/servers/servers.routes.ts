import express from "express"
import ServersController from "./servers.db"

const router = express.Router()

router.get("/", async (req, res) => {
  const servers = await ServersController.getServers(req.user?.id as string)
  res.json({ servers })
})

export default router
