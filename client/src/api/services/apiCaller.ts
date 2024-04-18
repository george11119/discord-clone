import axios from "axios"
import config from "../../config/config.ts"

export const apiConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const apiCaller = axios.create({
  baseURL: config.API_ENDPOINT,
})

export default apiCaller
