import { useEffect } from "react"
import { Message } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"

const useMessageCreateListener = () => {
  const queryClient = useQueryClient()

  // handle a message create emit from socket
  return useEffect(() => {
    const onMessageCreate = (newMessage: Message) => {
      const oldMessages = queryClient.getQueryData([
        "messages",
        `${newMessage.channel?.id}`,
      ]) as Message[]

      const newMessages = oldMessages.concat(newMessage)

      queryClient.setQueryData(
        ["messages", `${newMessage.channel?.id}`],
        newMessages,
      )
    }

    socket.on("message:create", onMessageCreate)

    return () => {
      socket.off("message:create", onMessageCreate)
    }
  }, [])
}

const useMessageEditListener = () => {
  const queryClient = useQueryClient()

  // handle a message edit emit from socket
  return useEffect(() => {
    const onMessageEdit = (editedMessage: Message) => {
      const oldMessages = queryClient.getQueryData([
        "messages",
        `${editedMessage.channel?.id}`,
      ]) as Message[]

      const newMessages = oldMessages.map((m) =>
        m.id === editedMessage.id ? editedMessage : m,
      )
      queryClient.setQueryData(
        ["messages", `${editedMessage.channel?.id}`],
        newMessages,
      )
    }

    socket.on("message:edit", onMessageEdit)

    return () => {
      socket.off("message:edit", onMessageEdit)
    }
  }, [])
}

const useMessageDeleteListener = () => {
  const queryClient = useQueryClient()

  // handle a message delete emit from socket
  return useEffect(() => {
    const onMessageDelete = (
      deletedMessageId: string,
      deletedMessageChannelId: string,
    ) => {
      const oldMessages = queryClient.getQueryData([
        "messages",
        `${deletedMessageChannelId}`,
      ]) as Message[]

      // messages without the deleted message
      const newMessages = oldMessages.filter((m) => m.id !== deletedMessageId)
      queryClient.setQueryData(
        ["messages", `${deletedMessageChannelId}`],
        newMessages,
      )
    }

    socket.on("message:delete", onMessageDelete)

    return () => {
      socket.off("message:delete", onMessageDelete)
    }
  }, [])
}

const messageSocketHandlers = {
  useMessageCreateListener,
  useMessageEditListener,
  useMessageDeleteListener,
}

export default messageSocketHandlers
