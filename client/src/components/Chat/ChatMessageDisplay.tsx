import styled from "styled-components"
import ChatMessage from "./ChatMessage.tsx"
import VerticalSpacer from "../shared/components/VerticalSpacer.tsx"
import { useContext } from "react"
import { MessagesContext } from "./ChatAreaContainer.tsx"
import { message } from "../../../../types.ts"
import { formatDateTime } from "../../helpers/dateTime.ts"

const Wrapper = styled.ul`
  flex: 1;
  list-style: none;
  overflow-y: scroll;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
`

const ChatMessageDisplay = () => {
  const { messages } = useContext(MessagesContext)
  return (
    <Wrapper>
      {messages.map((message: message) => {
        return (
          <ChatMessage
            key={message.id}
            message={message.messageBody}
            createdAt={formatDateTime(message.createdAt)}
            sender={"George"}
          />
        )
      })}
      <VerticalSpacer height={30} />
    </Wrapper>
  )
}

export default ChatMessageDisplay
