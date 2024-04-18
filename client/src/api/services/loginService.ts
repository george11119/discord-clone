import apiCaller from "./apiCaller.ts"

const url = "/auth"

const login = async (userParams: { email: string; password: string }) => {
  const res = await apiCaller.post(`${url}/login`, userParams)
  return res.data
}

export default {
  login,
}
