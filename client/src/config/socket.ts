import io from "socket.io-client"
import config from "./config.ts"

const URL = config.SERVER_URL

export const socket = io(URL)
