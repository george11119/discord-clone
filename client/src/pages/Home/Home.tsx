import styled from "styled-components"
import Sidebar from "./Sidebar/Sidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import useSocketConnection from "../../api/sockets/useSocketConnection.ts"
import serverQueries from "../../api/queries/serverQueries.ts"
import { Channel, Server } from "../../../types.ts"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import channelService from "../../api/services/channelService.ts"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"
import { socket } from "../../config/socket.ts"

const Wrapper = styled.div`
  display: grid;
  color: rgb(219, 222, 225);
  grid-template-columns: 72px 240px 1fr;
`

const BlankPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1f22;
`

const Home = () => {
  useSocketConnection()

  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const result = serverQueries.useGetServers()
  const servers = result.data as Server[]
  const channelsQueries = useQueries({
    queries: servers
      ? servers.map((s) => {
          return {
            queryKey: ["channels", `${s.id}`],
            queryFn: async () => {
              const data = await channelService.get(token as string, s.id)
              return data
            },
          }
        })
      : [],
  })

  if (result.isLoading || channelsQueries.some((q) => q.isLoading)) {
    return <BlankPage />
  }

  // listen to all server, channel, and message changes of a user
  // dont think subscribing to channel and message changes are needed to be here
  // TODO make subscribing to channel only happen when user navigates to said channel
  for (const server of servers) {
    socket.emit("joinServerRoom", server.id)
  }

  return (
    <Wrapper>
      <Sidebar servers={servers} />
      <Channelbar />
      <ChatAreaContainer />
    </Wrapper>
  )
}

export default Home
