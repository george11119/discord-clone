import styled from "styled-components"
import ChatMessage from "./ChatMessage.tsx"
import VerticalSpacer from "../shared/components/VerticalSpacer.tsx"

const Wrapper = styled.ul`
  flex: 1;
  list-style: none;
  overflow-y: scroll;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const ChatMessageDisplay = () => {
  return (
    <Wrapper>
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <ChatMessage message={"hello world"} sender={"George"} />
      <VerticalSpacer height={30} />
    </Wrapper>
  )
}

export default ChatMessageDisplay
