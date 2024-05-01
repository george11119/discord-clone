import styled from "styled-components"
import ServerSidebar from "./Sidebar/ServerSidebar.tsx"
import Channelbar from "./Channelbar/Channelbar.tsx"
import ChatAreaContainer from "./Chat/ChatAreaContainer.tsx"
import useSocketConnection from "../../api/sockets/useSocketConnection.ts"
import {
  DirectMessage,
  FriendRequestItem,
  Server,
  User,
} from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { matchPath, useLocation } from "react-router-dom"
import DirectMessagesBar from "./DirectMessagesBar/DirectMessagesBar.tsx"
import FriendsDisplayContainer from "./Homepage/FriendsDisplayContainer.tsx"
import channelSocketHandlers from "../../api/sockets/channelSocketHandlers.ts"
import userSocketHandlers from "../../api/sockets/userSocketHandlers.ts"
import serverSocketHandlers from "../../api/sockets/serverSocketHandlers.ts"
import messageSocketHandlers from "../../api/sockets/messageSocketHandlers.ts"
import DirectMessageChatArea from "./DirectMessageChat/DirectMessageChatArea.tsx"
import directMessageSocketHandlers from "../../api/sockets/directMessageSocketHandlers.ts"

const Wrapper = styled.div`
  display: grid;
  color: rgb(219, 222, 225);
  grid-template-columns: 72px 240px 1fr;
`

const Home = ({
  servers,
  friends,
  friendRequests,
  directMessages,
}: {
  servers: Server[]
  friends: User[]
  friendRequests: FriendRequestItem[]
  directMessages: DirectMessage[]
}) => {
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)
  const isDirectMessageLink = pathname.match(
    /\/channels\/@me\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
  )

  useSocketConnection()

  // listen to all server and channel changes of a user
  for (const server of servers) {
    socket.emit("joinServerRoom", server.id)
  }

  directMessageSocketHandlers.useDirectMessageCreateListener()
  directMessageSocketHandlers.useDirectMessageReceivedListener()

  serverSocketHandlers.useServerDeleteListener()
  serverSocketHandlers.useServerEditListener()

  serverSocketHandlers.useUserJoinServerListener()
  serverSocketHandlers.useUserLeaveServerListener()

  channelSocketHandlers.useChannelCreateListener()
  channelSocketHandlers.useChannelEditListener()
  channelSocketHandlers.useChannelDeleteListener()

  userSocketHandlers.useFriendRequestReceivedListener()
  userSocketHandlers.useDestroyFriendRequestListener()
  userSocketHandlers.useFriendRequestAcceptedListener()
  userSocketHandlers.useDestroyFriendshipListener()

  messageSocketHandlers.useMessageCreateListener()
  messageSocketHandlers.useMessageEditListener()
  messageSocketHandlers.useMessageDeleteListener()

  return (
    <Wrapper>
      <ServerSidebar servers={servers} />
      {isHomeLink ? (
        <>
          <DirectMessagesBar directMessages={directMessages} />
          {isDirectMessageLink ? (
            <DirectMessageChatArea />
          ) : (
            <FriendsDisplayContainer
              friends={friends}
              friendRequests={friendRequests}
            />
          )}
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
