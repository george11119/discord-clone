import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import { Channel } from "../../../../types.ts"
import { matchPath, useLocation, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ChatAreaContainer = () => {
  const queryClient = useQueryClient()
  const { channelId } = useParams()
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  const data: { channels: Channel[] } | undefined = queryClient.getQueryData([
    "channels",
  ])

  const channel = data
    ? (data.channels.find((c) => c.id === channelId) as Channel)
    : null

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

  return (
    <Wrapper>
      {channelId ? (
        <>
          <Header chatTitle={channel ? channel.name : ""} />
          <ChatMessageDisplay />
          <MessageInput />
        </>
      ) : (
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
      )}
    </Wrapper>
  )
}

export default ChatAreaContainer
