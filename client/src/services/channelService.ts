import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/channels"

const get = async (token: string, serverId: string) => {
  const res = await apiCaller.get(`${url}/${serverId}`, apiConfig(token))

  return res.data
}

export default {
  get,
}
