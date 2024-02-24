import express from "express"
import messageController from "./messages.helper"

const router = express.Router()

// get all messages
router.get("/", async (req, res) => {
  const messages = await messageController.getAllMessages()
  res.status(200).json(messages)
})

// create a message
router.post("/", async (req, res) => {
  const { messageBody } = req.body
  const message = await messageController.createNewMessage({ messageBody })
  res.status(201).json(message)
})

export default router
