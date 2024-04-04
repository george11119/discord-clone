import { Message } from "../../types.ts"
import { socket } from "../config/socket.ts"
import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/messages"

const get = async (token: string, channelId: string): Promise<Message[]> => {
  const res = await apiCaller.get(`${url}/${channelId}`, apiConfig(token))
  return res.data
}

const create = (messageObject: { content: string }) => {
  socket.emit("message:create", messageObject)
}

export default {
  get,
  create,
}
