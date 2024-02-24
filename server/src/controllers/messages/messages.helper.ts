import { db } from "../../config/db"
import { Message } from "../../models/message"

const getAllMessages = async () => {
  const messages = await db.getRepository(Message).find()
  return messages
}

const createNewMessage = async ({ messageBody }: { messageBody: string }) => {
  const message = db.getRepository(Message).create({ messageBody })
  const savedMessage = await db.getRepository(Message).save(message)
  return savedMessage
}

export default {
  getAllMessages,
  createNewMessage,
}
