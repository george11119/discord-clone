import { Message, MessageType } from "../../../../../types.ts"
import { useContext, useEffect, useRef } from "react"
import useOnScreen from "../../../../hooks/useOnScreen.ts"
import AuthContext from "../../../Auth/AuthContext.ts"
import VerticalSpacer from "../../../../shared/components/VerticalSpacer.tsx"
import ChatMessage from "./ChatMessage/ChatMessage.tsx"
import messageSocketHandlers from "../../../../api/sockets/messageSocketHandlers.ts"
import { useParams } from "react-router-dom"
import { socket } from "../../../../config/socket.ts"
import { messagesSentOnDifferentDays } from "../../../../utils/dateTime.ts"
import MessageSeparator from "./MessageSeparator.tsx"
import WelcomeMessage from "./WelcomeMessage.tsx"

const chooseMessage = (message: Message) => {
  if (message.messageType === MessageType.NORMAL) {
    return <ChatMessage message={message} />
  } else {
    return <WelcomeMessage message={message} />
  }
}

const mapMessages = (messages: Message[]) => {
  let previousMessage: Message | null = null

  const processedMessages = messages.map((message: Message) => {
    if (
      previousMessage &&
      messagesSentOnDifferentDays(previousMessage, message)
    ) {
      previousMessage = message
      return (
        <div key={message.id}>
          <MessageSeparator date={message.createdAt} />
          {chooseMessage(message)}
        </div>
      )
    }

    previousMessage = message
    return <div key={message.id}>{chooseMessage(message)}</div>
  })

  return processedMessages
}

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const { channelId } = useParams()
  const { user } = useContext(AuthContext)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isVisible = useOnScreen(messagesEndRef)

  useEffect(() => {
    socket.emit("joinChannelRoom", channelId)
  }, [channelId])

  messageSocketHandlers.useMessageCreateListener()
  messageSocketHandlers.useMessageEditListener()
  messageSocketHandlers.useMessageDeleteListener()

  const scrollToBottom = () => {
    if (messages?.length && messages.length > 0) {
      const message = messages[messages.length - 1]

      if (message.user.id === user?.id) {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
      }

      if (message.user.id !== user?.id && isVisible) {
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
  }, [])

  return (
    <div>
      {mapMessages(messages)}
      <VerticalSpacer height={30} />
      <span style={{ height: 1 }} ref={messagesEndRef}></span>
    </div>
  )
}

export default ChatMessages
