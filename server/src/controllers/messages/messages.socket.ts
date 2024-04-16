import { io } from "../../app"
import { Message } from "../../models/message"

const emitCreatedMessage = async (newMessage: Message) => {
  io.to(`channel-${newMessage.channel.id}`).emit("message:create", newMessage)
}

const emitEditedMessage = async (editedMessage: Message) => {
  io.to(`channel-${editedMessage.channel.id}`).emit(
    "message:edit",
    editedMessage,
  )
}

const emitMessageDelete = async ({
  messageId,
  channelId,
}: {
  messageId: string
  channelId: string
}) => {
  io.to(`channel-${channelId}`).emit("message:delete", messageId)
}

export default {
  emitCreatedMessage,
  emitEditedMessage,
  emitMessageDelete,
}
