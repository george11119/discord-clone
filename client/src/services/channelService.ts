import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/channels"

const get = async (serverId: string) => {
  const res = await apiCaller.get(`${url}/${serverId}`, apiConfig)

  return res.data
}

export default {
  get,
}
