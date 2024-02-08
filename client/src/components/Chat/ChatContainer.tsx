import styled from "styled-components"
import ChatContainerHeader from "./ChatContainerHeader.tsx"
import Chat from "./Chat.tsx"
import ChatForm from "./ChatForm.tsx"

const ChatContainerWrapper = styled.div`
  background-color: rgb(49, 51, 56);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ChatContainer = () => {
  return (
    <ChatContainerWrapper>
      <ChatContainerHeader />
      <Chat />
      <ChatForm />
    </ChatContainerWrapper>
  )
}

export default ChatContainer
