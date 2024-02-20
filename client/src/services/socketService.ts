import io from "socket.io-client"
import config from "../utils/config.ts"

const URL = config.SERVER_URL

export const socket = io(URL)
