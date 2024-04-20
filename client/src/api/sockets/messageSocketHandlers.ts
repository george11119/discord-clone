import { useContext, useEffect } from "react"
import { Message } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useQueryClient } from "@tanstack/react-query"
import AuthContext from "../../pages/Auth/AuthContext.ts"

const useMessageCreateListener = (channelId: string | undefined) => {
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  // handle a message create emit from socket
  return useEffect(() => {
    const onMessageCreate = (newMessage: Message) => {
      if (newMessage.user.id === user?.id) return

      const oldMessages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      const newMessages = oldMessages.concat(newMessage)

      queryClient.setQueryData([`messages-${channelId}`], newMessages)
    }

    socket.on("message:create", onMessageCreate)

    return () => {
      socket.off("message:create", onMessageCreate)
    }
  }, [])
}

const useMessageEditListener = (channelId: string | undefined) => {
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  // handle a message edit emit from socket
  return useEffect(() => {
    const onMessageEdit = (editedMessage: Message) => {
      if (editedMessage.user.id === user?.id) return

      const oldMessages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      const newMessages = oldMessages.map((m) =>
        m.id === editedMessage.id ? editedMessage : m,
      )
      queryClient.setQueryData([`messages-${channelId}`], newMessages)
    }

    socket.on("message:edit", onMessageEdit)

    return () => {
      socket.off("message:edit", onMessageEdit)
    }
  }, [])
}

const useMessageDeleteListener = (channelId: string | undefined) => {
  const queryClient = useQueryClient()

  // handle a message delete emit from socket
  return useEffect(() => {
    const onMessageDelete = (deletedMessageId: string) => {
      const oldMessages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      // messages without the deleted message
      const newMessages = oldMessages.filter((m) => m.id !== deletedMessageId)
      queryClient.setQueryData([`messages-${channelId}`], newMessages)
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
