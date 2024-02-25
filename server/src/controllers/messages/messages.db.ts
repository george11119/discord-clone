import { Message } from "../../models/message"

const getAllMessages = async (): Promise<Message[]> => {
  const messages = await Message.find()
  return messages
}

const createNewMessage = async ({
  content,
}: {
  content: string
}): Promise<Message> => {
  const message = await Message.save({ content })
  return message
}

export default {
  getAllMessages,
  createNewMessage,
}
