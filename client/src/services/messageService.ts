import axios from "axios"
import { message } from "../../../types.ts"

const url = "http://localhost:3001/api/messages"

const getMessages = async (): Promise<message[]> => {
  const res = await axios.get(url)
  return res.data
}

export default {
  getMessages,
}
