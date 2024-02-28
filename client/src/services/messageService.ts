import axios from "axios"
import { message } from "../../types.ts"
import { socket } from "../config/socket.ts"
import config from "../config/config.ts"

const url = `${config.API_ENDPOINT}/messages`

const getMessages = async (): Promise<message[]> => {
  const res = await axios.get(url)
  return res.data
}

const createMessage = (messageObject: { content: string }) => {
  socket.emit("message:create", messageObject)
}

export default {
  getMessages,
  createMessage,
}
