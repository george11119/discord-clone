import { message } from "../../types.ts"
import { socket } from "../config/socket.ts"
import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/messages"

const get = async (): Promise<message[]> => {
  const res = await apiCaller.get(url, apiConfig)
  return res.data
}

const create = (messageObject: { content: string }) => {
  socket.emit("message:create", messageObject)
}

export default {
  get,
  create,
}
