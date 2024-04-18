import { Message } from "../../../types.ts"
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

const update = async (
  token: string,
  messageObject: { content: string },
  channelId: string,
  messageId: string,
) => {
  const res = await apiCaller.patch(
    `${url}/${channelId}/${messageId}`,
    messageObject,
    apiConfig(token),
  )

  return res.data
}

const destroy = async (token: string, channelId: string, messageId: string) => {
  await apiCaller.delete(`${url}/${channelId}/${messageId}`, apiConfig(token))
}

export default {
  get,
  create,
  update,
  destroy,
}
