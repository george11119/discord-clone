import styled from "styled-components"
import Sidebar from "./Sidebar/Sidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import { useContext, useEffect } from "react"
import { socket } from "../../config/socket.ts"
import { useParams } from "react-router-dom"
import AuthContext from "../Auth/AuthContext.ts"
import { useQuery } from "@tanstack/react-query"
import serverService from "../../services/serverService.ts"

const Wrapper = styled.div`
  display: grid;
  color: rgb(219, 222, 225);
  grid-template-columns: 72px 240px 1fr;
`

const Home = () => {
  const { serverId, channelId } = useParams()
  const { token } = useContext(AuthContext)

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

  const result = useQuery({
    queryKey: ["servers"],
    queryFn: () => serverService.get(token as string),
  })

  if (result.isLoading) {
    return <div>Loading</div>
  }

  return (
    <Wrapper>
      <Sidebar />
      <Channelbar />
      <ChatAreaContainer />
    </Wrapper>
  )
}

export default Home
