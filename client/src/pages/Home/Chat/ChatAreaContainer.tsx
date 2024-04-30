import styled from "styled-components"
import ServerChatHeader from "./components/Header/ServerChatHeader.tsx"
import { useParams } from "react-router-dom"
import { useState } from "react"
import UserList from "./components/UserList/UserList.tsx"
import ChatContainer from "../../../shared/components/ChatContainer/ChatContainer.tsx"
import useChannelStore from "../../../api/stores/channelStore.ts"

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

const ChatAreaContainer = () => {
  const channelStore = useChannelStore()
  const { serverId, channelId } = useParams()

  const [userListShown, setUserListShown] = useState(() => {
    const shown = localStorage.getItem("discord-clone-userlist-shown")
    return shown === "hide" ? false : true
  })

  const channels = channelStore.get(serverId as string)
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
        <ChatContainer />
        {userListShown && <UserList />}
      </MainContainer>
    </Wrapper>
  )
}

export default ChatAreaContainer
