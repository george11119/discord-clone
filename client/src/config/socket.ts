import io from "socket.io-client"
import config from "./config.ts"

const URL = config.SERVER_URL

const token = localStorage.getItem("discord-clone-jwt-token")
export const socket = io(URL, {
  extraHeaders: { authorization: `Bearer ${token}` },
})
