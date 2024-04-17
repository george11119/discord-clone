import express from "express"
import ServersController from "./servers.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import idGenerator from "../../utils/idGenerator"
import { redisClient } from "../../config/redis"

const router = express.Router()

router.get("/", authenticatedValidator, async (req, res) => {
  const servers = await ServersController.getServersWithChannels(
    req.user?.id as string,
  )
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

router.patch("/:serverId", authenticatedValidator, async (req, res) => {
  const { name } = req.body
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)

  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to update this server",
    })
  }

  const updatedServer = await ServersController.updateServer({ name, serverId })

  res.json(updatedServer)
})

router.delete("/:serverId", authenticatedValidator, async (req, res) => {
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)
  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to delete this server",
    })
  }

  await ServersController.deleteServer({ serverId })
  res.status(204).end()
})

// creates a invite link for a user to join a server
router.post("/:serverId/invites", authenticatedValidator, async (req, res) => {
  const { serverId } = req.params

  const server = await ServersController.getServer(serverId)
  if (!server) {
    return res.status(404).json({ message: "Server does not exist" })
  }

  const userIsInServer = await isUserInServer({
    serverId,
    userId: req.user?.id as string,
  })

  if (!userIsInServer) {
    return res.status(401).json({
      message: "You are not allowed to create a invite for this server",
    })
  }

  const inviteLinkId = idGenerator.generateInviteLinkId()
  await redisClient.set(inviteLinkId, serverId, { EX: 60 * 60 * 24 * 7 }) // 7 days

  res.json({ code: inviteLinkId })
})

export default router
