import Home from "./Home.tsx"
import { useContext } from "react"
import AuthContext from "../Auth/AuthContext.ts"
import serverQueries from "../../api/queries/serverQueries.ts"
import { FriendRequestItem, Server, User } from "../../../types.ts"
import { useQueries } from "@tanstack/react-query"
import channelService from "../../api/services/channelService.ts"
import userQueries from "../../api/queries/userQueries.ts"
import styled from "styled-components"

const BlankPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1f22;
  color: rgb(242, 243, 245);
  display: flex;
  align-items: center;
  justify-content: center;
`

const RootPage = () => {
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

  const friendsQuery = userQueries.useGetFriends()
  const friends = friendsQuery.data as User[]

  const friendRequestsQuery = userQueries.useGetFriendRequests()
  const friendRequests = friendRequestsQuery.data as FriendRequestItem[]

  if (
    friendsQuery.isLoading ||
    serversQuery.isLoading ||
    friendRequestsQuery.isLoading ||
    channelsQueries.some((q) => q.isLoading)
  ) {
    return <BlankPage>Loading...</BlankPage>
  }

  return (
    <Home servers={servers} friends={friends} friendRequests={friendRequests} />
  )
}

export default RootPage
