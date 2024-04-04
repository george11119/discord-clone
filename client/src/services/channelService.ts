import apiCaller, { apiConfig } from "./apiCaller.ts"

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

const update = async (
  token: string,
  serverId: string,
  channelId: string,
  channelObject: { name: string },
) => {
  const res = await apiCaller.patch(
    `${url}/${serverId}/${channelId}`,
    channelObject,
    apiConfig(token),
  )
  return res.data
}

const destroy = async (token: string, serverId: string, channelId: string) => {
  await apiCaller.delete(`${url}/${serverId}/${channelId}`, apiConfig(token))
}

export default {
  get,
  create,
  update,
  destroy,
}
