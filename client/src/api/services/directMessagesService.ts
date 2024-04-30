import apiCaller, { apiConfig } from "./apiCaller.ts"
import { User } from "../../../types.ts"

const url = "/channels/@me"

const get = async (token: string) => {
  const res = await apiCaller.get(`${url}`, apiConfig(token))
  return res.data
}

const create = async (token: string, recepient: User) => {
  const payload = { recepient }
  const res = await apiCaller.post(url, payload, apiConfig(token))
  return res.data
}

export default {
  get,
  create,
}
