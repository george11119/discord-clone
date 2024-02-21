import styled from "styled-components"
import Sidebar from "./components/Sidebar/Sidebar.tsx"
import Channelbar from "./components/Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./components/Chat/ChatAreaContainer.tsx"
import { useEffect, useState } from "react"
import { socket } from "./services/socketService.ts"

const Wrapper = styled.div`
  display: flex;
`

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

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

export default App
