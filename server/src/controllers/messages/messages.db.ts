import { Message, MessageType } from "../../models/message"
import { User } from "../../models/user"
import { Channel } from "../../models/channel"
import { db } from "../../config/db"

const getMessages = async ({ channelId }: { channelId: string }) => {
  if (!channelId) return null

  const messages = await Message.createQueryBuilder("message")
    .leftJoinAndSelect("message.user", "user")
    .where("message.channelId = :channelId", { channelId })
    .orderBy("message.createdAt")
    .getMany()

  return messages
}

const createMessage = async ({
  content,
  user,
  channel,
  messageType = MessageType.NORMAL,
}: {
  content: string
  user: User
  channel: Channel
  messageType?: MessageType
}): Promise<Message> => {
  const message = await Message.save({ content, user, channel, messageType })
  return message
}

const updateMessage = async ({
  content,
  messageId,
}: {
  content: string
  messageId: string
}) => {
  if (!messageId) return null

  await db
    .createQueryBuilder()
    .update(Message)
    .set({ content })
    .where("id = :messageId", { messageId })
    .returning("*")
    .execute()

  const updatedMessage = Message.findOne({
    where: { id: messageId },
    relations: { user: true, channel: true },
  })

  return updatedMessage
}

const deleteMessage = async ({ messageId }: { messageId: string }) => {
  if (!messageId) return null
  await Message.delete({ id: messageId })
}

export default {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
}
