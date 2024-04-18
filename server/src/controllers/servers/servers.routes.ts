import express from "express"
import ServersController from "./servers.db"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"
import { isUserInServer } from "../helpers"
import idGenerator from "../../utils/idGenerator"
import { redisClient } from "../../config/redis"
import { UserServers } from "../../models/userServers"

const router = express.Router()
router.use(authenticatedValidator)

router.get("/", async (req, res) => {
  const servers = await ServersController.getServersWithChannels(
    req.user?.id as string,
  )
  res.json({ servers })
})

router.post("/", async (req, res) => {
  const { name } = req.body
  const user = req.user

  if (!user) {
    return res.json({ message: "You must be logged in to create a server" })
  }

  const newServer = await ServersController.createServer({ name, user })

  res.status(201).json(newServer)
})

router.patch("/:serverId", async (req, res) => {
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

router.delete("/:serverId", async (req, res) => {
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
router.post("/:serverId/invites", async (req, res) => {
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

// allows a user to join a server given that the invite link is valid
router.post("/join/:inviteLinkId", async (req, res) => {
  const { inviteLinkId } = req.params

  const serverId = await redisClient.get(inviteLinkId)

  const server = await ServersController.getServer(serverId as string)

  if (!server) {
    return res
      .status(400)
      .json({ joined: false, message: "Invalid invite link" })
  }

  const user = req.user

  const userIsInServer = await isUserInServer({
    serverId: server?.id,
    userId: user?.id as string,
  })

  if (userIsInServer) {
    return res.status(400).json({
      joined: false,
      message: "You are already part of this server",
    })
  }

  await UserServers.save({ user, server })

  res.status(200).json({ joined: true })
})

// router.get("/:serverId/users", authenticatedValidator, async (req, res) => {})

export default router
