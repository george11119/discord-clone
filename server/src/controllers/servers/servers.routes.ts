import express from "express"
import ServersController from "./servers.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"

const router = express.Router()

router.get("/", authenticatedValidator, async (req, res) => {
  const servers = await ServersController.getServers(req.user?.id as string)
  res.json({ servers })
})

router.post("/", authenticatedValidator, async (req, res) => {
  const { name } = req.body
  const user = req.user

  if (!user) {
    return res.json({ message: "You must be logged in to create a server" })
  }

  const newServer = await ServersController.createServer({ name, user })

  res.status(201).json(newServer)
})

export default router
