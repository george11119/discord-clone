import apiCaller, { apiConfig } from "./apiCaller.ts"
import { Server } from "../../types.ts"

const url = "/servers"

const get = async (token: string): Promise<Server[]> => {
  const res = await apiCaller.get(url, apiConfig(token))
  return res.data.servers
}

export default {
  get,
}
