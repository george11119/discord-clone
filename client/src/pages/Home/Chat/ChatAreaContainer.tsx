import styled from "styled-components"
import Header from "./components/Header/Header.tsx"
import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import { Channel, Server } from "../../../../types.ts"
import { matchPath, useLocation, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ChatAreaContainer = () => {
  const queryClient = useQueryClient()
  const { serverId, channelId } = useParams()
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)
  const [userListShown, setUserListShown] = useState(true)

  const channels: Channel[] | undefined = queryClient.getQueryData(["channels"])

  // TODO my god this is horrible code
  // one of these will exist no matter what, both get the current channel
  const channel = channels
    ? channels.find((c) => c.id === channelId)
    : (queryClient.getQueryData(["servers"]) as Server[])
        .find((s) => s.id === serverId)
        ?.channels?.find((c) => c.id === channelId)

  // home page
  if (isHomeLink) {
    return (
      <Wrapper
        style={{
          alignItems: "center",
          justifyContent: "center",
          color: "rgb(148, 155, 164)",
        }}
      >
        <div>TODO add home page</div>
      </Wrapper>
    )
  }

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
      <>
        <Header
          chatTitle={channel ? channel.name : ""}
          setUserListShown={setUserListShown}
        />
        <ChatMessageDisplay />
        <MessageInput />
      </>
    </Wrapper>
  )
}

export default ChatAreaContainer
