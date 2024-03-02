import express from "express"
import ServersController from "./servers.db"

const router = express.Router()

router.get("/", async (req, res) => {
  const u = await ServersController.getServers(req.user?.id as string)
  res.json({ u })
})

export default router
