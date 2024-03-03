import axios from "axios"
import config from "../config/config.ts"

export const apiConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("discord-clone-jwt-token")}`,
  },
}

const apiCaller = axios.create({
  baseURL: config.API_ENDPOINT,
})

export default apiCaller
