import express from "express"
import messageController from "../controllers/messageController"

const router = express.Router()

// get all messages
router.get("/", async (req, res) => {
  const messages = await messageController.getAllMessages()
  res.json(messages)
})

// create a message
router.post("/", async (req, res) => {
  const { messageBody } = req.body
  const message = await messageController.createNewMessage({ messageBody })
  res.json(message)
})

export default router
