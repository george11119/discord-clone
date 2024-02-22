import { io } from "../app"
import messageController from "../controllers/messageController"

const createMessage = async (res: { messageBody: string }) => {
  const createdMessage = await messageController.createNewMessage(res)
  io.emit("message:create", { createdMessage })
}

export default {
  createMessage,
}
