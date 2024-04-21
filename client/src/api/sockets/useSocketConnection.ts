// a hook that connects to the websocket server on the backend when the react app first launches
import { useEffect } from "react"
import { socket } from "../../config/socket.ts"

const useSocketConnection = () => {
  // initial connection to socket
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])
}

export default useSocketConnection
