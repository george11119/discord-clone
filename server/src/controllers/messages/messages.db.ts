import { Message } from "../../models/message"

const getAllMessages = async ({
  channelId,
}: {
  channelId: string
}): Promise<Message[]> => {
  const messages = await Message.createQueryBuilder("message")
    .leftJoinAndSelect("message.user", "user")
    .where("message.channelId = :channelId", { channelId })
    .getMany()

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
