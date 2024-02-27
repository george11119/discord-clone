import axios from "axios"
import config from "../config/config.ts"

const url = `${config.SERVER_URL}/api/auth`

const login = async (userParams: { email: string; password: string }) => {
  const res = await axios.post(`${url}/login`, userParams)
  return res.data
}

export default {
  login,
}
