import { db } from "../../config/db"
import { Message } from "../../models/message"

const getAllMessages = async (): Promise<Message[]> => {
  const messages = await db.getRepository(Message).find()
  return messages
}

const createNewMessage = async ({
  content,
}: {
  content: string
}): Promise<Message> => {
  const message = await db.getRepository(Message).save({ content })
  return message
}

export default {
  getAllMessages,
  createNewMessage,
}
