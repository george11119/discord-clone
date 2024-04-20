import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import messageService from "../services/messageService.ts"
import { Message } from "../../../types.ts"
import { socket } from "../../config/socket.ts"
import { useContext } from "react"
import AuthContext from "../../pages/Auth/AuthContext.ts"

const useGetMessages = (channelId: string | undefined) => {
  const { token } = useContext(AuthContext)

  useQuery({
    queryKey: [`messages-${channelId}`],
    queryFn: () => messageService.get(token as string, channelId as string),
    enabled: channelId ? true : false,
  })
}

const useCreateMessage = (channelId: string | undefined) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newMessage: { content: string }) => {
      const res = messageService.create(
        token as string,
        newMessage,
        channelId as string,
      )
      return res
    },
    onSuccess: (newMessage) => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages?.concat(newMessage),
      )

      socket.emit("message:create", newMessage)
    },
  })
}

const useEditMessage = (channelId: string | undefined, message: Message) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (editedMessage: { content: string }) => {
      return messageService.update(
        token as string,
        editedMessage,
        channelId as string,
        message.id,
      )
    },
    onSuccess: (editedMessage) => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.map((m) => (m.id === editedMessage.id ? editedMessage : m)),
      )

      socket.emit("message:edit", editedMessage)
    },
  })
}

const useDeleteMessage = (
  channelId: string | undefined,
  messageId: string | undefined,
) => {
  const { token } = useContext(AuthContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return messageService.destroy(
        token as string,
        channelId as string,
        messageId as string,
      )
    },
    onSuccess: () => {
      const messages = queryClient.getQueryData([
        `messages-${channelId}`,
      ]) as Message[]

      queryClient.setQueryData(
        [`messages-${channelId}`],
        messages.filter((m) => m.id !== messageId),
      )

      socket.emit("message:delete", { channelId, messageId })
    },
  })
}

const messagesQueries = {
  useGetMessages,
  useCreateMessage,
  useEditMessage,
  useDeleteMessage,
}

export default messagesQueries
