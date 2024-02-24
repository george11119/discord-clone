import axios from "axios"
import config from "../utils/config.ts"

const url = `${config.SERVER_URL}/api/users`

const createUser = async (userParams: {
  username: string
  email: string
  password: string
}) => {
  const res = await axios.post(url, userParams)
  return res.data
}

export default {
  createUser,
}
