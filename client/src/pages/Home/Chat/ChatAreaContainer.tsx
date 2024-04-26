import styled from "styled-components"
import ServerChatHeader from "./components/Header/ServerChatHeader.tsx"
import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import { Channel } from "../../../../types.ts"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import UserList from "./components/UserList/UserList.tsx"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContainer = styled.div`
  display: flex;
  overflow: hidden;
  flex-grow: 1;
`

const ChatContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const ChatAreaContainer = () => {
  const queryClient = useQueryClient()
  const { serverId, channelId } = useParams()

  const [userListShown, setUserListShown] = useState(() => {
    const shown = localStorage.getItem("discord-clone-userlist-shown")
    return shown === "hide" ? false : true
  })

  const channels = queryClient.getQueryData([
    "channels",
    `${serverId}`,
  ]) as Channel[]

  const channel = channels?.find((c) => c.id === channelId)

  // a channel does not exist in the server or has not been selected, render blank page
  if (!channelId) {
    return (
      <Wrapper
        style={{
          backgroundColor: "#1e1f22",
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(148, 155, 164)",
        }}
      >
        Create or select a channel
      </Wrapper>
    )
  }

  // return chat
  return (
    <Wrapper>
      <ServerChatHeader
        chatTitle={channel ? channel.name : ""}
        userList={{ userListShown, setUserListShown }}
      />
      <MainContainer>
        <ChatContent>
          <ChatMessageDisplay />
          <MessageInput />
        </ChatContent>
        {userListShown && <UserList />}
      </MainContainer>
    </Wrapper>
  )
}

export default ChatAreaContainer
