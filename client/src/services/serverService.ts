import apiCaller, { apiConfig } from "./apiCaller.ts"
import { Server } from "../../types.ts"

const url = "/servers"

const get = async (): Promise<Server[]> => {
  const res = await apiCaller.get(url, apiConfig)
  return res.data
}

export default {
  get,
}
