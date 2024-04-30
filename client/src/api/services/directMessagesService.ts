import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/channels/@me"

const get = async (token: string) => {
  const res = await apiCaller.get(`${url}`, apiConfig(token))
  return res.data
}

export default {
  get,
}
