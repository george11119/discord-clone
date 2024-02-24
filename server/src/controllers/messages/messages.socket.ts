import { io } from "../../app"
import messageController from "./messages.db"
import { Message } from "../../models/message"

const createMessage = async (res: { content: string }) => {
  const createdMessage: Message = await messageController.createNewMessage(res)
  io.emit("message:create", { createdMessage })
}

export default {
  createMessage,
}
