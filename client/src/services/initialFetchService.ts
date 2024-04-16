import apiCaller, { apiConfig } from "./apiCaller.ts"
import { Server, User } from "../../types.ts"

const url = "/@me"

const get = async (
  token: string,
): Promise<{ user: User; servers: Server[] }> => {
  const res = await apiCaller.get(`${url}`, apiConfig(token))
  return res.data
}

export default {
  get,
}
