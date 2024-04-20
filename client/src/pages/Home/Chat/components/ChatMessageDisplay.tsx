import styled from "styled-components"
import ChatMessage from "./ChatMessage/ChatMessage.tsx"
import VerticalSpacer from "../../../../shared/components/VerticalSpacer.tsx"
import { useContext, useEffect, useRef } from "react"
import { Message } from "../../../../../types.ts"
import { useQueryClient } from "@tanstack/react-query"
import AuthContext from "../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"
import { socket } from "../../../../config/socket.ts"
import messagesQueries from "../../../../api/queries/messagesQueries.ts"

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

  messagesQueries.useGetMessages(channelId)
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

  // handle a message create emit from socket
  useEffect(() => {
    const onMessageCreate = (newMessage: Message) => {
      if (newMessage.user.id !== user?.id) {
        queryClient.setQueryData(
          [`messages-${channelId}`],
          messages?.concat(newMessage),
        )
      }
    }

    socket.on("message:create", onMessageCreate)

    return () => {
      socket.off("message:create", onMessageCreate)
    }
  }, [messages])

  // handle a message edit emit from socket
  useEffect(() => {
    const onMessageEdit = (editedMessage: Message) => {
      if (editedMessage.user.id !== user?.id) {
        const messages: Message[] | undefined = queryClient.getQueryData([
          `messages-${channelId}`,
        ]) as Message[]

        const editedMessages = messages.map((m) =>
          m.id === editedMessage.id ? editedMessage : m,
        )
        queryClient.setQueryData([`messages-${channelId}`], editedMessages)
      }
    }

    socket.on("message:edit", onMessageEdit)

    return () => {
      socket.off("message:edit", onMessageEdit)
    }
  }, [messages])

  // handle a message delete emit from socket
  useEffect(() => {
    const onMessageDelete = (deletedMessageId: string) => {
      const messages: Message[] | undefined = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      // messages without the deleted message
      const alteredMessages = messages.filter((m) => m.id !== deletedMessageId)
      queryClient.setQueryData([`messages-${channelId}`], alteredMessages)
    }

    socket.on("message:delete", onMessageDelete)

    return () => {
      socket.off("message:delete", onMessageDelete)
    }
  }, [messages])

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
