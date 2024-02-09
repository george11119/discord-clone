import styled from "styled-components"
import Header from "./Header.tsx"
import ChatMessageDisplay from "./ChatMessageDisplay.tsx"
import MessageInput from "./MessageInput.tsx"

const Wrapper = styled.div`
  background-color: rgb(49, 51, 56);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const ChatAreaContainer = () => {
  return (
    <Wrapper>
      <Header />
      <ChatMessageDisplay />
      <MessageInput />
    </Wrapper>
  )
}

export default ChatAreaContainer
