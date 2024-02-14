import styled from "styled-components"
import Header from "./Header.tsx"
import ChatMessageDisplay from "./ChatMessageDisplay.tsx"
import MessageInput from "./MessageInput.tsx"
import { createContext, useEffect, useState } from "react"
import messageService from "../../services/messageService.ts"
import { message } from "../../../../types.ts"

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
  const [messages, setMessages] = useState<message[]>([])

  useEffect(() => {
    messageService.getMessages().then((messages) => {
      setMessages(messages)
    })
  }, [])

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      <Wrapper>
        <Header chatTitle="General" />
        <ChatMessageDisplay />
        <MessageInput />
      </Wrapper>
    </MessagesContext.Provider>
  )
}

export default ChatAreaContainer
