import styled from "styled-components"
import Header from "./components/Header.tsx"
import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import { createContext, useState } from "react"
// import messageService from "../../../services/messageService.ts"
import { Channel, message } from "../../../../types.ts"
import { matchPath, useLocation, useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const MessagesContext = createContext<{
  messages: message[]
  setMessages: (messages: message[]) => void
}>({
  messages: [],
  setMessages: () => {},
})

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

  const [messages, setMessages] = useState<message[]>([])
  //
  // useEffect(() => {
  //   messageService.get().then((messages) => {
  //     setMessages(messages)
  //   })
  // }, [])
  //
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <Wrapper>
        {isHomeLink ? (
          <div>TODO add home page</div>
        ) : (
          <>
            <Header chatTitle={channel ? channel.name : ""} />
            <ChatMessageDisplay />
            <MessageInput />
          </>
        )}
      </Wrapper>
    </MessagesContext.Provider>
  )
}

export default ChatAreaContainer
