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

export default {
  get,
  create,
}
