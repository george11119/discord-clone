import styled from "styled-components"
import ServerSidebar from "./Sidebar/ServerSidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import useSocketConnection from "../../api/sockets/useSocketConnection.ts"
import serverQueries from "../../api/queries/serverQueries.ts"
import { FriendRequest, Server, User } from "../../../types.ts"
import { useQueries, useQuery } from "@tanstack/react-query"
import channelService from "../../api/services/channelService.ts"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"
import { socket } from "../../config/socket.ts"
import { matchPath, useLocation } from "react-router-dom"
import DirectMessagesBar from "./DirectMessagesBar/DirectMessagesBar.tsx"
import FriendsDisplayContainer from "./Homepage/FriendsDisplayContainer.tsx"
import userService from "../../api/services/userService.ts"

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
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  useSocketConnection()

  const { token } = useContext(AuthContext)

  const serversQuery = serverQueries.useGetServers()
  const servers = serversQuery.data as Server[]
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

  const friendsQuery = useQuery({
    queryKey: ["friends"],
    queryFn: () => userService.getFriends(token as string),
  })
  const friends = friendsQuery.data as User[]

  const friendRequestsQuery = useQuery({
    queryKey: ["friendRequests"],
    queryFn: () => userService.getFriendRequests(token as string),
  })
  const friendRequests = friendRequestsQuery.data as {
    sent: FriendRequest[]
    received: FriendRequest[]
  }

  if (
    friendsQuery.isLoading ||
    serversQuery.isLoading ||
    friendRequestsQuery.isLoading ||
    channelsQueries.some((q) => q.isLoading)
  ) {
    return <BlankPage />
  }

  // listen to all server and channel changes of a user
  for (const server of servers) {
    socket.emit("joinServerRoom", server.id)
  }

  return (
    <Wrapper>
      <ServerSidebar servers={servers} />
      {isHomeLink ? (
        <>
          <DirectMessagesBar />
          <FriendsDisplayContainer
            friends={friends}
            friendRequests={friendRequests}
          />
        </>
      ) : (
        <>
          <Channelbar />
          <ChatAreaContainer />
        </>
      )}
    </Wrapper>
  )
}

export default Home
