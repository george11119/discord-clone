import express from "express"
import messageController from "./messages.db"
import { Message } from "../../models/message"
import { authenticatedValidator } from "../../middleware/authenticatedValidator"

const router = express.Router()

// get all messages
router.get("/", authenticatedValidator, async (req, res) => {
  const messages: Message[] = await messageController.getAllMessages()
  res.status(200).json(messages)
})

// create a message
router.post("/", authenticatedValidator, async (req, res) => {
  const { content } = req.body
  const message: Message = await messageController.createNewMessage({ content })
  res.status(201).json(message)
})

export default router
