import styled from "styled-components"
import { Message } from "../../../../../types.ts"
import { useParams } from "react-router-dom"
import messageQueries from "../../../../api/queries/messageQueries.ts"
import ChatMessages from "./ChatMessages.tsx"
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.tsx"
import { useMemo } from "react"

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
  const { channelId } = useParams()

  const loadingSkeleton = useMemo(
    () => <MessagesLoadingSkeleton />,
    [channelId],
  )

  const result = messageQueries.useGetMessages(channelId)

  if (result.isLoading) {
    return <ChatWrapper>{loadingSkeleton}</ChatWrapper>
  }

  const messages = result.data as Message[]

  return (
    <ChatWrapper>
      <ChatMessages messages={messages} />
    </ChatWrapper>
  )
}

export default ChatMessageDisplay
