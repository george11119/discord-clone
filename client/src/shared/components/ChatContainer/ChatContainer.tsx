import ChatMessageDisplay from "./components/ChatMessageDisplay.tsx"
import MessageInput from "./components/MessageInput.tsx"
import styled from "styled-components"

const ChatContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const ChatContainer = () => {
  return (
    <ChatContent>
      <ChatMessageDisplay />
      <MessageInput />
    </ChatContent>
  )
}

export default ChatContainer
