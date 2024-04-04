import { Message } from "../../types.ts"
import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/messages"

const get = async (token: string, channelId: string): Promise<Message[]> => {
  const res = await apiCaller.get(`${url}/${channelId}`, apiConfig(token))
  return res.data
}

const create = async (
  token: string,
  messageObject: { content: string },
  channelId: string,
) => {
  const res = await apiCaller.post(
    `${url}/${channelId}`,
    messageObject,
    apiConfig(token),
  )
  return res.data
}

export default {
  get,
  create,
}
