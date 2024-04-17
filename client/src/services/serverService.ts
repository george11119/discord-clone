import apiCaller, { apiConfig } from "./apiCaller.ts"
import { Server } from "../../types.ts"

const url = "/servers"

const get = async (token: string): Promise<Server[]> => {
  const res = await apiCaller.get(url, apiConfig(token))
  return res.data.servers
}

const create = async (
  serverObject: { name: string },
  token: string,
): Promise<Server> => {
  const res = await apiCaller.post(url, serverObject, apiConfig(token))
  return res.data
}

const update = async (
  serverId: string,
  serverObject: { name: string },
  token: string,
): Promise<Server> => {
  const res = await apiCaller.patch(
    `${url}/${serverId}`,
    serverObject,
    apiConfig(token),
  )
  return res.data
}

const destroy = async (serverId: string, token: string): Promise<void> => {
  await apiCaller.delete(`${url}/${serverId}`, apiConfig(token))
}

const getInviteLink = async (token: string, serverId: string) => {
  console.log(token)
  const res = await apiCaller.post(
    `${url}/${serverId}/invites`,
    null,
    apiConfig(token),
  )
  return res.data
}

export default {
  get,
  create,
  update,
  destroy,
  getInviteLink,
}
