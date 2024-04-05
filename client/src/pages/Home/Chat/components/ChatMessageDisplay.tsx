import styled from "styled-components"
import ChatMessage from "./ChatMessage.tsx"
import VerticalSpacer from "../../../../shared/components/VerticalSpacer.tsx"
import { useContext, useEffect, useRef } from "react"
import { Message } from "../../../../../types.ts"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import messageService from "../../../../services/messageService.ts"
import AuthContext from "../../../Auth/AuthContext.ts"
import { useParams } from "react-router-dom"

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
  const { token, user } = useContext(AuthContext)
  const { channelId } = useParams()
  const queryClient = useQueryClient()

  useQuery({
    queryKey: [`messages-${channelId}`],
    queryFn: () => messageService.get(token as string, channelId as string),
    enabled: channelId ? true : false,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const messages: Message[] | undefined = queryClient.getQueryData([
    `messages-${channelId}`,
  ])

  const scrollToBottom = () => {
    if (messages?.length && messages.length > 0) {
      const message = messages[messages.length - 1]

      if (message.user.id === user?.id) {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Wrapper>
      <div>
        {messages &&
          messages.map((message: Message) => {
            return <ChatMessage key={message.id} message={message} />
          })}
        <VerticalSpacer height={30} />
        <span ref={messagesEndRef}></span>
      </div>
    </Wrapper>
  )
}

export default ChatMessageDisplay
