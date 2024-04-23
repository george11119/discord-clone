import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/users"

const create = async (userParams: {
  username: string
  email: string
  password: string
}) => {
  const res = await apiCaller.post(url, userParams)
  return res.data
}

const getOne = async (token: string, userId: string) => {
  const res = await apiCaller.get(`${url}/${userId}`, apiConfig(token))
  return res.data
}

export default {
  create,
  getOne,
}
