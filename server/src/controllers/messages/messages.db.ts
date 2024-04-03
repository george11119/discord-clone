import { Message } from "../../models/message"
import { User } from "../../models/user"
import { Channel } from "../../models/channel"
import { db } from "../../config/db"

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

const updateMessage = async ({
  content,
  messageId,
}: {
  content: string
  messageId: string
}) => {
  const updatedMessage = (
    await db
      .createQueryBuilder()
      .update(Message)
      .set({ content })
      .where("id = :messageId", { messageId })
      .returning("*")
      .execute()
  ).raw[0]

  return updatedMessage
}

const deleteMessage = async ({ messageId }: { messageId: string }) => {
  await Message.delete({ id: messageId })
}

export default {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}
