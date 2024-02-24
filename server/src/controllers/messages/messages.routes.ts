import express from "express"
import messageController from "./messages.db"
import { Message } from "../../models/message"

const router = express.Router()

// get all messages
router.get("/", async (req, res) => {
  const messages: Message[] = await messageController.getAllMessages()
  res.status(200).json(messages)
})

// create a message
router.post("/", async (req, res) => {
  const { content } = req.body
  const message: Message = await messageController.createNewMessage({ content })
  res.status(201).json(message)
})

export default router
