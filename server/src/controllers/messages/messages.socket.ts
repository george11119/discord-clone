import { io } from "../../app"
import { Message } from "../../models/message"

const emitCreatedMessage = async (newMessage: Message) => {
  io.to(`channel-${newMessage.channel.id}`).emit("message:create", newMessage)
}

export default {
  emitCreatedMessage,
}
