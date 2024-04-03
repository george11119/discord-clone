import { Message } from "../../models/message"
import { User } from "../../models/user"
import { Channel } from "../../models/channel"

const getMessages = async ({
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

const createMessage = async ({
  content,
  user,
  channel,
}: {
  content: string
  user: User
  channel: Channel
}): Promise<Message> => {
  const message = await Message.save({ content, user, channel })
  return message
}

export default {
  getMessages,
  createMessage,
}
