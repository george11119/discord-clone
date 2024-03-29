import apiCaller, { apiConfig } from "./apiCaller.ts"
import { Channel } from "../../types.ts"

const url = "/channels"

const get = async (token: string, serverId: string) => {
  const res = await apiCaller.get(`${url}/${serverId}`, apiConfig(token))

  return res.data
}

const create = async (
  token: string,
  serverId: string,
  channelObject: { name: string },
) => {
  const res = await apiCaller.post(
    `${url}/${serverId}`,
    channelObject,
    apiConfig(token),
  )
  return res.data
}

export default {
  get,
  create,
}
