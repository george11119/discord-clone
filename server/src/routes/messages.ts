import express from "express"
import {
  createMessage,
  getAllMessages,
} from "../controllers/messagesController"

const router = express.Router()

// get all messages
router.get("/", async (req, res) => {
  const messages = await getAllMessages()
  res.json(messages)
})

// create a message
router.post("/", async (req, res) => {
  const { messageBody } = req.body
  const message = await createMessage({ messageBody })
  res.json(message)
})

export default router
