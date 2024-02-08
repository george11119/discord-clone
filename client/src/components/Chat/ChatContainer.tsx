import styled from "styled-components"
import ChatContainerHeader from "./ChatContainerHeader.tsx"

const ChatContainerWrapper = styled.div`
  background-color: rgb(49, 51, 56);
  width: 100%;
  height: 100vh;
`

const ChatContainer = () => {
  return (
    <ChatContainerWrapper>
      <ChatContainerHeader />
    </ChatContainerWrapper>
  )
}

export default ChatContainer
