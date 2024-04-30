import { Message } from "../../../../../types.ts"
import { useContext, useEffect, useRef, useState } from "react"
import AuthContext from "../../../../pages/Auth/AuthContext.ts"
import VerticalSpacer from "../../VerticalSpacer.tsx"
import ChatMessage from "./ChatMessage/ChatMessage.tsx"
import { useParams } from "react-router-dom"
import { socket } from "../../../../config/socket.ts"
import { messagesSentOnDifferentDays } from "../../../../utils/dateTime.ts"
import MessageSeparator from "./ChatMessage/MessageSeparator.tsx"
import WelcomeMessage from "./ChatMessage/WelcomeMessage.tsx"
import { differenceInMinutes } from "date-fns"
import { MessageType } from "../../../../../../types.ts"

const mapMessages = (messages: Message[]) => {
  let previousMessage: Message | null = null

  const chooseMessage = (message: Message) => {
    if (message.messageType === MessageType.NORMAL) {
      return <ChatMessage message={message} />
    } else {
      return <WelcomeMessage message={message} />
    }
  }

  const processMessage = (message: Message) => {
    // message is sent on a different day than the previous day
    const isNewDay =
      previousMessage && messagesSentOnDifferentDays(previousMessage, message)
    // the previous message was sent by the user sending the current message
    const isSameUser =
      previousMessage && previousMessage.user.id === message.user.id
    // time between the current message sent and the previous message sent does not exceed 1 minute
    const isSentInSameMinute =
      previousMessage &&
      differenceInMinutes(message.createdAt, previousMessage.createdAt) === 0
    // previous message isnt welcome message
    const previousMessageNotWelcomeMessage =
      previousMessage?.messageType !== MessageType.WELCOME

    previousMessage = message

    if (isNewDay) {
      return (
        <div key={message.id}>
          <MessageSeparator date={message.createdAt} />
          {chooseMessage(message)}
        </div>
      )
    }

    if (isSameUser && previousMessageNotWelcomeMessage && isSentInSameMinute) {
      return (
        <div key={message.id}>
          <ChatMessage message={message} withProfilePicture={false} />
        </div>
      )
    }

    return <div key={message.id}>{chooseMessage(message)}</div>
  }

  return messages.map((message) => processMessage(message))
}

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const { channelId } = useParams()
  const { user } = useContext(AuthContext)
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.emit("joinChannelRoom", channelId)
  }, [channelId])

  const scrollToBottom = () => {
    if (messages?.length && messages.length > 0) {
      const message = messages[messages.length - 1]

      if (messages.length <= previousMessagesLength) return

      if (message.user.id === user?.id) {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" })
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
    setPreviousMessagesLength(messages.length)
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
