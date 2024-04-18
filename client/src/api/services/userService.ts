import apiCaller from "./apiCaller.ts"

const url = "/users"

const create = async (userParams: {
  username: string
  email: string
  password: string
}) => {
  const res = await apiCaller.post(url, userParams)
  return res.data
}

export default {
  create,
}
