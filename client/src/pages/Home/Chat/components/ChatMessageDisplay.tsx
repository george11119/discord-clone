import styled from "styled-components"
import ChatMessage from "./ChatMessage/ChatMessage.tsx"
import VerticalSpacer from "../../../../shared/components/VerticalSpacer.tsx"
import { useContext, useEffect, useRef } from "react"
import { Message } from "../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"
import AuthContext from "../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import messageQueries from "../../../../api/queries/messageQueries.ts"
import messageSocketHandlers from "../../../../api/sockets/messageSocketHandlers.ts"

const ChatWrapper = styled.ul`
  flex: 1;
  list-style: none;
  overflow-y: scroll;
  scrollbar-color: rgb(26, 27, 30) rgb(43, 45, 49);
  display: flex;
  flex-direction: column-reverse;
  overflow-anchor: auto !important;
`

const ChatMessageDisplay = () => {
  const { user } = useContext(AuthContext)
  const { channelId } = useParams()
  const queryClient = useQueryClient()

  messageQueries.useGetMessages(channelId)
  const messages: Message[] | undefined = queryClient.getQueryData([
    `messages-${channelId}`,
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messages?.length && messages.length > 0) {
      const message = messages[messages.length - 1]

      if (message.user.id === user?.id) {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
      }
    }
  }

  messageSocketHandlers.useMessageCreateListener(channelId)
  messageSocketHandlers.useMessageEditListener(channelId)
  messageSocketHandlers.useMessageDeleteListener(channelId)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ChatWrapper>
      <div style={{ width: "100%" }}>
        {messages &&
          messages.map((message: Message) => {
            return <ChatMessage key={message.id} message={message} />
          })}
        <VerticalSpacer height={30} />
        <span ref={messagesEndRef}></span>
      </div>
    </ChatWrapper>
  )
}

export default ChatMessageDisplay
