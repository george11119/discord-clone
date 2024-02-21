import axios from "axios"
import { message } from "../../../types.ts"
import { socket } from "./socketService.ts"

const url = "http://localhost:3001/api/messages"

const getMessages = async (): Promise<message[]> => {
  const res = await axios.get(url)
  return res.data
}

const createMessage = (messageObject: { messageBody: string }) => {
  socket.emit("message:create", messageObject)
}

export default {
  getMessages,
  createMessage,
}
