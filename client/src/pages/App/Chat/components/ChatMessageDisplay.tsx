import styled from "styled-components"
import ChatMessage from "./ChatMessage.tsx"
import VerticalSpacer from "../../../../shared/components/VerticalSpacer.tsx"
import { useContext, useEffect } from "react"
import { MessagesContext } from "../ChatAreaContainer.tsx"
import { message } from "../../../../../../types.ts"
import { formatDateTime } from "../../../../utils/dateTime.ts"
import { socket } from "../../../../services/socketService.ts"

const Wrapper = styled.ul`
  flex: 1;
  list-style: none;
  overflow-y: scroll;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
  display: flex;
  flex-direction: column-reverse;
  overflow-anchor: auto !important;
`

const ChatMessageDisplay = () => {
  const { messages, setMessages } = useContext(MessagesContext)

  useEffect(() => {
    const onMessageCreate = (res: { createdMessage: message }) => {
      const { createdMessage } = res
      setMessages(messages.concat(createdMessage))
    }

    socket.on("message:create", onMessageCreate)

    return () => {
      socket.off("message:create", onMessageCreate)
    }
  }, [messages])

  return (
    <Wrapper>
      <div>
        {messages.map((message: message) => {
          return (
            <ChatMessage
              key={message.id}
              message={message.content}
              createdAt={formatDateTime(message.createdAt)}
              sender={"George"}
            />
          )
        })}
        <VerticalSpacer height={30} />
      </div>
    </Wrapper>
  )
}

export default ChatMessageDisplay
