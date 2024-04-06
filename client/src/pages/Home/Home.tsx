import styled from "styled-components"
import Sidebar from "./Sidebar/Sidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import { useEffect, useState } from "react"
import { socket } from "../../config/socket.ts"

const Wrapper = styled.div`
  display: grid;
  color: rgb(219, 222, 225);
  grid-template-columns: 72px 240px 1fr;
`

const Home = () => {
  const [_isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on("connection", onConnect)
    socket.on("disconnect", onConnect)

    return () => {
      socket.off("connection", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])

  return (
    <Wrapper>
      <Sidebar />
      <Channelbar />
      <ChatAreaContainer />
    </Wrapper>
  )
}

export default Home
