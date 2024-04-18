import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import { Channel, Server } from "../../../../types.ts"
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
  const { serverId, channelId } = useParams()
  const { pathname } = useLocation()
  const isHomeLink = matchPath(`/channels/@me/*`, pathname)

  const channels: Channel[] | undefined = queryClient.getQueryData(["channels"])

  // TODO my god this is horrible code
  // one of these will exist no matter what
  const channel = channels
    ? channels.find((c) => c.id === channelId)
    : (queryClient.getQueryData(["servers"]) as Server[])
        .find((s) => s.id === serverId)
        ?.channels?.find((c) => c.id === channelId)

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
