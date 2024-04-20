// a hook that connects to the websocket server on the backend when the react app first launches
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { socket } from "../../config/socket.ts"

const useSocketConnection = () => {
  const { serverId, channelId } = useParams()
  // initial connection to socket
  useEffect(() => {
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [])

  // send socket event to join server room
  useEffect(() => {
    if (serverId) {
      socket.emit("joinServerRoom", serverId)
    }
    return () => {
      if (serverId) {
        socket.emit("leaveServerRoom", serverId)
      }
    }
  }, [serverId])

  // send socket event to join channel room
  useEffect(() => {
    if (channelId) {
      socket.emit("joinChannelRoom", channelId)
    }
    return () => {
      if (channelId) {
        socket.emit("leaveChannelRoom", channelId)
      }
    }
  }, [channelId])
}

export default useSocketConnection
